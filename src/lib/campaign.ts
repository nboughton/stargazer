import {
  ICampaign,
  ICharacter,
  IDenizens,
  IDiff,
  IJournalEntry,
  ILocation,
  IMenace,
  INPC,
  IProgressTrack,
  ISite,
} from 'src/components/models';
import { v4 as uuid } from 'uuid';

export const Difficulty: { [index: number]: IDiff } = {
  1: <IDiff>{ label: 'Troublesome', mark: 3, harm: 1 },
  2: <IDiff>{ label: 'Dangerous', mark: 2, harm: 2 },
  3: <IDiff>{ label: 'Formidable', mark: 1, harm: 3 },
  4: <IDiff>{ label: 'Extreme', mark: 0.5, harm: 4 },
  5: <IDiff>{ label: 'Epic', mark: 0.25, harm: 5 },
};

export function NewMenace(): IMenace {
  return {
    name: '',
    boxes: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
  };
}

export function NewProgressTrack(): IProgressTrack {
  return {
    name: '',
    difficulty: 1,
    boxes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    showMenace: false,
  };
}

export function NewCharacter(): ICharacter {
  return {
    name: 'New Character',
    pronouns: '',
    callsign: '',
    characteristics: '',
    stats: {
      edge: 0,
      heart: 0,
      iron: 0,
      shadow: 0,
      wits: 0,
    },
    tracks: {
      health: { value: 5, max: 5, min: 0 },
      spirit: { value: 5, max: 5, min: 0 },
      supply: { value: 5, max: 5, min: 0 },
      momentum: { value: 2, max: 10, min: -6, reset: 2 },
    },
    impacts: {
      Misfortunes: [
        {
          name: 'Wounded',
          marked: false,
        },
        {
          name: 'Shaken',
          marked: false,
        },
        {
          name: 'Unprepared',
          marked: false,
        },
      ],
      'Lasting Effects': [
        {
          name: 'Permanently Harmed',
          marked: false,
        },
        {
          name: 'Traumatized',
          marked: false,
        },
      ],
      Burdens: [
        {
          name: 'Doomed',
          marked: false,
        },
        {
          name: 'Tormented',
          marked: false,
        },
        {
          name: 'Indebted',
          marked: false,
        },
      ],
      'Current Vehicle': [
        {
          name: 'Battered',
          marked: false,
        },
        {
          name: 'Cursed',
          marked: false,
        },
      ],
    },
    vows: [NewProgressTrack()],
    bonds: NewProgressTrack(),
    gear: '',
    assets: [],
  };
}

export function NewJournal(): IJournalEntry {
  return {
    title: 'New journal entry',
    content: '',
  };
}

export function NewNPC(): INPC {
  return {
    name: 'New NPC',
    description: '',
  };
}

export function NewLocation(): ILocation {
  return {
    name: 'New Location',
    description: '',
    trouble: '',
    region: '',
  };
}

export function NewSite(): ISite {
  return {
    name: 'New Site',
    objective: '',
    theme: '',
    domain: '',
    track: NewProgressTrack(),
    notes: '',
    denizens: <IDenizens>{},
  };
}

export function NewCampaign(): ICampaign {
  return {
    id: uuid(),
    name: 'New Campaign',
    character: NewCharacter(),
    truths: {
      theOldWorld: '',
      iron: '',
      legacies: '',
      communities: '',
      leaders: '',
      defense: '',
      mysticism: '',
      religion: '',
      firstBorn: '',
      beasts: '',
      horrors: '',
    },
    progressTracks: [NewProgressTrack()],
    journal: [NewJournal()],
    npcs: [NewNPC()],
    locations: [NewLocation()],
    sites: [],
  };
}
