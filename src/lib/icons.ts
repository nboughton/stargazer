/* eslint-disable @typescript-eslint/no-var-requires */
//const basePath = '../assets'

const baseUrl =
  'https://raw.githubusercontent.com/aureyia/roll20-character-sheets/starforged-ui-components/Ironsworn-Starforged/assets/icons/';

export const icon = {
  d10: (): string => {
    return require('../assets/dice/d10.svg') as string
  },

  player: (): string => {
    return require('../assets/space/player-ship.svg') as string
  },

  sighting: (name: string): string => {
    const res = /(asteroid|debris|comet|meteor|nebula|wave|storm)/i.exec(name);
    if (res) {
      return require(`../assets/space/${res[0].toLowerCase()}.svg`) as string
    }
    return require('../assets/space/star.svg') as string
  },
  
  star: (type: string): string => {
    const res = /(red|orange|yellow|blue|young|white|corrupted|neutron|two|binary|black|artificial|unstable|hypergiant)/i.exec(
      type
    );
    if (res) {
     return require(`../assets/stars/${res[0].toLowerCase()}.png`) as string
    }
    return require('../assets/space/star-sattelites.svg') as string
  },

  stars: (): string => {
    return require('../assets/space/stars.svg') as string
  },

  planet: (type: string): string => {
    return require(`../assets/planets/${type.toLowerCase()}.png`) as string
  },

  settlement: (): string => {
    return require('../assets/space/settlement.svg') as string
  },

  starship: (): string => {
    return require('../assets/space/spaceship.svg') as string
  },

  derelict: (): string => {
    return require('../assets/space/derelict.svg') as string
  },

  vault: (): string => {
    return require('../assets/space/vault.svg') as string
  },

  creature: (form: string): string => {
    return /(amoeba|amorphous|avian|beast|crustacean|fish|humanoid|insectoid|jellyfish|lizard|octopoid|plant|ray|snake|spider|starfish|worm)/i.test(
      form
    )
      ? require(`../assets/life/${form.split(' ')[0].toLowerCase()}.svg`) as string
      : require('../assets/life/floating-tentacles.svg') as string
  },

  npc: (): string => {
    return require('../assets/life/character.svg') as string
    
  },

 asset: (name: string): string => {
    return /custom/i.test(name)
      ? 'mdi-crosshairs-question'
      : `img:${baseUrl}asset-${name.toLowerCase().replace(/ /gi, '-')}.svg`;
  },

  truth: (name: string): string => {
    return `img:${baseUrl}setting-truth-${name.toLowerCase().replace(/ /gi, '-')}.svg`;
  },
};
