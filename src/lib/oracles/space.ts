import {
  ERegion,
  ESighting,
  ISpaceOracle,
  ISFTable,
} from 'src/components/models';
import { tableRoll } from '../roll';

export const Space: ISpaceOracle = {
  sighting: {
    [ERegion.Terminus]: {
      items: [
        {
          match: [1, 15],
          data: ESighting.StellarObject, // Table
        },
        {
          match: [16, 35],
          data: ESighting.Planet, // Oracle Collection
        },
        {
          match: [36, 40],
          data: ESighting.Settlement,
        },
        {
          match: [41, 47],
          data: ESighting.Starship,
        },
        {
          match: [48, 51],
          data: ESighting.Derelict,
        },
        {
          match: [52, 53],
          data: ESighting.Vault,
        },
        {
          match: [54, 55],
          data: ESighting.Creature,
        },
        {
          match: [56, 60],
          data: ESighting.DescFoc,
        },
        {
          match: [61, 65],
          data: ESighting.DFMineral,
        },
        {
          match: [66, 68],
          data: ESighting.DFFrozen,
        },
        {
          match: [69, 70],
          data: ESighting.DFCrystal,
        },
        {
          match: [71, 72],
          data: ESighting.DFBoneyard,
        },
        {
          match: [73, 74],
          data: ESighting.DFMetal,
        },
        {
          match: [75, 76],
          data: ESighting.Asteroid,
        },
        {
          match: [77, 78],
          data: ESighting.Comet,
        },
        {
          match: [79, 81],
          data: ESighting.EStorm,
        },
        {
          match: [82, 83],
          data: ESighting.MStorm,
        },
        {
          match: [84, 85],
          data: ESighting.Wave,
        },
        {
          match: [86, 93],
          data: ESighting.Cloud,
        },
        {
          match: [94, 98],
          data: ESighting.R2,
        },
        {
          match: [99, 100],
          data: ESighting.R3,
        },
      ],
    },

    [ERegion.Outlands]: {
      items: [
        {
          match: [1, 15],
          data: ESighting.StellarObject, // Table
        },
        {
          match: [16, 35],
          data: ESighting.Planet, // Oracle Collection
        },
        {
          match: [36, 38],
          data: ESighting.Settlement,
        },
        {
          match: [39, 43],
          data: ESighting.Starship,
        },
        {
          match: [44, 46],
          data: ESighting.Derelict,
        },
        {
          match: [47, 49],
          data: ESighting.Vault,
        },
        {
          match: [50, 52],
          data: ESighting.Creature,
        },
        {
          match: [53, 58],
          data: ESighting.DescFoc,
        },
        {
          match: [59, 63],
          data: ESighting.DFMineral,
        },
        {
          match: [64, 66],
          data: ESighting.DFFrozen,
        },
        {
          match: [67, 68],
          data: ESighting.DFCrystal,
        },
        {
          match: [69, 70],
          data: ESighting.DFBoneyard,
        },
        {
          match: [71, 72],
          data: ESighting.DFMetal,
        },
        {
          match: [73, 74],
          data: ESighting.Asteroid,
        },
        {
          match: [75, 76],
          data: ESighting.Comet,
        },
        {
          match: [77, 80],
          data: ESighting.EStorm,
        },
        {
          match: [81, 82],
          data: ESighting.MStorm,
        },
        {
          match: [83, 85],
          data: ESighting.Wave,
        },
        {
          match: [86, 93],
          data: ESighting.Cloud,
        },
        {
          match: [94, 98],
          data: ESighting.R2,
        },
        {
          match: [99, 100],
          data: ESighting.R3,
        },
      ],
    },

    [ERegion.Expanse]: {
      items: [
        {
          match: [1, 15],
          data: ESighting.StellarObject, // Table
        },
        {
          match: [16, 35],
          data: ESighting.Planet, // Oracle Collection
        },
        {
          match: [36, 37],
          data: ESighting.Settlement,
        },
        {
          match: [38, 39],
          data: ESighting.Starship,
        },
        {
          match: [40, 41],
          data: ESighting.Derelict,
        },
        {
          match: [42, 45],
          data: ESighting.Vault,
        },
        {
          match: [46, 49],
          data: ESighting.Creature,
        },
        {
          match: [50, 56],
          data: ESighting.DescFoc,
        },
        {
          match: [57, 61],
          data: ESighting.DFMineral,
        },
        {
          match: [62, 64],
          data: ESighting.DFFrozen,
        },
        {
          match: [65, 66],
          data: ESighting.DFCrystal,
        },
        {
          match: [67, 68],
          data: ESighting.DFBoneyard,
        },
        {
          match: [69, 70],
          data: ESighting.DFMetal,
        },
        {
          match: [71, 72],
          data: ESighting.Asteroid,
        },
        {
          match: [73, 74],
          data: ESighting.Comet,
        },
        {
          match: [75, 79],
          data: ESighting.EStorm,
        },
        {
          match: [80, 81],
          data: ESighting.MStorm,
        },
        {
          match: [82, 85],
          data: ESighting.Wave,
        },
        {
          match: [86, 93],
          data: ESighting.Cloud,
        },
        {
          match: [94, 98],
          data: ESighting.R2,
        },
        {
          match: [99, 100],
          data: ESighting.R3,
        },
      ],
    },
  },

  stellarObject: {
    items: [
      {
        match: [1, 15],
        data: 'Smoldering red star',
      },
      {
        match: [16, 30],
        data: 'Glowing orange star',
      },
      {
        match: [31, 45],
        data: 'Burning yellow star',
      },
      {
        match: [46, 50],
        data: 'Blazing blue star',
      },
      {
        match: [51, 60],
        data: 'Young star incubating in a molecular cloud',
      },
      {
        match: [61, 70],
        data: 'White dwarf shining with spectral light',
      },
      {
        match: [71, 75],
        data: 'Corrupted star radiating with unnatural light',
      },
      {
        match: [76, 80],
        data: 'Neutron star surrounded by intense magnetic fields',
      },
      {
        match: [81, 85],
        data: 'Two stars in close orbit connected by fiery tendrils of energy',
      },
      {
        match: [86, 90],
        data: 'Black hole, allows nothing to escape -not even light',
      },
      {
        match: [91, 98],
        data: 'Hypergiant star generating turbulent solar winds',
      },
      {
        match: [99],
        data: 'Artificial star constructed by a long-dead civilization',
      },
      {
        match: [100],
        data: 'Unstable star showing signs of impending supernova',
      },
    ],
  },

  sectorPrefix: {
    items: [
      {
        match: [1, 2],
        data: 'Accursed',
      },
      {
        match: [3, 4],
        data: 'Ashen',
      },
      {
        match: [5, 6],
        data: 'Asteria',
      },
      {
        match: [7, 8],
        data: 'Bitter',
      },
      {
        match: [9, 10],
        data: 'Blighted',
      },
      {
        match: [11, 12],
        data: 'Bloodied',
      },
      {
        match: [13, 14],
        data: 'Boundless',
      },
      {
        match: [15, 16],
        data: 'Burning',
      },
      {
        match: [17, 18],
        data: 'Cortana',
      },
      {
        match: [19, 20],
        data: 'Corvus',
      },
      {
        match: [21, 22],
        data: 'Crimson',
      },
      {
        match: [23, 24],
        data: 'Cygnus',
      },
      {
        match: [25, 26],
        data: 'Delphi',
      },
      {
        match: [27, 28],
        data: 'Delphian',
      },
      {
        match: [29, 30],
        data: "Devil's",
      },
      {
        match: [31, 32],
        data: 'Ebon',
      },
      {
        match: [33, 34],
        data: 'Essus',
      },
      {
        match: [35, 36],
        data: 'Fallen',
      },
      {
        match: [37, 38],
        data: 'Ferrous',
      },
      {
        match: [39, 40],
        data: "Fool's",
      },
      {
        match: [41, 42],
        data: 'Forgotten',
      },
      {
        match: [43, 44],
        data: 'Haunted',
      },
      {
        match: [45, 46],
        data: 'Hidden',
      },
      {
        match: [47, 48],
        data: 'Hollow',
      },
      {
        match: [49, 50],
        data: 'Igneous',
      },
      {
        match: [51, 52],
        data: 'Infernal',
      },
      {
        match: [53, 54],
        data: 'Invidia',
      },
      {
        match: [55, 56],
        data: 'Iron',
      },
      {
        match: [57, 58],
        data: 'Kalidas',
      },
      {
        match: [59, 60],
        data: 'Kronos',
      },
      {
        match: [61, 62],
        data: 'Lacuna',
      },
      {
        match: [63, 64],
        data: 'Lumen',
      },
      {
        match: [65, 66],
        data: 'Mobius',
      },
      {
        match: [67, 68],
        data: 'Morien',
      },
      {
        match: [69, 70],
        data: 'Onyx',
      },
      {
        match: [71, 72],
        data: 'Outer',
      },
      {
        match: [73, 74],
        data: 'Sanguis',
      },
      {
        match: [75, 76],
        data: 'Scarred',
      },
      {
        match: [77, 78],
        data: 'Scorched',
      },
      {
        match: [79, 80],
        data: 'Shattered',
      },
      {
        match: [81, 82],
        data: 'Shrouded',
      },
      {
        match: [83, 84],
        data: 'Sindri',
      },
      {
        match: [85, 86],
        data: 'Solana',
      },
      {
        match: [87, 88],
        data: 'Stygian',
      },
      {
        match: [89, 90],
        data: 'Sulaco',
      },
      {
        match: [91, 92],
        data: 'Sundered',
      },
      {
        match: [93, 94],
        data: 'Thunor',
      },
      {
        match: [95, 96],
        data: 'Vanguard',
      },
      {
        match: [97, 98],
        data: 'Veiled',
      },
      {
        match: [99, 100],
        data: 'Wasted',
      },
    ],
  },
  sectorSuffix: {
    items: [
      {
        match: [1, 2],
        data: 'Abyss',
      },
      {
        match: [3, 4],
        data: 'Anvil',
      },
      {
        match: [5, 6],
        data: 'Arch',
      },
      {
        match: [7, 8],
        data: 'Breach',
      },
      {
        match: [9, 10],
        data: 'Chain',
      },
      {
        match: [11, 12],
        data: 'Channel',
      },
      {
        match: [13, 14],
        data: 'Chasm',
      },
      {
        match: [15, 16],
        data: 'Circlet',
      },
      {
        match: [17, 18],
        data: 'Cluster',
      },
      {
        match: [19, 20],
        data: 'Crossing',
      },
      {
        match: [21, 22],
        data: 'Crown',
      },
      {
        match: [23, 24],
        data: 'Currents',
      },
      {
        match: [25, 26],
        data: 'Deep',
      },
      {
        match: [27, 28],
        data: 'Desolation',
      },
      {
        match: [29, 30],
        data: 'Drift',
      },
      {
        match: [31, 32],
        data: 'Flow',
      },
      {
        match: [33, 34],
        data: 'Flux',
      },
      {
        match: [35, 36],
        data: 'Gap',
      },
      {
        match: [37, 38],
        data: 'Gate',
      },
      {
        match: [39, 40],
        data: 'Gyre',
      },
      {
        match: [41, 42],
        data: 'Heart',
      },
      {
        match: [43, 44],
        data: 'Helix',
      },
      {
        match: [45, 46],
        data: 'Juncture',
      },
      {
        match: [47, 48],
        data: 'Limits',
      },
      {
        match: [49, 50],
        data: 'Locus',
      },
      {
        match: [51, 52],
        data: 'Maelstrom',
      },
      {
        match: [53, 54],
        data: 'Margin',
      },
      {
        match: [55, 56],
        data: 'Maw',
      },
      {
        match: [57, 58],
        data: 'Maze',
      },
      {
        match: [59, 60],
        data: 'Nexus',
      },
      {
        match: [61, 62],
        data: 'Oasis',
      },
      {
        match: [63, 64],
        data: 'Pass',
      },
      {
        match: [65, 66],
        data: 'Pit',
      },
      {
        match: [67, 68],
        data: 'Pyre',
      },
      {
        match: [69, 70],
        data: 'Reach',
      },
      {
        match: [71, 72],
        data: 'Rest',
      },
      {
        match: [73, 74],
        data: 'Rift',
      },
      {
        match: [75, 76],
        data: 'Sanctum',
      },
      {
        match: [77, 78],
        data: 'Shallows',
      },
      {
        match: [79, 80],
        data: 'Shoal',
      },
      {
        match: [81, 82],
        data: 'Spine',
      },
      {
        match: [83, 84],
        data: 'Straits',
      },
      {
        match: [85, 86],
        data: 'Threshold',
      },
      {
        match: [87, 88],
        data: 'Tide',
      },
      {
        match: [89, 90],
        data: 'Verge',
      },
      {
        match: [91, 92],
        data: 'Vertex',
      },
      {
        match: [93, 94],
        data: 'Vigil',
      },
      {
        match: [95, 96],
        data: 'Void',
      },
      {
        match: [97, 98],
        data: 'Web',
      },
      {
        match: [99, 100],
        data: 'Zenith',
      },
    ],
  },
  peril: {
    items: [
      {
        match: [1, 3],
        data: 'Artificial gravity generator malfunctions',
      },
      {
        match: [4, 6],
        data: 'Automated defenses or mines protect this area',
      },
      {
        match: [7, 9],
        data: 'Compartment catches fire or is breached',
      },
      {
        match: [10, 12],
        data: 'Contagion or illness threatens to take hold',
      },
      {
        match: [13, 15],
        data: 'Dust clouds imperil navigation or conceal foes',
      },
      {
        match: [16, 18],
        data: 'Energy storm looms',
      },
      {
        match: [19, 21],
        data: 'Familiar foe appears or sends an ominous message',
      },
      {
        match: [22, 24],
        data: 'Gravity well or vortex takes hold',
      },
      {
        match: [25, 27],
        data: 'Imperiled ship calls for help',
      },
      {
        match: [28, 30],
        data: 'Important device fails or malfunctions',
      },
      {
        match: [31, 33],
        data: 'Infestation is revealed',
      },
      {
        match: [34, 36],
        data: 'Intruder or stowaway creates trouble',
      },
      {
        match: [37, 39],
        data: 'Isolation or fear presses in',
      },
      {
        match: [40, 42],
        data: 'Life support system malfunctions',
      },
      {
        match: [43, 45],
        data: 'Meteoroid storm fills the sky',
      },
      {
        match: [46, 48],
        data: 'Mysterious wreckage portends a new threat',
      },
      {
        match: [49, 51],
        data: 'Nearby settlement calls for help',
      },
      {
        match: [52, 54],
        data: 'Old repair or patch fails',
      },
      {
        match: [55, 57],
        data: 'Onboard dispute or inner turmoil causes a disruption',
      },
      {
        match: [58, 60],
        data: 'Others obstruct your path or form a blockade',
      },
      {
        match: [61, 63],
        data: 'Phantom signals suggest a lurking foe',
      },
      {
        match: [64, 66],
        data: 'Pirates hunt for prey',
      },
      {
        match: [67, 69],
        data: 'Power fails',
      },
      {
        match: [70, 72],
        data: 'Primary drive or generator malfunctions',
      },
      {
        match: [73, 75],
        data: 'Sabotage is revealed',
      },
      {
        match: [76, 78],
        data: 'Shockwave or gravity wave approaches',
      },
      {
        match: [79, 81],
        data: 'Someone questions your presence here',
      },
      {
        match: [82, 84],
        data: 'Stellar anomaly emits hazardous energies',
      },
      {
        match: [85, 87],
        data: 'Threatening lifeform draws near',
      },
      {
        match: [88, 90],
        data: 'Troubling visions or apparitions',
      },
      {
        match: [91, 93],
        data: 'True nature of a cargo, occupant, or passenger is revealed',
      },
      {
        match: [94, 96],
        data: 'Unsettling sounds or disturbances',
      },
      {
        match: [97, 99],
        data: '▶️Action + Theme',
      },
      {
        match: [100],
        data: '[Roll twice]',
      },
    ],
  },
  opportunity: {
    items: [
      {
        match: [1, 4],
        data: 'Advance warning of an environmental threat',
      },
      {
        match: [5, 8],
        data: 'Automated signal offers a helpful message or warning',
      },
      {
        match: [9, 12],
        data: 'Cache of cargo or supplies',
      },
      {
        match: [13, 16],
        data: 'Chance for fellowship or a moment of inner peace',
      },
      {
        match: [17, 20],
        data: 'Clear path through otherwise perilous space',
      },
      {
        match: [21, 24],
        data: 'Clue offers insight into a current quest or mystery',
      },
      {
        match: [25, 28],
        data: "Clue to a lifeform's nature or vulnerabilities",
      },
      {
        match: [29, 32],
        data: 'Derelict ripe for the picking',
      },
      {
        match: [33, 36],
        data: 'Foe inadvertently reveals themselves or tips their hand',
      },
      {
        match: [37, 40],
        data: 'Friendly interaction with a benign lifeform',
      },
      {
        match: [41, 44],
        data: 'Friendly settlement in range',
      },
      {
        match: [45, 48],
        data: 'Friendly spacers at work here',
      },
      {
        match: [49, 52],
        data: 'Friendly starship crosses your path',
      },
      {
        match: [53, 56],
        data: 'Helpful or encouraging message from an acquaintance',
      },
      {
        match: [57, 60],
        data: 'Impressive vista offers comfort or inspiration',
      },
      {
        match: [61, 64],
        data: 'Interesting site offers opportunities for exploration',
      },
      {
        match: [65, 68],
        data: 'Mineral or energy resource detected',
      },
      {
        match: [69, 72],
        data: 'Navigational or environmental hazard is left behind',
      },
      {
        match: [73, 76],
        data: 'Opening to escape or avoid foes',
      },
      {
        match: [77, 80],
        data: 'Plea for help from a potential benefactor',
      },
      {
        match: [81, 84],
        data: 'Probe or beacon with useful data',
      },
      {
        match: [85, 88],
        data: 'Refuge offers a place to hide, plan, or recover',
      },
      {
        match: [89, 92],
        data: 'Sensors pinpoint a lurking foe',
      },
      {
        match: [93, 96],
        data: 'Sensors reveal helpful or interesting environmental data',
      },
      {
        match: [97, 100],
        data: 'Vehicle or equipment performs beyond expectations',
      },
    ],
  },
};

export const sightingRoll = (
  oracle: { [index: string]: ISFTable },
  region: ERegion
): string => {
  return tableRoll(oracle[region]);
};
