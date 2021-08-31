import {
  ERegion,
  ESLocation,
  ISettlement,
  ISettlementOracle,
} from 'src/components/models';
import { Core } from 'src/lib/oracles/core';
import { tableRoll } from 'src/lib/roll';

export const Settlement: ISettlementOracle = {
  name: {
    items: [
      {
        match: [1, 1],
        data: 'Aegis',
      },
      {
        match: [2, 2],
        data: 'Altair',
      },
      {
        match: [3, 3],
        data: 'Altura',
      },
      {
        match: [4, 4],
        data: 'Amity',
      },
      {
        match: [5, 5],
        data: 'Apex',
      },
      {
        match: [6, 6],
        data: 'Apogee',
      },
      {
        match: [7, 7],
        data: 'Argosy',
      },
      {
        match: [8, 8],
        data: 'Astra',
      },
      {
        match: [9, 9],
        data: 'Aurora',
      },
      {
        match: [10, 10],
        data: 'Beowulf',
      },
      {
        match: [11, 11],
        data: 'Brink',
      },
      {
        match: [12, 12],
        data: 'Bulwark',
      },
      {
        match: [13, 13],
        data: 'Burnell',
      },
      {
        match: [14, 14],
        data: 'Burrow',
      },
      {
        match: [15, 15],
        data: 'Concord',
      },
      {
        match: [16, 16],
        data: 'Crux',
      },
      {
        match: [17, 17],
        data: 'Deadrock',
      },
      {
        match: [18, 18],
        data: 'Deception',
      },
      {
        match: [19, 19],
        data: 'Elysium',
      },
      {
        match: [20, 20],
        data: 'Enigma',
      },
      {
        match: [21, 21],
        data: 'Erebus',
      },
      {
        match: [22, 22],
        data: 'Eris',
      },
      {
        match: [23, 23],
        data: 'Evenfall',
      },
      {
        match: [24, 24],
        data: 'Eventide',
      },
      {
        match: [25, 25],
        data: 'Farpoint',
      },
      {
        match: [26, 26],
        data: 'Felicity',
      },
      {
        match: [27, 27],
        data: 'Florin',
      },
      {
        match: [28, 28],
        data: 'Forlorn',
      },
      {
        match: [29, 29],
        data: 'Forsaken',
      },
      {
        match: [30, 30],
        data: 'Freya',
      },
      {
        match: [31, 31],
        data: 'Glimmer',
      },
      {
        match: [32, 32],
        data: 'Gloam',
      },
      {
        match: [33, 33],
        data: 'Hearth',
      },
      {
        match: [34, 34],
        data: 'Helia',
      },
      {
        match: [35, 35],
        data: 'Hypatia',
      },
      {
        match: [36, 36],
        data: 'Hyperion',
      },
      {
        match: [37, 37],
        data: 'Janus',
      },
      {
        match: [38, 38],
        data: 'Karma',
      },
      {
        match: [39, 39],
        data: 'Kepler',
      },
      {
        match: [40, 40],
        data: 'Koshiba',
      },
      {
        match: [41, 41],
        data: 'Lagrange',
      },
      {
        match: [42, 42],
        data: 'Larissa',
      },
      {
        match: [43, 43],
        data: 'Lasthope',
      },
      {
        match: [44, 44],
        data: 'Lastport',
      },
      {
        match: [45, 45],
        data: 'Legacy',
      },
      {
        match: [46, 46],
        data: 'Lodestar',
      },
      {
        match: [47, 47],
        data: 'Luminus',
      },
      {
        match: [48, 48],
        data: 'Lyra',
      },
      {
        match: [49, 49],
        data: 'Marrow',
      },
      {
        match: [50, 50],
        data: 'Meridian',
      },
      {
        match: [51, 51],
        data: 'Moirai',
      },
      {
        match: [52, 52],
        data: 'Mudd',
      },
      {
        match: [53, 53],
        data: 'Neoma',
      },
      {
        match: [54, 54],
        data: 'Nerio',
      },
      {
        match: [55, 55],
        data: 'Nova',
      },
      {
        match: [56, 56],
        data: 'Nyx',
      },
      {
        match: [57, 57],
        data: 'Osseus',
      },
      {
        match: [58, 58],
        data: 'Paradox',
      },
      {
        match: [59, 59],
        data: 'Paragon',
      },
      {
        match: [60, 60],
        data: 'Paxton',
      },
      {
        match: [61, 61],
        data: 'Perchance',
      },
      {
        match: [62, 62],
        data: 'Pinnacle',
      },
      {
        match: [63, 63],
        data: 'Polaris',
      },
      {
        match: [64, 64],
        data: 'Portent',
      },
      {
        match: [65, 65],
        data: 'Prism',
      },
      {
        match: [66, 66],
        data: 'Providence',
      },
      {
        match: [67, 67],
        data: 'Purgatory',
      },
      {
        match: [68, 68],
        data: 'Rampart',
      },
      {
        match: [69, 69],
        data: 'Ramshackle',
      },
      {
        match: [70, 70],
        data: 'Redemption',
      },
      {
        match: [71, 71],
        data: 'Redhaven',
      },
      {
        match: [72, 72],
        data: 'Relic',
      },
      {
        match: [73, 73],
        data: 'Reprise',
      },
      {
        match: [74, 74],
        data: 'Reverie',
      },
      {
        match: [75, 75],
        data: 'Rhiannon',
      },
      {
        match: [76, 76],
        data: 'Rockhome',
      },
      {
        match: [77, 77],
        data: 'Rust',
      },
      {
        match: [78, 78],
        data: 'Sagan',
      },
      {
        match: [79, 79],
        data: 'Scirocco',
      },
      {
        match: [80, 80],
        data: 'Selena',
      },
      {
        match: [81, 81],
        data: 'Sepulcher',
      },
      {
        match: [82, 82],
        data: 'Sigil',
      },
      {
        match: [83, 83],
        data: 'Silvana',
      },
      {
        match: [84, 84],
        data: 'Sirius',
      },
      {
        match: [85, 85],
        data: 'Sisyphus',
      },
      {
        match: [86, 86],
        data: 'Solitude',
      },
      {
        match: [87, 87],
        data: 'Spire',
      },
      {
        match: [88, 88],
        data: 'Starfall',
      },
      {
        match: [89, 89],
        data: 'Sundown',
      },
      {
        match: [90, 90],
        data: 'Tranquility',
      },
      {
        match: [91, 91],
        data: 'Tyson',
      },
      {
        match: [92, 92],
        data: 'Unity',
      },
      {
        match: [93, 93],
        data: 'Utopia',
      },
      {
        match: [94, 94],
        data: 'Vega',
      },
      {
        match: [95, 95],
        data: 'Vesper',
      },
      {
        match: [96, 96],
        data: 'Wayward',
      },
      {
        match: [97, 97],
        data: 'Welkin',
      },
      {
        match: [98, 98],
        data: 'Wellpsring',
      },
      {
        match: [99, 99],
        data: 'Weyland',
      },
      {
        match: [100, 100],
        data: 'Wreck',
      },
    ],
  },
  location: {
    items: [
      {
        match: [1, 40],
        data: ESLocation.Planetside,
      },
      {
        match: [41, 75],
        data: ESLocation.Orbital,
      },
      {
        match: [76, 100],
        data: ESLocation.Space,
      },
    ],
  },
  population: {
    [ERegion.Terminus]: {
      items: [
        {
          match: [1, 10],
          data: 'Few',
        },
        {
          match: [11, 25],
          data: 'Dozens',
        },
        {
          match: [26, 55],
          data: 'Hundreds',
        },
        {
          match: [56, 85],
          data: 'Thousands',
        },
        {
          match: [86, 100],
          data: 'Tens of thousands',
        },
      ],
    },
    [ERegion.Outlands]: {
      items: [
        {
          match: [1, 15],
          data: 'Few',
        },
        {
          match: [16, 35],
          data: 'Dozens',
        },
        {
          match: [36, 65],
          data: 'Hundreds',
        },
        {
          match: [66, 90],
          data: 'Thousands',
        },
        {
          match: [91, 100],
          data: 'Tens of thousands',
        },
      ],
    },
    [ERegion.Expanse]: {
      items: [
        {
          match: [1, 20],
          data: 'Few',
        },
        {
          match: [21, 50],
          data: 'Dozens',
        },
        {
          match: [51, 80],
          data: 'Hundreds',
        },
        {
          match: [81, 95],
          data: 'Thousands',
        },
        {
          match: [96, 100],
          data: 'Tens of thousands',
        },
      ],
    },
  },
  firstLook: {
    items: [
      {
        match: [1, 3],
        data: 'Beautiful architecture',
      },
      {
        match: [4, 9],
        data: 'Built from organic materials',
      },
      {
        match: [10, 15],
        data: 'Built from random scrap',
      },
      {
        match: [16, 21],
        data: 'Built within repurposed ship',
      },
      {
        match: [22, 26],
        data: 'Built within terrain or asteroid',
      },
      {
        match: [27, 31],
        data: 'Defensible location',
      },
      {
        match: [32, 35],
        data: 'Elevated or multi-level construction',
      },
      {
        match: [36, 40],
        data: 'Hidden or subsurface location',
      },
      {
        match: [41, 43],
        data: 'High-tech construction',
      },
      {
        match: [44, 49],
        data: 'Industrial architecture',
      },
      {
        match: [50, 53],
        data: 'Intimidating defenses',
      },
      {
        match: [54, 56],
        data: 'Moving or transforming',
      },
      {
        match: [57, 61],
        data: 'Obvious social stratification',
      },
      {
        match: [62, 66],
        data: 'Precarious location',
      },
      {
        match: [67, 72],
        data: 'Rustic architecture',
      },
      {
        match: [73, 76],
        data: 'Significant structural damage',
      },
      {
        match: [77, 80],
        data: 'Sprawling or dispersed structures',
      },
      {
        match: [81, 83],
        data: 'Temporary or seasonal location',
      },
      {
        match: [84, 87],
        data: 'Toxic or polluted habitat',
      },
      {
        match: [88, 90],
        data: 'Within or near ▶️Precursor Vault',
      },
      {
        match: [91, 100],
        data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
      },
    ],
  },
  initialContact: {
    items: [
      {
        match: [1, 20],
        data: 'Welcoming',
      },
      {
        match: [21, 30],
        data: 'Neutral / automated',
      },
      {
        match: [31, 50],
        data: 'Wary',
      },
      {
        match: [51, 60],
        data: 'Uncooperative',
      },
      {
        match: [61, 70],
        data: 'Hostile',
      },
      {
        match: [71, 83],
        data: 'Asking for help',
      },
      {
        match: [84, 86],
        data: 'In battle',
      },
      {
        match: [87, 89],
        data: 'Captured',
      },
      {
        match: [90, 92],
        data: 'Unresponsive',
      },
      {
        match: [93, 95],
        data: 'Destroyed',
      },
      {
        match: [96, 100],
        data: '▶️Derelict',
      },
    ],
  },
  authority: {
    items: [
      {
        match: [1, 15],
        data: 'None / lawless',
      },
      {
        match: [16, 30],
        data: 'Ineffectual',
      },
      {
        match: [31, 45],
        data: 'Tolerant',
      },
      {
        match: [46, 55],
        data: 'Fair',
      },
      {
        match: [56, 70],
        data: 'Unyielding',
      },
      {
        match: [71, 85],
        data: 'Corrupt',
      },
      {
        match: [86, 100],
        data: 'Oppressive',
      },
    ],
  },
  projects: {
    items: [
      {
        match: [1, 5],
        data: 'Agriculture',
      },
      {
        match: [6, 7],
        data: 'Archeology',
      },
      {
        match: [8, 9],
        data: 'Automation',
      },
      {
        match: [10, 11],
        data: 'Black market',
      },
      {
        match: [12, 13],
        data: 'Command',
      },
      {
        match: [14, 17],
        data: 'Defense',
      },
      {
        match: [18, 22],
        data: 'Energy',
      },
      {
        match: [23, 25],
        data: 'Engineering',
      },
      {
        match: [26, 27],
        data: 'Entertainment',
      },
      {
        match: [28, 29],
        data: 'Environmentalism',
      },
      {
        match: [30, 31],
        data: 'Evacuation',
      },
      {
        match: [32, 33],
        data: 'Expansion',
      },
      {
        match: [34, 37],
        data: 'Exploration',
      },
      {
        match: [38, 39],
        data: 'Festival',
      },
      {
        match: [40, 41],
        data: 'History',
      },
      {
        match: [42, 43],
        data: 'Hunting',
      },
      {
        match: [44, 46],
        data: 'Manufacturing',
      },
      {
        match: [47, 49],
        data: 'Medical',
      },
      {
        match: [50, 51],
        data: 'Migration',
      },
      {
        match: [52, 57],
        data: 'Mining',
      },
      {
        match: [58, 59],
        data: 'Pacifism',
      },
      {
        match: [60, 62],
        data: 'Raiding',
      },
      {
        match: [63, 65],
        data: 'Research',
      },
      {
        match: [66, 69],
        data: 'Salvage',
      },
      {
        match: [70, 72],
        data: 'Secrecy',
      },
      {
        match: [73, 75],
        data: 'Shipbuilding',
      },
      {
        match: [76, 78],
        data: 'Spirituality',
      },
      {
        match: [79, 84],
        data: 'Subsistence',
      },
      {
        match: [85, 86],
        data: 'Surveillance',
      },
      {
        match: [87, 88],
        data: 'Terraforming',
      },
      {
        match: [89, 92],
        data: 'Trade',
      },
      {
        match: [93, 95],
        data: 'Warfare',
      },
      {
        match: [96, 100],
        data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
      },
    ],
  },
  trouble: {
    items: [
      {
        match: [1, 3],
        data: 'Betrayal from within',
      },
      {
        match: [4, 7],
        data: 'Blocked resource',
      },
      {
        match: [8, 9],
        data: 'Caught in the crossfire',
      },
      {
        match: [10, 13],
        data: 'Changing environment',
      },
      {
        match: [14, 15],
        data: 'Clash of cultures',
      },
      {
        match: [16, 19],
        data: 'Dangerous discovery',
      },
      {
        match: [20, 23],
        data: 'Depleted resource',
      },
      {
        match: [24, 27],
        data: 'Failing technology',
      },
      {
        match: [28, 31],
        data: 'Feuding factions',
      },
      {
        match: [32, 33],
        data: 'Ghostly visitations',
      },
      {
        match: [34, 37],
        data: 'Hazardous environment',
      },
      {
        match: [38, 41],
        data: 'Hostile lifeforms',
      },
      {
        match: [42, 44],
        data: 'Impending attack',
      },
      {
        match: [45, 47],
        data: 'Impending natural disaster',
      },
      {
        match: [48, 49],
        data: 'Invasive nature or lifeform',
      },
      {
        match: [50, 51],
        data: 'Mysterious deaths',
      },
      {
        match: [52, 54],
        data: 'Plagued by sickness',
      },
      {
        match: [55, 57],
        data: 'Preyed upon by raiders',
      },
      {
        match: [58, 59],
        data: 'Revolt against leadership',
      },
      {
        match: [60, 61],
        data: 'Sabotaged technology',
      },
      {
        match: [62, 64],
        data: 'Social strife',
      },
      {
        match: [65, 66],
        data: 'Someone is ill or injured',
      },
      {
        match: [67, 68],
        data: 'Someone is missing',
      },
      {
        match: [69, 70],
        data: 'Stolen technology or object',
      },
      {
        match: [71, 73],
        data: 'Strange phenomenon',
      },
      {
        match: [74, 76],
        data: 'Toxic waste or pollution',
      },
      {
        match: [77, 78],
        data: 'Volatile energy source',
      },
      {
        match: [79, 80],
        data: 'Vulnerable lifeforms',
      },
      {
        match: [81, 90],
        data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
      },
      {
        match: [91, 100],
        data: '[Roll twice]',
      },
    ],
  },
};

export const RollSettlement = (
  region: ERegion,
  location?: ESLocation
): ISettlement => {
  return {
    name: tableRoll(Settlement.name),
    location: location
      ? location
      : (tableRoll(Settlement.location) as ESLocation),
    population: tableRoll(Settlement.population[region]),
    firstLook: tableRoll(Settlement.firstLook),
    initialContact: tableRoll(Settlement.initialContact),
    authority: tableRoll(Settlement.authority),
    projects: tableRoll(Settlement.projects),
    trouble: tableRoll(Settlement.trouble),
  };
};
