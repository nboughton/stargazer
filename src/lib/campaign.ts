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
  IMenace,
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
} from 'src/components/models';

import { v4 as uuid } from 'uuid';
import { Space } from './oracles/space';
import { tableRoll } from './roll';

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
    boxes: Array(10).fill(false) as boolean[],
  };
}

export function NewProgressTrack(): IProgressTrack {
  return {
    name: '',
    difficulty: 1,
    boxes: Array(10).fill(0) as number[],
    showMenace: false,
  };
}

export function NewLegacyTrack(): ILegacyTrack {
  const track: ILegacyTrack = {
    plus10: false,
    boxes: Array(10).fill({
      ticks: 0,
      xp: [false, false],
    }) as ILegacyBox[],
  };

  return track;
}

export function NewCharacter(): ICharacter {
  return {
    name: 'New Character',
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

export function NewDerelict(loc?: ESLocation, type?: EDerelictType): IDerelict {
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

export function NewCreature(env?: EEnv): ICreature {
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

export function NewVault(loc?: ESLocation): IVault {
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

export function NewCell(id: string, name?: string): ISectorCell {
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
  };
}

export function CellLabel(c: ISectorCell): string {
  let label = c.name;
  const v: { [index: string]: number } = {
    [ESettPop.Few]: 1,
    [ESettPop.Dozens]: 2,
    [ESettPop.Hundreds]: 3,
    [ESettPop.Thousands]: 4,
    [ESettPop.TensOfThou]: 5,
  };

  if (c.npcs.length > 0) label = c.npcs[0].name;
  if (c.creatures.length > 0) label = c.creatures[0].name;
  if (c.vaults.length > 0) label = c.vaults[0].name;
  if (c.derelicts.length > 0) label = c.derelicts[0].name;
  if (c.ships.length > 0) label = c.ships[0].name;
  if (c.planets.length > 0) label = c.planets[0].name;
  if (c.stars.length > 0) label = c.stars[0].name;
  if (c.settlements.length > 0) {
    let largest = 0;
    c.settlements.forEach((s) => {
      if (v[s.population] && v[s.population] > largest) {
        largest = v[s.population];
        label = s.name;
      }
    });
  }
  return label;
}

export function NewSector(): ISector {
  return {
    name: `${tableRoll(Space.sectorPrefix)} ${tableRoll(Space.sectorSuffix)}`,
    region: ERegion.Terminus,
    control: '',
    cells: {},
  };
}

export function NewStar(): IStar {
  return {
    name: 'New Star',
    description: '',
  };
}

export function NewPlanet(type?: EPClass): IPlanet {
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

export function NewSettlement(loc?: ESLocation): ISettlement {
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

export function NewShip(): IStarship {
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
    sectors: [NewSector()],
  };
}
