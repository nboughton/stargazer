// Enum ID sets
export enum ERegion {
  Terminus = 'Terminus',
  Outlands = 'Outlands',
  Expanse = 'Expanse',
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

export enum ELocTheme {
  Chaotic = 'Chaotic',
  Fortified = 'Fortified',
  Haunted = 'Haunted',
  Infested = 'Infested',
  Inhabited = 'Inhabited',
  Ruined = 'Ruined',
  Sacred = 'Sacred',
  Mechanical = 'Mechanical',
}

export enum ECoreCombo {
  ActTheme = 'Action + Theme',
  DescFoc = 'Descriptor + Focus',
}

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
  sector: number;
  index: IIndexItem[];
  edit: boolean;
  saving: boolean;
  map: {
    height: number;
    width: number;
    hexSize: number;
    animations: boolean;
    starfield: boolean;
    defaultPassage?: boolean;
    filters?: ESectorOpts[];
  };
}

// Stats and Tracks
export interface IStats {
  edge: number;
  heart: number;
  iron: number;
  shadow: number;
  wits: number;
}

export interface IMomentum extends ITrack {
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

export enum EAtO {
  AlmostCertain = 'Almost Certain',
  Likely = 'Likely',
  FiftyFifty = 'Fifty-fifty',
  Unlikely = 'Unlikely',
  SmallChance = 'Small Chance',
  NoRoll = 'No Roll',
}

export interface IClock {
  id: string;
  name: string;
  segments: number;
  filled: number;
  advance: EAtO;
  roll: number;
  complete?: boolean;
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

export interface IProgressTrack {
  name: string;
  difficulty: number;
  boxes: number[];
  clocks: string[];
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
export interface ISGAssetInput {
  label: string;
  text: string;
}

export interface ISGAssetItem {
  text: string;
  marked: boolean;
  input?: ISGAssetInput;
}

export interface ISGAsset {
  id?: string;
  icon?: string;
  title: string;
  subtitle?: string;
  input?: ISGAssetInput;
  type: string;
  items: ISGAssetItem[];
  track?: ITrack;
  cursed?: boolean;
  battered?: boolean;
}

export interface ICharacter {
  name: string;
  pronouns: string;
  callsign: string;
  characteristics: string;
  location: string;
  stats: IStats;
  tracks: ITracks;
  impacts: IImpacts;
  legacies: {
    quests: ILegacyTrack;
    bonds: ILegacyTrack;
    discoveries: ILegacyTrack;
  };
  vows: IProgressTrack[];
  clocks: IClock[];
  gear: string;
  assets: ISGAsset[];
}

export interface IJournalEntry {
  title: string;
  content: string;
  pinned?: boolean;
}

// Truths
export interface ITruths {
  [index: string]: string;
}

export interface IStar {
  name: string;
  description: string;
}

export interface ISighting {
  name: string;
  notes: string;
}

export enum ECellStatus {
  Empty = 'empty',
  Passage = 'passage',
  Location = 'location',
}

// SearchResults as follows:
// [sector][cell][objectType]number[] <- object indices
export interface ISearchResults {
  [index: number]: {
    [index: string]: {
      [index: string]: number[];
    };
  };
}

export enum ESectorItem {
  Star = 'Star',
  Planet = 'Planet',
  Settlement = 'Settlement',
  Ship = 'Ship',
  Person = 'Person',
  Creature = 'Creature',
  Derelict = 'Derelict',
  Vault = 'Vault',
  Sighting = 'Sighting',
}

export enum ESectorOpts { // values need to match the keys in ISectorCell
  Stars = 'stars',
  Planets = 'planets',
  Settlements = 'settlements',
  Ships = 'ships',
  NPCs = 'npcs',
  Creatures = 'creatures',
  Derelicts = 'derelicts',
  Vaults = 'vaults',
  Sightings = 'sightings',
}

export interface ISectorCell {
  id: string;
  stat: ECellStatus;
  name: string;
  factions: string[];
  notes: string;
  stars: IStar[];
  planets: IPlanet[];
  settlements: ISettlement[];
  derelicts: IDerelict[]; // Deep space derelicts
  ships: IStarship[];
  npcs: INPC[];
  creatures: ICreature[];
  vaults: IVault[];
  sightings: ISighting[];
}

export interface ISector {
  name: string;
  region: ERegion;
  control: string;
  cells: { [index: string]: ISectorCell };
}

export interface IFaction {
  id: string;
  name: string;
  type: string;
  influence: string;
  leadership?: string;
  sphere: string;
  projects: string;
  relationships: string;
  quirks: string;
  rumors: string;
  notes: string;
  colour: string;
}

export interface ICampaign {
  id: string;
  name: string;
  character: ICharacter;
  progressTracks: IProgressTrack[];
  journal: IJournalEntry[];
  truths: ITruths;
  sectors: ISector[];
  factions: IFaction[];
}

// Moves
export interface IMove {
  name: string;
  source: string;
  text: string;
  keywords: string;
  oracles?: string[];
}

export interface INPC {
  name: string;
  pronouns?: string;
  callsign: string;
  firstLook: string;
  disposition: string;
  role: string;
  goal: string;
  aspect: string;
  track: IProgressTrack;
  connection: boolean;
  bond: boolean;
  notes: string;
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

export interface IPlanet {
  type: EPClass;
  name: string;
  description: string;
  atmosphere: string;
  settlements: string;
  observed: string;
  feature: string;
  life: string;
  diversity?: string;
  biomes?: string;
  notes: string;
}

export enum ESLocation {
  Planetside = 'Planetside',
  Orbital = 'Orbital',
  Space = 'Deep Space',
}

export enum ESettPop {
  Few = 'Few',
  Dozens = 'Dozens',
  Hundreds = 'Hundreds',
  Thousands = 'Thousands',
  TensOfThou = 'Tens of thousands',
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
  notes: string;
}

export interface IStarship {
  name: string;
  class: string;
  fleet: string;
  initialContact: string;
  firstLook: string;
  mission: string;
  notes: string;
  factionId?: string;
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
  notes: '';
}

export enum EEnv {
  Space = 'Space',
  Interior = 'Interior',
  Land = 'Land',
  Liquid = 'Liquid',
  Air = 'Air',
}

export interface ICreature {
  name: string;
  environment: EEnv;
  scale: string;
  form: string;
  firstLook: string;
  behaviour: string;
  aspect: string;
  notes: '';
}

export enum EVault {
  Planet = 'Precursor Vault (planetside)',
  Orbital = 'Precursor Vault (orbital)',
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
  notes: string;
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
