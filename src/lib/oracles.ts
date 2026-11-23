import { d } from './roll';
import { StarNames } from 'src/data/starNames';
import {
  Starforged,
  ISettingTruth,
  IRow,
  ISettingTruthOption,
  IOracleCategory,
  IOracleBase,
  IDisplayOracle,
  ISource,
} from 'dataforged';
import { getCurrentStarforged, starforgedEN } from 'src/lib/dataforged';
import { translateKey } from 'src/i18n';
import { mdToText } from './util';
import { ICustomOracle } from 'src/components/models';
import { uid } from 'quasar';
import { useOracles } from 'src/store/oracles';

export interface IRollDetailed {
  result: string;
  canonical: string;
  rawResult: string;
  rawCanonical: string;
  linkTarget: string;
}

export interface IOracleValueOption {
  label: string;
  canonical: string;
  linkTarget: string;
}

export const NewCustomOracle = (name: string): ICustomOracle => {
  return {
    $id: 'Stargazer/Oracles/Custom/' + uid(), // Ensure IDs are unique
    Name: name,
    Dice: '1d100',
    Display: <IDisplayOracle>{},
    Category: 'Custom',
    Source: <ISource>{},
    Table: <IRow[]>[],
  };
};

const findInDataset = (
  ds: Starforged,
  id: string
): ICustomOracle | IOracleBase | ISettingTruth | string[] | false => {
  if (id.length === 0) return false;

  const path = id.split('/');
  const source = path[0];
  const type = path[1]; // Setting_Truths | Oracles
  const category = path[2]; // Moves | Planets

  // Handle custom oracles
  if (source === 'Stargazer' && category === 'Custom') {
    const custom = useOracles().data.find((o) => o.$id === id);
    return custom ? (custom as ICustomOracle) : false;
  }

  // Handle a truth category
  if (type === 'Setting_Truths') {
    const truthCategory = ds['Setting Truths'].find((v) => v.$id === id);
    return truthCategory ? truthCategory : false;
  }

  const oracleCategory = ds['Oracle Categories'].find((v) => v.$id === `Starforged/Oracles/${category}`);
  if (!oracleCategory) return false;

  // Recursively traverse oracle categories and sub-oracles by $id
  let out: IOracleBase | ISettingTruth | string[] | false = false;
  let found = false;
  const findById = (o: IOracleBase, targetId: string) => {
    if (found) return;

    if (o.$id === targetId) {
      out = o;
      found = true;
      return;
    }

    if (o.Categories) for (const ocl of o.Categories) findById(ocl, targetId);
    if (o.Oracles) for (const ocl of o.Oracles) findById(ocl, targetId);
  };

  // Edge case: Sample Names live on the parent oracle/category node
  if (path[path.length - 1] === 'Sample Names') {
    path.pop();
    const parentId = path.join('/');
    findById(oracleCategory, parentId);
    const res = out as unknown as IOracleCategory;
    return res && res['Sample Names'] ? res['Sample Names'] : false;
  }

  findById(oracleCategory, id);

  return out ? out : false;
};

const find = (id: string): ICustomOracle | IOracleBase | ISettingTruth | string[] | false => {
  return findInDataset(getCurrentStarforged(), id);
};

const findEn = (id: string): ICustomOracle | IOracleBase | ISettingTruth | string[] | false => {
  return findInDataset(starforgedEN, id);
};

const tableIn = (ds: Starforged, id: string): IRow[] | ISettingTruthOption[] | string[] | false => {
  const o = findInDataset(ds, id);
  if (!o) return false;

  if (Array.isArray(o)) return o;

  return o.Table ? o.Table : false;
};

const extractLinkTarget = (raw: string): string => {
  const m = /\]\((Starforged\/[^)]+)\)/.exec(raw);
  return m ? m[1] : '';
};

const matchRowByRoll = (rows: IRow[], n: number): IRow | undefined => {
  return rows.find((row) => row.Floor != null && row.Ceiling != null && row.Floor <= n && row.Ceiling >= n);
};

