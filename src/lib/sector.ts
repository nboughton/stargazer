import {
  EPClass,
  ERegion,
  ESLocation,
  ESettPop,
  INPC,
  IPlanet,
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
} from 'src/components/models';

import * as oracle from 'src/lib/oracles';
import { NewProgressTrack } from './tracks';

export const NewNPC = (): INPC => {
  return {
    name: '',
    pronouns: '',
    callsign: '',
    firstLook: '',
    disposition: '',
    role: '',
    goal: '',
    aspect: '',
    track: NewProgressTrack(),
    connection: true,
    bond: false,
    notes: '',
  };
};

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
};

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
};

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
};

export const NewCell = (id: string, name?: string): ISectorCell => {
  return {
    id: id,
    stat: ECellStatus.Empty,
    name: name ? name : id,
    factions: [],
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
};

export const CellLabel = (c: ISectorCell, id: string) => {
  let label = c.name ? c.name : '';
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
  if (c.name !== id) label = c.name;
  return { label, type };
};

export const NewSector = (): ISector => {
  return {
    name: `${oracle.roll('Starforged/Oracles/Sector_Name/Prefix')} ${oracle.roll(
      'Starforged/Oracles/Sector_Name/Suffix'
    )}`,
    region: ERegion.Terminus,
    control: '',
    cells: {},
  };
};

export const NewStar = (): IStar => {
  return {
    name: oracle.star(),
    description: oracle.roll('Starforged/Oracles/Stellar_Object'),
  };
};

export const NewSighting = (): ISighting => {
  return {
    name: 'Sighting',
    notes: '',
  };
};

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
};

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
};

export const NewShip = (): IStarship => {
  return {
    name: '',
    class: '',
    fleet: '',
    factionId: '',
    initialContact: '',
    firstLook: '',
    mission: '',
    notes: '',
  };
};
