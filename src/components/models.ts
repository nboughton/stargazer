// Enum ID sets
export enum ERegion {
  Terminus = 'Terminus',
  Outlands = 'Outlands',
  Expanse = 'Expanse',
}

export enum ESLocation {
  Planetside = 'Planetside',
  Orbital = 'Orbital',
  Space = 'Deep Space',
}

export enum EPClass {
  Desert = 'Desert',
  Furnace = 'Furnace',
  Grave = 'Grave',
  Ice = 'Ice',
  Jovian = 'Jovian',
  Jungle = 'Jungle',
  Ocean = 'Ocean',
  Rocky = 'Rocky',
  Shattered = 'Shattered',
  Tainted = 'Tainted',
  Vital = 'Vital',
}

export enum ESighting {
  StellarObject = 'Stellar Object',
  Planet = 'Planet',
  Settlement = 'Settlement',
  Starship = 'Starship',
  Derelict = 'Derelict',
  Vault = 'Precursor Vault',
  Creature = 'Creature',
  DescFoc = 'Descriptor + Focus',
  DFMineral = 'Debris field: Mineral asteroids',
  DFFrozen = 'Debris field: Frozen asteroids',
  DFCrystal = 'Debris field: Crystalline asteroids',
  DFBoneyard = 'Debris field: Creature boneyard',
  DFMetal = 'Debris field: Metallic wreckage',
  Asteroid = 'Large rogue asteroid',
  Comet = 'Comet with a tail of ionized gas',
  EStorm = 'Fiery energy storm',
  MStorm = 'Chaotic meteoroid storm',
  Wave = 'Turbulent gravitational wave',
  Cloud = 'Dense nebula cloud',
  R2 = 'Roll twice',
  R3 = 'Roll three times',
}

export enum EDerelictZone {
  Access = 'Access',
  Community = 'Community',
  Engineering = 'Engineering',
  Living = 'Living',
  Medical = 'Medical',
  Operations = 'Operations',
  Production = 'Production',
  Research = 'Research',
}

export enum EDerelictType {
  Starship = 'Starship',
  Settlement = 'Settlement',
}

export enum EEnv {
  Space = 'Space',
  Interior = 'Interior',
  Land = 'Land',
  Liquid = 'Liquid',
  Air = 'Air',
}

export enum EVault {
  Planet = 'Precursor Vault (planetside)',
  Orbital = 'Precursor Vault (orbital)',
}

export enum ELocTheme {
  Chaotic = 'Chaotic',
  Fortified = 'Fortified',
  Haunted = 'Haunted',
  Infested = 'Infested',
  Inhabited = 'Inhabited',
  Ruined = 'Ruined',
  Sacred = 'Sacred',
}

export enum ECoreCombo {
  ActTheme = 'Action + Theme',
  DescFoc = 'Descriptor + Focus',
}
/* eslint-disable no-unused-vars */
export interface ISelectOpt {
  label: string | number;
  value: string | number;
}

// Config
export interface IIndexItem {
  name: string;
  id: string;
}

export interface IConfig {
  id: number;
  current: string;
  index: IIndexItem[];
  edit: boolean;
}

// Stats and Tracks
export interface IStats {
  edge: number;
  heart: number;
  iron: number;
  shadow: number;
  wits: number;
}

export interface IMomentum {
  value: number;
  max: number;
  min: number;
  reset: number;
}

export interface ITrack {
  value: number;
  max: number;
  min: number;
}

export interface ITracks {
  health: ITrack;
  spirit: ITrack;
  supply: ITrack;
  momentum: IMomentum;
}

// Conditions and debilities
export interface IImpact {
  name: string;
  marked: boolean;
}

export interface IImpacts {
  [index: string]: IImpact[];
}

// Progress Tracks
export interface IDiff {
  label: string;
  mark: number;
  harm: number;
}

export interface IMenace {
  name: string;
  boxes: boolean[];
}

export interface IProgressTrack {
  name: string;
  difficulty: number;
  boxes: number[];
  showMenace: boolean;
  menace?: IMenace;
}

export interface ILegacyBox {
  ticks: number;
  xp: boolean[];
}

export interface ILegacyTrack {
  plus10: boolean;
  boxes: ILegacyBox[];
}

// Assets
export interface IAssetInput {
  label: string;
  text: string;
}

export interface IAssetItem {
  text: string;
  marked: boolean;
  input?: IAssetInput;
}

export interface IAsset {
  id?: string;
  title: string;
  subtitle?: string;
  input?: IAssetInput;
  type: string;
  items: IAssetItem[];
  track?: ITrack;
}

export interface ICharacter {
  name: string;
  pronouns: string;
  callsign: string;
  characteristics: string;
  stats: IStats;
  tracks: ITracks;
  impacts: IImpacts;
  legacies: {
    quests: ILegacyTrack;
    bonds: ILegacyTrack;
    discoveries: ILegacyTrack;
  };
  vows: IProgressTrack[];
  bonds: IProgressTrack;
  gear: string;
  assets: IAsset[];
}

export interface IJournalEntry {
  title: string;
  content: string;
}

export interface ILocation {
  name: string;
  region: string;
  description: string;
  trouble: string;
}

export interface INPC {
  name: string;
  description: string;
}

// Truths
export interface ITruths {
  [index: string]: string;
}

// Delve Sites
export interface IDenizens {
  veryCommon: string;
  common1: string;
  common2: string;
  common3: string;
  uncommon1: string;
  uncommon2: string;
  uncommon3: string;
  uncommon4: string;
  rare1: string;
  rare2: string;
  rare3: string;
  unforeseen: string;
}

export interface ISite {
  name: string;
  objective: string;
  theme: string;
  domain: string;
  track: IProgressTrack;
  notes: string;
  denizens: IDenizens;
}