export const rollDetailed = (id: string, num?: number): IRollDetailed => {
  const activeTable = tableIn(getCurrentStarforged(), id);
  const enTable = tableIn(starforgedEN, id);

  if (!activeTable || activeTable.length === 0) {
    return {
      result: translateKey('oracles.errors.notFound'),
      canonical: 'Could not find oracle',
      rawResult: '',
      rawCanonical: '',
      linkTarget: '',
    };
  }

  if (typeof activeTable[0] === 'string') {
    const idx = num !== undefined ? num % activeTable.length : Math.floor(Math.random() * activeTable.length);
    const resStr = activeTable[idx] as string;
    const enStr =
      enTable && Array.isArray(enTable) && typeof enTable[idx] === 'string' ? (enTable[idx] as string) : resStr;
    return {
      result: resStr,
      canonical: enStr,
      rawResult: resStr,
      rawCanonical: enStr,
      linkTarget: '',
    };
  }

  const activeRows = activeTable as IRow[];
  const enRows = (enTable && Array.isArray(enTable) ? enTable : activeTable) as IRow[];

  const n = num !== undefined ? num : d(100);
  const activeRow = matchRowByRoll(activeRows, n);
  const enRow = matchRowByRoll(enRows, n) ?? activeRow;

  if (!activeRow) {
    return {
      result: translateKey('oracles.errors.noMatch'),
      canonical: 'No match',
      rawResult: '',
      rawCanonical: '',
      linkTarget: '',
    };
  }

  const rawResult = activeRow.Result;
  const rawCanonical = enRow ? enRow.Result : activeRow.Result;
  const linkTarget = extractLinkTarget(rawCanonical) || extractLinkTarget(rawResult);

  const out = mdToText(rawResult);
  const canonOut = mdToText(rawCanonical);

  if (/Action \+ Theme/i.test(canonOut) || linkTarget === 'Starforged/Oracles/Core/Action') {
    const a = rollDetailed('Starforged/Oracles/Core/Action');
    const th = rollDetailed('Starforged/Oracles/Core/Theme');
    return {
      result: `${a.result} ${th.result}`,
      canonical: `${a.canonical} ${th.canonical}`,
      rawResult,
      rawCanonical,
      linkTarget,
    };
  }

  if (/Descriptor \+ Focus/i.test(canonOut) || linkTarget === 'Starforged/Oracles/Core/Descriptor') {
    const desc = rollDetailed('Starforged/Oracles/Core/Descriptor');
    const foc = rollDetailed('Starforged/Oracles/Core/Focus');
    return {
      result: `${desc.result} ${foc.result}`,
      canonical: `${desc.canonical} ${foc.canonical}`,
      rawResult,
      rawCanonical,
      linkTarget,
    };
  }

  if (/roll twice/i.test(canonOut)) {
    const r1 = rollDetailed(id);
    const r2 = rollDetailed(id);
    return {
      result: `${r1.result}, ${r2.result}`,
      canonical: `${r1.canonical}, ${r2.canonical}`,
      rawResult,
      rawCanonical,
      linkTarget: r1.linkTarget || r2.linkTarget || linkTarget,
    };
  }

  if (/roll three/i.test(canonOut)) {
    const r1 = rollDetailed(id);
    const r2 = rollDetailed(id);
    const r3 = rollDetailed(id);
    return {
      result: `${r1.result}, ${r2.result}, ${r3.result}`,
      canonical: `${r1.canonical}, ${r2.canonical}, ${r3.canonical}`,
      rawResult,
      rawCanonical,
      linkTarget,
    };
  }

  return {
    result: out,
    canonical: canonOut,
    rawResult,
    rawCanonical,
    linkTarget,
  };
};

export const roll = (id: string, num?: number): string => {
  return rollDetailed(id, num).result;
};

export const rollEn = (id: string, num?: number): string => {
  return rollDetailed(id, num).canonical;
};

export const rollLinkTail = (id: string, num?: number): string => {
  const res = rollDetailed(id, num);
  if (res.linkTarget) {
    const tail = res.linkTarget.split('/').pop();
    if (tail) return tail;
  }
  return res.canonical.replace(/[^\p{L} ]/gu, '').trim();
};

export const name = (id: string): string => {
  const o = find(id);
  if (o && !Array.isArray(o) && 'Name' in o && o.Name) {
    return o.Name;
  }
  const en = findEn(id);
  if (en && !Array.isArray(en) && 'Name' in en && en.Name) {
    return en.Name;
  }
  return id.split('/').pop()?.replace(/_/g, ' ') || id;
};

