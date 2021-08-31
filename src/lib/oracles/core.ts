import { ISFTable } from 'src/components/models';
import { tableRoll } from '../roll';

export const Core: { [index: string]: ISFTable } = {
  action: {
    items: [
      {
        match: [1],
        data: 'Abandon',
      },
      {
        match: [2],
        data: 'Acquire',
      },
      {
        match: [3],
        data: 'Advance',
      },
      {
        match: [4],
        data: 'Affect',
      },
      {
        match: [5],
        data: 'Aid',
      },
      {
        match: [6],
        data: 'Arrive',
      },
      {
        match: [7],
        data: 'Assault',
      },
      {
        match: [8],
        data: 'Attack',
      },
      {
        match: [9],
        data: 'Avenge',
      },
      {
        match: [10],
        data: 'Avoid',
      },
      {
        match: [11],
        data: 'Await',
      },
      {
        match: [12],
        data: 'Begin',
      },
      {
        match: [13],
        data: 'Betray',
      },
      {
        match: [14],
        data: 'Bolster',
      },
      {
        match: [15],
        data: 'Breach',
      },
      {
        match: [16],
        data: 'Break',
      },
      {
        match: [17],
        data: 'Capture',
      },
      {
        match: [18],
        data: 'Challenge',
      },
      {
        match: [19],
        data: 'Change',
      },
      {
        match: [20],
        data: 'Charge',
      },
      {
        match: [21],
        data: 'Clash',
      },
      {
        match: [22],
        data: 'Command',
      },
      {
        match: [23],
        data: 'Communicate',
      },
      {
        match: [24],
        data: 'Construct',
      },
      {
        match: [25],
        data: 'Control',
      },
      {
        match: [26],
        data: 'Coordinate',
      },
      {
        match: [27],
        data: 'Create',
      },
      {
        match: [28],
        data: 'Debate',
      },
      {
        match: [29],
        data: 'Defeat',
      },
      {
        match: [30],
        data: 'Defend',
      },
      {
        match: [31],
        data: 'Deflect',
      },
      {
        match: [32],
        data: 'Defy',
      },
      {
        match: [33],
        data: 'Deliver',
      },
      {
        match: [34],
        data: 'Demand',
      },
      {
        match: [35],
        data: 'Depart',
      },
      {
        match: [36],
        data: 'Destroy',
      },
      {
        match: [37],
        data: 'Distract',
      },
      {
        match: [38],
        data: 'Eliminate',
      },
      {
        match: [39],
        data: 'Endure',
      },
      {
        match: [40],
        data: 'Escalate',
      },
      {
        match: [41],
        data: 'Escort',
      },
      {
        match: [42],
        data: 'Evade',
      },
      {
        match: [43],
        data: 'Explore',
      },
      {
        match: [44],
        data: 'Falter',
      },
      {
        match: [45],
        data: 'Find',
      },
      {
        match: [46],
        data: 'Finish',
      },
      {
        match: [47],
        data: 'Focus',
      },
      {
        match: [48],
        data: 'Follow',
      },
      {
        match: [49],
        data: 'Fortify',
      },
      {
        match: [50],
        data: 'Gather',
      },
      {
        match: [51],
        data: 'Guard',
      },
      {
        match: [52],
        data: 'Hide',
      },
      {
        match: [53],
        data: 'Hold',
      },
      {
        match: [54],
        data: 'Hunt',
      },
      {
        match: [55],
        data: 'Impress',
      },
      {
        match: [56],
        data: 'Initiate',
      },
      {
        match: [57],
        data: 'Inspect',
      },
      {
        match: [58],
        data: 'Investigate',
      },
      {
        match: [59],
        data: 'Journey',
      },
      {
        match: [60],
        data: 'Learn',
      },
      {
        match: [61],
        data: 'Leave',
      },
      {
        match: [62],
        data: 'Locate',
      },
      {
        match: [63],
        data: 'Lose',
      },
      {
        match: [64],
        data: 'Manipulate',
      },
      {
        match: [65],
        data: 'Mourn',
      },
      {
        match: [66],
        data: 'Move',
      },
      {
        match: [67],
        data: 'Oppose',
      },
      {
        match: [68],
        data: 'Overwhelm',
      },
      {
        match: [69],
        data: 'Persevere',
      },
      {
        match: [70],
        data: 'Preserve',
      },
      {
        match: [71],
        data: 'Protect',
      },
      {
        match: [72],
        data: 'Raid',
      },
      {
        match: [73],
        data: 'Reduce',
      },
      {
        match: [74],
        data: 'Refuse',
      },
      {
        match: [75],
        data: 'Reject',
      },
      {
        match: [76],
        data: 'Release',
      },
      {
        match: [77],
        data: 'Remove',
      },
      {
        match: [78],
        data: 'Research',
      },
      {
        match: [79],
        data: 'Resist',
      },
      {
        match: [80],
        data: 'Restore',
      },
      {
        match: [81],
        data: 'Reveal',
      },
      {
        match: [82],
        data: 'Risk',
      },
      {
        match: [83],
        data: 'Scheme',
      },
      {
        match: [84],
        data: 'Search',
      },
      {
        match: [85],
        data: 'Secure',
      },
      {
        match: [86],
        data: 'Seize',
      },
      {
        match: [87],
        data: 'Serve',
      },
      {
        match: [88],
        data: 'Share',
      },
      {
        match: [89],
        data: 'Strengthen',
      },
      {
        match: [90],
        data: 'Summon',
      },
      {
        match: [91],
        data: 'Support',
      },
      {
        match: [92],
        data: 'Suppress',
      },
      {
        match: [93],
        data: 'Surrender',
      },
      {
        match: [94],
        data: 'Swear',
      },
      {
        match: [95],
        data: 'Threaten',
      },
      {
        match: [96],
        data: 'Transform',
      },
      {
        match: [97],
        data: 'Uncover',
      },
      {
        match: [98],
        data: 'Uphold',
      },
      {
        match: [99],
        data: 'Weaken',
      },
      {
        match: [100],
        data: 'Withdraw',
      },
    ],
  },
  theme: {
    items: [
      {
        match: [1],
        data: 'Ability',
      },
      {
        match: [2],
        data: 'Advantage',
      },
      {
        match: [3],
        data: 'Alliance',
      },
      {
        match: [4],
        data: 'Authority',
      },
      {
        match: [5],
        data: 'Balance',
      },
      {
        match: [6],
        data: 'Barrier',
      },
      {
        match: [7],
        data: 'Belief',
      },
      {
        match: [8],
        data: 'Blood',
      },
      {
        match: [9],
        data: 'Bond',
      },
      {
        match: [10],
        data: 'Burden',
      },
      {
        match: [11],
        data: 'Commerce',
      },
      {
        match: [12],
        data: 'Community',
      },
      {
        match: [13],
        data: 'Corruption',
      },
      {
        match: [14],
        data: 'Creation',
      },
      {
        match: [15],
        data: 'Crime',
      },
      {
        match: [16],
        data: 'Culture',
      },
      {
        match: [17],
        data: 'Cure',
      },
      {
        match: [18],
        data: 'Danger',
      },
      {
        match: [19],
        data: 'Death',
      },
      {
        match: [20],
        data: 'Debt',
      },
      {
        match: [21],
        data: 'Decay',
      },
      {
        match: [22],
        data: 'Deception',
      },
      {
        match: [23],
        data: 'Defense',
      },
      {
        match: [24],
        data: 'Destiny',
      },
      {
        match: [25],
        data: 'Disaster',
      },
      {
        match: [26],
        data: 'Discovery',
      },
      {
        match: [27],
        data: 'Disease',
      },
      {
        match: [28],
        data: 'Dominion',
      },
      {
        match: [29],
        data: 'Dream',
      },
      {
        match: [30],
        data: 'Duty',
      },
      {
        match: [31],
        data: 'Enemy',
      },
      {
        match: [32],
        data: 'Expedition',
      },
      {
        match: [33],
        data: 'Faction',
      },
      {
        match: [34],
        data: 'Fame',
      },
      {
        match: [35],
        data: 'Family',
      },
      {
        match: [36],
        data: 'Fear',
      },
      {
        match: [37],
        data: 'Fellowship',
      },
      {
        match: [38],
        data: 'Freedom',
      },
      {
        match: [39],
        data: 'Greed',
      },
      {
        match: [40],
        data: 'Hardship',
      },
      {
        match: [41],
        data: 'Hate',
      },
      {
        match: [42],
        data: 'Health',
      },
      {
        match: [43],
        data: 'History',
      },
      {
        match: [44],
        data: 'Home',
      },
      {
        match: [45],
        data: 'Honor',
      },
      {
        match: [46],
        data: 'Hope',
      },
      {
        match: [47],
        data: 'Humanity',
      },
      {
        match: [48],
        data: 'Innocence',
      },
      {
        match: [49],
        data: 'Knowledge',
      },
      {
        match: [50],
        data: 'Labor',
      },
      {
        match: [51],
        data: 'Language',
      },
      {
        match: [52],
        data: 'Law',
      },
      {
        match: [53],
        data: 'Legacy',
      },
      {
        match: [54],
        data: 'Life',
      },
      {
        match: [55],
        data: 'Love',
      },
      {
        match: [56],
        data: 'Memory',
      },
      {
        match: [57],
        data: 'Nature',
      },
      {
        match: [58],
        data: 'Opportunity',
      },
      {
        match: [59],
        data: 'Passage',
      },
      {
        match: [60],
        data: 'Peace',
      },
      {
        match: [61],
        data: 'Phenomenon',
      },
      {
        match: [62],
        data: 'Possession',
      },
      {
        match: [63],
        data: 'Power',
      },
      {
        match: [64],
        data: 'Price',
      },
      {
        match: [65],
        data: 'Pride',
      },
      {
        match: [66],
        data: 'Prize',
      },
      {
        match: [67],
        data: 'Prophesy',
      },
      {
        match: [68],
        data: 'Protection',
      },
      {
        match: [69],
        data: 'Quest',
      },
      {
        match: [70],
        data: 'Relationship',
      },
      {
        match: [71],
        data: 'Religion',
      },
      {
        match: [72],
        data: 'Reputation',
      },
      {
        match: [73],
        data: 'Resource',
      },
      {
        match: [74],
        data: 'Revenge',
      },
      {
        match: [75],
        data: 'Rival',
      },
      {
        match: [76],
        data: 'Rumor',
      },
      {
        match: [77],
        data: 'Safety',
      },
      {
        match: [78],
        data: 'Sanctuary',
      },
      {
        match: [79],
        data: 'Secret',
      },
      {
        match: [80],
        data: 'Solution',
      },
      {
        match: [81],
        data: 'Spirit',
      },
      {
        match: [82],
        data: 'Stranger',
      },
      {
        match: [83],
        data: 'Strategy',
      },
      {
        match: [84],
        data: 'Strength',
      },
      {
        match: [85],
        data: 'Superstition',
      },
      {
        match: [86],
        data: 'Supply',
      },
      {
        match: [87],
        data: 'Survival',
      },
      {
        match: [88],
        data: 'Technology',
      },
      {
        match: [89],
        data: 'Time',
      },
      {
        match: [90],
        data: 'Tool',
      },
      {
        match: [91],
        data: 'Trade',
      },
      {
        match: [92],
        data: 'Truth',
      },
      {
        match: [93],
        data: 'Vengeance',
      },
      {
        match: [94],
        data: 'Vow',
      },
      {
        match: [95],
        data: 'War',
      },
      {
        match: [96],
        data: 'Warning',
      },
      {
        match: [97],
        data: 'Weakness',
      },
      {
        match: [98],
        data: 'Wealth',
      },
      {
        match: [99],
        data: 'Weapon',
      },
      {
        match: [100],
        data: 'World',
      },
    ],
  },
  focus: {
    items: [
      {
        match: [1],
        data: 'AI',
      },
      {
        match: [2],
        data: 'Alarm',
      },
      {
        match: [3],
        data: 'Anomaly',
      },
      {
        match: [4],
        data: 'Apparition',
      },
      {
        match: [5],
        data: 'Archive',
      },
      {
        match: [6],
        data: 'Art',
      },
      {
        match: [7],
        data: 'Artifact',
      },
      {
        match: [8],
        data: 'Atmosphere',
      },
      {
        match: [9],
        data: 'Battleground',
      },
      {
        match: [10],
        data: 'Beacon',
      },
      {
        match: [11],
        data: 'Being',
      },
      {
        match: [12],
        data: 'Blockade',
      },
      {
        match: [13],
        data: 'Boundary',
      },
      {
        match: [14],
        data: 'Cache',
      },
      {
        match: [15],
        data: 'Cargo',
      },
      {
        match: [16],
        data: 'Commodity',
      },
      {
        match: [17],
        data: 'Confinement',
      },
      {
        match: [18],
        data: 'Container',
      },
      {
        match: [19],
        data: 'Creature',
      },
      {
        match: [20],
        data: 'Crossing',
      },
      {
        match: [21],
        data: 'Data',
      },
      {
        match: [22],
        data: 'Debris',
      },
      {
        match: [23],
        data: 'Device',
      },
      {
        match: [24],
        data: 'Dimension',
      },
      {
        match: [25],
        data: 'Ecosystem',
      },
      {
        match: [26],
        data: 'Enclosure',
      },
      {
        match: [27],
        data: 'Energy',
      },
      {
        match: [28],
        data: 'Environment',
      },
      {
        match: [29],
        data: 'Equipment',
      },
      {
        match: [30],
        data: 'Facility',
      },
      {
        match: [31],
        data: 'Fleet',
      },
      {
        match: [32],
        data: 'Force',
      },
      {
        match: [33],
        data: 'Fortification',
      },
      {
        match: [34],
        data: 'Fuel',
      },
      {
        match: [35],
        data: 'Gas',
      },
      {
        match: [36],
        data: 'Grave',
      },
      {
        match: [37],
        data: 'Gravity',
      },
      {
        match: [38],
        data: 'Habitat',
      },
      {
        match: [39],
        data: 'Hazard',
      },
      {
        match: [40],
        data: 'Hideaway',
      },
      {
        match: [41],
        data: 'Home',
      },
      {
        match: [42],
        data: 'Illusion',
      },
      {
        match: [43],
        data: 'Industry',
      },
      {
        match: [44],
        data: 'Lair',
      },
      {
        match: [45],
        data: 'Lifeform',
      },
      {
        match: [46],
        data: 'Liquid',
      },
      {
        match: [47],
        data: 'Machine',
      },
      {
        match: [48],
        data: 'Material',
      },
      {
        match: [49],
        data: 'Mechanism',
      },
      {
        match: [50],
        data: 'Message',
      },
      {
        match: [51],
        data: 'Mineral',
      },
      {
        match: [52],
        data: 'Monument',
      },
      {
        match: [53],
        data: 'Network',
      },
      {
        match: [54],
        data: 'Obstacle',
      },
      {
        match: [55],
        data: 'Orbit',
      },
      {
        match: [56],
        data: 'Organism',
      },
      {
        match: [57],
        data: 'Path',
      },
      {
        match: [58],
        data: 'People',
      },
      {
        match: [59],
        data: 'Person',
      },
      {
        match: [60],
        data: 'Plant',
      },
      {
        match: [61],
        data: 'Portal',
      },
      {
        match: [62],
        data: 'Probe',
      },
      {
        match: [63],
        data: 'Reality',
      },
      {
        match: [64],
        data: 'Recording',
      },
      {
        match: [65],
        data: 'Refuge',
      },
      {
        match: [66],
        data: 'Relic',
      },
      {
        match: [67],
        data: 'Remains',
      },
      {
        match: [68],
        data: 'Rendezvous',
      },
      {
        match: [69],
        data: 'Resource',
      },
      {
        match: [70],
        data: 'Route',
      },
      {
        match: [71],
        data: 'Ruins',
      },
      {
        match: [72],
        data: 'Salvage',
      },
      {
        match: [73],
        data: 'Sector',
      },
      {
        match: [74],
        data: 'Settlement',
      },
      {
        match: [75],
        data: 'Shelter',
      },
      {
        match: [76],
        data: 'Shortcut',
      },
      {
        match: [77],
        data: 'Signal',
      },
      {
        match: [78],
        data: 'Sound',
      },
      {
        match: [79],
        data: 'Spacetime',
      },
      {
        match: [80],
        data: 'Starship',
      },
      {
        match: [81],
        data: 'Station',
      },
      {
        match: [82],
        data: 'Storage',
      },
      {
        match: [83],
        data: 'Storm',
      },
      {
        match: [84],
        data: 'Structure',
      },
      {
        match: [85],
        data: 'Supply',
      },
      {
        match: [86],
        data: 'Symbol',
      },
      {
        match: [87],
        data: 'System',
      },
      {
        match: [88],
        data: 'Technology',
      },
      {
        match: [89],
        data: 'Terrain',
      },
      {
        match: [90],
        data: 'Territory',
      },
      {
        match: [91],
        data: 'Transportation',
      },
      {
        match: [92],
        data: 'Trap',
      },
      {
        match: [93],
        data: 'Treasure',
      },
      {
        match: [94],
        data: 'Vault',
      },
      {
        match: [95],
        data: 'Vehicle',
      },
      {
        match: [96],
        data: 'Viewpoint',
      },
      {
        match: [97],
        data: 'Void',
      },
      {
        match: [98],
        data: 'Weapon',
      },
      {
        match: [99],
        data: 'World',
      },
      {
        match: [100],
        data: 'Wreckage',
      },
    ],
  },
  descriptor: {
    items: [
      {
        match: [1],
        data: 'Abandoned',
      },
      {
        match: [2],
        data: 'Abundant',
      },
      {
        match: [3],
        data: 'Active',
      },
      {
        match: [4],
        data: 'Advanced',
      },
      {
        match: [5],
        data: 'Alien',
      },
      {
        match: [6],
        data: 'Ancient',
      },
      {
        match: [7],
        data: 'Archaic',
      },
      {
        match: [8],
        data: 'Automated',
      },
      {
        match: [9],
        data: 'Barren',
      },
      {
        match: [10],
        data: 'Biological',
      },
      {
        match: [11],
        data: 'Blighted',
      },
      {
        match: [12],
        data: 'Blocked',
      },
      {
        match: [13],
        data: 'Breached',
      },
      {
        match: [14],
        data: 'Broken',
      },
      {
        match: [15],
        data: 'Captured',
      },
      {
        match: [16],
        data: 'Chaotic',
      },
      {
        match: [17],
        data: 'Civilized',
      },
      {
        match: [18],
        data: 'Collapsed',
      },
      {
        match: [19],
        data: 'Colossal',
      },
      {
        match: [20],
        data: 'Confined',
      },
      {
        match: [21],
        data: 'Conspicuous',
      },
      {
        match: [22],
        data: 'Constructed',
      },
      {
        match: [23],
        data: 'Contested',
      },
      {
        match: [24],
        data: 'Corrupted',
      },
      {
        match: [25],
        data: 'Created',
      },
      {
        match: [26],
        data: 'Damaged',
      },
      {
        match: [27],
        data: 'Dead',
      },
      {
        match: [28],
        data: 'Deadly',
      },
      {
        match: [29],
        data: 'Decaying',
      },
      {
        match: [30],
        data: 'Defended',
      },
      {
        match: [31],
        data: 'Depleted',
      },
      {
        match: [32],
        data: 'Desolate',
      },
      {
        match: [33],
        data: 'Destroyed',
      },
      {
        match: [34],
        data: 'Diverse',
      },
      {
        match: [35],
        data: 'Empty',
      },
      {
        match: [36],
        data: 'Engulfed',
      },
      {
        match: [37],
        data: 'Ensnaring',
      },
      {
        match: [38],
        data: 'Expansive',
      },
      {
        match: [39],
        data: 'Exposed',
      },
      {
        match: [40],
        data: 'Fiery',
      },
      {
        match: [41],
        data: 'Foreboding',
      },
      {
        match: [42],
        data: 'Forgotten',
      },
      {
        match: [43],
        data: 'Forsaken',
      },
      {
        match: [44],
        data: 'Fortified',
      },
      {
        match: [45],
        data: 'Foul',
      },
      {
        match: [46],
        data: 'Fragile',
      },
      {
        match: [47],
        data: 'Frozen',
      },
      {
        match: [48],
        data: 'Functional',
      },
      {
        match: [49],
        data: 'Grim',
      },
      {
        match: [50],
        data: 'Guarded',
      },
      {
        match: [51],
        data: 'Haunted',
      },
      {
        match: [52],
        data: 'Hidden',
      },
      {
        match: [53],
        data: 'High-Tech',
      },
      {
        match: [54],
        data: 'Hoarded',
      },
      {
        match: [55],
        data: 'Hostile',
      },
      {
        match: [56],
        data: 'Immersed',
      },
      {
        match: [57],
        data: 'Inaccessible',
      },
      {
        match: [58],
        data: 'Infested',
      },
      {
        match: [59],
        data: 'Inhabited',
      },
      {
        match: [60],
        data: 'Isolated',
      },
      {
        match: [61],
        data: 'Living',
      },
      {
        match: [62],
        data: 'Lost',
      },
      {
        match: [63],
        data: 'Lush',
      },
      {
        match: [64],
        data: 'Makeshift',
      },
      {
        match: [65],
        data: 'Mechanical',
      },
      {
        match: [66],
        data: 'Misleading',
      },
      {
        match: [67],
        data: 'Moving',
      },
      {
        match: [68],
        data: 'Mysterious',
      },
      {
        match: [69],
        data: 'Natural',
      },
      {
        match: [70],
        data: 'New',
      },
      {
        match: [71],
        data: 'Obscured',
      },
      {
        match: [72],
        data: 'Open',
      },
      {
        match: [73],
        data: 'Peaceful',
      },
      {
        match: [74],
        data: 'Perilous',
      },
      {
        match: [75],
        data: 'Pillaged',
      },
      {
        match: [76],
        data: 'Powerful',
      },
      {
        match: [77],
        data: 'Preserved',
      },
      {
        match: [78],
        data: 'Prominent',
      },
      {
        match: [79],
        data: 'Protected',
      },
      {
        match: [80],
        data: 'Radiant',
      },
      {
        match: [81],
        data: 'Rare',
      },
      {
        match: [82],
        data: 'Remote',
      },
      {
        match: [83],
        data: 'Rich',
      },
      {
        match: [84],
        data: 'Ruined',
      },
      {
        match: [85],
        data: 'Sacred',
      },
      {
        match: [86],
        data: 'Safe',
      },
      {
        match: [87],
        data: 'Sealed',
      },
      {
        match: [88],
        data: 'Secret',
      },
      {
        match: [89],
        data: 'Settled',
      },
      {
        match: [90],
        data: 'Stolen',
      },
      {
        match: [91],
        data: 'Strange',
      },
      {
        match: [92],
        data: 'Subsurface',
      },
      {
        match: [93],
        data: 'Toxic',
      },
      {
        match: [94],
        data: 'Trapped',
      },
      {
        match: [95],
        data: 'Undiscovered',
      },
      {
        match: [96],
        data: 'Unnatural',
      },
      {
        match: [97],
        data: 'Unstable',
      },
      {
        match: [98],
        data: 'Untamed',
      },
      {
        match: [99],
        data: 'Valuable',
      },
      {
        match: [100],
        data: 'Violent',
      },
    ],
  },
};

export const ActTheme = (): string => {
  return tableRoll(Core.action) + ' ' + tableRoll(Core.theme);
};

export const DescFoc = (): string => {
  return tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus);
};
