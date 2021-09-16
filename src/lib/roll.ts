import { IRollData, ISFTable, ECoreCombo } from 'src/components/models';
import { Core } from './oracles/core';

export const d = (size: number) => {
  return Math.floor(Math.random() * size) + 1;
};

export const NewRollData = (): IRollData => {
  return {
    action: {
      die: 0,
      score: 0,
      color: 'text-negative',
    },
    challenge: {
      die1: {
        roll: 0,
        color: 'text-negative',
      },
      die2: {
        roll: 0,
        color: 'text-negative',
      },
      match: false,
    },
    progress: false,
    result: '',
  };
};

export const updateResults = (r: IRollData): IRollData => {
  if (r.action.score > r.challenge.die1.roll && r.action.score > r.challenge.die2.roll) {
    r.result = 'Strong Hit';
    r.action.color = 'text-positive';
    r.challenge.die1.color = 'text-positive';
    r.challenge.die2.color = 'text-positive';
  } else if (
    (r.action.score <= r.challenge.die1.roll && r.action.score > r.challenge.die2.roll) ||
    (r.action.score <= r.challenge.die2.roll && r.action.score > r.challenge.die1.roll)
  ) {
    r.result = 'Weak Hit';
    r.action.color = 'text-warning';
    r.action.score <= r.challenge.die1.roll
      ? (r.challenge.die1.color = 'text-negative')
      : (r.challenge.die1.color = 'text-positive');

    r.action.score <= r.challenge.die2.roll
      ? (r.challenge.die2.color = 'text-negative')
      : (r.challenge.die2.color = 'text-positive');
  } else {
    r.result = 'Miss';
    r.action.color = 'text-negative';
    r.challenge.die1.color = 'text-negative';
    r.challenge.die2.color = 'text-negative';
  }

  return r;
};

export const moveRoll = (attr: number, adds: number, momentum: number, progress?: number): IRollData => {
  let r = NewRollData();
  r.action.die = d(6);
  r.challenge.die1.roll = d(10);
  r.challenge.die2.roll = d(10);

  r.action.score = +r.action.die + +adds + +attr;
  // Account for negative momentum
  if (momentum < 0 && Math.abs(momentum) === Math.abs(r.action.die)) {
    r.action.score -= r.action.die;
  }

  // Replace action score for a progress move
  if (progress) {
    r.action.score = progress;
  }
  r.challenge.match = false;

  r = updateResults(r);

  if (r.challenge.die1.roll === r.challenge.die2.roll) {
    r.challenge.match = true;
  }

  return r;
};

export const tableRoll = (oracle: ISFTable): string => {
  const n = d(100);
  let out = 'No match';
  oracle.items.forEach((item) => {
    if (item.match.length === 1 && item.match[0] === n) {
      out = item.data;
      return;
    }

    if (n >= item.match[0] && n <= item.match[1]) {
      out = item.data;
      return;
    }
  });

  if (out === ECoreCombo.ActTheme) out = `${tableRoll(Core.action)} ${tableRoll(Core.theme)}`;
  if (out === ECoreCombo.DescFoc) out = `${tableRoll(Core.descriptor)} ${tableRoll(Core.focus)}`;
  if (/roll twice/i.test(out)) {
    while (/roll twice/i.test(out)) {
      out = `${tableRoll(oracle)}, ${tableRoll(oracle)}`;
    }
  }
  return out;
};
