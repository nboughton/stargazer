import { ISFTable } from 'src/components/models';

export const Faction: { [index: string]: ISFTable } = {
  type: {
    items: [
      {
        match: [1, 40],
        data: 'Dominion',
      },
      {
        match: [41, 70],
        data: 'Guild',
      },
      {
        match: [71, 100],
        data: 'Fringe Group',
      },
    ],
  },
  influence: {
    items: [
      {
        match: [1, 10],
        data: 'Forsaken',
      },
      {
        match: [11, 30],
        data: 'Isolated',
      },
      {
        match: [31, 50],
        data: 'Localized',
      },
      {
        match: [51, 70],
        data: 'Established',
      },
      {
        match: [71, 85],
        data: 'Notable',
      },
      {
        match: [86, 95],
        data: 'Dominant',
      },
      {
        match: [96, 100],
        data: 'Inescapable',
      },
    ],
  },
  dominion: {
    items: [
      {
        match: [1, 5],
        data: 'Agriculture',
      },
      {
        match: [6, 9],
        data: 'Artistry',
      },
      {
        match: [10, 14],
        data: 'Commerce',
      },
      {
        match: [15, 18],
        data: 'Conquest',
      },
      {
        match: [19, 22],
        data: 'Construction',
      },
      {
        match: [23, 26],
        data: 'Diplomacy',
      },
      {
        match: [27, 30],
        data: 'Education',
      },
      {
        match: [31, 34],
        data: 'Environmentalism',
      },
      {
        match: [35, 38],
        data: 'Exploration',
      },
      {
        match: [39, 42],
        data: 'Faith',
      },
      {
        match: [43, 46],
        data: 'History',
      },
      {
        match: [47, 50],
        data: 'Honor',
      },
      {
        match: [51, 55],
        data: 'Industry',
      },
      {
        match: [56, 59],
        data: 'Isolationism',
      },
      {
        match: [60, 63],
        data: 'Law',
      },
      {
        match: [64, 67],
        data: 'Mysticism',
      },
      {
        match: [68, 71],
        data: 'Pacifism',
      },
      {
        match: [72, 75],
        data: 'Prophecy',
      },
      {
        match: [76, 79],
        data: 'Science',
      },
      {
        match: [80, 83],
        data: 'Secrecy',
      },
      {
        match: [84, 87],
        data: 'Technology',
      },
      {
        match: [88, 91],
        data: 'Treachery',
      },
      {
        match: [92, 96],
        data: 'Warfare',
      },
      {
        match: [97, 100],
        data: 'Wealth',
      },
    ],
  },
  leadership: {
    items: [
      {
        match: [1, 5],
        data: 'Anarchist',
      },
      {
        match: [6, 15],
        data: 'Disputed leadership',
      },
      {
        match: [16, 30],
        data: 'Authoritarian dictatorship',
      },
      {
        match: [31, 45],
        data: 'Oligarchical elite',
      },
      {
        match: [46, 60],
        data: 'Dynastic lineage',
      },
      {
        match: [61, 70],
        data: 'Fated or prophesied leader',
      },
      {
        match: [71, 80],
        data: 'Clan chiefs or elders',
      },
      {
        match: [81, 90],
        data: 'Elected representatives',
      },
      {
        match: [91, 95],
        data: 'Machine intelligence',
      },
      {
        match: [96, 100],
        data: 'Varied / decentralized',
      },
    ],
  },
  guild: {
    items: [
      {
        match: [1, 5],
        data: 'Assassins',
      },
      {
        match: [6, 10],
        data: 'Bounty Hunters',
      },
      {
        match: [11, 15],
        data: 'Couriers',
      },
      {
        match: [16, 20],
        data: 'Courtesans',
      },
      {
        match: [21, 25],
        data: 'Engineers',
      },
      {
        match: [26, 30],
        data: 'Healers',
      },
      {
        match: [31, 40],
        data: 'Industrialists',
      },
      {
        match: [41, 50],
        data: 'Mercenaries',
      },
      {
        match: [51, 60],
        data: 'Merchants',
      },
      {
        match: [61, 65],
        data: 'Mystics',
      },
      {
        match: [66, 75],
        data: 'Navigators',
      },
      {
        match: [76, 80],
        data: 'Peacekeepers',
      },
      {
        match: [81, 85],
        data: 'Researchers',
      },
      {
        match: [86, 90],
        data: 'Spies',
      },
      {
        match: [91, 100],
        data: 'Roll twice',
      },
    ],
  },
  fringe_group: {
    items: [
      {
        match: [1, 5],
        data: 'Cultists',
      },
      {
        match: [6, 15],
        data: 'Exiles',
      },
      {
        match: [16, 25],
        data: 'Gangsters',
      },
      {
        match: [26, 35],
        data: 'Hackers',
      },
      {
        match: [36, 40],
        data: 'Monster hunters',
      },
      {
        match: [41, 50],
        data: 'Pirates',
      },
      {
        match: [51, 60],
        data: 'Raiders',
      },
      {
        match: [61, 70],
        data: 'Rebels',
      },
      {
        match: [71, 75],
        data: 'Rogue AI',
      },
      {
        match: [76, 85],
        data: 'Scavengers',
      },
      {
        match: [86, 95],
        data: 'Smugglers',
      },
      {
        match: [96, 100],
        data: 'Roll twice',
      },
    ],
  },
  projects: {
    items: [
      {
        match: [1, 3],
        data: 'Broaden scope of the faction to include a new focus',
      },
      {
        match: [4, 6],
        data: 'Build or secure a powerful device',
      },
      {
        match: [7, 9],
        data: 'Consolidate control of a valuable commodity',
      },
      {
        match: [10, 12],
        data: 'Destroy or defeat a rival',
      },
      {
        match: [13, 15],
        data: 'Disrupt the operations of a rival',
      },
      {
        match: [16, 18],
        data: 'Escape the control of another faction or power',
      },
      {
        match: [19, 21],
        data: 'Establish a monument or memorial',
      },
      {
        match: [22, 24],
        data: 'Establish a safe refuge or headquarters',
      },
      {
        match: [25, 27],
        data: 'Expand operations to a new location or sector',
      },
      {
        match: [28, 30],
        data: 'Form an alliance',
      },
      {
        match: [31, 33],
        data: 'Fulfill a prophecy',
      },
      {
        match: [34, 36],
        data: 'Give aid to a faction',
      },
      {
        match: [37, 39],
        data: 'Harness unnatural or forbidden power',
      },
      {
        match: [40, 42],
        data: 'Hunt down a rogue asset',
      },
      {
        match: [43, 45],
        data: 'Incite conflict among rivals',
      },
      {
        match: [46, 48],
        data: 'Negotiate an agreement',
      },
      {
        match: [49, 51],
        data: 'Obtain a needed commodity',
      },
      {
        match: [52, 54],
        data: 'Obtain an important cultural artifact',
      },
      {
        match: [55, 57],
        data: 'Obtain crucial data or information',
      },
      {
        match: [58, 60],
        data: 'Obtain incriminating information about a rival',
      },
      {
        match: [61, 63],
        data: 'Prevent a prophecy',
      },
      {
        match: [64, 66],
        data: 'Put down an internal revolt or rebellion',
      },
      {
        match: [67, 69],
        data: 'Repay a debt',
      },
      {
        match: [70, 72],
        data: 'Rescue or recover a group or asset',
      },
      {
        match: [73, 75],
        data: 'Research an innovation',
      },
      {
        match: [76, 78],
        data: 'Resolve a conflict with another faction',
      },
      {
        match: [79, 81],
        data: 'Reunite splintered elements of the faction',
      },
      {
        match: [82, 84],
        data: 'Seize a powerful artifact or valuable treasure',
      },
      {
        match: [85, 87],
        data: 'Seize rival territory or operations',
      },
      {
        match: [88, 90],
        data: 'Subsume another faction',
      },
      {
        match: [91, 93],
        data: 'Transport a valued asset',
      },
      {
        match: [94, 96],
        data: 'Usurp leadership within a rival faction',
      },
      {
        match: [97, 100],
        data: 'Action + Theme',
      },
    ],
  },
  relationships: {
    items: [
      {
        match: [1, 4],
        data: 'Antagonistic towards',
      },
      {
        match: [5, 8],
        data: 'Apathetic or unaware of',
      },
      {
        match: [9, 11],
        data: 'Betrayed by',
      },
      {
        match: [12, 14],
        data: 'Broke faith with',
      },
      {
        match: [15, 18],
        data: 'Distrustful of',
      },
      {
        match: [19, 22],
        data: 'Does business with',
      },
      {
        match: [23, 25],
        data: 'Extorted by',
      },
      {
        match: [26, 29],
        data: 'Holds contempt for',
      },
      {
        match: [30, 33],
        data: 'Holds leverage over',
      },
      {
        match: [34, 36],
        data: 'In control of',
      },
      {
        match: [37, 40],
        data: 'Maneuvering against',
      },
      {
        match: [41, 44],
        data: 'Needs aid from',
      },
      {
        match: [45, 47],
        data: 'Negotiating with',
      },
      {
        match: [48, 51],
        data: 'Open alliance with',
      },
      {
        match: [52, 54],
        data: 'Owes a debt to',
      },
      {
        match: [55, 58],
        data: 'Shares a rivalry with',
      },
      {
        match: [59, 61],
        data: 'Shares power with',
      },
      {
        match: [62, 64],
        data: 'Shows respect for',
      },
      {
        match: [65, 67],
        data: 'Splintered from',
      },
      {
        match: [68, 70],
        data: 'Subordinate to',
      },
      {
        match: [71, 74],
        data: 'Supplied with resources by',
      },
      {
        match: [75, 78],
        data: 'Supplies resources to',
      },
      {
        match: [79, 81],
        data: 'Temporary alliance with',
      },
      {
        match: [82, 85],
        data: 'Tolerates',
      },
      {
        match: [86, 89],
        data: 'Trades favors with',
      },
      {
        match: [90, 92],
        data: 'Unjustly accused by',
      },
      {
        match: [93, 96],
        data: 'Warring with',
      },
      {
        match: [97, 100],
        data: 'Roll twice',
      },
    ],
  },
  name_template: {
    items: [
      {
        match: [1, 40],
        data: '[Legacy] [Affiliation]',
      },
      {
        match: [41, 55],
        data: '[Legacy] [Identity]',
      },
      {
        match: [56, 70],
        data: '[Identity] of the [Legacy] [Affiliation]',
      },
      {
        match: [71, 100],
        data: '[Affiliation] of the [Legacy] [Identity]',
      },
    ],
  },
  legacy: {
    items: [
      {
        match: [1, 2],
        data: 'Ancient',
      },
      {
        match: [3, 4],
        data: 'Ashen',
      },
      {
        match: [5, 6],
        data: 'Awakened',
      },
      {
        match: [7, 8],
        data: 'Azure',
      },
      {
        match: [9, 10],
        data: 'Blessed',
      },
      {
        match: [11, 12],
        data: 'Bloody',
      },
      {
        match: [13, 14],
        data: 'Broken',
      },
      {
        match: [15, 16],
        data: 'Ceaseless',
      },
      {
        match: [17, 18],
        data: 'Stellar',
      },
      {
        match: [19, 20],
        data: 'Crimson',
      },
      {
        match: [21, 22],
        data: 'Cursed',
      },
      {
        match: [23, 24],
        data: 'Dawning',
      },
      {
        match: [25, 26],
        data: 'Dissident',
      },
      {
        match: [27, 28],
        data: 'Ebon',
      },
      {
        match: [29, 30],
        data: 'Elder',
      },
      {
        match: [31, 32],
        data: 'Enduring',
      },
      {
        match: [33, 34],
        data: 'Enlightened',
      },
      {
        match: [35, 36],
        data: 'Exalted',
      },
      {
        match: [37, 38],
        data: 'Fallen',
      },
      {
        match: [39, 40],
        data: 'Fated',
      },
      {
        match: [41, 42],
        data: 'First',
      },
      {
        match: [43, 44],
        data: 'Forgotten',
      },
      {
        match: [45, 46],
        data: 'Forsaken',
      },
      {
        match: [47, 48],
        data: 'Gloaming',
      },
      {
        match: [49, 50],
        data: 'Golden',
      },
      {
        match: [51, 52],
        data: 'Hidden',
      },
      {
        match: [53, 54],
        data: 'Infernal',
      },
      {
        match: [55, 56],
        data: 'Infinite',
      },
      {
        match: [57, 58],
        data: 'Iron',
      },
      {
        match: [59, 60],
        data: 'Kindred',
      },
      {
        match: [61, 62],
        data: 'Obsidian',
      },
      {
        match: [63, 64],
        data: 'Radiant',
      },
      {
        match: [65, 66],
        data: 'Risen',
      },
      {
        match: [67, 68],
        data: 'Sacred',
      },
      {
        match: [69, 70],
        data: 'Sapphire',
      },
      {
        match: [71, 72],
        data: 'Scarlet',
      },
      {
        match: [73, 74],
        data: 'Serene',
      },
      {
        match: [75, 76],
        data: 'Shattered',
      },
      {
        match: [77, 78],
        data: 'Shining',
      },
      {
        match: [79, 80],
        data: 'Silent',
      },
      {
        match: [81, 82],
        data: 'Silver',
      },
      {
        match: [83, 84],
        data: 'Sovereign',
      },
      {
        match: [85, 86],
        data: 'Sundered',
      },
      {
        match: [87, 88],
        data: 'Supreme',
      },
      {
        match: [89, 90],
        data: 'Undying',
      },
      {
        match: [91, 92],
        data: 'Unified',
      },
      {
        match: [93, 94],
        data: 'United',
      },
      {
        match: [95, 96],
        data: 'Universal',
      },
      {
        match: [97, 98],
        data: 'Veiled',
      },
      {
        match: [99, 100],
        data: 'Wandering',
      },
    ],
  },
  affiliation: {
    items: [
      {
        match: [1, 4],
        data: 'Accord',
      },
      {
        match: [5, 8],
        data: 'Alliance',
      },
      {
        match: [9, 12],
        data: 'Ascendancy',
      },
      {
        match: [13, 16],
        data: 'Circle',
      },
      {
        match: [17, 20],
        data: 'Coalition',
      },
      {
        match: [21, 24],
        data: 'Collective',
      },
      {
        match: [25, 28],
        data: 'Commonwealth',
      },
      {
        match: [29, 32],
        data: 'Confederation',
      },
      {
        match: [33, 36],
        data: 'Consortium',
      },
      {
        match: [37, 40],
        data: 'Council',
      },
      {
        match: [41, 44],
        data: 'Court',
      },
      {
        match: [45, 48],
        data: 'Covenant',
      },
      {
        match: [49, 52],
        data: 'Dominion',
      },
      {
        match: [53, 56],
        data: 'Empire',
      },
      {
        match: [57, 60],
        data: 'Federation',
      },
      {
        match: [61, 64],
        data: 'Imperium',
      },
      {
        match: [65, 68],
        data: 'League',
      },
      {
        match: [69, 72],
        data: 'Legion',
      },
      {
        match: [73, 76],
        data: 'Order',
      },
      {
        match: [77, 80],
        data: 'Pact',
      },
      {
        match: [81, 84],
        data: 'Regiment',
      },
      {
        match: [85, 88],
        data: 'Republic',
      },
      {
        match: [89, 92],
        data: 'Sphere',
      },
      {
        match: [93, 96],
        data: 'Syndicate',
      },
      {
        match: [97, 100],
        data: 'Union',
      },
    ],
  },
  identity: {
    items: [
      {
        match: [1, 2],
        data: 'Blades',
      },
      {
        match: [3, 4],
        data: 'Builders',
      },
      {
        match: [5, 6],
        data: 'Daggers',
      },
      {
        match: [7, 8],
        data: 'Defenders',
      },
      {
        match: [9, 10],
        data: 'Disciples',
      },
      {
        match: [11, 12],
        data: 'Domains',
      },
      {
        match: [13, 14],
        data: 'Drifters',
      },
      {
        match: [15, 16],
        data: 'Embers',
      },
      {
        match: [17, 18],
        data: 'Flames',
      },
      {
        match: [19, 20],
        data: 'Fleet',
      },
      {
        match: [21, 22],
        data: 'Guardians',
      },
      {
        match: [23, 24],
        data: 'Hammers',
      },
      {
        match: [25, 26],
        data: 'Harbingers',
      },
      {
        match: [27, 28],
        data: 'Heralds',
      },
      {
        match: [29, 30],
        data: 'Hounds',
      },
      {
        match: [31, 32],
        data: 'Hunters',
      },
      {
        match: [33, 34],
        data: 'Jackals',
      },
      {
        match: [35, 36],
        data: 'Keepers',
      },
      {
        match: [37, 38],
        data: 'Knights',
      },
      {
        match: [39, 40],
        data: 'Menders',
      },
      {
        match: [41, 42],
        data: 'Outcasts',
      },
      {
        match: [43, 44],
        data: 'Phantoms',
      },
      {
        match: [45, 46],
        data: 'Planets',
      },
      {
        match: [47, 48],
        data: 'Raiders',
      },
      {
        match: [49, 50],
        data: 'Ravens',
      },
      {
        match: [51, 52],
        data: 'Realms',
      },
      {
        match: [53, 54],
        data: 'Reavers',
      },
      {
        match: [55, 56],
        data: 'Relics',
      },
      {
        match: [57, 58],
        data: 'Seekers',
      },
      {
        match: [59, 60],
        data: 'Sentinels',
      },
      {
        match: [61, 62],
        data: 'Serpents',
      },
      {
        match: [63, 64],
        data: 'Servants',
      },
      {
        match: [65, 66],
        data: 'Shadows',
      },
      {
        match: [67, 68],
        data: 'Shards',
      },
      {
        match: [69, 70],
        data: 'Skulls',
      },
      {
        match: [71, 72],
        data: 'Souls',
      },
      {
        match: [73, 74],
        data: 'Specters',
      },
      {
        match: [75, 76],
        data: 'Stars',
      },
      {
        match: [77, 78],
        data: 'Suns',
      },
      {
        match: [79, 80],
        data: 'Swarm',
      },
      {
        match: [81, 82],
        data: 'Swords',
      },
      {
        match: [83, 84],
        data: 'Talons',
      },
      {
        match: [85, 86],
        data: 'Vanguards',
      },
      {
        match: [87, 88],
        data: 'Wardens',
      },
      {
        match: [89, 90],
        data: 'Watchers',
      },
      {
        match: [91, 92],
        data: 'Wolves',
      },
      {
        match: [93, 94],
        data: 'Worlds',
      },
      {
        match: [95, 96],
        data: 'Wraiths',
      },
      {
        match: [97, 98],
        data: 'Wreckers',
      },
      {
        match: [99, 100],
        data: 'Wrights',
      },
    ],
  },
  quirks: {
    items: [
      {
        match: [1, 3],
        data: 'Advocates individualism',
      },
      {
        match: [4, 6],
        data: 'Ancient or coded language',
      },
      {
        match: [7, 9],
        data: 'Animal or creature motif used as a faction symbol',
      },
      {
        match: [10, 12],
        data: 'Banishes the disloyal',
      },
      {
        match: [13, 15],
        data: 'Body augmentations are respected and valued',
      },
      {
        match: [16, 18],
        data: 'Body ornamentations signify castes or roles',
      },
      {
        match: [19, 21],
        data: 'Dependent on an addictive substance',
      },
      {
        match: [22, 24],
        data: 'Distinctive or elaborate clothing',
      },
      {
        match: [25, 27],
        data: 'Elite soldiers provide defense or serve as bodyguards',
      },
      {
        match: [28, 30],
        data: 'Favors a signature weapon',
      },
      {
        match: [31, 33],
        data: 'Guided by superstition or prophecy',
      },
      {
        match: [34, 36],
        data: 'Heavily stratified social structure',
      },
      {
        match: [37, 39],
        data: 'Hoards precursor artifacts',
      },
      {
        match: [40, 42],
        data: 'Honors the fallen through unusual death rites',
      },
      {
        match: [43, 45],
        data: 'Idolizes a long-dead founder or martyr',
      },
      {
        match: [46, 48],
        data: 'Keeps exhaustive records or archives',
      },
      {
        match: [49, 51],
        data: 'Lives off-planet in spaceborne fleets',
      },
      {
        match: [52, 54],
        data: 'Members take a new name when joining the faction',
      },
      {
        match: [55, 57],
        data: 'Nomadic people and mobile operations',
      },
      {
        match: [58, 60],
        data: 'Operates under strict codes or laws',
      },
      {
        match: [61, 63],
        data: 'Recognizes others through a distinctive greeting or gesture',
      },
      {
        match: [64, 66],
        data: 'Reliant on machine intelligence',
      },
      {
        match: [67, 69],
        data: 'Resolves disputes through formal duels',
      },
      {
        match: [70, 72],
        data: 'Rites of adulthood or ascension',
      },
      {
        match: [73, 75],
        data: 'Shuns or distrusts machine intelligence',
      },
      {
        match: [76, 78],
        data: 'Starships share a distinctive and recognizable profile',
      },
      {
        match: [79, 81],
        data: 'Suspicious of outsiders',
      },
      {
        match: [82, 84],
        data: 'Symbiotic relationship with a specific creature',
      },
      {
        match: [85, 87],
        data: 'Trades in a unique currency',
      },
      {
        match: [88, 90],
        data: 'Trains in a demanding physical discipline or martial art',
      },
      {
        match: [91, 93],
        data: 'Wields unnatural abilities or strange technologies',
      },
      {
        match: [94, 96],
        data: 'Work or environments cause mutations',
      },
      {
        match: [97, 100],
        data: 'Action + Theme',
      },
    ],
  },
  rumors: {
    items: [
      {
        match: [1, 3],
        data: 'Caught in the crossfire of feuding factions',
      },
      {
        match: [4, 6],
        data: 'Colluding with a criminal enterprise',
      },
      {
        match: [7, 9],
        data: 'Corrupted by a dangerous power',
      },
      {
        match: [10, 12],
        data: 'Critical resource is in short supply',
      },
      {
        match: [13, 15],
        data: 'Defenses are overextended',
      },
      {
        match: [16, 18],
        data: 'Developing revolutionary technology',
      },
      {
        match: [19, 21],
        data: 'Digital systems are corrupted or infiltrated',
      },
      {
        match: [22, 24],
        data: 'Heavily in debt',
      },
      {
        match: [25, 27],
        data: 'Hit hard by a recent attack or calamity',
      },
      {
        match: [28, 30],
        data: 'Holds a powerful artifact',
      },
      {
        match: [31, 33],
        data: 'Holds incriminating information against a leader or faction',
      },
      {
        match: [34, 36],
        data: 'Hording a valuable commodity',
      },
      {
        match: [37, 39],
        data: 'Infiltrated by a rival faction',
      },
      {
        match: [40, 42],
        data: 'Knows the location of a fabled treasure or lost technology',
      },
      {
        match: [43, 45],
        data: 'Leaders are haunted by a dark prophecy',
      },
      {
        match: [46, 48],
        data: 'Leaders are incompetent',
      },
      {
        match: [49, 51],
        data: 'Leaders are puppets of another power or faction',
      },
      {
        match: [52, 54],
        data: 'Lesser members of the leadership are plotting a coup',
      },
      {
        match: [55, 57],
        data: 'New belief or religion is creating a schism among members',
      },
      {
        match: [58, 60],
        data: 'Operations are a false front for their true purpose',
      },
      {
        match: [61, 63],
        data: 'Overdependence on a failing or vulnerable technology',
      },
      {
        match: [64, 66],
        data: 'Plagued by infighting and low morale',
      },
      {
        match: [67, 69],
        data: 'Plotting to betray an allied faction',
      },
      {
        match: [70, 72],
        data: 'Preparing a major offensive or operation',
      },
      {
        match: [73, 75],
        data: 'Pulling the strings of a leader or faction',
      },
      {
        match: [76, 78],
        data: 'Recently acquired an unexpected fortune',
      },
      {
        match: [79, 81],
        data: 'Secretly supporting a reviled faction',
      },
      {
        match: [82, 84],
        data: 'Sheltering an infamous or dangerous fugitive',
      },
      {
        match: [85, 87],
        data: 'Suffered destructive sabotage from within',
      },
      {
        match: [88, 90],
        data: 'Suffering a shortage of key workers or personnel',
      },
      {
        match: [91, 93],
        data: 'Uprising or revolt is brewing from within',
      },
      {
        match: [94, 96],
        data: 'Vulnerable to attack or aggression',
      },
      {
        match: [97, 100],
        data: 'Action + Theme',
      },
    ],
  },
};
