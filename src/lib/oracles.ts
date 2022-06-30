/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { d } from './roll';
//import { IOracleTableItem, ITruthResult } from 'src/components/models';
//import { Oracles } from 'src/data/oracles';
//import { Truths } from 'src/data/truths';
import { StarNames } from 'src/data/starNames';
import { starforged, ISettingTruth, IRow, ISettingTruthOption, IOracleCategory, IOracleBase } from 'dataforged';
import { mdToText } from './util';

// This is where the magic really happens
const find = (id: string): IOracleBase | ISettingTruth | string[] | false => {
  if (id.length === 0) return false;
  //console.log(id);

  const path = id.split('/');
  const type = path[1]; // Truths | Oracles
  const category = path[2]; // Moves | Planets

  // Handle a truth category
  const truth = type === 'Truths';
  if (truth) {
    const truthCategory = starforged['Setting Truths'].find((v) => v.$id === id);
    if (!truthCategory) return false;
    return truthCategory;
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

    if (o.Categories) {
      for (const ocl of o.Categories) {
        if (found) return;
        findById(ocl);
      }
    }

    if (o.Oracles) {
      for (const ocl of o.Oracles) {
        if (found) return;
        findById(ocl);
      }
    }
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

  const res = <ISettingTruthOption>{ Result: 'No match' };
  const n = d(100);
  if (subtable === -1) {
    const table = t.Table as ISettingTruthOption[];
    table.forEach((item) => {
      if (item.Floor != null && item.Ceiling != null && n >= item.Floor && n <= item.Ceiling) {
        res.Result = item.Result;
        res.Subtable = item.Subtable;
        if (item.Summary) res.Summary = item.Summary;
        return;
      }
    });
  } else if (subtable >= 0 && subtable < 3) {
    const table = t.Table![subtable].Subtable;
    table?.forEach((item) => {
      if (item.Floor != null && item.Ceiling != null && n >= item.Floor && n <= item.Ceiling) {
        res.Result = item.Result;
        return;
      }
    });
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
    t.Table![subtable].Subtable?.forEach((item) => {
      res.push(item as ISettingTruthOption);
    });
  }
  return res;
};

export const star = (): string => {
  const n = Math.floor(Math.random() * StarNames.length);
  return StarNames[n];
};
