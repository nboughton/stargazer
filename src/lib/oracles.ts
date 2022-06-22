/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { d } from './roll';
import { IOracleTableItem, IOracle, ITruthResult } from 'src/components/models';
import { Oracles } from 'src/data/oracles';
import { Truths } from 'src/data/truths';
import { StarNames } from 'src/data/starNames';

const find = (path: string[], truth?: boolean): IOracle | false => {
  if (path.length < 2) return false;

  // This is necessary so that outer functions don't get stuck with a
  // modified path variable, yay javascript passing by reference :/
  const pathCopy = JSON.parse(JSON.stringify(path)) as string[];

  const section = pathCopy.shift() as string;
  const parent = pathCopy.pop() as string;

  if (!truth) {
    if (!Oracles[section]) return false;
  } else {
    if (!Truths[section]) return false;
  }

  let ocl: IOracle = <IOracle>{};
  truth ? (ocl = Truths[section]) : (ocl = Oracles[section]);

  let o = ocl.oracles!;
  for (const p of pathCopy) {
    if (o[p].oracles) {
      o = o[p].oracles!;
    } else {
      return false;
    }
  }

  return o[parent];
};

const table = (path: string[]): IOracleTableItem[] | string[] | false => {
  const o = find(path);
  if (!o) return false;

  return o.names ? o.names : o.table ? o.table : false;
};

export const roll = (path: string[], num?: number): string => {
  let t = table(path);
  if (!t || t.length === 0) return 'Could not find oracle';

  if (typeof t[0] === 'string') {
    t = t as string[];
    return t[Math.floor(Math.random() * t.length)];
  }

  let out = 'No match';
  t = t as IOracleTableItem[];

  let n = d(100);
  if (num != undefined) n = num;

  t.forEach((item) => {
    if (item.floor != null && item.ceil != null && item.floor <= n && item.ceil >= n) {
      out = item.result;
      return;
    }
  });

  if (/Action \+ Theme/i.test(out)) out = `${roll(['Core', 'Action'])} ${roll(['Core', 'Theme'])}`;
  if (/Descriptor \+ Focus/i.test(out)) out = `${roll(['Core', 'Descriptor'])} ${roll(['Core', 'Focus'])}`;

  if (/roll twice/i.test(out)) {
    while (/roll twice/i.test(out)) {
      out = `${roll(path)}, ${roll(path)}`;
    }
  }
  if (/roll three/i.test(out)) {
    while (/roll three/i.test(out)) {
      out = `${roll(path)}, ${roll(path)}, ${roll(path)}`;
    }
  }

  return out;
};

export const values = (path: string[]): string[] => {
  let t = table(path);
  if (!t || t.length === 0) return [];

  if (typeof t[0] === 'string') return t as string[];

  t = t as IOracleTableItem[];
  return t.map((i) => i.result);
};

export const description = (path: string[]): string => {
  const errMsg = 'Description not found';

  const o = find(path);
  if (!o) return errMsg;

  return o.description ? o.description : errMsg;
};

// Use -1 to indicate that this is not a subtable roll, otherwise
// index [0-2] for item subtable
export const truth = (path: string[], subtable: number): ITruthResult => {
  const t = find(path, true);
  if (!t) return { result: '', index: -1 };

  const res = <ITruthResult>{ result: 'No match' };
  const n = d(100);
  if (subtable === -1) {
    const table = t.table as IOracleTableItem[];
    table.forEach((item, i) => {
      if (item.floor != null && item.ceil != null && n >= item.floor && n <= item.ceil) {
        res.result = item.result;
        res.index = i;
        if (item.summary) res.summary = item.summary;
        return;
      }
    });
  } else if (subtable >= 0 && subtable < 3) {
    const table = t.table![subtable].subtable;
    table?.forEach((item) => {
      if (item.floor != null && item.ceil != null && n >= item.floor && n <= item.ceil) {
        res.result = item.result;
        return;
      }
    });
  }
  return res;
};

export const truthOpts = (path: string[], subtable: number): ITruthResult[] => {
  const t = find(path, true);
  if (!t) return <ITruthResult[]>[];

  const res = <ITruthResult[]>[];
  if (subtable === -1) {
    t.table?.forEach((item, i) => {
      res.push({
        result: item.result,
        summary: item.summary,
        index: i,
      });
    });
  } else if (subtable < 3) {
    t.table![subtable].subtable?.forEach((item, i) => {
      res.push({
        result: item.result,
        summary: item.summary,
        index: i,
      });
    });
  }
  return res;
};

export const star = (): string => {
  const n = Math.floor(Math.random() * StarNames.length);
  return StarNames[n];
};
