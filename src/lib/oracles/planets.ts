import { ECoreCombo, EPClass, ERegion, EVault, ISFTable, TPlanetOracles } from 'src/components/models';
import { d } from 'src/lib/roll';

/* Planet template
  [EPClass]: {
    names: [],
    description: '',
    match: [],
    atmosphere: {table},
    settlements: {
      [ERegion.Terminus]: {table},
      [ERegion.Outlands]: {table},
      [ERegion.Expanse]: {table}
    },
    observed: {table},
    feature: {table},
    life: {table}
  }
*/

export const Planets: TPlanetOracles = {
  [EPClass.Desert]: {
    names: [
      'Abalos',
      'Audun',
      'Bishop',
      'Desolation',
      'Dykuma',
      'Fallow',
      'Helios',
      'Mirage',
      'Morricone',
      'Nux',
      'Ordos',
      'Petra',
      'Pyla',
      'Sabulo',
      'Saffron',
      'Sirocco',
      'Sulis',
      'Torrid',
      'Umber',
      'Vermillion',
    ],
    description: 'A pitiless planet of searing heat, blowing sand, and sunbaked rock.',
    match: [1, 15],
    atmosphere: {
      items: [
        {
          match: [1, 10],
          data: 'None / thin',
        },
        {
          match: [11, 25],
          data: 'Toxic',
        },
        {
          match: [26, 40],
          data: 'Corrosive',
        },
        {
          match: [41, 70],
          data: 'Marginal',
        },
        {
          match: [71, 95],
          data: 'Breathable',
        },

        {
          match: [96, 100],
          data: 'Ideal',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 50],
            data: 'None',
          },
          {
            match: [51, 60],
            data: 'Orbital settlement',
          },
          {
            match: [61, 80],
            data: 'Planetside settlement',
          },
          {
            match: [81, 92],
            data: 'Multiple settlements',
          },
          {
            match: [93, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 75],
            data: 'None',
          },
          {
            match: [76, 83],
            data: 'Orbital settlement',
          },
          {
            match: [84, 95],
            data: 'Planetside settlement',
          },
          {
            match: [96, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 90],
            data: 'None',
          },
          {
            match: [91, 96],
            data: 'Orbital settlement',
          },
          {
            match: [97, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Dry seabeds',
        },
        {
          match: [12, 22],
          data: 'Expansive dune seas',
        },
        {
          match: [23, 33],
          data: 'Massive canyons',
        },
        {
          match: [34, 44],
          data: 'Perpetual daylight',
        },
        {
          match: [45, 55],
          data: 'Rugged mountains',
        },
        {
          match: [56, 66],
          data: 'Sprawling salt flats',
        },
        {
          match: [67, 77],
          data: 'Vast plateaus',
        },
        {
          match: [78, 88],
          data: 'Vibrant terrain colors',
        },
        {
          match: [89, 98],
          data: 'Descriptor + Focus',
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Cavernous sinkholes',
        },
        {
          match: [8, 14],
          data: 'Engulfing sandstorms',
        },
        {
          match: [15, 21],
          data: 'Fleeting rainstorms and flash floods',
        },
        {
          match: [22, 28],
          data: 'Flooded grottos',
        },
        {
          match: [29, 35],
          data: 'Petrified forest',
        },
        {
          match: [36, 42],
          data: 'Rampaging whirlwinds',
        },
        {
          match: [43, 49],
          data: 'Scorched glass plains',
        },
        {
          match: [50, 56],
          data: 'Severe temperature fluctuations',
        },
        {
          match: [57, 63],
          data: 'Sunbaked bones of titanic creatures',
        },
        {
          match: [64, 70],
          data: 'Timeworn cliffside caves',
        },
        {
          match: [71, 77],
          data: 'Towering rock formations',
        },
        {
          match: [78, 84],
          data: 'Violent electrical storms',
        },
        {
          match: [85, 91],
          data: 'Windborne metallic sand',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 25],
          data: 'None',
        },
        {
          match: [26, 45],
          data: 'Extinct',
        },
        {
          match: [46, 60],
          data: 'Simple',
        },
        {
          match: [61, 80],
          data: 'Sparse',
        },
        {
          match: [81, 90],
          data: 'Diverse',
        },
        {
          match: [91, 97],
          data: 'Bountiful',
        },
        {
          match: [98, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Furnace]: {
    names: [
      'Ash',
      'Azula',
      'Cinder',
      'Cyrus',
      'Draconus',
      'Effigy',
      'Ember',
      'Flint',
      'Hades',
      'Hera',
      'Ignis',
      'Inferno',
      'Ishum',
      'Kresnik',
      'Nemesis',
      'Obsidian',
      'Scorch',
      'Tana',
      'Vesta',
      'Vesuvius',
    ],
    description: 'A planet with relentless volcanic activity, wreathed in fire and ash.',
    match: [16, 30],
    atmosphere: {
      items: [
        {
          match: [1, 10],
          data: 'None / thin',
        },
        {
          match: [11, 50],
          data: 'Toxic',
        },
        {
          match: [51, 65],
          data: 'Corrosive',
        },
        {
          match: [66, 90],
          data: 'Marginal',
        },
        {
          match: [91, 100],
          data: 'Breathable',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 60],
            data: 'None',
          },
          {
            match: [61, 75],
            data: 'Orbital settlement',
          },
          {
            match: [76, 87],
            data: 'Planetside settlement',
          },
          {
            match: [88, 96],
            data: 'Multiple settlements',
          },
          {
            match: [97, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 85],
            data: 'None',
          },
          {
            match: [86, 92],
            data: 'Orbital settlement',
          },
          {
            match: [93, 97],
            data: 'Planetside settlement',
          },
          {
            match: [98, 99],
            data: 'Multiple settlements',
          },
          {
            match: [100, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 95],
            data: 'None',
          },
          {
            match: [96, 98],
            data: 'Orbital settlement',
          },
          {
            match: [99, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Fiery world-spanning chasms',
        },
        {
          match: [12, 22],
          data: 'Glowing rivers of lava',
        },
        {
          match: [23, 33],
          data: 'Lightning-wracked ash clouds',
        },
        {
          match: [34, 44],
          data: 'Magma seas',
        },
        {
          match: [45, 55],
          data: 'Massive supervolcano',
        },
        {
          match: [56, 66],
          data: 'Once verdant terrain',
        },
        {
          match: [67, 77],
          data: 'Towering mountain ranges',
        },
        {
          match: [78, 88],
          data: 'World-spanning fissures',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Blinding ash storms',
        },
        {
          match: [8, 14],
          data: 'Catastrophic earthquakes',
        },
        {
          match: [15, 21],
          data: 'Colorful geothermal springs',
        },
        {
          match: [22, 28],
          data: 'Intricate volcanic rock formations',
        },
        {
          match: [29, 35],
          data: 'Lava tube tunnel networks',
        },
        {
          match: [36, 42],
          data: 'Masses of scorched bones',
        },
        {
          match: [43, 49],
          data: 'Plains of volcanic glass',
        },
        {
          match: [50, 56],
          data: 'Pools of liquid metal',
        },
        {
          match: [57, 63],
          data: 'Rocky islands adrift on magma',
        },
        {
          match: [64, 70],
          data: 'Roiling clouds of superheated gas',
        },
        {
          match: [71, 77],
          data: 'Scalding geysers',
        },
        {
          match: [78, 84],
          data: 'Silica or metal storms',
        },
        {
          match: [85, 91],
          data: 'Steaming mudflats',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 30],
          data: 'None',
        },
        {
          match: [31, 50],
          data: 'Extinct',
        },
        {
          match: [51, 70],
          data: 'Simple',
        },
        {
          match: [71, 85],
          data: 'Sparse',
        },
        {
          match: [86, 95],
          data: 'Diverse',
        },
        {
          match: [96, 98],
          data: 'Bountiful',
        },
        {
          match: [99, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Grave]: {
    names: [
      'Anubis',
      'Banshee',
      'Barrow',
      'Cairn',
      'Cerberus',
      'Charon',
      'Elysia',
      'Keen',
      'Kur',
      'Lament',
      'Mantus',
      'Morrigan',
      'Mourn',
      'Necropolis',
      'Orcus',
      'Osiris',
      'Requim',
      'Stygia',
      'Tartarus',
      'Thrace',
    ],
    description: 'A once-thriving world—now a grim monument to a fallen civilization.',
    match: [31, 35],
    atmosphere: {
      items: [
        {
          match: [1, 10],
          data: 'None / thin',
        },
        {
          match: [11, 45],
          data: 'Toxic',
        },
        {
          match: [46, 70],
          data: 'Corrosive',
        },
        {
          match: [71, 90],
          data: 'Marginal',
        },
        {
          match: [91, 100],
          data: 'Breathable',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 80],
            data: 'None',
          },
          {
            match: [81, 90],
            data: 'Orbital settlement',
          },
          {
            match: [91, 95],
            data: 'Planetside settlement',
          },
          {
            match: [96, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 90],
            data: 'None',
          },
          {
            match: [91, 97],
            data: 'Orbital settlement',
          },
          {
            match: [98, 100],
            data: 'Planetside settlement',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 95],
            data: 'None',
          },
          {
            match: [96, 98],
            data: 'Orbital settlement',
          },
          {
            match: [99, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Broken moon',
        },
        {
          match: [12, 22],
          data: 'Cratered surface',
        },
        {
          match: [23, 33],
          data: 'Dry seabeds',
        },
        {
          match: [34, 44],
          data: 'Irradiated atmosphere',
        },
        {
          match: [45, 55],
          data: 'Orbiting ship graveyard',
        },
        {
          match: [56, 66],
          data: 'Perpetual overcast',
        },
        {
          match: [67, 77],
          data: 'Sky-breaching ruins',
        },
        {
          match: [78, 88],
          data: 'Vast wastelands',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Acid pools',
        },
        {
          match: [8, 14],
          data: 'Ash dunes',
        },
        {
          match: [15, 21],
          data: 'Corrosive rains',
        },
        {
          match: [22, 28],
          data: 'Dead forests',
        },
        {
          match: [29, 35],
          data: 'Fetid mudflats',
        },
        {
          match: [36, 42],
          data: 'Mass graves',
        },
        {
          match: [43, 49],
          data: 'Moldering bones',
        },
        {
          match: [50, 56],
          data: 'Noxious fog',
        },
        {
          match: [57, 63],
          data: 'Radioactive hotspots',
        },
        {
          match: [64, 70],
          data: 'Ravaged cities',
        },
        {
          match: [71, 77],
          data: 'Scarred battlefields',
        },
        {
          match: [78, 84],
          data: 'Ship graveyards',
        },
        {
          match: [85, 91],
          data: 'Whispers of the dead',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 25],
          data: 'None',
        },
        {
          match: [26, 85],
          data: 'Extinct',
        },
        {
          match: [86, 95],
          data: 'Simple',
        },
        {
          match: [96, 100],
          data: 'Sparse',
        },
      ],
    },
  },

  [EPClass.Ice]: {
    names: [
      'Beira',
      'Boreas',
      'Caradhras',
      'Cicero',
      'Demetria',
      'Enten',
      'Fissure',
      'Frost',
      'Gelida',
      'Jotunn',
      'Kanna',
      'Karn',
      'Kheimon',
      'Moroz',
      'Nix',
      'Olwen',
      'Osolok',
      'Taiga',
      'Thule',
      'Varnholme',
    ],
    description: 'A rugged, frozen world—locked in an unending winter.',
    match: [36, 50],
    atmosphere: {
      items: [
        {
          match: [1, 15],
          data: 'None / thin',
        },
        {
          match: [16, 35],
          data: 'Toxic',
        },
        {
          match: [36, 40],
          data: 'Corrosive',
        },
        {
          match: [41, 70],
          data: 'Marginal',
        },
        {
          match: [71, 95],
          data: 'Breathable',
        },
        {
          match: [96, 100],
          data: 'Ideal',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 50],
            data: 'None',
          },
          {
            match: [51, 60],
            data: 'Orbital settlement',
          },
          {
            match: [61, 80],
            data: 'Planetside settlement',
          },
          {
            match: [81, 92],
            data: 'Multiple settlements',
          },
          {
            match: [93, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 75],
            data: 'None',
          },
          {
            match: [76, 83],
            data: 'Orbital settlement',
          },
          {
            match: [84, 95],
            data: 'Planetside settlement',
          },
          {
            match: [96, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 90],
            data: 'None',
          },
          {
            match: [91, 96],
            data: 'Orbital settlement',
          },
          {
            match: [97, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Feeble sunlight',
        },
        {
          match: [12, 22],
          data: 'Frozen oceans',
        },
        {
          match: [23, 33],
          data: 'Rocky glacial islands',
        },
        {
          match: [34, 44],
          data: 'Snowbound mountains',
        },
        {
          match: [45, 55],
          data: 'Sky-breaching geysers',
        },
        {
          match: [56, 66],
          data: 'Supersized ice volcano',
        },
        {
          match: [67, 77],
          data: 'Vibrantly colored ice',
        },
        {
          match: [78, 88],
          data: 'World-spanning ice canyon',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Abyssal ice fissures',
        },
        {
          match: [8, 14],
          data: 'Blinding snow storms',
        },
        {
          match: [15, 21],
          data: 'Clusters of ice spikes',
        },
        {
          match: [22, 28],
          data: 'Colossal ice caves',
        },
        {
          match: [29, 35],
          data: 'Glistening ice spires',
        },
        {
          match: [36, 42],
          data: 'Massive snow drifts',
        },
        {
          match: [43, 49],
          data: 'Preserved carcasses',
        },
        {
          match: [50, 56],
          data: 'Rocky islands amid icy wastes',
        },
        {
          match: [57, 63],
          data: 'Shattered plains of pack ice',
        },
        {
          match: [64, 70],
          data: 'Steaming hot springs',
        },
        {
          match: [71, 77],
          data: 'Subsurface liquid oceans',
        },
        {
          match: [78, 84],
          data: 'Vibrant auroras',
        },
        {
          match: [85, 91],
          data: 'Wind-carved ice formations',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 25],
          data: 'None',
        },
        {
          match: [26, 45],
          data: 'Extinct',
        },
        {
          match: [46, 60],
          data: 'Simple',
        },
        {
          match: [61, 75],
          data: 'Sparse',
        },
        {
          match: [76, 90],
          data: 'Diverse',
        },
        {
          match: [91, 97],
          data: 'Bountiful',
        },
        {
          match: [98, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Jovian]: {
    names: [
      'Aether',
      'Arrokoth',
      'Esen',
      'Hanish',
      'Magnus',
      'Magonia',
      'Mistral',
      'Nephele',
      'Nimbus',
      'Nuada',
      'Nubium',
      'Serein',
      'Stratus',
      'Taranis',
      'Tempest',
      'Tenzin',
      'Tyr',
      'Veil',
      'Velum',
      'Zephyr',
    ],
    description: 'A massive planet with vast layers of dense gases surrounding a small rocky core.',
    match: [51, 65],
    atmosphere: {
      items: [
        {
          match: [1, 50],
          data: 'Toxic',
        },
        {
          match: [51, 65],
          data: 'Corrosive',
        },
        {
          match: [66, 85],
          data: 'Marginal',
        },
        {
          match: [86, 100],
          data: 'Breathable',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 50],
            data: 'None',
          },
          {
            match: [51, 70],
            data: 'Orbital settlement',
          },
          {
            match: [71, 85],
            data: 'Planetside settlement',
          },
          {
            match: [86, 95],
            data: 'Multiple settlements',
          },
          {
            match: [96, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 75],
            data: 'None',
          },
          {
            match: [76, 87],
            data: 'Orbital settlement',
          },
          {
            match: [88, 95],
            data: 'Planetside settlement',
          },
          {
            match: [96, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 90],
            data: 'None',
          },
          {
            match: [91, 96],
            data: 'Orbital settlement',
          },
          {
            match: [97, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Complex ring system',
        },
        {
          match: [12, 22],
          data: 'Intense gravity well',
        },
        {
          match: [23, 33],
          data: 'Numerous moons',
        },
        {
          match: [34, 44],
          data: 'Perpetual superstorm',
        },
        {
          match: [45, 55],
          data: 'Powerful magnetic field',
        },
        {
          match: [56, 66],
          data: 'Severe electrical storms',
        },
        {
          match: [67, 77],
          data: 'Superheated atmosphere',
        },
        {
          match: [78, 88],
          data: 'Unusual atmospheric colors',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Clouds of metal particles',
        },
        {
          match: [8, 14],
          data: 'Crystalline rains',
        },
        {
          match: [15, 21],
          data: 'Floating glaciers',
        },
        {
          match: [22, 28],
          data: 'Floating islands',
        },
        {
          match: [29, 35],
          data: 'Layer of suspended liquid',
        },
        {
          match: [36, 42],
          data: 'Pockets of explosive gases',
        },
        {
          match: [43, 49],
          data: 'Powerful vortexes',
        },
        {
          match: [50, 56],
          data: 'Radiation fields',
        },
        {
          match: [57, 63],
          data: 'Storm-swept rocky debris',
        },
        {
          match: [64, 70],
          data: 'Torrential rain',
        },
        {
          match: [71, 77],
          data: 'Towering thunderheads',
        },
        {
          match: [78, 84],
          data: 'Violent turbulence',
        },
        {
          match: [85, 91],
          data: 'Zones of localized atmosphere',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 50],
          data: 'None',
        },
        {
          match: [51, 55],
          data: 'Extinct',
        },
        {
          match: [56, 70],
          data: 'Simple',
        },
        {
          match: [71, 82],
          data: 'Sparse',
        },
        {
          match: [83, 92],
          data: 'Diverse',
        },
        {
          match: [93, 97],
          data: 'Bountiful',
        },
        {
          match: [98, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Jungle]: {
    names: [
      'Acacia',
      'Aster',
      'Beryl',
      'Celadon',
      'Ceres',
      'Damu',
      'Dryad',
      'Flora',
      'Iridum',
      'Iris',
      'Kishar',
      'Penumbra',
      'Roris',
      'Sylva',
      'Tangle',
      'Thorn',
      'Venom',
      'Verdure',
      'Veris',
      'Viridian',
    ],
    description: 'A humid, rain-soaked planet which keeps its secrets under a thick canopy of vegetation.',
    match: [66, 70],
    atmosphere: {
      items: [
        {
          match: [1, 25],
          data: 'Toxic',
        },
        {
          match: [26, 30],
          data: 'Corrosive',
        },
        {
          match: [31, 60],
          data: 'Marginal',
        },
        {
          match: [61, 90],
          data: 'Breathable',
        },
        {
          match: [91, 100],
          data: 'Ideal',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 40],
            data: 'None',
          },
          {
            match: [41, 55],
            data: 'Orbital settlement',
          },
          {
            match: [56, 80],
            data: 'Planetside settlement',
          },
          {
            match: [81, 92],
            data: 'Multiple settlements',
          },
          {
            match: [93, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 65],
            data: 'None',
          },
          {
            match: [66, 75],
            data: 'Orbital settlement',
          },
          {
            match: [76, 92],
            data: 'Planetside settlement',
          },
          {
            match: [93, 97],
            data: 'Multiple settlements',
          },
          {
            match: [98, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 85],
            data: 'None',
          },
          {
            match: [86, 90],
            data: 'Orbital settlement',
          },
          {
            match: [91, 97],
            data: 'Planetside settlement',
          },
          {
            match: [98, 99],
            data: 'Multiple settlements',
          },
          {
            match: [100, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Cloud-breaching trees',
        },
        {
          match: [12, 22],
          data: 'Expansive rivers or wetlands',
        },
        {
          match: [23, 33],
          data: 'Inland seas',
        },
        {
          match: [34, 44],
          data: 'Massive canyons',
        },
        {
          match: [45, 55],
          data: 'Persistent cloud cover',
        },
        {
          match: [56, 66],
          data: 'Towering mountains',
        },
        {
          match: [67, 77],
          data: 'Unbroken canopy',
        },
        {
          match: [78, 88],
          data: 'Unusual vegetation color',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Bioluminescent flora',
        },
        {
          match: [8, 14],
          data: 'Deep river gorges',
        },
        {
          match: [15, 21],
          data: 'Extensive exposed root systems',
        },
        {
          match: [22, 28],
          data: 'Immense tiered waterfalls',
        },
        {
          match: [29, 35],
          data: 'Languid rivers',
        },
        {
          match: [36, 42],
          data: 'Low-lying fog',
        },
        {
          match: [43, 49],
          data: 'Plunging sinkholes',
        },
        {
          match: [50, 56],
          data: 'Scarred clearings',
        },
        {
          match: [57, 63],
          data: 'Sinking quagmires',
        },
        {
          match: [64, 70],
          data: 'Surging rivers',
        },
        {
          match: [71, 77],
          data: 'Torrential rainstorms',
        },
        {
          match: [78, 84],
          data: 'Violent electrical storms',
        },
        {
          match: [85, 91],
          data: 'Waterlogged caves',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 5],
          data: 'Simple',
        },
        {
          match: [6, 20],
          data: 'Sparse',
        },
        {
          match: [21, 45],
          data: 'Diverse',
        },
        {
          match: [46, 80],
          data: 'Bountiful',
        },
        {
          match: [81, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Ocean]: {
    names: [
      'Aegir',
      'Alon',
      'Clarion',
      'Darya',
      'Eldoris',
      'Horizon',
      'Hydra',
      'Kai',
      'Larimar',
      'Lotan',
      'Mira',
      'Navini',
      'Nerida',
      'Oceanus',
      'Pelagic',
      'Proteus',
      'Russalka',
      'Siren',
      'Thalassa',
      'Triton',
    ],
    description: 'A planet completely or mostly covered by a boundless ocean.',
    match: [71, 75],
    atmosphere: {
      items: [
        {
          match: [1, 5],
          data: 'None / thin',
        },
        {
          match: [6, 20],
          data: 'Toxic',
        },
        {
          match: [21, 25],
          data: 'Corrosive',
        },
        {
          match: [26, 60],
          data: 'Marginal',
        },
        {
          match: [61, 90],
          data: 'Breathable',
        },
        {
          match: [91, 100],
          data: 'Ideal',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 40],
            data: 'None',
          },
          {
            match: [41, 55],
            data: 'Orbital settlement',
          },
          {
            match: [56, 80],
            data: 'Planetside settlement',
          },
          {
            match: [81, 92],
            data: 'Multiple settlements',
          },
          {
            match: [93, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 65],
            data: 'None',
          },
          {
            match: [66, 75],
            data: 'Orbital settlement',
          },
          {
            match: [76, 92],
            data: 'Planetside settlement',
          },
          {
            match: [93, 97],
            data: 'Multiple settlements',
          },
          {
            match: [98, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 85],
            data: 'None',
          },
          {
            match: [86, 90],
            data: 'Orbital settlement',
          },
          {
            match: [91, 97],
            data: 'Planetside settlement',
          },
          {
            match: [98, 99],
            data: 'Multiple settlements',
          },
          {
            match: [100, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Complex reef systems',
        },
        {
          match: [12, 22],
          data: 'Emerging volcanoes',
        },
        {
          match: [23, 33],
          data: 'Floating forests',
        },
        {
          match: [34, 44],
          data: 'Global hurricanes',
        },
        {
          match: [45, 55],
          data: 'Large moon and strong tides',
        },
        {
          match: [56, 66],
          data: 'Scattered islands',
        },
        {
          match: [67, 77],
          data: 'Semi-frozen oceans',
        },
        {
          match: [78, 88],
          data: 'Unusual water color',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Abyssal trenches',
        },
        {
          match: [8, 14],
          data: 'Living islands',
        },
        {
          match: [15, 21],
          data: 'Luminescent seas',
        },
        {
          match: [22, 28],
          data: 'Roaming icebergs',
        },
        {
          match: [29, 35],
          data: 'Shallow-water plains',
        },
        {
          match: [36, 42],
          data: 'Subsurface volcanoes',
        },
        {
          match: [43, 49],
          data: 'Titanic waves',
        },
        {
          match: [50, 56],
          data: 'Undersea air pockets',
        },
        {
          match: [57, 63],
          data: 'Undersea caves',
        },
        {
          match: [64, 70],
          data: 'Undersea forests',
        },
        {
          match: [71, 77],
          data: 'Unrelenting rainfall',
        },
        {
          match: [78, 84],
          data: 'Violent currents',
        },
        {
          match: [85, 91],
          data: 'Windborne waterspouts',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 5],
          data: 'None',
        },
        {
          match: [6, 15],
          data: 'Extinct',
        },
        {
          match: [16, 25],
          data: 'Simple',
        },
        {
          match: [26, 45],
          data: 'Sparse',
        },
        {
          match: [46, 70],
          data: 'Diverse',
        },
        {
          match: [71, 90],
          data: 'Bountiful',
        },
        {
          match: [91, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Rocky]: {
    names: [
      'Aphelion',
      'Artemis',
      'Capella',
      'Cobalt',
      'Crag',
      'Dusk',
      'Eos',
      'Hecate',
      'Imbrium',
      'Latona',
      'Losna',
      'Orpheus',
      'Ory',
      'Quietus',
      'Selene',
      'Silas',
      'Silex',
      'Slate',
      'Themis',
      'Umbra',
    ],
    description: 'A rugged planet scarred by eons of destructive asteroid impacts.',
    match: [76, 90],
    atmosphere: {
      items: [
        {
          match: [1, 65],
          data: 'None / thin',
        },
        {
          match: [66, 85],
          data: 'Toxic',
        },
        {
          match: [86, 90],
          data: 'Corrosive',
        },
        {
          match: [91, 100],
          data: 'Marginal',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 50],
            data: 'None',
          },
          {
            match: [51, 70],
            data: 'Orbital settlement',
          },
          {
            match: [71, 85],
            data: 'Planetside settlement',
          },
          {
            match: [86, 95],
            data: 'Multiple settlements',
          },
          {
            match: [96, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 75],
            data: 'None',
          },
          {
            match: [76, 87],
            data: 'Orbital settlement',
          },
          {
            match: [88, 95],
            data: 'Planetside settlement',
          },
          {
            match: [96, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 90],
            data: 'None',
          },
          {
            match: [91, 96],
            data: 'Orbital settlement',
          },
          {
            match: [97, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Barren plains',
        },
        {
          match: [12, 22],
          data: 'Constant asteroid strikes',
        },
        {
          match: [23, 33],
          data: 'Dense ring system',
        },
        {
          match: [34, 44],
          data: 'Jagged mountains',
        },
        {
          match: [45, 55],
          data: 'Massive impact crater',
        },
        {
          match: [56, 66],
          data: 'Misshapen form (low gravity)',
        },
        {
          match: [67, 77],
          data: 'Perpetual night',
        },
        {
          match: [78, 88],
          data: 'Towering plateaus',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Crystalline formations',
        },
        {
          match: [8, 14],
          data: 'Crystalline caves',
        },
        {
          match: [15, 21],
          data: 'Exposed mineral deposits',
        },
        {
          match: [22, 28],
          data: 'Geometric terrain features',
        },
        {
          match: [29, 35],
          data: 'Geothermal vents',
        },
        {
          match: [36, 42],
          data: 'Glassy impact craters',
        },
        {
          match: [43, 49],
          data: 'Massive dust dunes',
        },
        {
          match: [50, 56],
          data: 'Powerful magnetic fields',
        },
        {
          match: [57, 63],
          data: 'Rubble-strewn lava fields',
        },
        {
          match: [64, 70],
          data: 'Steam-heated caves',
        },
        {
          match: [71, 77],
          data: 'Subsurface magma flows',
        },
        {
          match: [78, 84],
          data: 'Swirling low-lying gases',
        },
        {
          match: [85, 91],
          data: 'Towering rocky spires',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 55],
          data: 'None',
        },
        {
          match: [56, 65],
          data: 'Extinct',
        },
        {
          match: [66, 80],
          data: 'Simple',
        },
        {
          match: [81, 90],
          data: 'Sparse',
        },
        {
          match: [91, 95],
          data: 'Diverse',
        },
        {
          match: [96, 98],
          data: 'Bountiful',
        },
        {
          match: [99, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Shattered]: {
    names: [
      'Cavus',
      'Chrysalis',
      'Fragment',
      'Havoc',
      'Keres',
      'Lux',
      'Nemain',
      'Praxis',
      'Riven',
      'Schism',
      'Shell',
      'Slag',
      'Sliver',
      'Sunder',
      'Torment',
      'Vestige',
      'Vigrid',
      'Vortex',
      'Wrath',
      'Zix',
    ],
    description: 'A planet sundered by cataclysmic destruction.',
    match: [91, 92],
    atmosphere: {
      items: [
        {
          match: [1, 93],
          data: 'None / thin',
        },
        {
          match: [94, 95],
          data: 'Toxic',
        },
        {
          match: [96, 97],
          data: 'Corrosive',
        },
        {
          match: [98, 99],
          data: 'Marginal',
        },
        {
          match: [100, 100],
          data: 'Breathable',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 70],
            data: 'None',
          },
          {
            match: [71, 90],
            data: 'Orbital settlement',
          },
          {
            match: [91, 95],
            data: 'Planetside settlement',
          },
          {
            match: [96, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 85],
            data: 'None',
          },
          {
            match: [86, 96],
            data: 'Orbital settlement',
          },
          {
            match: [97, 99],
            data: 'Planetside settlement',
          },
          {
            match: [100, 100],
            data: 'Multiple settlements',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 95],
            data: 'None',
          },
          {
            match: [96, 99],
            data: 'Orbital settlement',
          },
          {
            match: [100, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Demolished space fleet',
        },
        {
          match: [12, 22],
          data: 'Dense ring system',
        },
        {
          match: [23, 33],
          data: 'Fiery planetary core',
        },
        {
          match: [34, 44],
          data: 'Geomagnetic storms',
        },
        {
          match: [45, 55],
          data: 'Intense solar radiation',
        },
        {
          match: [56, 66],
          data: 'Preserved planetary fragment',
        },
        {
          match: [67, 77],
          data: 'Swirling debris field',
        },
        {
          match: [78, 88],
          data: 'Unbroken moon',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Broken cities',
        },
        {
          match: [8, 14],
          data: 'Colliding fragments',
        },
        {
          match: [15, 21],
          data: 'Energy storms',
        },
        {
          match: [22, 28],
          data: 'Exposed caverns',
        },
        {
          match: [29, 35],
          data: 'Fluctuating gravity',
        },
        {
          match: [36, 42],
          data: 'Magnetic disturbances',
        },
        {
          match: [43, 49],
          data: 'Molten fissures',
        },
        {
          match: [50, 56],
          data: 'Phantom visions of the past',
        },
        {
          match: [57, 63],
          data: 'Pocket atmosphere',
        },
        {
          match: [64, 70],
          data: 'Residual energy storms',
        },
        {
          match: [71, 77],
          data: 'Swirling corrosive gases',
        },
        {
          match: [78, 84],
          data: 'Unstable and fracturing terrain',
        },
        {
          match: [85, 91],
          data: 'Venting magma',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 30],
          data: 'None',
        },
        {
          match: [31, 80],
          data: 'Extinct',
        },
        {
          match: [81, 90],
          data: 'Simple',
        },
        {
          match: [91, 96],
          data: 'Sparse',
        },
        {
          match: [97, 100],
          data: 'Diverse',
        },
      ],
    },
  },

  [EPClass.Tainted]: {
    names: [
      'Achlys',
      'Animus',
      'Bane',
      'Blight',
      'Carrion',
      'Chitin',
      'Datura',
      'Dreck',
      'Erra',
      'Febris',
      'Malacia',
      'Miasma',
      'Morbus',
      'Pathosis',
      'Pestis',
      'Scourge',
      'Telium',
      'Timoris',
      'Verus',
      'Xanthous',
    ],
    description: 'A foul planet wracked by a poisonous climate and virulent growths.',
    match: [93, 98],
    atmosphere: {
      items: [
        {
          match: [1, 65],
          data: 'Toxic',
        },
        {
          match: [66, 85],
          data: 'Corrosive',
        },
        {
          match: [86, 95],
          data: 'Marginal',
        },
        {
          match: [96, 100],
          data: 'Breathable',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 80],
            data: 'None',
          },
          {
            match: [81, 90],
            data: 'Orbital settlement',
          },
          {
            match: [91, 95],
            data: 'Planetside settlement',
          },
          {
            match: [96, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 90],
            data: 'None',
          },
          {
            match: [91, 97],
            data: 'Orbital settlement',
          },
          {
            match: [98, 100],
            data: 'Planetside settlement',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 95],
            data: 'None',
          },
          {
            match: [96, 98],
            data: 'Orbital settlement',
          },
          {
            match: [99, 100],
            data: 'Planetside settlement',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Expansive fungal plains',
        },
        {
          match: [12, 22],
          data: 'Fungal forests',
        },
        {
          match: [23, 33],
          data: 'Scabrous, infected terrain',
        },
        {
          match: [34, 44],
          data: 'Sky-breaching fungus',
        },
        {
          match: [45, 55],
          data: 'Sludge-filled river networks',
        },
        {
          match: [56, 66],
          data: 'Stagnant cloud cover',
        },
        {
          match: [67, 77],
          data: 'Thick, murky atmosphere',
        },
        {
          match: [78, 88],
          data: 'Toxic seas',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Caustic gas storms',
        },
        {
          match: [8, 14],
          data: 'Corrosive, low-lying fog',
        },
        {
          match: [15, 21],
          data: 'Fungus-encrusted caves',
        },
        {
          match: [22, 28],
          data: 'Gelatinous ponds',
        },
        {
          match: [29, 35],
          data: 'Hallucinogenic toxins',
        },
        {
          match: [36, 42],
          data: 'Layers of fast-growing lichen',
        },
        {
          match: [43, 49],
          data: 'Moldering bones',
        },
        {
          match: [50, 56],
          data: 'Mutated flora',
        },
        {
          match: [57, 63],
          data: 'Poisonous gas vents',
        },
        {
          match: [64, 70],
          data: 'Spore clouds',
        },
        {
          match: [71, 77],
          data: 'Terrain marred by fleshy pustules',
        },
        {
          match: [78, 84],
          data: 'Toxic rain',
        },
        {
          match: [85, 91],
          data: 'Virulent fungal infestations',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 5],
          data: 'Simple',
        },
        {
          match: [6, 15],
          data: 'Sparse',
        },
        {
          match: [16, 30],
          data: 'Diverse',
        },
        {
          match: [31, 55],
          data: 'Bountiful',
        },
        {
          match: [56, 100],
          data: 'Overrun',
        },
      ],
    },
  },

  [EPClass.Vital]: {
    names: [
      'Chiron',
      'Demeter',
      'Erebos',
      'Erembour',
      'Feronia',
      'Fortuna',
      'Gaia',
      'Harbinger',
      'Haven',
      'Hope',
      'Morpheus',
      'Nemus',
      'Sapphire',
      'Serenity',
      'Sif',
      'Silva',
      'Sirona',
      'Solstice',
      'Vale',
      'Valinor',
    ],
    description: 'This diverse, life-bearing planet might provide some small measure of hope.',
    match: [99, 100],
    atmosphere: {
      items: [
        {
          match: [1, 20],
          data: 'Marginal',
        },
        {
          match: [21, 50],
          data: 'Breathable',
        },
        {
          match: [51, 100],
          data: 'Ideal',
        },
      ],
    },
    settlements: {
      [ERegion.Terminus]: {
        items: [
          {
            match: [1, 20],
            data: 'None',
          },
          {
            match: [21, 30],
            data: 'Orbital settlement',
          },
          {
            match: [31, 70],
            data: 'Planetside settlement',
          },
          {
            match: [71, 90],
            data: 'Multiple settlements',
          },
          {
            match: [91, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Outlands]: {
        items: [
          {
            match: [1, 50],
            data: 'None',
          },
          {
            match: [51, 55],
            data: 'Orbital settlement',
          },
          {
            match: [56, 85],
            data: 'Planetside settlement',
          },
          {
            match: [86, 95],
            data: 'Multiple settlements',
          },
          {
            match: [96, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
      [ERegion.Expanse]: {
        items: [
          {
            match: [1, 80],
            data: 'None',
          },
          {
            match: [81, 83],
            data: 'Orbital settlement',
          },
          {
            match: [84, 93],
            data: 'Planetside settlement',
          },
          {
            match: [94, 98],
            data: 'Multiple settlements',
          },
          {
            match: [99, 100],
            data: 'Settlements in conflict',
          },
        ],
      },
    },
    observed: {
      items: [
        {
          match: [1, 11],
          data: 'Complex ring system',
        },
        {
          match: [12, 22],
          data: 'Dramatic seasonal variation',
        },
        {
          match: [23, 33],
          data: 'High gravity',
        },
        {
          match: [34, 44],
          data: 'Large moon',
        },
        {
          match: [45, 55],
          data: 'Narrow livable band',
        },
        {
          match: [56, 66],
          data: 'Numerous small moons',
        },
        {
          match: [67, 77],
          data: 'Unusual day or night cycle',
        },
        {
          match: [78, 88],
          data: 'Vibrantly colored landscapes',
        },
        {
          match: [89, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Orbital,
        },
      ],
    },
    feature: {
      items: [
        {
          match: [1, 7],
          data: 'Background radiation',
        },
        {
          match: [8, 14],
          data: 'Chaotically juxtaposed biomes',
        },
        {
          match: [15, 21],
          data: 'Creature boneyards',
        },
        {
          match: [22, 28],
          data: 'Creature lairs or watering holes',
        },
        {
          match: [29, 35],
          data: 'Crystalline formations',
        },
        {
          match: [36, 42],
          data: 'Fierce electrical storms',
        },
        {
          match: [43, 49],
          data: 'Floating terrain',
        },
        {
          match: [50, 56],
          data: 'Frequent seismic activity',
        },
        {
          match: [57, 63],
          data: 'Magnetic disturbances',
        },
        {
          match: [64, 70],
          data: 'Scarred or excavated terrain',
        },
        {
          match: [71, 77],
          data: 'Signs of an engineered biosphere',
        },
        {
          match: [78, 84],
          data: 'Sudden weather fluctuations',
        },
        {
          match: [85, 91],
          data: 'Towering geological formations',
        },
        {
          match: [92, 98],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [99, 100],
          data: EVault.Planet,
        },
      ],
    },
    life: {
      items: [
        {
          match: [1, 10],
          data: 'Sparse',
        },
        {
          match: [11, 45],
          data: 'Diverse',
        },
        {
          match: [46, 85],
          data: 'Bountiful',
        },
        {
          match: [86, 100],
          data: 'Overrun',
        },
      ],
    },

    diversity: {
      items: [
        {
          match: [1, 20],
          data: 'Simple (two biomes)',
        },
        {
          match: [21, 70],
          data: 'Diverse (three biomes)',
        },
        {
          match: [71, 90],
          data: 'Complex (four biomes)',
        },
        {
          match: [91, 100],
          data: 'Garden world (five or more biomes)',
        },
      ],
    },
  },
};

export const Peril: { [index: string]: ISFTable } = {
  lifeless: {
    items: [
      {
        match: [1, 3],
        data: 'Life is revealed or takes an unexpected form',
      },
      {
        match: [4, 7],
        data: 'Blocked or impassible path',
      },
      {
        match: [8, 11],
        data: 'Corrosive substance or environment',
      },
      {
        match: [12, 15],
        data: 'Disturbing remains or evidence of death',
      },
      {
        match: [16, 19],
        data: 'Drastic environmental change',
      },
      {
        match: [20, 23],
        data: 'Enemy holds this area',
      },
      {
        match: [24, 27],
        data: 'Entangling or engulfing hazard',
      },
      {
        match: [28, 31],
        data: 'Equipment fails or malfunctions',
      },
      {
        match: [32, 35],
        data: 'Guarded or patrolled path',
      },
      {
        match: [36, 39],
        data: 'Led astray',
      },
      {
        match: [40, 43],
        data: 'Lost the path',
      },
      {
        match: [44, 47],
        data: 'Meteorites fall from the sky',
      },
      {
        match: [48, 51],
        data: 'Irradiated area or object',
      },
      {
        match: [52, 55],
        data: 'Realization that something was left behind',
      },
      {
        match: [56, 59],
        data: 'Seismic or volcanic upheaval',
      },
      {
        match: [60, 63],
        data: 'Signs of a lurking or trailing foe',
      },
      {
        match: [64, 67],
        data: 'Storm or atmospheric disruption',
      },
      {
        match: [68, 71],
        data: 'Toxic or sickening environment',
      },
      {
        match: [72, 75],
        data: 'Trap or alarm',
      },
      {
        match: [76, 79],
        data: 'Treacherous or arduous path',
      },
      {
        match: [80, 83],
        data: 'Troubling visions or apparitions',
      },
      {
        match: [84, 87],
        data: 'Visibility hindered by atmospheric effects',
      },
      {
        match: [88, 91],
        data: 'Worrying arrival of a ship or vehicle',
      },
      {
        match: [92, 95],
        data: 'Wreckage or ruins portend a new threat',
      },
      {
        match: [96, 99],
        data: '▶️Action + Theme',
      },
      {
        match: [100],
        data: 'Roll twice',
      },
    ],
  },
  lifebearing: {
    items: [
      {
        match: [1, 3],
        data: 'Corrupted or mutated lifeform',
      },
      {
        match: [4, 6],
        data: 'Signs of a lifeform&rsquo;s power or cunning',
      },
      {
        match: [7, 9],
        data: 'Hazardous plant life or malignant spores',
      },
      {
        match: [10, 12],
        data: 'Lifeform hunts for prey',
      },
      {
        match: [13, 15],
        data: 'Lifeform lairs here',
      },
      {
        match: [16, 18],
        data: 'Lifeforms guided by a greater threat',
      },
      {
        match: [19, 21],
        data: 'Lifeforms spooked or stampeding',
      },
      {
        match: [22, 24],
        data: 'Threatening lifeform draws near',
      },
      {
        match: [25, 27],
        data: 'Life is revealed or takes an unexpected form',
      },
      {
        match: [28, 30],
        data: 'Blocked or impassible path',
      },
      {
        match: [31, 33],
        data: 'Corrosive substance or environment',
      },
      {
        match: [34, 36],
        data: 'Disturbing remains or evidence of death',
      },
      {
        match: [37, 39],
        data: 'Drastic environmental change',
      },
      {
        match: [40, 42],
        data: 'Enemy holds this area',
      },
      {
        match: [43, 45],
        data: 'Entangling or engulfing hazard',
      },
      {
        match: [46, 48],
        data: 'Equipment fails or malfunctions',
      },
      {
        match: [49, 51],
        data: 'Guarded or patrolled path',
      },
      {
        match: [52, 54],
        data: 'Led astray',
      },
      {
        match: [55, 57],
        data: 'Lost the path',
      },
      {
        match: [58, 60],
        data: 'Meteorites fall from the sky',
      },
      {
        match: [61, 63],
        data: 'Irradiated area or object',
      },
      {
        match: [64, 66],
        data: 'Realization that something was left behind',
      },
      {
        match: [67, 69],
        data: 'Seismic or volcanic upheaval',
      },
      {
        match: [70, 72],
        data: 'Signs of a lurking or trailing foe',
      },
      {
        match: [73, 75],
        data: 'Storm or atmospheric disruption',
      },
      {
        match: [76, 78],
        data: 'Toxic or sickening environment',
      },
      {
        match: [79, 81],
        data: 'Trap or alarm',
      },
      {
        match: [82, 84],
        data: 'Treacherous or arduous path',
      },
      {
        match: [85, 87],
        data: 'Troubling visions or apparitions',
      },
      {
        match: [88, 90],
        data: 'Visibility hindered by atmospheric effects',
      },
      {
        match: [91, 93],
        data: 'Worrying arrival of a ship or vehicle',
      },
      {
        match: [94, 96],
        data: 'Wreckage or ruins portend a new threat',
      },
      {
        match: [97, 99],
        data: '▶️Action + Theme',
      },
      {
        match: [100],
        data: 'Roll twice',
      },
    ],
  },
};

export const Opportunity: { [index: string]: ISFTable } = {
  lifeless: {
    items: [
      {
        match: [1, 5],
        data: 'Encounter reveals unexpected benign lifeforms',
      },
      {
        match: [6, 10],
        data: 'Abandoned camp or vehicle',
      },
      {
        match: [11, 15],
        data: 'Advance warning of an environmental threat',
      },
      {
        match: [16, 20],
        data: 'Clear path through otherwise perilous terrain',
      },
      {
        match: [21, 25],
        data: 'Clue offers insight into a current quest or mystery',
      },
      {
        match: [26, 30],
        data: 'Clue to the history or nature of this place',
      },
      {
        match: [31, 35],
        data: 'Evidence that others have passed this way',
      },
      {
        match: [36, 40],
        data: 'Foe reveals themselves or tips their hand',
      },
      {
        match: [41, 45],
        data: 'Fortuitous change in the weather or atmosphere',
      },
      {
        match: [46, 50],
        data: 'Friendly traveler crosses your path',
      },
      {
        match: [51, 55],
        data: 'Helpful resource is in ample supply',
      },
      {
        match: [56, 60],
        data: 'Impressive vista offers comfort or inspiration',
      },
      {
        match: [61, 65],
        data: 'Interesting artifact or device',
      },
      {
        match: [66, 70],
        data: 'Interesting site offers opportunities for exploration',
      },
      {
        match: [71, 75],
        data: 'Moment of fellowship or inner peace',
      },
      {
        match: [76, 80],
        data: 'Opening to distract, escape, or avoid foes',
      },
      {
        match: [81, 85],
        data: 'Opening to get the drop on a foe',
      },
      {
        match: [86, 90],
        data: 'Plea for help from a potential benefactor',
      },
      {
        match: [91, 95],
        data: 'Refuge offers a place to hide, plan, or recover',
      },
      {
        match: [96, 100],
        data: 'Vantage point reveals the lay of the land',
      },
    ],
  },
  lifebearing: {
    items: [
      {
        match: [1, 4],
        data: 'Clue to a lifeform&rsquo;s nature or vulnerabilities',
      },
      {
        match: [5, 8],
        data: 'Friendly interaction with a benign lifeform',
      },
      {
        match: [9, 12],
        data: 'Hunting or foraging opportunities are plentiful',
      },
      {
        match: [13, 16],
        data: 'Interesting or helpful aspect of benign creatures',
      },
      {
        match: [17, 20],
        data: 'Interesting or helpful aspect of local plant life',
      },
      {
        match: [21, 24],
        data: 'Encounter reveals unexpected benign lifeforms',
      },
      {
        match: [25, 28],
        data: 'Abandoned camp or vehicle',
      },
      {
        match: [29, 32],
        data: 'Advance warning of an environmental threat',
      },
      {
        match: [33, 36],
        data: 'Clear path through otherwise perilous terrain',
      },
      {
        match: [37, 40],
        data: 'Clue offers insight into a current quest or mystery',
      },
      {
        match: [41, 44],
        data: 'Clue to the history or nature of this place',
      },
      {
        match: [45, 48],
        data: 'Evidence that others have passed this way',
      },
      {
        match: [49, 52],
        data: 'Foe reveals themselves or tips their hand',
      },
      {
        match: [53, 56],
        data: 'Fortuitous change in the weather or atmosphere',
      },
      {
        match: [57, 60],
        data: 'Friendly traveler crosses your path',
      },
      {
        match: [61, 64],
        data: 'Helpful resource is in ample supply',
      },
      {
        match: [65, 68],
        data: 'Impressive vista offers comfort or inspiration',
      },
      {
        match: [69, 72],
        data: 'Interesting artifact or device',
      },
      {
        match: [73, 76],
        data: 'Interesting site offers opportunities for exploration',
      },
      {
        match: [77, 80],
        data: 'Moment of fellowship or inner peace',
      },
      {
        match: [81, 84],
        data: 'Opening to distract, escape, or avoid foes',
      },
      {
        match: [85, 88],
        data: 'Opening to get the drop on a foe',
      },
      {
        match: [89, 92],
        data: 'Plea for help from a potential benefactor',
      },
      {
        match: [93, 96],
        data: 'Refuge offers a place to hide, plan, or recover',
      },
      {
        match: [97, 100],
        data: 'Vantage point reveals the lay of the land',
      },
    ],
  },
};

export const RollPlanetType = (): EPClass => {
  const n = d(100);
  let p = EPClass.Desert;
  Object.keys(Planets).forEach((k) => {
    if (n >= Planets[k].match[0] && n <= Planets[k].match[1]) {
      p = k as EPClass;
      return;
    }
  });
  return p;
};
