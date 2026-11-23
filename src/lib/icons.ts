/* eslint-disable @typescript-eslint/no-var-requires */
//const basePath = '../assets'

const baseUrl =
  'https://raw.githubusercontent.com/aureyia/roll20-character-sheets/starforged-ui-components/Ironsworn-Starforged/assets/icons/';

const normalizeForMatch = (value: string): string => {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
};

const VALID_PLANET_TYPES = new Set([
  'Desert',
  'Furnace',
  'Grave',
  'Ice',
  'Jovian',
  'Jungle',
  'Ocean',
  'Rocky',
  'Shattered',
  'Tainted',
  'Vital',
]);

const SIGHTING_PATTERNS: ReadonlyArray<[RegExp, string]> = [
  [/(debris|detrito|destro[cs]o)/, 'debris'],
  [/(asteroid|asteroide)/, 'asteroid'],
  [/(comet|cometa)/, 'comet'],
  [/(meteor|meteoro)/, 'meteor'],
  [/(nebula|nebulosa)/, 'nebula'],
  [/(wave|onda)/, 'wave'],
  [/(storm|tempestade)/, 'storm'],
];

const STAR_PATTERNS: ReadonlyArray<[RegExp, string]> = [
  [/(red|vermelh)/, 'red'],
  [/(orange|laranja)/, 'orange'],
  [/(yellow|amarel)/, 'yellow'],
  [/(blue|azul)/, 'blue'],
  [/(young|jovem)/, 'young'],
  [/(white|branc)/, 'white'],
  [/(corrupted|corrompid)/, 'corrupted'],
  [/(neutron)/, 'neutron'],
  [/(two|binary|duas|binari)/, 'two'],
  [/(black|negr)/, 'black'],
  [/(artificial)/, 'artificial'],
  [/(unstable|instavel)/, 'unstable'],
  [/(hypergiant|hipergigante)/, 'hypergiant'],
];

const CREATURE_PATTERNS: ReadonlyArray<[RegExp, string]> = [
  [/(starfish|estrela[- ]do[- ]mar)/, 'starfish'],
  [/(jellyfish|agua[- ]viva|medusa)/, 'jellyfish'],
  [/(amoeba|ameba)/, 'amoeba'],
  [/(amorphous|amorf|elemental)/, 'amorphous'],
  [/(avian|aviari|\bave\b|alado|alada)/, 'avian'],
  [/(beast|besta|fera|mamifer)/, 'beast'],
  [/(crustacean|crustace|carapaca|concha)/, 'crustacean'],
  [/(fish|peixe)/, 'fish'],
  [/(humanoid|humanoide|bipede)/, 'humanoid'],
  [/(insectoid|insetoide|exoesquelet)/, 'insectoid'],
  [/(lizard|lagarto|reptil)/, 'lizard'],
  [/(octopoid|octopoide|tentacul|polvo)/, 'octopoid'],
  [/(plant|planta|fungo)/, 'plant'],
  [/\b(ray|arraia|raia)\b/, 'ray'],
  [/(snake|serpente|cobra|enguia)/, 'snake'],
  [/(spider|aranha|aracnide|teia)/, 'spider'],
  [/(worm|verme|lesma|larva)/, 'worm'],
];

const matchFirst = (value: string, patterns: ReadonlyArray<[RegExp, string]>): string | null => {
  const normalized = normalizeForMatch(value);
  for (const [pattern, key] of patterns) {
    if (pattern.test(normalized)) {
      return key;
    }
  }
  return null;
};

export const icon = {
  d10: (): string => {
    return require('../assets/dice/d10.svg') as string;
  },

  player: (): string => {
    return require('../assets/space/player-ship.svg') as string;
  },

  sighting: (name: string): string => {
    const key = matchFirst(name, SIGHTING_PATTERNS);
    return key
      ? (require(`../assets/space/${key}.svg`) as string)
      : (require('../assets/space/star.svg') as string);
  },

  star: (type: string): string => {
    const key = matchFirst(type, STAR_PATTERNS);
    return key
      ? (require(`../assets/stars/${key}.png`) as string)
      : (require('../assets/space/star-sattelites.svg') as string);
  },

  stars: (): string => {
    return require('../assets/space/stars.svg') as string;
  },

  planet: (type: string): string => {
    const safeType = VALID_PLANET_TYPES.has(type) ? type : 'Rocky';
    return require(`../assets/planets/${safeType}-01.webp`) as string;
  },

  settlement: (): string => {
    return require('../assets/space/settlement.svg') as string;
  },

  starship: (): string => {
    return require('../assets/space/spaceship.svg') as string;
  },

  derelict: (): string => {
    return require('../assets/space/derelict.svg') as string;
  },

  vault: (): string => {
    return require('../assets/space/vault.svg') as string;
  },

  creature: (form: string): string => {
    const key = matchFirst(form, CREATURE_PATTERNS);
    return key
      ? (require(`../assets/life/${key}.svg`) as string)
      : (require('../assets/life/floating-tentacles.svg') as string);
  },

  npc: (): string => {
    return require('../assets/life/character.svg') as string;
  },

  asset: (name: string, isCustom = false): string => {
    return isCustom || /custom/i.test(name)
      ? 'mdi-crosshairs-question'
      : `img:${baseUrl}asset-${name.toLowerCase().replace(/ /gi, '-')}.svg`;
  },

  truth: (name: string): string => {
    return `img:${baseUrl}setting-truth-${name.toLowerCase().replace(/ /gi, '-')}.svg`;
  },
};
