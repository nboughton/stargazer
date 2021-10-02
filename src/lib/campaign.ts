import {
  EPClass,
  ERegion,
  ESLocation,
  ESettPop,
  ICampaign,
  INPC,
  ICharacter,
  IDiff,
  IJournalEntry,
  ILegacyBox,
  ILegacyTrack,
  IPlanet,
  IProgressTrack,
  ISector,
  ISectorCell,
  ISettlement,
  IStar,
  IStarship,
  ICreature,
  EEnv,
  IDerelict,
  EDerelictType,
  EDerelictZone,
  IVault,
  ECellStatus,
  ESectorOpts,
  ISighting,
  IClock,
  IFaction,
  EAtO,
} from 'src/components/models';

import { v4 as uuid } from 'uuid';
import { Character } from './oracles/character';
import { Space } from './oracles/space';
import { clockRoll, tableRoll } from './roll';

export const Difficulty: { [index: number]: IDiff } = {
  1: <IDiff>{ label: 'Troublesome', mark: 3, harm: 1 },
  2: <IDiff>{ label: 'Dangerous', mark: 2, harm: 2 },
  3: <IDiff>{ label: 'Formidable', mark: 1, harm: 3 },
  4: <IDiff>{ label: 'Extreme', mark: 0.5, harm: 4 },
  5: <IDiff>{ label: 'Epic', mark: 0.25, harm: 5 },
};

export const NewProgressTrack = (name?: string): IProgressTrack => {
  return {
    name: name ? name : '',
    difficulty: 1,
    boxes: Array(10).fill(0) as number[],
    clocks: []
  };
}

export const NewLegacyTrack = (): ILegacyTrack => {
  const track: ILegacyTrack = {
    plus10: false,
    boxes: Array(10).fill({
      ticks: 0,
      xp: [false, false],
    }) as ILegacyBox[],
  };

  return track;
}

export const NewClock = (): IClock => {
  return {
    id: uuid(),
    name: '',
    segments: 4,
    filled: 0,
    advance: EAtO.Likely,
    roll: 0
  }
}

export const RollClock = (clock: IClock): IClock => {
  const { val, yn, match } = clockRoll(clock.advance);
  clock.roll = val
  if (yn && clock.filled < clock.segments) clock.filled++;
  if (yn && match && clock.filled < clock.segments) clock.filled++;
  return clock
}