export const rollCustom = (id: string): string => {
  const oracle = find(id) as ICustomOracle | false;
  if (!oracle) return translateKey('oracles.errors.notFound');

  const splitD = oracle.Dice?.split('d') as string[];

  let n = 0;
  if (!splitD || splitD.length < 2) {
    return translateKey('oracles.errors.badDice', { dice: oracle.Dice || '' });
  } else {
    for (let i = 0; i < +splitD[0]; i++) n += d(+splitD[1]);
  }

  return (
    oracle.Table?.find((row) => row.Floor != null && row.Ceiling != null && row.Floor <= n && row.Ceiling >= n)
      ?.Result ?? translateKey('oracles.errors.noMatch')
  );
};

export const values = (id: string): string[] => {
  const t = tableIn(getCurrentStarforged(), id);
  if (!t || t.length === 0) return [];
  if (typeof t[0] === 'string') return t as string[];

  return (t as IRow[]).map((i) => mdToText(i.Result).replace(/[^\p{L} ]/gu, ''));
};

export const valuesDetailed = (id: string): IOracleValueOption[] => {
  const activeTable = tableIn(getCurrentStarforged(), id);
  const enTable = tableIn(starforgedEN, id);
  if (!activeTable || activeTable.length === 0) return [];

  if (typeof activeTable[0] === 'string') {
    return (activeTable as string[]).map((val, idx) => ({
      label: val,
      canonical: enTable && typeof enTable[idx] === 'string' ? (enTable[idx] as string) : val,
      linkTarget: '',
    }));
  }

  const activeRows = activeTable as IRow[];
  const enRows = (enTable && Array.isArray(enTable) ? enTable : activeTable) as IRow[];
  return activeRows.map((row, idx) => {
    const enRow = enRows[idx] ?? row;
    return {
      label: mdToText(row.Result).replace(/[^\p{L} ]/gu, ''),
      canonical: mdToText(enRow.Result).replace(/[^\p{L} ]/gu, ''),
      linkTarget: extractLinkTarget(enRow.Result) || extractLinkTarget(row.Result),
    };
  });
};

export const rowIndexForValue = (id: string, value: string): number => {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return -1;

  const activeTable = tableIn(getCurrentStarforged(), id);
  const enTable = tableIn(starforgedEN, id);

  if (activeTable && Array.isArray(activeTable)) {
    const idx = (activeTable as IRow[]).findIndex((r) => mdToText(r.Result).trim().toLowerCase() === trimmed);
    if (idx !== -1) return idx;
  }

  if (enTable && Array.isArray(enTable)) {
    const idx = (enTable as IRow[]).findIndex((r) => mdToText(r.Result).trim().toLowerCase() === trimmed);
    if (idx !== -1) return idx;
  }

  return -1;
};

export const description = (id: string): string => {
  const errMsg = translateKey('oracles.errors.descriptionNotFound');

  const o = find(id);
  if (!o || Array.isArray(o)) return errMsg;
  const res = o as unknown as IOracleCategory;

  return res.Description ? res.Description : errMsg;
};

// Use -1 to indicate that this is not a subtable roll, otherwise
// index [0-2] for item subtable
export const truth = (id: string, subtable: number): ISettingTruthOption => {
  const t = find(id);
  if (!t) return <ISettingTruthOption>{};

  const truthObj = t as ISettingTruth;

  let res = <ISettingTruthOption>{ Result: translateKey('oracles.errors.noMatch') };
  const n = d(100);
  if (subtable === -1) {
    const tbl = truthObj.Table;
    res = tbl.find(
      (row) => row.Floor != null && row.Ceiling != null && n >= row.Floor && n <= row.Ceiling
    ) as ISettingTruthOption;
  } else if (subtable >= 0 && subtable < 3) {
    const tbl = truthObj.Table?.[subtable]?.Subtable;
    res = tbl?.find(
      (row) => row.Floor != null && row.Ceiling != null && n >= row.Floor && n <= row.Ceiling
    ) as ISettingTruthOption;
  }
  return res;
};

export const truthOpts = (id: string, subtable: number): ISettingTruthOption[] => {
  const t = find(id);
  if (!t) return <ISettingTruthOption[]>[];

  const truthObj = t as ISettingTruth;

  const res = <ISettingTruthOption[]>[];
  if (subtable === -1) {
    truthObj.Table?.forEach((item) => {
      res.push(item);
    });
  } else if (subtable < 3) {
    truthObj.Table?.[subtable]?.Subtable?.forEach((item) => {
      res.push(item as ISettingTruthOption);
    });
  }
  return res;
};

export const star = (): string => {
  const n = Math.floor(Math.random() * StarNames.length);
  return StarNames[n];
};
