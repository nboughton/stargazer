import {
  ECoreCombo,
  ERegion,
  IStarship,
  IStarshipOracle,
} from 'src/components/models';
import { tableRoll } from 'src/lib/roll';

export const Starship: IStarshipOracle = {
  name: {
    items: [
      {
        match: [1, 1],
        data: 'Arclight',
      },
      {
        match: [2, 2],
        data: 'Argent Arrow',
      },
      {
        match: [3, 3],
        data: 'Artemis',
      },
      {
        match: [4, 4],
        data: 'Astral Explorer',
      },
      {
        match: [5, 5],
        data: 'Atlas',
      },
      {
        match: [6, 6],
        data: 'Aurora',
      },
      {
        match: [7, 7],
        data: "Avari's Wake",
      },
      {
        match: [8, 8],
        data: "Banshee's Cry",
      },
      {
        match: [9, 9],
        data: 'Beowulf',
      },
      {
        match: [10, 10],
        data: 'Bloody Jaw',
      },
      {
        match: [11, 11],
        data: 'Broken Sword',
      },
      {
        match: [12, 12],
        data: 'Buccaneer',
      },
      {
        match: [13, 13],
        data: 'Cerelis Nine',
      },
      {
        match: [14, 14],
        data: 'Clarion Call',
      },
      {
        match: [15, 15],
        data: "Dawn's Herald",
      },
      {
        match: [16, 16],
        data: 'Dead Reckoning',
      },
      {
        match: [17, 17],
        data: 'Drift Runner',
      },
      {
        match: [18, 18],
        data: 'Eclipse',
      },
      {
        match: [19, 19],
        data: 'Elara Five',
      },
      {
        match: [20, 20],
        data: 'Enchantress',
      },
      {
        match: [21, 21],
        data: 'Endurance',
      },
      {
        match: [22, 22],
        data: 'Excalibur',
      },
      {
        match: [23, 23],
        data: 'Eye of the Void',
      },
      {
        match: [24, 24],
        data: 'Fall of Icarus',
      },
      {
        match: [25, 25],
        data: 'Fallen Light',
      },
      {
        match: [26, 26],
        data: 'False Hope',
      },
      {
        match: [27, 27],
        data: 'Firebreak',
      },
      {
        match: [28, 28],
        data: 'First Light',
      },
      {
        match: [29, 29],
        data: 'Forge Flier',
      },
      {
        match: [30, 30],
        data: "Fortune's Favor",
      },
      {
        match: [31, 31],
        data: 'Freya’s Wrath',
      },
      {
        match: [32, 32],
        data: 'Ghost',
      },
      {
        match: [33, 33],
        data: 'Guiding Star',
      },
      {
        match: [34, 34],
        data: 'Hand of Fate',
      },
      {
        match: [35, 35],
        data: 'Herald of Doom',
      },
      {
        match: [36, 36],
        data: 'Implacable',
      },
      {
        match: [37, 37],
        data: 'Implicit',
      },
      {
        match: [38, 38],
        data: 'Inferno',
      },
      {
        match: [39, 39],
        data: 'Invictus',
      },
      {
        match: [40, 40],
        data: 'Iron Cairn',
      },
      {
        match: [41, 41],
        data: "Karena's Reverie",
      },
      {
        match: [42, 42],
        data: 'Kraken',
      },
      {
        match: [43, 43],
        data: "Kuno's Hammer",
      },
      {
        match: [44, 44],
        data: 'Lightline',
      },
      {
        match: [45, 45],
        data: 'Lodestar',
      },
      {
        match: [46, 46],
        data: 'Long Haul',
      },
      {
        match: [47, 47],
        data: 'Lost Fortune',
      },
      {
        match: [48, 48],
        data: 'Luminous Sorrow',
      },
      {
        match: [49, 49],
        data: 'Manta',
      },
      {
        match: [50, 50],
        data: 'Mercy',
      },
      {
        match: [51, 51],
        data: 'Mutara',
      },
      {
        match: [52, 52],
        data: 'Nebula Prowler',
      },
      {
        match: [53, 53],
        data: "Newton's Folly",
      },
      {
        match: [54, 54],
        data: 'Nightfall',
      },
      {
        match: [55, 55],
        data: 'Nomad',
      },
      {
        match: [56, 56],
        data: 'Obsidian Trident',
      },
      {
        match: [57, 57],
        data: 'Onslaught',
      },
      {
        match: [58, 58],
        data: 'Orca',
      },
      {
        match: [59, 59],
        data: 'Outward Bound',
      },
      {
        match: [60, 60],
        data: 'Phantom',
      },
      {
        match: [61, 61],
        data: 'Photon',
      },
      {
        match: [62, 62],
        data: 'Poltergeist',
      },
      {
        match: [63, 63],
        data: 'Profit Margin',
      },
      {
        match: [64, 64],
        data: "Raven's Call",
      },
      {
        match: [65, 65],
        data: "Raya's Promise",
      },
      {
        match: [66, 66],
        data: 'Reaper',
      },
      {
        match: [67, 67],
        data: 'Reforged Hope',
      },
      {
        match: [68, 68],
        data: 'Relentless',
      },
      {
        match: [69, 69],
        data: 'Royal Signet',
      },
      {
        match: [70, 70],
        data: 'Rubicon',
      },
      {
        match: [71, 71],
        data: "Sareea's Tribute",
      },
      {
        match: [72, 72],
        data: 'Second Chance',
      },
      {
        match: [73, 73],
        data: 'Shard of the Sun',
      },
      {
        match: [74, 74],
        data: 'Shattered Siege',
      },
      {
        match: [75, 75],
        data: 'Shattered Star',
      },
      {
        match: [76, 76],
        data: 'Silver Talon',
      },
      {
        match: [77, 77],
        data: 'Smoldering Flame',
      },
      {
        match: [78, 78],
        data: 'Sovereign Skies',
      },
      {
        match: [79, 79],
        data: 'Sparrowhawk',
      },
      {
        match: [80, 80],
        data: 'Stardust',
      },
      {
        match: [81, 81],
        data: 'Starfall',
      },
      {
        match: [82, 82],
        data: 'Stellar Hawk',
      },
      {
        match: [83, 83],
        data: 'Stormswept',
      },
      {
        match: [84, 84],
        data: 'Sundered Aegis',
      },
      {
        match: [85, 85],
        data: 'Sundown',
      },
      {
        match: [86, 86],
        data: 'Sureshot',
      },
      {
        match: [87, 87],
        data: 'Terminus Clipper',
      },
      {
        match: [88, 88],
        data: 'Terrapin',
      },
      {
        match: [89, 89],
        data: 'Timber Wolf',
      },
      {
        match: [90, 90],
        data: 'Tip of the Spear',
      },
      {
        match: [91, 91],
        data: 'Titan',
      },
      {
        match: [92, 92],
        data: 'Tormentor',
      },
      {
        match: [93, 93],
        data: 'Trithia Six',
      },
      {
        match: [94, 94],
        data: 'Ultraviolet',
      },
      {
        match: [95, 95],
        data: "Valora's Comet",
      },
      {
        match: [96, 96],
        data: 'Vengeance',
      },
      {
        match: [97, 97],
        data: 'Venture',
      },
      {
        match: [98, 98],
        data: 'Vigilant',
      },
      {
        match: [99, 99],
        data: 'Voidtreader',
      },
      {
        match: [100, 100],
        data: 'Vulture',
      },
    ],
  },
  class: {
    items: [
      {
        match: [1, 2],
        data: 'Carrier',
      },
      {
        match: [3, 6],
        data: 'Corvette',
      },
      {
        match: [7, 11],
        data: 'Courier',
      },
      {
        match: [12, 14],
        data: 'Cruiser',
      },
      {
        match: [15, 16],
        data: 'Dreadnought',
      },
      {
        match: [17, 19],
        data: 'Escape pod',
      },
      {
        match: [20, 22],
        data: 'Foundry',
      },
      {
        match: [23, 27],
        data: 'Harvester',
      },
      {
        match: [28, 33],
        data: 'Hauler',
      },
      {
        match: [34, 36],
        data: 'Hunter',
      },
      {
        match: [37, 38],
        data: 'Ironhome',
      },
      {
        match: [39, 42],
        data: 'Mender',
      },
      {
        match: [43, 47],
        data: 'Outbounder',
      },
      {
        match: [48, 50],
        data: 'Pennant',
      },
      {
        match: [51, 56],
        data: 'Prospector',
      },
      {
        match: [57, 61],
        data: 'Reclaimer',
      },
      {
        match: [62, 64],
        data: 'Shuttle',
      },
      {
        match: [65, 67],
        data: 'Snub fighter',
      },
      {
        match: [68, 82],
        data: 'Multipurpose',
      },
      {
        match: [83, 84],
        data: 'Unusual or unknown',
      },
      {
        match: [85, 94],
        data: '▶️Fleet',
      },
      {
        match: [95, 100],
        data: 'Ships in conflict (Roll twice)',
      },
    ],
  },
  fleet: {
    items: [
      {
        match: [1, 10],
        data: 'Battle fleet',
      },
      {
        match: [11, 25],
        data: 'Pirate wing',
      },
      {
        match: [26, 35],
        data: 'Raider horde',
      },
      {
        match: [36, 50],
        data: 'Salvager hive',
      },
      {
        match: [51, 60],
        data: 'Settler caravan',
      },
      {
        match: [61, 70],
        data: 'Trade caravan',
      },
      {
        match: [71, 90],
        data: 'Transport and escorts',
      },
      {
        match: [91, 100],
        data: '▶️Starship Mission',
      },
    ],
  },
  initialContact: {
    items: [
      {
        match: [1, 3],
        data: 'Familiar',
      },
      {
        match: [4, 15],
        data: 'Friendly',
      },
      {
        match: [16, 25],
        data: 'Neutral / automated',
      },
      {
        match: [26, 35],
        data: 'Wary',
      },
      {
        match: [36, 40],
        data: 'Dismissive',
      },
      {
        match: [41, 50],
        data: 'Uncooperative',
      },
      {
        match: [51, 65],
        data: 'Hostile',
      },
      {
        match: [66, 80],
        data: 'Asking for help',
      },
      {
        match: [81, 85],
        data: 'In battle',
      },
      {
        match: [86, 90],
        data: 'Unresponsive',
      },
      {
        match: [91, 95],
        data: 'Destroyed',
      },
      {
        match: [96, 100],
        data: '▶️Derelict',
      },
    ],
  },
  firstLook: {
    items: [
      {
        match: [1, 4],
        data: 'Abnormal sensor readings',
      },
      {
        match: [5, 8],
        data: 'Brightly painted',
      },
      {
        match: [9, 13],
        data: 'Bristling with weapons',
      },
      {
        match: [14, 18],
        data: 'Dark or stealthy',
      },
      {
        match: [19, 23],
        data: 'Heavy armor',
      },
      {
        match: [24, 28],
        data: 'Immobile',
      },
      {
        match: [29, 33],
        data: 'Intimidating profile',
      },
      {
        match: [34, 37],
        data: 'Large sensor arrays',
      },
      {
        match: [38, 41],
        data: 'Leaking radiation',
      },
      {
        match: [42, 45],
        data: 'Low-profile or disguised',
      },
      {
        match: [46, 49],
        data: 'Modern or advanced design',
      },
      {
        match: [50, 54],
        data: 'Obsolete design',
      },
      {
        match: [55, 59],
        data: 'Obvious damage',
      },
      {
        match: [60, 63],
        data: 'Biological components',
      },
      {
        match: [64, 67],
        data: 'Ornate markings',
      },
      {
        match: [68, 71],
        data: 'Oversized engines',
      },
      {
        match: [72, 75],
        data: 'Prominent guild emblem',
      },
      {
        match: [76, 80],
        data: 'Refitted or repurposed hull',
      },
      {
        match: [81, 85],
        data: 'Scarred hull',
      },
      {
        match: [86, 90],
        data: 'Built from scrap',
      },
      {
        match: [91, 94],
        data: 'Towing or linked',
      },
      {
        match: [95, 100],
        data: ECoreCombo.DescFoc,
      },
    ],
  },
  mission: {
    [ERegion.Terminus]: {
      items: [
        {
          match: [1, 3],
          data: 'Blockade a location',
        },
        {
          match: [4, 6],
          data: 'Break a blockade',
        },
        {
          match: [7, 9],
          data: 'Collect a resource',
        },
        {
          match: [10, 11],
          data: 'Command others',
        },
        {
          match: [12, 14],
          data: 'Conduct diplomacy',
        },
        {
          match: [15, 17],
          data: 'Conduct espionage',
        },
        {
          match: [18, 20],
          data: 'Conduct piracy',
        },
        {
          match: [21, 23],
          data: 'Conduct research',
        },
        {
          match: [24, 26],
          data: 'Defend against an attack',
        },
        {
          match: [27, 29],
          data: 'Deliver messages or data',
        },
        {
          match: [30, 32],
          data: 'Establish a settlement',
        },
        {
          match: [33, 35],
          data: 'Evacuate a location',
        },
        {
          match: [36, 37],
          data: 'Explore a region',
        },
        {
          match: [38, 39],
          data: 'Hold prisoners',
        },
        {
          match: [40, 42],
          data: 'Hunt down another ship',
        },
        {
          match: [43, 45],
          data: 'Launch an attack',
        },
        {
          match: [46, 48],
          data: 'Patrol an area',
        },
        {
          match: [49, 51],
          data: 'Provide medical aid',
        },
        {
          match: [52, 54],
          data: 'Provide repairs',
        },
        {
          match: [55, 57],
          data: 'Provide shelter',
        },
        {
          match: [58, 59],
          data: 'Quarantine a danger',
        },
        {
          match: [60, 62],
          data: 'Raid a settlement',
        },
        {
          match: [63, 65],
          data: 'Resupply a settlement',
        },
        {
          match: [66, 68],
          data: 'Retrieve salvage',
        },
        {
          match: [69, 71],
          data: 'Search and rescue',
        },
        {
          match: [72, 74],
          data: 'Smuggle cargo',
        },
        {
          match: [75, 77],
          data: 'Survey a site',
        },
        {
          match: [78, 79],
          data: 'Test a technology',
        },
        {
          match: [80, 82],
          data: 'Transport cargo',
        },
        {
          match: [83, 85],
          data: 'Transport passengers',
        },
        {
          match: [86, 90],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
    [ERegion.Outlands]: {
      items: [
        {
          match: [1, 2],
          data: 'Blockade a location',
        },
        {
          match: [3, 4],
          data: 'Break a blockade',
        },
        {
          match: [5, 7],
          data: 'Collect a resource',
        },
        {
          match: [8, 9],
          data: 'Command others',
        },
        {
          match: [10, 11],
          data: 'Conduct diplomacy',
        },
        {
          match: [12, 13],
          data: 'Conduct espionage',
        },
        {
          match: [14, 16],
          data: 'Conduct piracy',
        },
        {
          match: [17, 20],
          data: 'Conduct research',
        },
        {
          match: [21, 24],
          data: 'Defend against an attack',
        },
        {
          match: [25, 28],
          data: 'Deliver messages or data',
        },
        {
          match: [29, 32],
          data: 'Establish a settlement',
        },
        {
          match: [33, 36],
          data: 'Evacuate a location',
        },
        {
          match: [37, 40],
          data: 'Explore a region',
        },
        {
          match: [41, 42],
          data: 'Hold prisoners',
        },
        {
          match: [43, 45],
          data: 'Hunt down another ship',
        },
        {
          match: [46, 48],
          data: 'Launch an attack',
        },
        {
          match: [49, 50],
          data: 'Patrol an area',
        },
        {
          match: [51, 53],
          data: 'Provide medical aid',
        },
        {
          match: [54, 56],
          data: 'Provide repairs',
        },
        {
          match: [57, 59],
          data: 'Provide shelter',
        },
        {
          match: [60, 61],
          data: 'Quarantine a danger',
        },
        {
          match: [62, 64],
          data: 'Raid a settlement',
        },
        {
          match: [65, 68],
          data: 'Resupply a settlement',
        },
        {
          match: [69, 71],
          data: 'Retrieve salvage',
        },
        {
          match: [72, 73],
          data: 'Search and rescue',
        },
        {
          match: [74, 75],
          data: 'Smuggle cargo',
        },
        {
          match: [76, 78],
          data: 'Survey a site',
        },
        {
          match: [79, 80],
          data: 'Test a technology',
        },
        {
          match: [81, 83],
          data: 'Transport cargo',
        },
        {
          match: [84, 85],
          data: 'Transport passengers',
        },
        {
          match: [86, 90],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
    [ERegion.Expanse]: {
      items: [
        {
          match: [1, 2],
          data: 'Blockade a location',
        },
        {
          match: [3, 4],
          data: 'Break a blockade',
        },
        {
          match: [5, 8],
          data: 'Collect a resource',
        },
        {
          match: [9, 10],
          data: 'Command others',
        },
        {
          match: [11, 12],
          data: 'Conduct diplomacy',
        },
        {
          match: [13, 14],
          data: 'Conduct espionage',
        },
        {
          match: [15, 16],
          data: 'Conduct piracy',
        },
        {
          match: [17, 22],
          data: 'Conduct research',
        },
        {
          match: [23, 25],
          data: 'Defend against an attack',
        },
        {
          match: [26, 29],
          data: 'Deliver messages or data',
        },
        {
          match: [30, 35],
          data: 'Establish a settlement',
        },
        {
          match: [36, 39],
          data: 'Evacuate a location',
        },
        {
          match: [40, 45],
          data: 'Explore a region',
        },
        {
          match: [46, 47],
          data: 'Hold prisoners',
        },
        {
          match: [48, 49],
          data: 'Hunt down another ship',
        },
        {
          match: [50, 51],
          data: 'Launch an attack',
        },
        {
          match: [52, 53],
          data: 'Patrol an area',
        },
        {
          match: [54, 55],
          data: 'Provide medical aid',
        },
        {
          match: [56, 57],
          data: 'Provide repairs',
        },
        {
          match: [58, 61],
          data: 'Provide shelter',
        },
        {
          match: [62, 63],
          data: 'Quarantine a danger',
        },
        {
          match: [64, 65],
          data: 'Raid a settlement',
        },
        {
          match: [66, 69],
          data: 'Resupply a settlement',
        },
        {
          match: [70, 71],
          data: 'Retrieve salvage',
        },
        {
          match: [72, 73],
          data: 'Search and rescue',
        },
        {
          match: [74, 75],
          data: 'Smuggle cargo',
        },
        {
          match: [76, 77],
          data: 'Survey a site',
        },
        {
          match: [78, 79],
          data: 'Test a technology',
        },
        {
          match: [80, 83],
          data: 'Transport cargo',
        },
        {
          match: [84, 85],
          data: 'Transport passengers',
        },
        {
          match: [86, 90],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [91, 100],
          data: '[Roll twice]',
        },
      ],
    },
  },
};

export const RollStarship = (region: ERegion): IStarship => {
  return {
    name: tableRoll(Starship.name),
    class: tableRoll(Starship.class),
    fleet: tableRoll(Starship.fleet),
    initialContact: tableRoll(Starship.initialContact),
    firstLook: tableRoll(Starship.firstLook),
    mission: tableRoll(Starship.mission[region]),
  };
};