export interface ICampaign {
  id: string;
  name: string;
  character: ICharacter;
  progressTracks: IProgressTrack[];
  journal: IJournalEntry[];
  npcs: INPC[];
  locations: ILocation[];
  truths: ITruths;
  sites: ISite[];
}

// Moves
export interface IMove {
  name: string;
  source: string;
  text: string;
  keywords: string;
  oracles?: string[];
}

// Oracles
export interface ITableItem {
  match: number[];
  text: string;
}

export interface IOracle {
  name: string;
  d: number;
  table: ITableItem[];
}

// Starforged Oracles
export type TPlanetOracles = { [index: string]: IPlanetOracle };

export interface ISFTableItem {
  match: number[];
  data: string;
}

export interface ISFTable {
  name?: string;
  items: ISFTableItem[];
}

export interface ISFOracle {
  name: string;
  table: ISFTable;
}

export interface IChar {
  name: string;
  callsign: string;
  firstLook: string;
  disposition: string;
  role: string;
  goal: string;
  aspect: string;
}

export interface ICharOracle {
  givenName: ISFTable;
  familyName: ISFTable;
  callsign: ISFTable;
  firstLook: ISFTable;
  disposition: ISFTable;
  role: ISFTable;
  goal: ISFTable;
  aspect: ISFTable;
}
export interface ISpaceOracle {
  sighting: { [index: string]: ISFTable };
  stellarObject: ISFTable;
  sectorPrefix: ISFTable;
  sectorSuffix: ISFTable;
  peril: ISFTable;
  opportunity: ISFTable;
}

export interface ILocThemeOracle {
  type: ISFTable;
  [ELocTheme.Chaotic]: { [index: string]: ISFTable };
  [ELocTheme.Fortified]: { [index: string]: ISFTable };
  [ELocTheme.Haunted]: { [index: string]: ISFTable };
  [ELocTheme.Infested]: { [index: string]: ISFTable };
  [ELocTheme.Inhabited]: { [index: string]: ISFTable };
  [ELocTheme.Ruined]: { [index: string]: ISFTable };
  [ELocTheme.Sacred]: { [index: string]: ISFTable };
}

export interface IPlanet {
  type: EPClass;
  name: string;
  sector: string;
  description: string;
  atmosphere: string;
  settlements: string;
  observed: string;
  feature: string;
  life: string;
  notes: string;
}

export interface IPlanetOracle {
  match: number[];
  names: string[];
  description: string;
  atmosphere: ISFTable;
  settlements: { [index: string]: ISFTable };
  observed: ISFTable;
  feature: ISFTable;
  life: ISFTable;
}

export interface ISettlement {
  name: string;
  location: ESLocation;
  population: string;
  firstLook: string;
  initialContact: string;
  authority: string;
  projects: string;
  trouble: string;
}

export interface ISettlementOracle {
  name: ISFTable;
  location: ISFTable;
  population: { [index: string]: ISFTable };
  firstLook: ISFTable;
  initialContact: ISFTable;
  authority: ISFTable;
  projects: ISFTable;
  trouble: ISFTable;
}

export interface IStarship {
  name: string;
  class: string;
  fleet: string;
  initialContact: string;
  firstLook: string;
  mission: string;
}

export interface IStarshipOracle {
  name: ISFTable;
  class: ISFTable;
  fleet: ISFTable;
  initialContact: ISFTable;
  firstLook: ISFTable;
  mission: { [index: string]: ISFTable };
}

export interface IDerelict {
  name: string;
  location: ESLocation;
  type: EDerelictType;
  condition: string;
  outerFirstLook: string;
  innerFirstLook: string;
  currentZone: EDerelictZone;
  explore: {
    area: string;
    feature: string;
    peril: string;
    opportunity: string;
  };
}

export interface IDerelictOracle {
  location: ISFTable;
  type: { [index: string]: ISFTable };
  condition: ISFTable;
  outerFirstLook: ISFTable;
  innerFirstLook: ISFTable;
  zone: { [index: string]: ISFTable };
  explore: {
    [index: string]: {
      area: ISFTable;
      feature: ISFTable;
      peril: ISFTable;
      opportunity: ISFTable;
    };
  };
}

export interface ICreature {
  name: string;
  environment: EEnv;
  scale: string;
  form: string;
  firstLook: string;
  behaviour: string;
  aspect: string;
}

export interface ICreatureOracle {
  environment: ISFTable;
  scale: ISFTable;
  ultraScale: ISFTable;
  form: { [index: string]: ISFTable };
  firstLook: ISFTable;
  behaviour: ISFTable;
  aspect: ISFTable;
}

export interface IVaultArea {
  feature: string;
  peril: string;
  opportunity: string;
}
export interface IVault {
  name: string;
  location: ESLocation;
  scale: string;
  form: string;
  shape: string;
  material: string;
  outerFirstLook: string;
  innerFirstLook: string;
  purpose: string;
  interior: IVaultArea;
  sanctum: IVaultArea;
}

export interface IVaultAreaOracle {
  feature: ISFTable;
  peril: ISFTable;
  opportunity: ISFTable;
}

export interface IVaultOracle {
  location: ISFTable;
  scale: ISFTable;
  form: ISFTable;
  shape: ISFTable;
  material: ISFTable;
  outerFirstLook: ISFTable;
  innerFirstLook: ISFTable;
  purpose: ISFTable;
  interior: IVaultAreaOracle;
  sanctum: IVaultAreaOracle;
}

// Rolls
export interface IRollData {
  action: {
    die: number;
    score: number;
    color: string;
  };
  challenge: {
    die1: {
      roll: number;
      color: string;
    };
    die2: {
      roll: number;
      color: string;
    };
    match: boolean;
  };
  progress: boolean;
  result: string;
}
