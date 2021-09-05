import { ICreatureOracle, EEnv } from 'src/components/models';

export const Creature: ICreatureOracle = {
  environment: {
    items: [
      {
        match: [1, 5],
        data: EEnv.Space,
      },
      {
        match: [6, 15],
        data: EEnv.Interior,
      },
      {
        match: [16, 55],
        data: EEnv.Land,
      },
      {
        match: [56, 80],
        data: EEnv.Liquid,
      },
      {
        match: [81, 100],
        data: EEnv.Air,
      },
    ],
  },
  scale: {
    items: [
      {
        match: [1, 3],
        data: 'Minuscule',
      },
      {
        match: [4, 10],
        data: 'Tiny',
      },
      {
        match: [11, 25],
        data: 'Small',
      },
      {
        match: [26, 60],
        data: 'Medium',
      },
      {
        match: [61, 90],
        data: 'Large',
      },
      {
        match: [91, 99],
        data: 'Huge',
      },
      {
        match: [100, 100],
        data: 'Ultra-scale',
      },
    ],
  },
  ultraScale: {
    items: [
      {
        match: [1, 89],
        data: 'Titanic',
      },
      {
        match: [90, 99],
        data: 'Colossal',
      },
      {
        match: [100, 100],
        data: 'Vast',
      },
    ],
  },
  form: {
    [EEnv.Space]: {
      items: [
        {
          match: [1, 5],
          data: 'Amoeba / pseudopods',
        },
        {
          match: [6, 20],
          data: 'Amorphous / elemental',
        },
        {
          match: [21, 30],
          data: 'Avian / winged',
        },
        {
          match: [31, 32],
          data: 'Beast / mammal',
        },
        {
          match: [33, 34],
          data: 'Crustacean / shelled',
        },
        {
          match: [35, 37],
          data: 'Fish / torpedo-shaped',
        },
        {
          match: [38, 39],
          data: 'Humanoid / bipedal',
        },
        {
          match: [40, 41],
          data: 'Insectoid / exoskeletal',
        },
        {
          match: [42, 60],
          data: 'Jellyfish / gasbag',
        },
        {
          match: [61, 62],
          data: 'Lizard / reptilian',
        },
        {
          match: [63, 67],
          data: 'Octopoid / tentacled',
        },
        {
          match: [68, 72],
          data: 'Plant / fungus',
        },
        {
          match: [73, 82],
          data: 'Ray / flat-bodied',
        },
        {
          match: [83, 84],
          data: 'Snake / eel',
        },
        {
          match: [85, 86],
          data: 'Spider / web-weaver',
        },
        {
          match: [87, 88],
          data: 'Starfish / symmetrical',
        },
        {
          match: [89, 90],
          data: 'Worm / slug / larva',
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
    [EEnv.Interior]: {
      items: [
        {
          match: [1, 3],
          data: 'Amoeba / pseudopods',
        },
        {
          match: [4, 6],
          data: 'Amorphous / elemental',
        },
        {
          match: [7, 12],
          data: 'Avian / winged',
        },
        {
          match: [13, 19],
          data: 'Beast / mammal',
        },
        {
          match: [20, 22],
          data: 'Crustacean / shelled',
        },
        {
          match: [23, 24],
          data: 'Fish / torpedo-shaped',
        },
        {
          match: [25, 37],
          data: 'Humanoid / bipedal',
        },
        {
          match: [38, 49],
          data: 'Insectoid / exoskeletal',
        },
        {
          match: [50, 51],
          data: 'Jellyfish / gasbag',
        },
        {
          match: [52, 56],
          data: 'Lizard / reptilian',
        },
        {
          match: [57, 58],
          data: 'Octopoid / tentacled',
        },
        {
          match: [59, 63],
          data: 'Plant / fungus',
        },
        {
          match: [64, 65],
          data: 'Ray / flat-bodied',
        },
        {
          match: [66, 68],
          data: 'Snake / eel',
        },
        {
          match: [69, 83],
          data: 'Spider / web-weaver',
        },
        {
          match: [84, 85],
          data: 'Starfish / symmetrical',
        },
        {
          match: [86, 90],
          data: 'Worm / slug / larva',
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
    [EEnv.Land]: {
      items: [
        {
          match: [1, 2],
          data: 'Amoeba / pseudopods',
        },
        {
          match: [3, 5],
          data: 'Amorphous / elemental',
        },
        {
          match: [6, 10],
          data: 'Avian / winged',
        },
        {
          match: [11, 25],
          data: 'Beast / mammal',
        },
        {
          match: [26, 32],
          data: 'Crustacean / shelled',
        },
        {
          match: [33, 34],
          data: 'Fish / torpedo-shaped',
        },
        {
          match: [35, 39],
          data: 'Humanoid / bipedal',
        },
        {
          match: [40, 49],
          data: 'Insectoid / exoskeletal',
        },
        {
          match: [50, 51],
          data: 'Jellyfish / gasbag',
        },
        {
          match: [52, 58],
          data: 'Lizard / reptilian',
        },
        {
          match: [59, 60],
          data: 'Octopoid / tentacled',
        },
        {
          match: [61, 65],
          data: 'Plant / fungus',
        },
        {
          match: [66, 67],
          data: 'Ray / flat-bodied',
        },
        {
          match: [68, 74],
          data: 'Snake / eel',
        },
        {
          match: [75, 81],
          data: 'Spider / web-weaver',
        },
        {
          match: [82, 83],
          data: 'Starfish / symmetrical',
        },
        {
          match: [84, 90],
          data: 'Worm / slug / larva',
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
    [EEnv.Liquid]: {
      items: [
        {
          match: [1, 5],
          data: 'Amoeba / pseudopods',
        },
        {
          match: [6, 8],
          data: 'Amorphous / elemental',
        },
        {
          match: [9, 11],
          data: 'Avian / winged',
        },
        {
          match: [12, 17],
          data: 'Beast / mammal',
        },
        {
          match: [18, 24],
          data: 'Crustacean / shelled',
        },
        {
          match: [25, 39],
          data: 'Fish / torpedo-shaped',
        },
        {
          match: [40, 42],
          data: 'Humanoid / bipedal',
        },
        {
          match: [43, 45],
          data: 'Insectoid / exoskeletal',
        },
        {
          match: [46, 53],
          data: 'Jellyfish / gasbag',
        },
        {
          match: [54, 56],
          data: 'Lizard / reptilian',
        },
        {
          match: [57, 63],
          data: 'Octopoid / tentacled',
        },
        {
          match: [64, 68],
          data: 'Plant / fungus',
        },
        {
          match: [69, 75],
          data: 'Ray / flat-bodied',
        },
        {
          match: [76, 80],
          data: 'Snake / eel',
        },
        {
          match: [81, 82],
          data: 'Spider / web-weaver',
        },
        {
          match: [83, 87],
          data: 'Starfish / symmetrical',
        },
        {
          match: [88, 90],
          data: 'Worm / slug / larva',
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
    [EEnv.Air]: {
      items: [
        {
          match: [1, 2],
          data: 'Amoeba / pseudopods',
        },
        {
          match: [3, 12],
          data: 'Amorphous / elemental',
        },
        {
          match: [13, 37],
          data: 'Avian / winged',
        },
        {
          match: [38, 40],
          data: 'Beast / mammal',
        },
        {
          match: [41, 42],
          data: 'Crustacean / shelled',
        },
        {
          match: [43, 47],
          data: 'Fish / torpedo-shaped',
        },
        {
          match: [48, 49],
          data: 'Humanoid / bipedal',
        },
        {
          match: [50, 51],
          data: 'Insectoid / exoskeletal',
        },
        {
          match: [52, 66],
          data: 'Jellyfish / gasbag',
        },
        {
          match: [67, 68],
          data: 'Lizard / reptilian',
        },
        {
          match: [69, 70],
          data: 'Octopoid / tentacled',
        },
        {
          match: [71, 72],
          data: 'Plant / fungus',
        },
        {
          match: [73, 82],
          data: 'Ray / flat-bodied',
        },
        {
          match: [83, 84],
          data: 'Snake / eel',
        },
        {
          match: [85, 86],
          data: 'Spider / web-weaver',
        },
        {
          match: [87, 88],
          data: 'Starfish / symmetrical',
        },
        {
          match: [89, 90],
          data: 'Worm / slug / larva',
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
  },
  firstLook: {
    items: [
      {
        match: [1, 2],
        data: 'Antennae or sensory organs',
      },
      {
        match: [3, 4],
        data: 'Armored',
      },
      {
        match: [5, 6],
        data: 'Beautiful',
      },
      {
        match: [7, 8],
        data: 'Biotech',
      },
      {
        match: [9, 10],
        data: 'Bony or gaunt',
      },
      {
        match: [11, 12],
        data: 'Brutish or muscled',
      },
      {
        match: [13, 14],
        data: 'Camouflaged',
      },
      {
        match: [15, 16],
        data: 'Claws or talons',
      },
      {
        match: [17, 18],
        data: 'Compound eyes',
      },
      {
        match: [19, 20],
        data: 'Comprised of many creatures',
      },
      {
        match: [21, 22],
        data: 'Corrupted',
      },
      {
        match: [23, 24],
        data: 'Crystalline',
      },
      {
        match: [25, 26],
        data: 'Dead or undead',
      },
      {
        match: [27, 28],
        data: 'Distinctive markings',
      },
      {
        match: [29, 30],
        data: 'Distinctive smell',
      },
      {
        match: [31, 32],
        data: 'Distinctive sound',
      },
      {
        match: [33, 34],
        data: 'Dripping mucus',
      },
      {
        match: [35, 36],
        data: 'Elongated Neck',
      },
      {
        match: [37, 38],
        data: 'Energy emissions',
      },
      {
        match: [39, 40],
        data: 'Extra limbs',
      },
      {
        match: [41, 42],
        data: 'Faceless or inexpressive',
      },
      {
        match: [43, 44],
        data: 'Fangs or rows of teeth',
      },
      {
        match: [45, 46],
        data: 'Feathered',
      },
      {
        match: [47, 48],
        data: 'Fungal growth',
      },
      {
        match: [49, 50],
        data: 'Fur, hair, or filaments',
      },
      {
        match: [51, 52],
        data: 'Graceful',
      },
      {
        match: [53, 54],
        data: 'Hideous',
      },
      {
        match: [55, 56],
        data: 'Hooded or crested',
      },
      {
        match: [57, 58],
        data: 'Immobile or trapped',
      },
      {
        match: [59, 60],
        data: 'Injured or scarred',
      },
      {
        match: [61, 62],
        data: 'Iridescent',
      },
      {
        match: [63, 64],
        data: 'Long-limbed',
      },
      {
        match: [65, 66],
        data: 'Luminescent',
      },
      {
        match: [67, 68],
        data: 'Mandibles or pincers',
      },
      {
        match: [69, 70],
        data: 'Many-eyed',
      },
      {
        match: [71, 72],
        data: 'Mineral or metallic',
      },
      {
        match: [73, 74],
        data: 'Multi-jointed',
      },
      {
        match: [75, 76],
        data: 'Multi-segmented body',
      },
      {
        match: [77, 78],
        data: 'Ornamented or colorful',
      },
      {
        match: [79, 80],
        data: 'Oversized mouth',
      },
      {
        match: [81, 82],
        data: 'Prominent tail',
      },
      {
        match: [83, 84],
        data: 'Prominent wings or fins',
      },
      {
        match: [85, 86],
        data: 'Ridges or plates',
      },
      {
        match: [87, 88],
        data: 'Scaled',
      },
      {
        match: [89, 90],
        data: 'Single eye or oversized eyes',
      },
      {
        match: [91, 92],
        data: 'Spikes or spines',
      },
      {
        match: [93, 94],
        data: 'Stinger or barbs',
      },
      {
        match: [95, 96],
        data: 'Tentacles or tendrils',
      },
      {
        match: [97, 98],
        data: 'Translucent',
      },
      {
        match: [99, 100],
        data: 'Visible symbiote',
      },
    ],
  },
  behaviour: {
    items: [
      {
        match: [1, 5],
        data: 'Ambusher',
      },
      {
        match: [6, 10],
        data: 'Apex predator',
      },
      {
        match: [11, 14],
        data: 'Builder',
      },
      {
        match: [15, 19],
        data: 'Camouflager',
      },
      {
        match: [20, 24],
        data: 'Forager',
      },
      {
        match: [25, 29],
        data: 'Grazer',
      },
      {
        match: [30, 33],
        data: 'Herder',
      },
      {
        match: [34, 37],
        data: 'Hibernator',
      },
      {
        match: [38, 41],
        data: 'Hoarder',
      },
      {
        match: [42, 46],
        data: 'Hunter',
      },
      {
        match: [47, 51],
        data: 'Lurer',
      },
      {
        match: [52, 55],
        data: 'Migratory',
      },
      {
        match: [56, 60],
        data: 'Mimic',
      },
      {
        match: [61, 65],
        data: 'Nester',
      },
      {
        match: [66, 70],
        data: 'Pack hunter',
      },
      {
        match: [71, 75],
        data: 'Prey',
      },
      {
        match: [76, 80],
        data: 'Protector',
      },
      {
        match: [81, 85],
        data: 'Scavenger',
      },
      {
        match: [86, 90],
        data: 'Tracker',
      },
      {
        match: [91, 95],
        data: 'Trapper',
      },
      {
        match: [96, 100],
        data: '[Roll twice]',
      },
    ],
  },
  aspect: {
    items: [
      {
        match: [1, 2],
        data: 'Alternative environment',
      },
      {
        match: [3, 4],
        data: 'Alternative movement',
      },
      {
        match: [5, 6],
        data: 'Alternative senses',
      },
      {
        match: [7, 8],
        data: 'Burrower',
      },
      {
        match: [9, 10],
        data: 'Chameleon',
      },
      {
        match: [11, 12],
        data: 'Clever',
      },
      {
        match: [13, 14],
        data: 'Consumes energy',
      },
      {
        match: [15, 16],
        data: 'Consumes inorganic matter',
      },
      {
        match: [17, 18],
        data: 'Controlled or puppeteered',
      },
      {
        match: [19, 20],
        data: 'Controls lesser creatures',
      },
      {
        match: [21, 22],
        data: 'Corrosive excretion',
      },
      {
        match: [23, 24],
        data: 'Crusher or constrictor',
      },
      {
        match: [25, 26],
        data: 'Egg sac or carried offspring',
      },
      {
        match: [27, 28],
        data: 'Electric shock',
      },
      {
        match: [29, 30],
        data: 'Electromagnetic pulse',
      },
      {
        match: [31, 32],
        data: 'Energy breath',
      },
      {
        match: [33, 34],
        data: 'Energy manipulation',
      },
      {
        match: [35, 36],
        data: 'Engineered biology',
      },
      {
        match: [37, 38],
        data: 'Enhanced senses',
      },
      {
        match: [39, 40],
        data: 'Enhanced strength',
      },
      {
        match: [41, 42],
        data: 'Entangling secretion',
      },
      {
        match: [43, 44],
        data: 'Extradimensional',
      },
      {
        match: [45, 46],
        data: 'Hallucinogen secretion',
      },
      {
        match: [47, 48],
        data: 'Hidden symbiote',
      },
      {
        match: [49, 50],
        data: 'Hive mind',
      },
      {
        match: [51, 52],
        data: 'Illusionary',
      },
      {
        match: [53, 54],
        data: 'Infectious',
      },
      {
        match: [55, 56],
        data: 'Infested with parasites',
      },
      {
        match: [57, 58],
        data: 'Intimidating threat display',
      },
      {
        match: [59, 60],
        data: 'Limited sense',
      },
      {
        match: [61, 62],
        data: 'Magnetic',
      },
      {
        match: [63, 64],
        data: 'Mental influence or control',
      },
      {
        match: [65, 66],
        data: 'Metamorphic',
      },
      {
        match: [67, 68],
        data: 'Noxious cloud or spores',
      },
      {
        match: [69, 70],
        data: 'Paralytic toxin',
      },
      {
        match: [71, 72],
        data: 'Parasitic',
      },
      {
        match: [73, 74],
        data: 'Pheromones',
      },
      {
        match: [75, 76],
        data: 'Poisonous',
      },
      {
        match: [77, 78],
        data: 'Powerful bite',
      },
      {
        match: [79, 80],
        data: 'Proboscis or inner jaw',
      },
      {
        match: [81, 82],
        data: 'Projectile attack',
      },
      {
        match: [83, 84],
        data: 'Radioactive',
      },
      {
        match: [85, 86],
        data: 'Regeneration',
      },
      {
        match: [87, 88],
        data: 'Replication',
      },
      {
        match: [89, 90],
        data: 'Sacrificial defense',
      },
      {
        match: [91, 92],
        data: 'Shapechanger',
      },
      {
        match: [93, 94],
        data: 'Telekinetic',
      },
      {
        match: [95, 96],
        data: 'Teleportation',
      },
      {
        match: [97, 98],
        data: 'Territorial',
      },
      {
        match: [99, 100],
        data: 'Toxic spew',
      },
    ],
  },
};
