import { d } from './roll';
import { StarNames } from 'src/data/starNames';
import {
  starforged,
  ISettingTruth,
  IRow,
  ISettingTruthOption,
  IOracleCategory,
  IOracleBase,
  IDisplayOracle,
  ISource,
} from 'dataforged';
import { mdToText } from './util';
import { ICustomOracle } from 'src/components/models';
import { uid } from 'quasar';
import { useOracles } from 'src/store/oracles';

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

// This is where the magic really happens
const find = (id: string): ICustomOracle | IOracleBase | ISettingTruth | string[] | false => {
  if (id.length === 0) return false;
  //console.log(id);

  const path = id.split('/');
  const source = path[0];
  const type = path[1]; // Truths | Oracles
  const category = path[2]; // Moves | Planets

  // Handle custom oracles
  if (source === 'Stargazer' && category === 'Custom') {
    return useOracles().data.find((o) => o.$id === id) as ICustomOracle;
  }

  // Handle a truth category
  const truth = type === 'Setting_Truths';
  if (truth) {
    const truthCategory = starforged['Setting Truths'].find((v) => v.$id === id);
    return truthCategory ? truthCategory : false;
  }

  const oracleCategory = starforged['Oracle Categories'].find((v) => v.Name === category.replace('_', ' '));
  if (!oracleCategory) return false;

  // We need a function to recursively traverse oracles
  let out: IOracleBase | ISettingTruth | string[] | false = false;
  let found = false;
  const findById = (o: IOracleBase) => {
    if (found) return; // Kill any further iterations

    if (o.$id === id) {
      out = o;
      found = true;
      return;
    }

    if (o.Categories) for (const ocl of o.Categories) findById(ocl);
    if (o.Oracles) for (const ocl of o.Oracles) findById(ocl);
  };

  // Edge Cases
  if (path[path.length - 1] === 'Sample Names') {
    // Sample names are a weird case
    path.pop();
    id = path.join('/');
    findById(oracleCategory);
    const res = out as unknown as IOracleCategory;
    return res['Sample Names'] ? res['Sample Names'] : false;
  }

  findById(oracleCategory);

  return out ? out : false;
};

const table = (id: string): IRow[] | ISettingTruthOption[] | string[] | false => {
  const o = find(id);
  if (!o) return false;

  // Return the string array
  if (Array.isArray(o)) return o;

  // Otherwise return the table or false
  return o.Table ? o.Table : false;
};

export const roll = (id: string, num?: number): string => {
  let t = table(id);
  if (!t || t.length === 0) return 'Could not find oracle';

  if (typeof t[0] === 'string') {
    return t[Math.floor(Math.random() * t.length)] as string;
  }

  let out = 'No match';
  t = t as IRow[];

  let n = d(100);
  if (num != undefined) n = num;

  out = mdToText(
    t.find((row) => row.Floor != null && row.Ceiling != null && row.Floor <= n && row.Ceiling >= n)?.Result as string
  );

  if (/Action \+ Theme/i.test(out))
    out = `${roll('Starforged/Oracles/Core/Action')} ${roll('Starforged/Oracles/Core/Theme')}`;
  if (/Descriptor \+ Focus/i.test(out))
    out = `${roll('Starforged/Oracles/Core/Descriptor')} ${roll('Starforged/Oracles/Core/Focus')}`;

  if (/roll twice/i.test(out)) {
    while (/roll twice/i.test(out)) {
      out = `${roll(id)}, ${roll(id)}`;
    }
  }
  if (/roll three/i.test(out)) {
    while (/roll three/i.test(out)) {
      out = `${roll(id)}, ${roll(id)}, ${roll(id)}`;
    }
  }

  return out;
};

export const rollCustom = (id: string): string => {
  const oracle = find(id) as ICustomOracle;
  const splitD = oracle.Dice?.split('d') as string[];

  let n = 0;
  if (splitD.length < 2) {
    return `Bad dice string: ${oracle.Dice as string}`;
  } else {
    for (let i = 0; i < +splitD[0]; i++) n += d(+splitD[1]);
  }

  return oracle.Table?.find((row) => row.Floor != null && row.Ceiling != null && row.Floor <= n && row.Ceiling >= n)
    ?.Result as string;
};

export const values = (id: string): string[] => {
  let t = table(id);
  if (!t || t.length === 0) return [];
  if (typeof t[0] === 'string') return t as string[];

  t = t as IRow[];
  return t.map((i) => mdToText(i.Result).replace(/[^a-z ]/gi, ''));
};

export const description = (id: string): string => {
  const errMsg = 'Description not found';

  const o = find(id);
  if (!o || Array.isArray(o)) return errMsg;
  const res = o as unknown as IOracleCategory;

  return res.Description ? res.Description : errMsg;
};

// Use -1 to indicate that this is not a subtable roll, otherwise
// index [0-2] for item subtable
export const truth = (id: string, subtable: number): ISettingTruthOption => {
  let t = find(id);
  if (!t) return <ISettingTruthOption>{};

  t = t as ISettingTruth;

  let res = <ISettingTruthOption>{ Result: 'No match' };
  const n = d(100);
  if (subtable === -1) {
    const table = t.Table as ISettingTruthOption[];
    res = table.find(
      (row) => row.Floor != null && row.Ceiling != null && n >= row.Floor && n <= row.Ceiling
    ) as ISettingTruthOption;
  } else if (subtable >= 0 && subtable < 3) {
    const table = t.Table?.[subtable].Subtable;
    res = table?.find(
      (row) => row.Floor != null && row.Ceiling != null && n >= row.Floor && n <= row.Ceiling
    ) as ISettingTruthOption;
  }
  return res;
};

export const truthOpts = (id: string, subtable: number): ISettingTruthOption[] => {
  let t = find(id);
  if (!t) return <ISettingTruthOption[]>[];

  t = t as ISettingTruth;

  const res = <ISettingTruthOption[]>[];
  if (subtable === -1) {
    t.Table?.forEach((item) => {
      res.push(item as ISettingTruthOption);
    });
  } else if (subtable < 3) {
    t.Table?.[subtable].Subtable?.forEach((item) => {
      res.push(item as ISettingTruthOption);
    });
  }
  return res;
};

export const star = (): string => {
  const n = Math.floor(Math.random() * StarNames.length);
  return StarNames[n];
};
