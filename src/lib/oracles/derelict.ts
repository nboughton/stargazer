import {
  EDerelictType,
  EDerelictZone,
  ESLocation,
  IDerelict,
  IDerelictOracle,
} from 'src/components/models';
import { Core } from './core';
import { tableRoll } from '../roll';

export const Derelict: IDerelictOracle = {
  location: {
    items: [
      {
        match: [1, 40],
        data: ESLocation.Planetside,
      },
      {
        match: [41, 60],
        data: ESLocation.Orbital,
      },
      {
        match: [61, 100],
        data: ESLocation.Space,
      },
    ],
  },
  type: {
    [ESLocation.Planetside]: {
      items: [
        {
          match: [1, 25],
          data: EDerelictType.Starship,
        },
        {
          match: [26, 100],
          data: EDerelictType.Settlement,
        },
      ],
    },
    [ESLocation.Orbital]: {
      items: [
        {
          match: [1, 40],
          data: EDerelictType.Starship,
        },
        {
          match: [41, 100],
          data: EDerelictType.Settlement,
        },
      ],
    },
    [ESLocation.Space]: {
      items: [
        {
          match: [1, 75],
          data: EDerelictType.Starship,
        },
        {
          match: [76, 100],
          data: EDerelictType.Settlement,
        },
      ],
    },
  },
  condition: {
    items: [
      {
        match: [1, 10],
        data: 'Functional',
      },
      {
        match: [11, 30],
        data: 'Limited power',
      },
      {
        match: [31, 60],
        data: 'Cold and dark',
      },
      {
        match: [61, 90],
        data: 'Damaged or breached',
      },
      {
        match: [91, 98],
        data: 'Heavily damaged',
      },
      {
        match: [99, 100],
        data: 'Impending destruction',
      },
    ],
  },
  outerFirstLook: {
    items: [
      {
        match: [1, 15],
        data: 'Blocked access',
      },
      {
        match: [16, 30],
        data: 'Corpses',
      },
      {
        match: [31, 45],
        data: 'Hazardous readings',
      },
      {
        match: [46, 50],
        data: 'Mutated structure',
      },
      {
        match: [51, 60],
        data: 'Odd orientation',
      },
      {
        match: [61, 65],
        data: 'Overgrown or entangled',
      },
      {
        match: [66, 80],
        data: 'Sending a signal or message',
      },
      {
        match: [81, 85],
        data: 'Signs that others are here',
      },
      {
        match: [86, 95],
        data: 'Stripped exterior',
      },
      {
        match: [96, 100],
        data: 'Time or reality distortions',
      },
    ],
  },
  innerFirstLook: {
    items: [
      {
        match: [1, 3],
        data: 'Abnormal gravity',
      },
      {
        match: [4, 6],
        data: 'Active bots',
      },
      {
        match: [7, 9],
        data: 'Archaic equipment',
      },
      {
        match: [10, 12],
        data: 'Automated announcements',
      },
      {
        match: [13, 15],
        data: 'Biological infestation',
      },
      {
        match: [16, 18],
        data: 'Charred surfaces',
      },
      {
        match: [19, 21],
        data: 'Claw marks',
      },
      {
        match: [22, 24],
        data: 'Cluttered with debris',
      },
      {
        match: [25, 27],
        data: 'Corroded surfaces',
      },
      {
        match: [28, 30],
        data: 'Cramped spaces',
      },
      {
        match: [31, 33],
        data: 'Creaking hull',
      },
      {
        match: [34, 36],
        data: 'Esoteric writing or symbols',
      },
      {
        match: [37, 39],
        data: 'Evidence of new inhabitants',
      },
      {
        match: [40, 42],
        data: 'Exposed wiring or conduits',
      },
      {
        match: [43, 45],
        data: 'Flashing strobe lights',
      },
      {
        match: [46, 48],
        data: 'Fluctuating power',
      },
      {
        match: [49, 51],
        data: 'Haunting visions of the dead',
      },
      {
        match: [52, 54],
        data: 'Hazardous temperature',
      },
      {
        match: [55, 57],
        data: 'Heavy steam or moisture',
      },
      {
        match: [58, 60],
        data: 'Littered with corpses',
      },
      {
        match: [61, 63],
        data: 'Nesting or feeding creatures',
      },
      {
        match: [64, 66],
        data: 'Ornate furnishings',
      },
      {
        match: [67, 69],
        data: 'Scarred by gunfire',
      },
      {
        match: [70, 72],
        data: 'Sealed against intruders',
      },
      {
        match: [73, 75],
        data: 'Signs of looting or scavenging',
      },
      {
        match: [76, 78],
        data: 'Smell of decay',
      },
      {
        match: [79, 81],
        data: 'Splattered with blood',
      },
      {
        match: [82, 84],
        data: 'Temporal distortions',
      },
      {
        match: [85, 87],
        data: 'Thick haze or smoke',
      },
      {
        match: [88, 90],
        data: 'Unstable energy surges',
      },
      {
        match: [91, 93],
        data: 'Watchful AI',
      },
      {
        match: [94, 100],
        data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
      },
    ],
  },
  zone: {
    [EDerelictType.Starship]: {
      items: [
        {
          match: [1, 5],
          data: EDerelictZone.Community,
        },
        {
          match: [6, 30],
          data: EDerelictZone.Engineering,
        },
        {
          match: [31, 55],
          data: EDerelictZone.Living,
        },
        {
          match: [56, 65],
          data: EDerelictZone.Medical,
        },
        {
          match: [66, 85],
          data: EDerelictZone.Operations,
        },
        {
          match: [86, 90],
          data: EDerelictZone.Production,
        },
        {
          match: [91, 100],
          data: EDerelictZone.Research,
        },
      ],
    },
    [EDerelictType.Settlement]: {
      items: [
        {
          match: [1, 20],
          data: EDerelictZone.Community,
        },
        {
          match: [21, 30],
          data: EDerelictZone.Engineering,
        },
        {
          match: [31, 50],
          data: EDerelictZone.Living,
        },
        {
          match: [51, 60],
          data: EDerelictZone.Medical,
        },
        {
          match: [61, 70],
          data: EDerelictZone.Operations,
        },
        {
          match: [71, 90],
          data: EDerelictZone.Production,
        },
        {
          match: [91, 100],
          data: EDerelictZone.Research,
        },
      ],
    },
  },
  explore: {
    [EDerelictZone.Access]: {
      area: {
        items: [
          {
            match: [1, 50],
            data: 'Corridor',
          },
          {
            match: [51, 60],
            data: 'Stairs',
          },
          {
            match: [61, 70],
            data: 'Lift or elevator',
          },
          {
            match: [71, 80],
            data: 'Catwalk or bridge',
          },
          {
            match: [81, 85],
            data: 'Vertical shaft or ladder',
          },
          {
            match: [86, 90],
            data: 'Hub or intersection',
          },
          {
            match: [91, 95],
            data: 'Crawl space or duct',
          },
          {
            match: [96, 100],
            data: 'Airlock or external',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 5],
            data: 'Abandoned gear',
          },
          {
            match: [6, 10],
            data: 'Blood trail',
          },
          {
            match: [11, 15],
            data: 'Breached door or hatch',
          },
          {
            match: [16, 20],
            data: 'Control or terminal station',
          },
          {
            match: [21, 25],
            data: 'Corpse',
          },
          {
            match: [26, 30],
            data: 'Dismantled equipment',
          },
          {
            match: [31, 35],
            data: 'Flashing strobes',
          },
          {
            match: [36, 40],
            data: 'Leaking pipes',
          },
          {
            match: [41, 45],
            data: 'Makeshift barricade',
          },
          {
            match: [46, 50],
            data: 'Opened or missing panels',
          },
          {
            match: [51, 55],
            data: 'Organic growths',
          },
          {
            match: [56, 60],
            data: 'Ruined bot',
          },
          {
            match: [61, 65],
            data: 'Scrawled warning',
          },
          {
            match: [66, 70],
            data: 'Sealed breach',
          },
          {
            match: [71, 75],
            data: 'Sounds of movement',
          },
          {
            match: [76, 80],
            data: 'Steam or smoke',
          },
          {
            match: [81, 85],
            data: 'Wandering bot',
          },
          {
            match: [86, 90],
            data: 'Windows or viewports',
          },
          {
            match: [91, 95],
            data: 'Wrecked passage or debris',
          },
          {
            match: [96, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Alarm or failsafe is triggered',
          },
          {
            match: [11, 20],
            data: 'Automated defenses',
          },
          {
            match: [21, 30],
            data: 'Blocked or sealed path',
          },
          {
            match: [31, 40],
            data: 'Dreadful scene of death or violence',
          },
          {
            match: [41, 50],
            data: 'Foe closes in',
          },
          {
            match: [51, 60],
            data: 'Gear is failing or broken',
          },
          {
            match: [61, 70],
            data: 'Hazardous environmental change',
          },
          {
            match: [71, 80],
            data: 'Path is trapped',
          },
          {
            match: [81, 90],
            data: 'Unsettling sound or disturbance',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Directions, shortcut, or alternate path',
          },
          {
            match: [21, 40],
            data: 'Encounter with a friendly survivor, explorer, or denizen',
          },
          {
            match: [41, 60],
            data: 'Hopeful signs of life',
          },
          {
            match: [61, 80],
            data: 'Opening to outmaneuver or escape a threat or foe',
          },
          {
            match: [81, 100],
            data: 'Useful equipment',
          },
        ],
      },
    },

    [EDerelictZone.Community]: {
      area: {
        items: [
          {
            match: [1, 8],
            data: 'Bar or club',
          },
          {
            match: [9, 16],
            data: 'Temple or chapel',
          },
          {
            match: [17, 24],
            data: 'Classroom or education',
          },
          {
            match: [25, 32],
            data: 'Concourse or hub',
          },
          {
            match: [33, 40],
            data: 'Entertainment',
          },
          {
            match: [41, 48],
            data: 'Park or garden',
          },
          {
            match: [49, 56],
            data: 'Gym or fitness',
          },
          {
            match: [57, 64],
            data: 'Market or trade',
          },
          {
            match: [65, 72],
            data: 'Promenade or overlook',
          },
          {
            match: [73, 80],
            data: 'Restaurant or dining',
          },
          {
            match: [81, 85],
            data: 'New zone',
          },
          {
            match: [86, 100],
            data: 'New zone via ▶️Access',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 8],
            data: 'Ad-hoc memorials',
          },
          {
            match: [9, 16],
            data: 'Art depicting historic event',
          },
          {
            match: [17, 24],
            data: 'Artificial environment',
          },
          {
            match: [25, 32],
            data: 'Automated announcements',
          },
          {
            match: [33, 40],
            data: 'Barricaded area',
          },
          {
            match: [41, 48],
            data: 'Gaming devices or interfaces',
          },
          {
            match: [49, 56],
            data: 'Graffiti or vandalization',
          },
          {
            match: [57, 64],
            data: 'Guard post or surveillance',
          },
          {
            match: [65, 72],
            data: 'Mass grave or corpses',
          },
          {
            match: [73, 80],
            data: 'Panoramic viewport',
          },
          {
            match: [81, 88],
            data: 'Rubble or debris',
          },
          {
            match: [89, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Biological infestation',
          },
          {
            match: [11, 20],
            data: 'Breached or broken structure',
          },
          {
            match: [21, 30],
            data: 'Distressing signs of mass violence or death',
          },
          {
            match: [31, 40],
            data: 'Flooded environment',
          },
          {
            match: [41, 50],
            data: 'Foe lurks within concealment',
          },
          {
            match: [51, 60],
            data: 'Fragile structural integrity',
          },
          {
            match: [61, 70],
            data: 'Haunting vision of life here before the fall',
          },
          {
            match: [71, 80],
            data: 'Hazardous environmental change',
          },
          {
            match: [81, 90],
            data: 'Heartbreaking memento of lost lives',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Culturally significant object or artifact',
          },
          {
            match: [21, 40],
            data: 'Salvageable goods or resources',
          },
          {
            match: [41, 60],
            data: 'Secure area offers a moment of peace',
          },
          {
            match: [61, 80],
            data: 'Terminal with access to site details',
          },
          {
            match: [81, 100],
            data: 'Valuable item',
          },
        ],
      },
    },

    [EDerelictZone.Engineering]: {
      area: {
        items: [
          {
            match: [1, 8],
            data: 'Control room',
          },
          {
            match: [9, 16],
            data: 'Engine room or power core',
          },
          {
            match: [17, 24],
            data: 'Engineering offices',
          },
          {
            match: [25, 32],
            data: 'Equipment storage',
          },
          {
            match: [33, 40],
            data: 'Fuel or coolant tanks',
          },
          {
            match: [41, 48],
            data: 'Life support',
          },
          {
            match: [49, 56],
            data: 'Maintenance tube',
          },
          {
            match: [57, 64],
            data: 'Vehicle bay or garage',
          },
          {
            match: [65, 72],
            data: 'Water processing',
          },
          {
            match: [73, 80],
            data: 'Workshop',
          },
          {
            match: [81, 85],
            data: 'New zone',
          },
          {
            match: [86, 100],
            data: 'New zone via ▶️Access',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 8],
            data: 'Cluttered workbench',
          },
          {
            match: [9, 16],
            data: 'Control terminal',
          },
          {
            match: [17, 24],
            data: 'Crane or lift',
          },
          {
            match: [25, 32],
            data: 'Disassembled equipment',
          },
          {
            match: [33, 40],
            data: 'Flickering status monitors',
          },
          {
            match: [41, 48],
            data: 'Jury-rigged equipment',
          },
          {
            match: [49, 56],
            data: 'Multilevel layout',
          },
          {
            match: [57, 64],
            data: 'Pipes and valves',
          },
          {
            match: [65, 72],
            data: 'Sharp ozone smell',
          },
          {
            match: [73, 80],
            data: 'Unfinished project',
          },
          {
            match: [81, 88],
            data: 'Utility bots',
          },
          {
            match: [89, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Corrosive leak',
          },
          {
            match: [11, 20],
            data: 'Erratic utility bots',
          },
          {
            match: [21, 30],
            data: 'Failing equipment requires a specific part or skill',
          },
          {
            match: [31, 40],
            data: 'Fire or energy surge',
          },
          {
            match: [41, 50],
            data: 'Precarious or broken path',
          },
          {
            match: [51, 60],
            data: 'Radioactive hotspot',
          },
          {
            match: [61, 70],
            data: 'Sabotaged equipment',
          },
          {
            match: [71, 80],
            data: 'Shrouded atmosphere conceals a lurking foe',
          },
          {
            match: [81, 90],
            data: 'Unstable or failing power core',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Advanced or experimental equipment',
          },
          {
            match: [21, 40],
            data: 'Chance to restore power or function',
          },
          {
            match: [41, 60],
            data: 'Helpful plans or schematics',
          },
          {
            match: [61, 80],
            data: 'Helpful utility bot',
          },
          {
            match: [81, 100],
            data: 'Useful tool or device',
          },
        ],
      },
    },

    [EDerelictZone.Living]: {
      area: {
        items: [
          {
            match: [1, 8],
            data: 'Food storage',
          },
          {
            match: [9, 16],
            data: 'Galley or kitchen',
          },
          {
            match: [17, 24],
            data: 'Laundry',
          },
          {
            match: [25, 32],
            data: 'Locker room or storage',
          },
          {
            match: [33, 40],
            data: 'Mess hall or dining',
          },
          {
            match: [41, 48],
            data: 'Observation lounge',
          },
          {
            match: [49, 56],
            data: 'Quarters (individual)',
          },
          {
            match: [57, 64],
            data: 'Quarters (communal)',
          },
          {
            match: [65, 72],
            data: 'Restroom or showers',
          },
          {
            match: [73, 80],
            data: 'Sleeping pods',
          },
          {
            match: [81, 85],
            data: 'New zone',
          },
          {
            match: [86, 100],
            data: 'New zone via ▶️Access',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 8],
            data: 'Abandoned pet',
          },
          {
            match: [9, 16],
            data: 'Audible music',
          },
          {
            match: [17, 24],
            data: 'Cherished personal item',
          },
          {
            match: [25, 32],
            data: 'Failed barricade',
          },
          {
            match: [33, 40],
            data: 'Half-eaten food',
          },
          {
            match: [41, 48],
            data: 'Messages from loved ones',
          },
          {
            match: [49, 56],
            data: 'Ransacked belongings',
          },
          {
            match: [57, 64],
            data: 'Remains of the dead',
          },
          {
            match: [65, 72],
            data: 'Scuttling vermin',
          },
          {
            match: [73, 80],
            data: 'Shrine or altar',
          },
          {
            match: [81, 88],
            data: 'Unusual art',
          },
          {
            match: [89, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Disgusting sight / smell',
          },
          {
            match: [11, 20],
            data: 'Disturbing evidence of medical misconduct',
          },
          {
            match: [21, 30],
            data: 'Erratic medical bots',
          },
          {
            match: [31, 40],
            data: 'Evidence of a virulent disease',
          },
          {
            match: [41, 50],
            data: 'Malfunctioning medical equipment',
          },
          {
            match: [51, 60],
            data: 'Repercussions of a medical experiment',
          },
          {
            match: [61, 70],
            data: 'Restless dead',
          },
          {
            match: [71, 80],
            data: 'Signs of a horrific death',
          },
          {
            match: [81, 90],
            data: 'Signs of broken quarantine',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Culturally significant object or artifact',
          },
          {
            match: [21, 40],
            data: 'Hidden stash of valuable contraband',
          },
          {
            match: [41, 60],
            data: 'Intact barricade or protected area',
          },
          {
            match: [61, 80],
            data: 'Recorded message reveals helpful aspects of this site',
          },
          {
            match: [81, 100],
            data: 'Useful personal gear',
          },
        ],
      },
    },

    [EDerelictZone.Medical]: {
      area: {
        items: [
          {
            match: [1, 8],
            data: 'Crematorium',
          },
          {
            match: [9, 16],
            data: 'Emergency or triage',
          },
          {
            match: [17, 24],
            data: 'Isolation or containment',
          },
          {
            match: [25, 32],
            data: 'Medical lab',
          },
          {
            match: [33, 40],
            data: 'Medical offices',
          },
          {
            match: [41, 48],
            data: 'Morgue',
          },
          {
            match: [49, 56],
            data: 'Operating room',
          },
          {
            match: [57, 64],
            data: 'Pharmacy or drug locker',
          },
          {
            match: [65, 72],
            data: 'Prosthetics workshop',
          },
          {
            match: [73, 80],
            data: 'Ward or clinic',
          },
          {
            match: [81, 85],
            data: 'New zone',
          },
          {
            match: [86, 100],
            data: 'New zone via ▶️Access',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 8],
            data: 'Autopsied corpse',
          },
          {
            match: [9, 16],
            data: 'Biological specimens',
          },
          {
            match: [17, 24],
            data: 'Blood spatter or pools',
          },
          {
            match: [25, 32],
            data: 'Bloody medical supplies',
          },
          {
            match: [33, 40],
            data: 'Broken prosthetics',
          },
          {
            match: [41, 48],
            data: 'Corpse of a healer',
          },
          {
            match: [49, 56],
            data: 'Dissected specimen',
          },
          {
            match: [57, 64],
            data: 'Improvised overflow beds',
          },
          {
            match: [65, 72],
            data: 'Medical monitors',
          },
          {
            match: [73, 80],
            data: 'Medical records or scans',
          },
          {
            match: [81, 88],
            data: 'Stacks of body bags',
          },
          {
            match: [89, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Disgusting sight / smell',
          },
          {
            match: [11, 20],
            data: 'Disturbing evidence of medical misconduct',
          },
          {
            match: [21, 30],
            data: 'Erratic medical bots',
          },
          {
            match: [31, 40],
            data: 'Evidence of a virulent disease',
          },
          {
            match: [41, 50],
            data: 'Malfunctioning medical equipment',
          },
          {
            match: [51, 60],
            data: 'Repercussions of a medical experiment',
          },
          {
            match: [61, 70],
            data: 'Restless dead',
          },
          {
            match: [71, 80],
            data: 'Signs of a horrific death',
          },
          {
            match: [81, 90],
            data: 'Signs of broken quarantine',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Cache of medicine',
          },
          {
            match: [21, 40],
            data: 'Clues to a medical mystery',
          },
          {
            match: [41, 60],
            data: 'Helpful medical bot',
          },
          {
            match: [61, 80],
            data: 'Unusual or rare specimen',
          },
          {
            match: [81, 100],
            data: 'Useful medical equipment',
          },
        ],
      },
    },

    [EDerelictZone.Operations]: {
      area: {
        items: [
          {
            match: [1, 8],
            data: 'Admin or command offices',
          },
          {
            match: [9, 16],
            data: 'Armory',
          },
          {
            match: [17, 24],
            data: 'Bridge or command center',
          },
          {
            match: [25, 32],
            data: 'Brig or cells',
          },
          {
            match: [33, 40],
            data: 'Comms center',
          },
          {
            match: [41, 48],
            data: 'Computer core',
          },
          {
            match: [49, 56],
            data: 'Conference or briefing room',
          },
          {
            match: [57, 64],
            data: 'Landing bay or hangar',
          },
          {
            match: [65, 72],
            data: 'Lounge',
          },
          {
            match: [73, 80],
            data: 'Security',
          },
          {
            match: [81, 85],
            data: 'New zone',
          },
          {
            match: [86, 100],
            data: 'New zone via ▶️Access',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 8],
            data: 'Automated warning',
          },
          {
            match: [9, 16],
            data: 'Buckled blast doors',
          },
          {
            match: [17, 24],
            data: 'Control terminal',
          },
          {
            match: [25, 32],
            data: 'Emergency lighting',
          },
          {
            match: [33, 40],
            data: 'EV suit storage',
          },
          {
            match: [41, 48],
            data: 'Hissing comms channel',
          },
          {
            match: [49, 56],
            data: 'Intricate control panels',
          },
          {
            match: [57, 64],
            data: 'Map of the site',
          },
          {
            match: [65, 72],
            data: 'Recorded message',
          },
          {
            match: [73, 80],
            data: 'Video surveillance monitors',
          },
          {
            match: [81, 88],
            data: 'Written logs',
          },
          {
            match: [89, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Automated defenses target you',
          },
          {
            match: [11, 20],
            data: 'Broken equipment limits control',
          },
          {
            match: [21, 30],
            data: 'Coded message or puzzling security device',
          },
          {
            match: [31, 40],
            data: 'Discouraging evidence of failed plans or defenses',
          },
          {
            match: [41, 50],
            data: 'Displays reveal a new threat elsewhere in this site',
          },
          {
            match: [51, 60],
            data: 'Failing power',
          },
          {
            match: [61, 70],
            data: 'Hostile AI',
          },
          {
            match: [71, 80],
            data: 'Sealed blast doors block access',
          },
          {
            match: [81, 90],
            data: 'Sensors indicate the arrival of an external threat',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Cache of weapons or ammo',
          },
          {
            match: [21, 40],
            data: 'Helpful AI',
          },
          {
            match: [41, 60],
            data: 'Keycard or access code',
          },
          {
            match: [61, 80],
            data: "Log offers insight into this site's downfall",
          },
          {
            match: [81, 100],
            data: 'Secure area offers a moment of peace',
          },
        ],
      },
    },

    [EDerelictZone.Production]: {
      area: {
        items: [
          {
            match: [1, 8],
            data: 'Airlock or staging area',
          },
          {
            match: [9, 16],
            data: 'Assembly or processing',
          },
          {
            match: [17, 24],
            data: 'Cargo bay',
          },
          {
            match: [25, 32],
            data: 'Equipment storage',
          },
          {
            match: [33, 40],
            data: 'Exosuit bay',
          },
          {
            match: [41, 48],
            data: 'Harvesting or mining platform',
          },
          {
            match: [49, 56],
            data: 'Monitoring or control room',
          },
          {
            match: [57, 64],
            data: 'Processed goods storage',
          },
          {
            match: [65, 72],
            data: 'Raw materials storage',
          },
          {
            match: [73, 80],
            data: 'Scrapyard',
          },
          {
            match: [81, 85],
            data: 'New zone',
          },
          {
            match: [86, 100],
            data: 'New zone via ▶️Access',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 8],
            data: 'Cargo lifts',
          },
          {
            match: [9, 16],
            data: 'Control panels',
          },
          {
            match: [17, 24],
            data: 'Disassembled machinery',
          },
          {
            match: [25, 32],
            data: 'Elevated walkways',
          },
          {
            match: [33, 40],
            data: 'Environment suits',
          },
          {
            match: [41, 48],
            data: 'Ill-fated workers',
          },
          {
            match: [49, 56],
            data: 'Immense machinery',
          },
          {
            match: [57, 64],
            data: 'Sealed or locked containers',
          },
          {
            match: [65, 72],
            data: 'Tools',
          },
          {
            match: [73, 80],
            data: 'Vats of chemicals or gas',
          },
          {
            match: [81, 88],
            data: 'Written manifest',
          },
          {
            match: [89, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Claustrophobic spaces',
          },
          {
            match: [11, 20],
            data: 'Dangerous machinery',
          },
          {
            match: [21, 30],
            data: 'Disturbing evidence of exploited labor',
          },
          {
            match: [31, 40],
            data: 'Extreme temperatures',
          },
          {
            match: [41, 50],
            data: 'Hazardous materials',
          },
          {
            match: [51, 60],
            data: 'Impending industrial disaster',
          },
          {
            match: [61, 70],
            data: 'Malfunctioning automation',
          },
          {
            match: [71, 80],
            data: 'Rivals seek to secure these resources',
          },
          {
            match: [81, 90],
            data: 'Signs of an unearthed or manufactured threat',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Helpful vehicle or transport',
          },
          {
            match: [21, 40],
            data: 'Rare or valuable resource',
          },
          {
            match: [41, 60],
            data: 'Salvageable materials',
          },
          {
            match: [61, 80],
            data: 'Useful equipment',
          },
          {
            match: [81, 100],
            data: 'Valuable cargo',
          },
        ],
      },
    },

    [EDerelictZone.Research]: {
      area: {
        items: [
          {
            match: [1, 8],
            data: 'Clean room',
          },
          {
            match: [9, 16],
            data: 'Cold storage',
          },
          {
            match: [17, 24],
            data: 'Creature or animal pens',
          },
          {
            match: [25, 32],
            data: 'Decontamination Room',
          },
          {
            match: [33, 40],
            data: 'Hazardous material storage',
          },
          {
            match: [41, 48],
            data: 'Hydroponics or agriculture',
          },
          {
            match: [49, 56],
            data: 'Isolation or containment',
          },
          {
            match: [57, 64],
            data: 'Lab',
          },
          {
            match: [65, 72],
            data: 'Library or records',
          },
          {
            match: [73, 80],
            data: 'Secure vault',
          },
          {
            match: [81, 85],
            data: 'New zone',
          },
          {
            match: [86, 100],
            data: 'New zone via ▶️Access',
          },
        ],
      },
      feature: {
        items: [
          {
            match: [1, 8],
            data: 'Aquarium or tank',
          },
          {
            match: [9, 16],
            data: 'Biological specimens',
          },
          {
            match: [17, 24],
            data: 'Bones or fossils',
          },
          {
            match: [25, 32],
            data: 'Broken equipment',
          },
          {
            match: [33, 40],
            data: 'Cryptic research notes',
          },
          {
            match: [41, 48],
            data: 'Hastily destroyed data',
          },
          {
            match: [49, 56],
            data: 'Hazmat suits',
          },
          {
            match: [57, 64],
            data: 'Inscrutable artifact',
          },
          {
            match: [65, 72],
            data: 'Invasive plant growth',
          },
          {
            match: [73, 80],
            data: 'Recorded research log',
          },
          {
            match: [81, 88],
            data: 'Spilled chemicals',
          },
          {
            match: [89, 100],
            data: tableRoll(Core.descriptor) + ' ' + tableRoll(Core.focus),
          },
        ],
      },
      peril: {
        items: [
          {
            match: [1, 10],
            data: 'Automated containment protocols are activated',
          },
          {
            match: [11, 20],
            data: 'Biological infestation',
          },
          {
            match: [21, 30],
            data: 'Dangerous specimen',
          },
          {
            match: [31, 40],
            data: 'Disturbing outcome of a failed experiment',
          },
          {
            match: [41, 50],
            data: 'Evidence of sinister experiments',
          },
          {
            match: [51, 60],
            data: 'Fragile vault holds a dire threat',
          },
          {
            match: [61, 70],
            data: 'Signs of broken containment',
          },
          {
            match: [71, 80],
            data: 'Toxic environment',
          },
          {
            match: [81, 90],
            data: 'Unstable technology',
          },
          {
            match: [91, 98],
            data: tableRoll(Core.action) + ' ' + tableRoll(Core.theme),
          },
          {
            match: [99, 100],
            data: '[Roll twice]',
          },
        ],
      },
      opportunity: {
        items: [
          {
            match: [1, 20],
            data: 'Helpful research data',
          },
          {
            match: [21, 40],
            data: 'Records of a notable discovery',
          },
          {
            match: [41, 60],
            data: 'Specialized research tools',
          },
          {
            match: [61, 80],
            data: 'Unique prototype',
          },
          {
            match: [81, 100],
            data: 'Useful navigational data',
          },
        ],
      },
    },
  },
};

export const RollDerelict = (
  location?: ESLocation,
  type?: EDerelictType
): IDerelict => {
  const l = location ? location : tableRoll(Derelict.location);
  const t = type ? type : tableRoll(Derelict.type[l]);

  return {
    name: '',
    location: l as ESLocation,
    type: t as EDerelictType,
    condition: tableRoll(Derelict.condition),
    outerFirstLook: tableRoll(Derelict.outerFirstLook),
    innerFirstLook: tableRoll(Derelict.innerFirstLook),
    currentZone: EDerelictZone.Access,
    explore: '',
  };
};
