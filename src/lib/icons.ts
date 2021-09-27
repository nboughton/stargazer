const baseUrl =
  'https://raw.githubusercontent.com/aureyia/roll20-character-sheets/starforged-ui-components/Ironsworn-Starforged/assets/icons/';

export const icon = {
  player: (): string => {
    return 'img:icons/space/player-ship.svg';
  },
  sighting: (name: string): string => {
    const res = /(asteroid|debris|comet|meteor|nebula|wave|storm)/i.exec(name);
    if (res) {
      return `img:icons/space/${res[0].toLowerCase()}.svg`;
    }
    return 'img:icons/space/star.svg';
  },
  star: (type: string): string => {
    const res = /(red|orange|yellow|blue|young|white|corrupted|neutron|two|black|artificial|unstable|hypergiant)/i.exec(
      type
    );
    if (res) {
      return `img:icons/stars/${res[0].toLowerCase()}.png`;
    }
    return 'img:icons/space/star-sattelites.svg';
  },

  stars: (): string => {
    return 'img:icons/space/stars.svg';
  },

  planet: (type: string): string => {
    return `img:icons/planets/${type.toLowerCase()}.png`;
  },

  settlement: (): string => {
    return 'img:icons/space/settlement.svg';
  },

  starship: (): string => {
    return 'img:icons/space/spaceship.svg';
  },

  derelict: (): string => {
    return 'img:icons/space/derelict.svg';
  },

  vault: (): string => {
    return 'img:icons/space/vault.svg';
  },

  creature: (form: string): string => {
    return /(amoeba|amorphous|avian|beast|crustacean|fish|humanoid|insectoid|jellyfish|lizard|octopoid|plant|ray|snake|spider|starfish|worm)/i.test(
      form
    )
      ? `img:icons/life/${form.split(' ')[0].toLowerCase()}.svg`
      : 'img:icons/life/floating-tentacles.svg';
  },

  npc: (): string => {
    return 'img:icons/life/character.svg';
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
