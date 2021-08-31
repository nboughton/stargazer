import {
  IVaultOracle,
  ESLocation,
  IVault,
  ECoreCombo,
} from 'src/components/models';

import { tableRoll } from '../roll';

export const Vault: IVaultOracle = {
  location: {
    items: [
      {
        match: [1, 50],
        data: ESLocation.Planetside,
      },
      {
        match: [51, 75],
        data: ESLocation.Orbital,
      },
      {
        match: [76, 100],
        data: ESLocation.Space,
      },
    ],
  },
  scale: {
    items: [
      {
        match: [1, 30],
        data: 'Minor, confined site',
      },
      {
        match: [31, 65],
        data: 'Typical site of limited scope',
      },
      {
        match: [66, 90],
        data: 'Large, elaborate site',
      },
      {
        match: [91, 99],
        data: 'Vast site of unfathomable complexity',
      },
      {
        match: [100, 100],
        data: 'World-spanning site or megastructure',
      },
    ],
  },
  form: {
    items: [
      {
        match: [1, 35],
        data: 'Structure',
      },
      {
        match: [36, 60],
        data: 'Vessel',
      },
      {
        match: [61, 80],
        data: 'Monument',
      },
      {
        match: [81, 95],
        data: 'Machine',
      },
      {
        match: [96, 100],
        data: 'Incomprehensible',
      },
    ],
  },
  shape: {
    items: [
      {
        match: [1, 15],
        data: 'Practical or functional',
      },
      {
        match: [16, 20],
        data: 'Geometric (complex shape)',
      },
      {
        match: [21, 25],
        data: 'Geometric (cube)',
      },
      {
        match: [26, 30],
        data: 'Geometric (obelisk)',
      },
      {
        match: [31, 35],
        data: 'Geometric (pyramid)',
      },
      {
        match: [36, 40],
        data: 'Geometric (ring or torus)',
      },
      {
        match: [41, 45],
        data: 'Geometric (sphere)',
      },
      {
        match: [46, 55],
        data: 'Organic or curved',
      },
      {
        match: [56, 60],
        data: 'Platform or disc',
      },
      {
        match: [61, 65],
        data: 'Spires or towers',
      },
      {
        match: [66, 68],
        data: 'Domed',
      },
      {
        match: [69, 73],
        data: 'Spiky',
      },
      {
        match: [74, 76],
        data: 'Sculptural or effigy',
      },
      {
        match: [77, 79],
        data: 'Amorphous',
      },
      {
        match: [80, 85],
        data: 'Transforming',
      },
      {
        match: [86, 100],
        data: '[Roll twice]',
      },
    ],
  },
  material: {
    items: [
      {
        match: [1, 30],
        data: 'Metallic (industrial)',
      },
      {
        match: [31, 60],
        data: 'Metallic (smooth)',
      },
      {
        match: [61, 70],
        data: 'Rocky or stone-like',
      },
      {
        match: [71, 74],
        data: 'Crystalline or glass-like',
      },
      {
        match: [75, 78],
        data: 'Bone-like',
      },
      {
        match: [79, 82],
        data: 'Flesh-like',
      },
      {
        match: [83, 86],
        data: 'Plant-like',
      },
      {
        match: [87, 88],
        data: 'Energy',
      },
      {
        match: [89, 90],
        data: 'Liquid',
      },
      {
        match: [91, 100],
        data: '[Roll twice]',
      },
    ],
  },
  outerFirstLook: {
    items: [
      {
        match: [1, 3],
        data: 'Corrupting its environment',
      },
      {
        match: [4, 7],
        data: 'Automated defenses',
      },
      {
        match: [8, 10],
        data: 'Breached exterior',
      },
      {
        match: [11, 14],
        data: 'Broken or fragmented',
      },
      {
        match: [15, 17],
        data: 'Camouflaged or hidden',
      },
      {
        match: [18, 20],
        data: 'Cavernous opening',
      },
      {
        match: [21, 23],
        data: 'Dispersed structures',
      },
      {
        match: [24, 26],
        data: 'Dreadful premonitions',
      },
      {
        match: [27, 30],
        data: 'Electromagnetic field',
      },
      {
        match: [31, 33],
        data: 'Embedded within terrain',
      },
      {
        match: [34, 36],
        data: 'Encased in an energy field',
      },
      {
        match: [37, 40],
        data: 'Energy core or conduit',
      },
      {
        match: [41, 43],
        data: 'Fractal patterns',
      },
      {
        match: [44, 47],
        data: 'Glyphs or symbols',
      },
      {
        match: [48, 51],
        data: 'Hazardous readings',
      },
      {
        match: [52, 54],
        data: 'Levitating or in motion',
      },
      {
        match: [55, 58],
        data: 'Lighted or illuminated',
      },
      {
        match: [59, 61],
        data: 'No obvious point of entry',
      },
      {
        match: [62, 64],
        data: 'Overgrown or entangled',
      },
      {
        match: [65, 67],
        data: 'Perfectly preserved',
      },
      {
        match: [68, 70],
        data: 'Phasing in and out of reality',
      },
      {
        match: [71, 73],
        data: 'Physical barrier',
      },
      {
        match: [74, 76],
        data: 'Pitted or scarred',
      },
      {
        match: [77, 79],
        data: 'Scaled for outsized beings',
      },
      {
        match: [80, 82],
        data: 'Shrouded in mist or haze',
      },
      {
        match: [83, 85],
        data: 'Signs of invaders',
      },
      {
        match: [86, 89],
        data: 'Sound or signal',
      },
      {
        match: [90, 92],
        data: 'Strong gravity well',
      },
      {
        match: [93, 95],
        data: 'Surrounded by destruction',
      },
      {
        match: [96, 100],
        data: ECoreCombo.DescFoc,
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
        data: 'Automated defenses',
      },
      {
        match: [7, 9],
        data: 'Biological infestation',
      },
      {
        match: [10, 12],
        data: 'Carried tech is disrupted',
      },
      {
        match: [13, 15],
        data: 'Complex textures or patterns',
      },
      {
        match: [16, 18],
        data: 'Corpses of intruders',
      },
      {
        match: [19, 21],
        data: 'Damage and debris',
      },
      {
        match: [22, 24],
        data: 'Deteriorating spaces',
      },
      {
        match: [25, 27],
        data: 'Dissonant tones or music',
      },
      {
        match: [28, 30],
        data: 'Energy surges',
      },
      {
        match: [31, 33],
        data: 'Environment reacts to your presence',
      },
      {
        match: [34, 36],
        data: 'Evidence of looting or scavenging',
      },
      {
        match: [37, 39],
        data: 'Excessive cold',
      },
      {
        match: [40, 42],
        data: 'Excessive heat',
      },
      {
        match: [43, 45],
        data: 'Faint ambient lighting',
      },
      {
        match: [46, 48],
        data: 'Impenetrable darkness',
      },
      {
        match: [49, 51],
        data: 'Intense smell',
      },
      {
        match: [52, 54],
        data: 'Magnetic surfaces',
      },
      {
        match: [55, 57],
        data: 'Material does not match exterior',
      },
      {
        match: [58, 60],
        data: 'Ornate markings or symbols',
      },
      {
        match: [61, 63],
        data: 'Reactive lighting responds to your presence',
      },
      {
        match: [64, 66],
        data: 'Scale does not match exterior',
      },
      {
        match: [67, 69],
        data: 'Signs of invasive lifeforms',
      },
      {
        match: [70, 72],
        data: 'Surfaces respond to touch',
      },
      {
        match: [73, 75],
        data: 'Thick haze or smoke',
      },
      {
        match: [76, 78],
        data: 'Thick or fluid atmosphere',
      },
      {
        match: [79, 81],
        data: 'Thrumming or droning sound',
      },
      {
        match: [82, 84],
        data: 'Toxic atmosphere',
      },
      {
        match: [85, 87],
        data: 'Toxic residue',
      },
      {
        match: [88, 90],
        data: 'Well-preserved',
      },
      {
        match: [91, 93],
        data: 'Wet or humid',
      },
      {
        match: [94, 100],
        data: ECoreCombo.DescFoc,
      },
    ],
  },
  interior: {
    feature: {
      items: [
        {
          match: [1, 3],
          data: 'Ascending or descending path',
        },
        {
          match: [4, 6],
          data: 'Biological growths',
        },
        {
          match: [7, 8],
          data: 'Blood trail',
        },
        {
          match: [9, 10],
          data: 'Breached or ruptured area',
        },
        {
          match: [11, 13],
          data: 'Broken or inactive machinery',
        },
        {
          match: [14, 15],
          data: 'Clinging mist',
        },
        {
          match: [16, 18],
          data: 'Damage or debris',
        },
        {
          match: [19, 20],
          data: 'Echoing noises',
        },
        {
          match: [21, 22],
          data: 'Elevated path over chasm or shaft',
        },
        {
          match: [23, 25],
          data: 'Energy discharges',
        },
        {
          match: [26, 28],
          data: 'Enigmatic controls or terminal',
        },
        {
          match: [29, 30],
          data: 'Garden or invasive plant life',
        },
        {
          match: [31, 32],
          data: 'Inscrutable object lies dark and silent',
        },
        {
          match: [33, 35],
          data: 'Intersection or hub',
        },
        {
          match: [36, 38],
          data: 'Intricate symbols or pictographs',
        },
        {
          match: [39, 41],
          data: 'Looted or dismantled technology',
        },
        {
          match: [42, 44],
          data: 'Looted or empty containers',
        },
        {
          match: [45, 47],
          data: 'Mazelike passages',
        },
        {
          match: [48, 49],
          data: 'Moving platform or lift',
        },
        {
          match: [50, 52],
          data: 'Mummified or decayed corpses',
        },
        {
          match: [53, 55],
          data: 'Narrowing or widening path',
        },
        {
          match: [56, 58],
          data: 'Pooled liquid',
        },
        {
          match: [59, 61],
          data: 'Remains of intruders',
        },
        {
          match: [62, 63],
          data: 'Scattered bones',
        },
        {
          match: [64, 66],
          data: 'Scrawled markings',
        },
        {
          match: [67, 68],
          data: 'Signs of an attack or battle',
        },
        {
          match: [69, 71],
          data: 'Signs of invasive creatures',
        },
        {
          match: [72, 73],
          data: 'Surfaces honeycombed with openings',
        },
        {
          match: [74, 76],
          data: 'Unintelligible recorded message',
        },
        {
          match: [77, 79],
          data: 'Unintelligible whispers',
        },
        {
          match: [80, 82],
          data: 'Vaulted chamber',
        },
        {
          match: [83, 85],
          data: 'Vertical shaft',
        },
        {
          match: [86, 90],
          data: 'Transition into the Sanctum',
        },
        {
          match: [91, 95],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [96, 100],
          data: '[Roll twice]',
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 5],
          data: 'Broken path',
        },
        {
          match: [6, 10],
          data: 'Change in atmosphere or environment',
        },
        {
          match: [11, 15],
          data: 'Corrosive environment',
        },
        {
          match: [16, 20],
          data: 'Dire warning left by other explorers',
        },
        {
          match: [21, 25],
          data: 'Foes close in',
        },
        {
          match: [26, 30],
          data: 'Fragile structural integrity',
        },
        {
          match: [31, 35],
          data: 'Hazardous path designed for traversal by other beings',
        },
        {
          match: [36, 40],
          data: 'Important gear malfunctions',
        },
        {
          match: [41, 45],
          data: 'Isolation or fear presses in',
        },
        {
          match: [46, 50],
          data: 'Mechanical trap',
        },
        {
          match: [51, 55],
          data: 'Mist or darkness conceals dangers',
        },
        {
          match: [56, 60],
          data: 'Puzzling mystery blocks the way',
        },
        {
          match: [61, 65],
          data: 'Radioactive hot spot',
        },
        {
          match: [66, 70],
          data: 'Rivals seek what lay within',
        },
        {
          match: [71, 75],
          data: 'Signs of a contagion',
        },
        {
          match: [76, 80],
          data: 'Signs of a lurking foe',
        },
        {
          match: [81, 85],
          data: 'Tempting location or object holds hidden dangers',
        },
        {
          match: [86, 90],
          data: 'Toxic atmosphere',
        },
        {
          match: [91, 95],
          data: 'Unnerving sound or sensation',
        },
        {
          match: [96, 99],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [100, 100],
          data: '[Roll twice]',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 10],
          data: 'Clue points the way to your destination or target',
        },
        {
          match: [11, 20],
          data: "Clue to a lifeform's nature or vulnerabilities",
        },
        {
          match: [21, 30],
          data: 'Helpful gear left by another explorer',
        },
        {
          match: [31, 40],
          data: 'Insight into the nature or history of this site',
        },
        {
          match: [41, 50],
          data: 'Intriguing device or artifact',
        },
        {
          match: [51, 60],
          data: 'Opening to get the drop on a foe',
        },
        {
          match: [61, 70],
          data: 'Opening to outmaneuver or escape a threat or foe',
        },
        {
          match: [71, 80],
          data: 'Salvageable resource',
        },
        {
          match: [81, 90],
          data: 'Secure area offers a moment of peace',
        },
        {
          match: [91, 100],
          data: 'Shortcut or less perilous path speeds your way',
        },
      ],
    },
  },
  purpose: {
    items: [
      {
        match: [1, 3],
        data: 'Capture or control of other beings',
      },
      {
        match: [4, 6],
        data: 'Command or communication relay',
      },
      {
        match: [7, 9],
        data: 'Commemoration of an event',
      },
      {
        match: [10, 12],
        data: 'Conduit to mystical powers',
      },
      {
        match: [13, 16],
        data: 'Conservation of living specimens',
      },
      {
        match: [17, 20],
        data: 'Containment of a powerful being',
      },
      {
        match: [21, 24],
        data: 'Containment of dangerous creatures',
      },
      {
        match: [25, 27],
        data: 'Containment of weapons',
      },
      {
        match: [28, 31],
        data: 'Control of a destructive weapon',
      },
      {
        match: [32, 34],
        data: 'Generation of defenses or barriers',
      },
      {
        match: [35, 38],
        data: 'Generation or transformation of energy',
      },
      {
        match: [39, 41],
        data: 'Harvesting of resources',
      },
      {
        match: [42, 44],
        data: 'Internment of the dead',
      },
      {
        match: [45, 47],
        data: 'Manipulation of spacetime',
      },
      {
        match: [48, 50],
        data: 'Manufacturing of lifeforms',
      },
      {
        match: [51, 53],
        data: 'Manufacturing of machines or devices',
      },
      {
        match: [54, 56],
        data: 'Passage to another location',
      },
      {
        match: [57, 59],
        data: 'Preservation of an ancient intelligence',
      },
      {
        match: [60, 62],
        data: 'Preservation of maps or navigational data',
      },
      {
        match: [63, 66],
        data: 'Protection of a sacred artifact',
      },
      {
        match: [67, 69],
        data: 'Researching science or technology',
      },
      {
        match: [70, 73],
        data: 'Safekeeping of cultural records or memories',
      },
      {
        match: [74, 77],
        data: 'Shelter for inhabitants',
      },
      {
        match: [78, 80],
        data: 'Stockpiling of resources',
      },
      {
        match: [81, 83],
        data: 'Surveying or monitoring of a location',
      },
      {
        match: [84, 87],
        data: 'Transformation of terrain or environments',
      },
      {
        match: [88, 90],
        data: 'Worship of a god or being',
      },
      {
        match: [91, 95],
        data: ECoreCombo.ActTheme,
      },
      {
        match: [96, 100],
        data: '[Roll twice]',
      },
    ],
  },
  sanctum: {
    feature: {
      items: [
        {
          match: [1, 2],
          data: 'Abyssal pit or chasm',
        },
        {
          match: [3, 5],
          data: 'Altered gravity',
        },
        {
          match: [6, 7],
          data: 'Area filled with strange liquid',
        },
        {
          match: [8, 10],
          data: 'Area humming with aberrant energy',
        },
        {
          match: [11, 13],
          data: 'Blasted or wrecked area',
        },
        {
          match: [14, 16],
          data: 'Central chamber of immense proportions or grandeur',
        },
        {
          match: [17, 19],
          data: 'Colossal machine',
        },
        {
          match: [20, 21],
          data: 'Corrupted plant life',
        },
        {
          match: [22, 24],
          data: 'Enigmatic mechanisms come to life',
        },
        {
          match: [25, 26],
          data: 'Haze of spores or nanomachines',
        },
        {
          match: [27, 28],
          data: 'Incomprehensible architecture or geometry',
        },
        {
          match: [29, 31],
          data: 'Incongruent space contradicts the nature of this site',
        },
        {
          match: [32, 34],
          data: 'Inscrutable object emits sound and energy',
        },
        {
          match: [35, 37],
          data: 'Machinery fused with organic growths',
        },
        {
          match: [38, 40],
          data: 'Moving chamber or passage',
        },
        {
          match: [41, 43],
          data: 'Mutated remains of the dead',
        },
        {
          match: [44, 46],
          data: 'Nest of invasive creatures',
        },
        {
          match: [47, 49],
          data: 'Pockets or layers of altered atmosphere',
        },
        {
          match: [50, 51],
          data: 'Pods or chambers with preserved corpses',
        },
        {
          match: [52, 54],
          data: 'Pools of strange liquid',
        },
        {
          match: [55, 57],
          data: 'Pulsating surfaces',
        },
        {
          match: [58, 60],
          data: 'Rampant biological infestation',
        },
        {
          match: [61, 63],
          data: 'Repository of biological specimens',
        },
        {
          match: [64, 66],
          data: 'Sealed chamber',
        },
        {
          match: [67, 69],
          data: 'Sealed containers of inscrutable purpose',
        },
        {
          match: [70, 72],
          data: 'Simulated or illusionary environment',
        },
        {
          match: [73, 74],
          data: 'Surfaces covered in slime or fungus',
        },
        {
          match: [75, 76],
          data: 'Temporal distortions',
        },
        {
          match: [77, 79],
          data: 'Transforming spaces',
        },
        {
          match: [80, 82],
          data: 'Visions of this place in another time',
        },
        {
          match: [83, 85],
          data: 'Visions or reflections of another reality',
        },
        {
          match: [86, 88],
          data: 'Warped or misshapen spaces',
        },
        {
          match: [89, 90],
          data: 'Whispering voices speak to you',
        },
        {
          match: [91, 95],
          data: ECoreCombo.DescFoc,
        },
        {
          match: [96, 100],
          data: '[Roll twice]',
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 5],
          data: 'Camouflaged or transforming foe reveals itself',
        },
        {
          match: [6, 10],
          data: 'Confounding distortions of the timestream',
        },
        {
          match: [11, 15],
          data: 'Destructive environmental disturbance',
        },
        {
          match: [16, 20],
          data: 'Horrifying fate for a previous intruder',
        },
        {
          match: [21, 25],
          data: 'Important equipment rendered useless',
        },
        {
          match: [26, 30],
          data: 'Led astray or lured into danger by a manifestation or illusion',
        },
        {
          match: [31, 35],
          data: 'Lost the way or separated from others',
        },
        {
          match: [36, 40],
          data: 'Manifestations prey upon your weaknesses or worries',
        },
        {
          match: [41, 45],
          data: 'Other intruders have been corrupted or mutated by this place',
        },
        {
          match: [46, 50],
          data: 'Paranoia or suspicion takes hold',
        },
        {
          match: [51, 55],
          data: 'Path behind you is sealed',
        },
        {
          match: [56, 60],
          data: 'Powerful foe strikes without warning',
        },
        {
          match: [61, 65],
          data: 'Restless dead awaken',
        },
        {
          match: [66, 70],
          data: 'Scene of hideous violence or death',
        },
        {
          match: [71, 75],
          data: 'Snared in an unnatural trap',
        },
        {
          match: [76, 80],
          data: 'Spawning or swarming foes surround you',
        },
        {
          match: [81, 85],
          data: 'Sudden structural collapse or failure',
        },
        {
          match: [86, 90],
          data: 'Temptations to linger or remain in this site',
        },
        {
          match: [91, 95],
          data: 'You are marked by physical corruption or mutation',
        },
        {
          match: [96, 99],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [100, 100],
          data: '[Roll twice]',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 10],
          data: 'Access to a secret or protected area',
        },
        {
          match: [11, 20],
          data: 'Clue points the way to your destination or target',
        },
        {
          match: [21, 30],
          data: 'Comforting illusion or vision',
        },
        {
          match: [31, 40],
          data: 'Control or terminal adjusts to accept your input',
        },
        {
          match: [41, 50],
          data: 'Deeper insight into the history or nature of this site',
        },
        {
          match: [51, 60],
          data: 'Device or artifact reveals its purpose',
        },
        {
          match: [61, 70],
          data: 'Environment adjusts to better suit you',
        },
        {
          match: [71, 80],
          data: 'Foes stand down or give way',
        },
        {
          match: [81, 90],
          data: 'Key offers control of a function or aspect of this site',
        },
        {
          match: [91, 100],
          data: 'Shortcut or less perilous path speeds your way',
        },
      ],
    },
  },
};

export const RollVault = (loc?: ESLocation): IVault => {
  const l = loc ? loc : tableRoll(Vault.location);

  return {
    name: '',
    location: l as ESLocation,
    scale: tableRoll(Vault.scale),
    form: tableRoll(Vault.form),
    shape: tableRoll(Vault.shape),
    material: tableRoll(Vault.material),
    outerFirstLook: tableRoll(Vault.outerFirstLook),
    innerFirstLook: tableRoll(Vault.innerFirstLook),
    purpose: tableRoll(Vault.purpose),
    interior: {
      feature: tableRoll(Vault.interior.feature),
      peril: tableRoll(Vault.interior.peril),
      opportunity: tableRoll(Vault.interior.opportunity),
    },
    sanctum: {
      feature: tableRoll(Vault.sanctum.feature),
      peril: tableRoll(Vault.sanctum.peril),
      opportunity: tableRoll(Vault.sanctum.opportunity),
    },
  };
};
