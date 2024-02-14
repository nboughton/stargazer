import { IDiff, ILegacyBox, ILegacyTrack, IProgressTrack, IClock, EAtO } from 'src/components/models';
import { uid } from 'quasar';
import { clockRoll } from './roll';

export const boxIcon = (value: number): string => {
  switch (value) {
    case 0:
      return 'mdi-checkbox-blank-outline';
    case 1:
      return 'mdi-circle-small';
    case 2:
      return 'mdi-star-four-points';
    case 3:
      return 'mdi-hexagram';
    case 4:
      return 'mdi-flare';
    default:
      break;
  }

  return 'mdi-checkbox-blank-outline';
};

export const Difficulty: { [index: number]: IDiff } = {
  1: <IDiff>{ label: 'Troublesome', mark: 3, harm: 1 },
  2: <IDiff>{ label: 'Dangerous', mark: 2, harm: 2 },
  3: <IDiff>{ label: 'Formidable', mark: 1, harm: 3 },
  4: <IDiff>{ label: 'Extreme', mark: 0.5, harm: 4 },
  5: <IDiff>{ label: 'Epic', mark: 0.25, harm: 5 },
};

export const NewProgressTrack = (name?: string): IProgressTrack => ({
  name: name ? name : '',
  difficulty: 1,
  boxes: Array(10).fill(0) as number[],
  clocks: [],
  resolved: false,
  resolve: '',
});

export const NewLegacyTrack = (): ILegacyTrack => {
  const track = {
    plus10: false,
    boxes: [] as ILegacyBox[],
  };

  for (let i = 0; i < 10; i++) {
    track.boxes.push({
      ticks: 0,
      xp: [false, false],
    });
  }

  return track;
};

export const NewClock = (): IClock => ({
  id: uid(),
  name: '',
  segments: 4,
  filled: 0,
  advance: EAtO.Likely,
  roll: 0,
});

export const RollClock = (clock: IClock): IClock => {
  const { val, yn, match } = clockRoll(clock.advance);
  clock.roll = val;
  if (yn && clock.filled < clock.segments) clock.filled++;
  if (yn && match && clock.filled < clock.segments) clock.filled++;
  return clock;
};
