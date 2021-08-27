import { ISFOracle, ERegion, ESighting, ISFTable } from 'src/components/models';

export const StellarObject: ISFTable = {
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
};

export const Sighting: { [index: string]: ISFOracle } = {
  [ERegion.Terminus]: {
    name: '',
    table: {
      name: ERegion.Terminus,
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
  },

  [ERegion.Outlands]: {
    name: '',
    table: {
      name: ERegion.Outlands,
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
  },

  [ERegion.Expanse]: {
    name: '',
    table: {
      name: ERegion.Expanse,
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
};