export const NewCharacter = (): ICharacter => {
  return {
    name: `${tableRoll(Character.givenName)} ${tableRoll(Character.familyName)}`,
    pronouns: '',
    callsign: '',
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
}

export const NewJournal = (): IJournalEntry => {
  return {
    title: 'New journal entry',
    content: '',
  };
}

export const NewNPC = (): INPC => {
  return {
    name: '',
    callsign: '',
    firstLook: '',
    disposition: '',
    role: '',
    goal: '',
    aspect: '',
    track: NewProgressTrack(),
    bond: false,
    notes: '',
  };
}

export const NewDerelict = (loc?: ESLocation, type?: EDerelictType): IDerelict => {
  return {
    name: '',
    location: loc ? loc : ESLocation.Space,
    type: type ? type : EDerelictType.Starship,
    condition: '',
    outerFirstLook: '',
    innerFirstLook: '',
    currentZone: EDerelictZone.Access,
    explore: {
      area: '',
      feature: '',
      peril: '',
      opportunity: '',
    },
    notes: '',
  };
}

export const NewCreature = (env?: EEnv): ICreature => {
  return {
    name: 'New Creature',
    environment: env ? env : EEnv.Land,
    scale: '',
    form: '',
    firstLook: '',
    behaviour: '',
    aspect: '',
    notes: '',
  };
}

export const NewVault = (loc?: ESLocation): IVault => {
  return {
    name: 'Mysterious Vault',
    location: loc ? loc : ESLocation.Orbital,
    scale: '',
    form: '',
    shape: '',
    material: '',
    outerFirstLook: '',
    innerFirstLook: '',
    purpose: '',
    interior: {
      feature: '',
      peril: '',
      opportunity: '',
    },
    sanctum: {
      feature: '',
      peril: '',
      opportunity: '',
    },
    notes: '',
  };
}

export const NewCell = (id: string, name?: string): ISectorCell => {
  return {
    id: id,
    stat: ECellStatus.Empty,
    name: name ? name : id,
    notes: '',
    stars: [],
    planets: [],
    settlements: [],
    derelicts: [],
    ships: [],
    npcs: [],
    creatures: [],
    vaults: [],
    sightings: [],
  };
}

export const CellLabel = (c: ISectorCell) => {
  let label = c.name;
  let type = '';
  const v: { [index: string]: number } = {
    [ESettPop.Few]: 1,
    [ESettPop.Dozens]: 2,
    [ESettPop.Hundreds]: 3,
    [ESettPop.Thousands]: 4,
    [ESettPop.TensOfThou]: 5,
  };

  if (c.sightings.length > 0) {
    label = c.sightings[0].name;
    type = ESectorOpts.Sightings;
  }
  if (c.npcs.length > 0) {
    label = c.npcs[0].name;
    type = ESectorOpts.NPCs;
  }
  if (c.creatures.length > 0) {
    label = c.creatures[0].name;
    type = ESectorOpts.Creatures;
  }
  if (c.vaults.length > 0) {
    label = c.vaults[0].name;
    type = ESectorOpts.Vaults;
  }
  if (c.derelicts.length > 0) {
    label = c.derelicts[0].name;
    type = ESectorOpts.Derelicts;
  }
  if (c.ships.length > 0) {
    label = c.ships[0].name;
    type = ESectorOpts.Ships;
  }
  if (c.planets.length > 0) {
    label = c.planets[0].name;
    type = ESectorOpts.Planets;
  }
  if (c.stars.length > 0) {
    label = c.stars[0].name;
    type = ESectorOpts.Stars;
  }
  if (c.settlements.length > 0) {
    let largest = 0;
    c.settlements.forEach((s) => {
      if (v[s.population] && v[s.population] > largest) {
        largest = v[s.population];
        label = s.name;
      }
    });
    type = ESectorOpts.Settlements;
  }
  return { label, type };
}

export const NewSector = (): ISector => {
  return {
    name: `${tableRoll(Space.sectorPrefix)} ${tableRoll(Space.sectorSuffix)}`,
    region: ERegion.Terminus,
    control: '',
    cells: {},
  };
}

export const NewStar = (): IStar => {
  return {
    name: 'New Star',
    description: tableRoll(Space.stellarObject),
  };
}

export const NewSighting = (): ISighting => {
  return {
    name: 'Sighting',
    notes: '',
  };
}

export const NewPlanet = (type?: EPClass): IPlanet => {
  return {
    type: type ? type : EPClass.Desert,
    name: '',
    description: '',
    atmosphere: '',
    settlements: '',
    observed: '',
    feature: '',
    life: '',
    notes: '',
  };
}

export const NewSettlement = (loc?: ESLocation): ISettlement => {
  return {
    name: '',
    location: loc ? loc : ESLocation.Orbital,
    population: '',
    firstLook: '',
    initialContact: '',
    authority: '',
    projects: '',
    trouble: '',
    notes: '',
  };
}

export const NewShip = (): IStarship => {
  return {
    name: '',
    class: '',
    fleet: '',
    initialContact: '',
    firstLook: '',
    mission: '',
    notes: '',
  };
}

export const NewFaction = (): IFaction => {
  return {
    name: '',
    colour: 'red'
  }
}

export const NewCampaign = (): ICampaign => {
  return {
    id: uuid(),
    name: 'New Campaign',
    character: NewCharacter(),
    truths: {},
    progressTracks: [NewProgressTrack()],
    journal: [NewJournal()],
    sectors: [NewSector()],
    factions: [NewFaction()]
  };
}
