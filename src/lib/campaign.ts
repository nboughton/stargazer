import { ICampaign, ICharacter, IJournalEntry, IFaction } from 'src/components/models';

import { v4 as uuid } from 'uuid';
import * as oracle from 'src/lib/oracles';
import { NewSector } from './sector';
import { NewLegacyTrack, NewProgressTrack } from './tracks';

export const NewCharacter = (): ICharacter => {
  return {
    name: `${oracle.roll(['Characters', 'Name', 'Given Name'])} ${oracle.roll(['Characters', 'Name', 'Family Name'])}`,
    pronouns: '',
    callsign: oracle.roll(['Characters', 'Name', 'Callsign']),
    characteristics: '',
    location: '',
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
    legacies: {
      quests: NewLegacyTrack(),
      bonds: NewLegacyTrack(),
      discoveries: NewLegacyTrack(),
    },
    clocks: [],
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
    gear: '',
    assets: [],
  };
};

export const NewJournal = (): IJournalEntry => {
  return {
    title: 'New journal entry',
    content: '',
    pinned: false,
  };
};

export const NewFaction = (): IFaction => {
  return {
    id: uuid(),
    name: '',
    type: '',
    influence: '',
    sphere: '',
    projects: '',
    relationships: '',
    quirks: '',
    rumors: '',
    notes: '',
    colour: 'red',
  };
};

export const NewCampaign = (): ICampaign => {
  const character = NewCharacter();

  return {
    id: uuid(),
    name: `New Campaign - ${character.name}`,
    character: character,
    truths: {},
    progressTracks: [NewProgressTrack()],
    journal: [NewJournal()],
    sectors: [NewSector()],
    factions: [NewFaction()],
  };
};
