/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { d } from './roll';
import { IOracleTableItem, IOracle } from 'src/components/models';

const table = (path: string[]): IOracleTableItem[] | string[] | undefined => {
  if (path.length < 2) return undefined;

  // This is necessary so that outer functions don't get stuck with a
  // modified path variable, yay javascript passing by reference :/
  const pathCopy = JSON.parse(JSON.stringify(path)) as string[];

  const section = pathCopy.shift() as string;
  const table = pathCopy.pop() as string;

  if (!Oracles[section]) return undefined;

  let o = Oracles[section].oracles!;
  for (const p of pathCopy) {
    if (o[p].oracles) {
      o = o[p].oracles!;
    } else {
      return undefined;
    }
  }

  return o[table].names ? o[table].names : o[table].table ? o[table].table : undefined;
};

export const roll = (path: string[], num?: number): string => {
  let t = table(path);
  if (!t || t.length === 0) return 'Could not find oracle';

  if (typeof t[0] === 'string') {
    t = t as string[];
    return t[Math.floor(Math.random() * t.length)];
  }

  let out = 'No match';
  t = t as IOracleTableItem[];

  let n = d(100);
  if (num != undefined) n = num;

  t.forEach((item) => {
    if (item.floor != null && item.ceil != null && item.floor <= n && item.ceil >= n) {
      out = item.result;
      return;
    }
  });

  if (/Action \+ Theme/i.test(out)) out = `${roll(['Core', 'Action'])} ${roll(['Core', 'Theme'])}`;
  if (/Descriptor \+ Focus/i.test(out)) out = `${roll(['Core', 'Descriptor'])} ${roll(['Core', 'Focus'])}`;

  if (/roll twice/i.test(out)) {
    while (/roll twice/i.test(out)) {
      out = `${roll(path)}, ${roll(path)}`;
    }
  }
  if (/roll three/i.test(out)) {
    while (/roll three/i.test(out)) {
      out = `${roll(path)}, ${roll(path)}, ${roll(path)}`;
    }
  }

  return out;
};

export const values = (path: string[]): string[] => {
  let t = table(path);
  if (!t || t.length === 0) return [];

  if (typeof t[0] === 'string') return t as string[];

  t = t as IOracleTableItem[];
  return t.map((i) => i.result);
};

export const description = (path: string[]): string => {
  const errMsg = 'Description not found';
  if (path.length < 2) return errMsg;

  // This is necessary so that outer functions don't get stuck with a
  // modified path variable, yay javascript passing by reference :/
  const pathCopy = JSON.parse(JSON.stringify(path)) as string[];

  const section = pathCopy.shift() as string;
  const parent = pathCopy.pop() as string;

  if (!Oracles[section]) return errMsg;

  let o = Oracles[section].oracles!;
  for (const p of pathCopy) {
    if (o[p].oracles) {
      o = o[p].oracles!;
    } else {
      return errMsg;
    }
  }

  return o[parent].description ? (o[parent].description as string) : errMsg;
};

export const star = (): string => {
  const n = Math.floor(Math.random() * starNames.length);
  return starNames[n];
};

const Oracles: { [index: string]: IOracle } = {
  'Character Creation': {
    oracles: {
      'Background Assets': {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Battlefield Medic',
          },
          {
            floor: 6,
            ceil: 10,
            result: 'Delegate',
          },
          {
            floor: 11,
            ceil: 15,
            result: 'Exobiologist',
          },
          {
            floor: 16,
            ceil: 20,
            result: 'Far Trader',
          },
          {
            floor: 21,
            ceil: 25,
            result: 'Fugitive Hunter',
          },
          {
            floor: 26,
            ceil: 30,
            result: 'Hacker',
          },
          {
            floor: 31,
            ceil: 35,
            result: 'Hotshot Pilot',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Interstellar Scout',
          },
          {
            floor: 41,
            ceil: 45,
            result: 'Monster Hunter',
          },
          {
            floor: 46,
            ceil: 50,
            result: 'Occultist',
          },
          {
            floor: 51,
            ceil: 55,
            result: 'Operative',
          },
          {
            floor: 56,
            ceil: 60,
            result: 'Outlaw',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Private Investigator',
          },
          {
            floor: 66,
            ceil: 70,
            result: 'Prophet',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Psionicist',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Smuggler',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Spiritualist',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Starship Engineer',
          },
          {
            floor: 91,
            ceil: 95,
            result: 'Supersoldier',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Tomb Raider',
          },
        ],
        description:
          'If you want some direction for your starting paths, roll or pick from the table below and take the two paths associated with your selected background.',
      },
      'Backstory Prompts': {
        table: [
          {
            floor: 1,
            ceil: 7,
            result: 'You abandoned your kin after learning a troubling truth',
          },
          {
            floor: 8,
            ceil: 13,
            result: 'You are guided by a vision or prophecy',
          },
          {
            floor: 14,
            ceil: 20,
            result: 'You are haunted by past actions or failures',
          },
          {
            floor: 21,
            ceil: 27,
            result: 'You are running from a criminal past',
          },
          {
            floor: 28,
            ceil: 34,
            result: 'You are the sole survivor of an attack or calamity',
          },
          {
            floor: 35,
            ceil: 40,
            result: 'You escaped an abusive or unjust situation',
          },
          {
            floor: 41,
            ceil: 46,
            result: 'You have no memory of your former life',
          },
          {
            floor: 47,
            ceil: 53,
            result: 'You rejected a duty or destiny',
          },
          {
            floor: 54,
            ceil: 60,
            result: 'You were banished from your former home',
          },
          {
            floor: 61,
            ceil: 67,
            result: 'You were denied a birthright',
          },
          {
            floor: 68,
            ceil: 74,
            result: 'You were on your own for as long as you can remember',
          },
          {
            floor: 75,
            ceil: 81,
            result: 'You were sent away on a prolonged mission',
          },
          {
            floor: 82,
            ceil: 87,
            result: 'You were taken or lured away by someone',
          },
          {
            floor: 88,
            ceil: 94,
            result: 'Your ambitions outgrew your humble origins',
          },
          {
            floor: 95,
            ceil: 100,
            result: 'Your wanderlust carried you far away',
          },
        ],
        description:
          'For some backstory inspiration, roll or pick from the table below. Then, take a moment to elaborate on the suggestion. Or just leave it a bit vague and mysterious for now; you can flesh it out in play.',
      },
      'Starship History': {
        table: [
          {
            floor: 1,
            ceil: 8,
            result: 'Acquired in trade for a precious family heirloom',
          },
          {
            floor: 9,
            ceil: 17,
            result: 'Built out of repurposed scrap',
          },
          {
            floor: 18,
            ceil: 25,
            result: 'Claimed as spoils of war',
          },
          {
            floor: 26,
            ceil: 34,
            result: 'Discovered as a derelict',
          },
          {
            floor: 35,
            ceil: 42,
            result: 'Earned in exchange for a promise or vow',
          },
          {
            floor: 43,
            ceil: 50,
            result: 'Found abandoned in perfect condition',
          },
          {
            floor: 51,
            ceil: 58,
            result: 'Granted by an organization or community',
          },
          {
            floor: 59,
            ceil: 67,
            result: 'Inherited from a relative or mentor',
          },
          {
            floor: 68,
            ceil: 75,
            result: 'Purchased at a suspiciously cheap price',
          },
          {
            floor: 76,
            ceil: 84,
            result: 'Stolen from a notorious crime boss or criminal organization',
          },
          {
            floor: 85,
            ceil: 92,
            result: 'Taken while fleeing an attack or disaster',
          },
          {
            floor: 93,
            ceil: 100,
            result: 'Won in a bet',
          },
        ],
        description:
          'Envision how you obtained or earned this ship. You can come up with your own origin, or roll or pick from the table below. If you use a result from the table, take a moment to consider and elaborate on the suggestion.',
      },
      'Starship Quirks': {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Engine room is scorched with old burn marks',
          },
          {
            floor: 6,
            ceil: 10,
            result: 'Exterior is marred by rust and grime',
          },
          {
            floor: 11,
            ceil: 15,
            result: 'Faint',
          },
          {
            floor: 16,
            ceil: 20,
            result: 'Gravity generator is notoriously fickle',
          },
          {
            floor: 21,
            ceil: 25,
            result: 'Hull is fused with organic growths',
          },
          {
            floor: 26,
            ceil: 30,
            result: 'Hull rattles and groans in atmospheric flight',
          },
          {
            floor: 31,
            ceil: 35,
            result: 'Interior spaces are crowded with exposed cables and conduits',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Looks defenseless',
          },
          {
            floor: 41,
            ceil: 45,
            result: 'Navigation logs contain coordinates to locations that do not—or should not—exist',
          },
          {
            floor: 46,
            ceil: 50,
            result: 'Old bloodstain in the airlock reappears even when painted over',
          },
          {
            floor: 51,
            ceil: 55,
            result: 'Once a beautiful ship',
          },
          {
            floor: 56,
            ceil: 60,
            result: 'Patched hull covers a recent catastrophic breach',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Placards and control labels are in an uncommon language',
          },
          {
            floor: 66,
            ceil: 70,
            result: 'Removable plate decks provide access to hidden storage',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Segmented landing gear unfold like gangly spider legs',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Ship is powered by an ancient precursor device',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Someone marked the hull with graffiti during a recent layover',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Strange symbols are scrawled on the deck and bulkheads in the main corridor',
          },
          {
            floor: 91,
            ceil: 95,
            result: 'Things tend to go missing for no logical reason',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Timers and clocks are always just a bit off',
          },
        ],
        description:
          'Your ship is an important aspect of your character—and a character in its own right. What does it look like? What makes it interesting or uniquely yours? Does it have any particular quirks? If nothing occurs to you now, you can flesh it out in play, or roll once or twice on the table below.',
      },
      'Sector Trouble': {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Blockade prevents trade with other sectors',
          },
          {
            floor: 6,
            ceil: 10,
            result: 'Bounty hunters search for an infamous fugitive',
          },
          {
            floor: 11,
            ceil: 15,
            result: 'Chaotic breaches in spacetime spread like wildfire',
          },
          {
            floor: 16,
            ceil: 20,
            result: 'Criminal faction corrupts local authorities',
          },
          {
            floor: 21,
            ceil: 25,
            result: 'Devastating superweapon has fallen into the wrong hands',
          },
          {
            floor: 26,
            ceil: 30,
            result: 'Energy storms are rampant',
          },
          {
            floor: 31,
            ceil: 35,
            result: 'Magnetic disturbances disrupt communication',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Newly found resource lures greedy fortune hunters to the sector',
          },
          {
            floor: 41,
            ceil: 45,
            result: 'Notorious pirate clan preys on starships',
          },
          {
            floor: 46,
            ceil: 50,
            result: 'Parasitic lifeforms spread like a plague',
          },
          {
            floor: 51,
            ceil: 55,
            result: 'Precursor sites throughout the sector emit strange signals',
          },
          {
            floor: 56,
            ceil: 60,
            result: 'Prophecies foretell an imminent awakening of a dreadful power',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Raider clan emerges as a dominant threat under a new leader',
          },
          {
            floor: 66,
            ceil: 70,
            result: 'Religious zealots overrun the sector',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Rogue AI infiltrates systems throughout the sector',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Settlements or factions are on the brink of war',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Ships regularly go missing',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Sickness spreads among ships and settlements',
          },
          {
            floor: 91,
            ceil: 95,
            result: 'Supernova is imminent',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Titanic spaceborne lifeform stalks the spaceways',
          },
        ],
      },
      'Inciting Incident': {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Aid a starship caught in a spacetime fracture',
          },
          {
            floor: 6,
            ceil: 10,
            result: 'Broker peace between two feuding settlements',
          },
          {
            floor: 11,
            ceil: 15,
            result: 'Chart a new passage between isolated settlements',
          },
          {
            floor: 16,
            ceil: 20,
            result: 'Defend the people of a beleaguered settlement against raiders',
          },
          {
            floor: 21,
            ceil: 25,
            result: "Discover who sabotaged a settlement's air processors",
          },
          {
            floor: 26,
            ceil: 30,
            result: 'Escort a tradeship carrying a prized cargo',
          },
          {
            floor: 31,
            ceil: 35,
            result: 'Ferry a rescue team to a perilous disaster site',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Infiltrate a fortified base to steal crucial data',
          },
          {
            floor: 41,
            ceil: 45,
            result: 'Investigate terrifying manifestations at a remote settlement',
          },
          {
            floor: 46,
            ceil: 50,
            result: 'Liberate prisoners at a cruel labor camp',
          },
          {
            floor: 51,
            ceil: 55,
            result: 'Locate a downed spacer on an uninhabited planet',
          },
          {
            floor: 56,
            ceil: 60,
            result: 'Protect a fugitive from a relentless bounty hunter',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Recover a cherished pre-exodus artifact from an enemy',
          },
          {
            floor: 66,
            ceil: 70,
            result: 'Rescue a starship crew held captive by mutineers',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Retrieve a cache of stolen weapons from a pirate ship',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Sabotage an enemy installation',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Search for a missing expedition in the depths of a precursor vault',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Shield a wondrous lifeform from those who seek to destroy it',
          },
          {
            floor: 91,
            ceil: 95,
            result: 'Track and slay a marauding beast',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Transport a displaced people to their new home',
          },
        ],
      },
    },
  },
  Characters: {
    oracles: {
      'First Look': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Accented',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Accompanied',
          },
          {
            floor: 7,
            ceil: 8,
            result: 'Adorned',
          },
          {
            floor: 9,
            ceil: 11,
            result: 'Aged',
          },
          {
            floor: 12,
            ceil: 13,
            result: 'Alluring',
          },
          {
            floor: 14,
            ceil: 15,
            result: 'Armed',
          },
          {
            floor: 16,
            ceil: 17,
            result: 'Armored',
          },
          {
            floor: 18,
            ceil: 20,
            result: 'Athletic',
          },
          {
            floor: 21,
            ceil: 23,
            result: 'Attractive',
          },
          {
            floor: 24,
            ceil: 25,
            result: 'Augmented',
          },
          {
            floor: 26,
            ceil: 27,
            result: 'Concealed',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Distracted',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Eccentric',
          },
          {
            floor: 34,
            ceil: 35,
            result: 'Energetic',
          },
          {
            floor: 36,
            ceil: 37,
            result: 'Flashy',
          },
          {
            floor: 38,
            ceil: 40,
            result: 'Graceful',
          },
          {
            floor: 41,
            ceil: 43,
            result: 'Grim',
          },
          {
            floor: 44,
            ceil: 46,
            result: 'Haggard',
          },
          {
            floor: 47,
            ceil: 49,
            result: 'Ill-equipped',
          },
          {
            floor: 50,
            ceil: 52,
            result: 'Imposing',
          },
          {
            floor: 53,
            ceil: 55,
            result: 'Large',
          },
          {
            floor: 56,
            ceil: 57,
            result: 'Mutated',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Plain',
          },
          {
            floor: 61,
            ceil: 62,
            result: 'Poised',
          },
          {
            floor: 63,
            ceil: 65,
            result: 'Scarred',
          },
          {
            floor: 66,
            ceil: 68,
            result: 'Scruffy',
          },
          {
            floor: 69,
            ceil: 71,
            result: 'Shifty',
          },
          {
            floor: 72,
            ceil: 73,
            result: 'Sickly',
          },
          {
            floor: 74,
            ceil: 76,
            result: 'Slight',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Swaggering',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Tattooed',
          },
          {
            floor: 82,
            ceil: 83,
            result: 'Threatened',
          },
          {
            floor: 84,
            ceil: 85,
            result: 'Uncanny',
          },
          {
            floor: 86,
            ceil: 87,
            result: 'Visibly disabled',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Weathered',
          },
          {
            floor: 91,
            ceil: 92,
            result: 'Well-equipped',
          },
          {
            floor: 93,
            ceil: 95,
            result: 'Wiry',
          },
          {
            floor: 96,
            ceil: 97,
            result: 'Wounded',
          },
          {
            floor: 98,
            ceil: 100,
            result: 'Youthful',
          },
        ],
      },
      Disposition: {
        table: [
          {
            floor: 1,
            ceil: 6,
            result: 'Helpful',
          },
          {
            floor: 7,
            ceil: 14,
            result: 'Friendly',
          },
          {
            floor: 15,
            ceil: 22,
            result: 'Cooperative',
          },
          {
            floor: 23,
            ceil: 30,
            result: 'Curious',
          },
          {
            floor: 31,
            ceil: 40,
            result: 'Indifferent',
          },
          {
            floor: 41,
            ceil: 50,
            result: 'Suspicious',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Wanting',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'Desperate',
          },
          {
            floor: 71,
            ceil: 78,
            result: 'Demanding',
          },
          {
            floor: 79,
            ceil: 86,
            result: 'Unfriendly',
          },
          {
            floor: 87,
            ceil: 94,
            result: 'Threatening',
          },
          {
            floor: 95,
            ceil: 100,
            result: 'Hostile',
          },
        ],
      },
      Role: {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'Agent',
          },
          {
            floor: 3,
            ceil: 4,
            result: 'AI',
          },
          {
            floor: 5,
            ceil: 6,
            result: 'Artisan',
          },
          {
            floor: 7,
            ceil: 8,
            result: 'Assassin',
          },
          {
            floor: 9,
            ceil: 10,
            result: 'Bounty Hunter',
          },
          {
            floor: 11,
            ceil: 12,
            result: 'Courier',
          },
          {
            floor: 13,
            ceil: 14,
            result: 'Crew',
          },
          {
            floor: 15,
            ceil: 16,
            result: 'Criminal',
          },
          {
            floor: 17,
            ceil: 18,
            result: 'Cultist',
          },
          {
            floor: 19,
            ceil: 20,
            result: 'Diplomat',
          },
          {
            floor: 21,
            ceil: 22,
            result: 'Engineer',
          },
          {
            floor: 23,
            ceil: 24,
            result: 'Entertainer',
          },
          {
            floor: 25,
            ceil: 26,
            result: 'Explorer',
          },
          {
            floor: 27,
            ceil: 28,
            result: 'Farmer',
          },
          {
            floor: 29,
            ceil: 30,
            result: 'Fugitive',
          },
          {
            floor: 31,
            ceil: 32,
            result: 'Guard',
          },
          {
            floor: 33,
            ceil: 34,
            result: 'Guide',
          },
          {
            floor: 35,
            ceil: 36,
            result: 'Healer',
          },
          {
            floor: 37,
            ceil: 38,
            result: 'Historian',
          },
          {
            floor: 39,
            ceil: 40,
            result: 'Hunter',
          },
          {
            floor: 41,
            ceil: 42,
            result: 'Investigator',
          },
          {
            floor: 43,
            ceil: 44,
            result: 'Laborer',
          },
          {
            floor: 45,
            ceil: 46,
            result: 'Lawkeeper',
          },
          {
            floor: 47,
            ceil: 48,
            result: 'Leader',
          },
          {
            floor: 49,
            ceil: 50,
            result: 'Mercenary',
          },
          {
            floor: 51,
            ceil: 52,
            result: 'Merchant',
          },
          {
            floor: 53,
            ceil: 54,
            result: 'Miner',
          },
          {
            floor: 55,
            ceil: 56,
            result: 'Mystic',
          },
          {
            floor: 57,
            ceil: 58,
            result: 'Navigator',
          },
          {
            floor: 59,
            ceil: 60,
            result: 'Outcast',
          },
          {
            floor: 61,
            ceil: 62,
            result: 'Pilgrim',
          },
          {
            floor: 63,
            ceil: 64,
            result: 'Pilot',
          },
          {
            floor: 65,
            ceil: 66,
            result: 'Pirate',
          },
          {
            floor: 67,
            ceil: 68,
            result: 'Preacher',
          },
          {
            floor: 69,
            ceil: 70,
            result: 'Prophet',
          },
          {
            floor: 71,
            ceil: 72,
            result: 'Raider',
          },
          {
            floor: 73,
            ceil: 74,
            result: 'Researcher',
          },
          {
            floor: 75,
            ceil: 76,
            result: 'Scavenger',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Scholar',
          },
          {
            floor: 79,
            ceil: 80,
            result: 'Scout',
          },
          {
            floor: 81,
            ceil: 82,
            result: 'Shipwright',
          },
          {
            floor: 83,
            ceil: 84,
            result: 'Smuggler',
          },
          {
            floor: 85,
            ceil: 86,
            result: 'Soldier',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Spacer',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Technician',
          },
          {
            floor: 91,
            ceil: 92,
            result: 'Thief',
          },
          {
            floor: 93,
            ceil: 95,
            result: 'Action + Theme',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
      Goal: {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'Avenge a wrong',
          },
          {
            floor: 3,
            ceil: 4,
            result: 'Build a home',
          },
          {
            floor: 5,
            ceil: 7,
            result: 'Build a relationship',
          },
          {
            floor: 8,
            ceil: 10,
            result: 'Claim a resource',
          },
          {
            floor: 11,
            ceil: 12,
            result: 'Collect a debt',
          },
          {
            floor: 13,
            ceil: 14,
            result: 'Craft an object',
          },
          {
            floor: 15,
            ceil: 16,
            result: 'Cure an ill',
          },
          {
            floor: 17,
            ceil: 18,
            result: 'Defeat a rival',
          },
          {
            floor: 19,
            ceil: 20,
            result: 'Defend a person',
          },
          {
            floor: 21,
            ceil: 23,
            result: 'Defend a place',
          },
          {
            floor: 24,
            ceil: 25,
            result: 'Discover a truth',
          },
          {
            floor: 26,
            ceil: 27,
            result: 'End a conflict',
          },
          {
            floor: 28,
            ceil: 29,
            result: 'Escape a captor',
          },
          {
            floor: 30,
            ceil: 31,
            result: 'Fight injustice',
          },
          {
            floor: 32,
            ceil: 33,
            result: 'Find a person',
          },
          {
            floor: 34,
            ceil: 35,
            result: 'Forge an alliance',
          },
          {
            floor: 36,
            ceil: 37,
            result: 'Gain knowledge',
          },
          {
            floor: 38,
            ceil: 39,
            result: 'Gain riches',
          },
          {
            floor: 40,
            ceil: 41,
            result: 'Maintain order',
          },
          {
            floor: 42,
            ceil: 43,
            result: 'Make an agreement',
          },
          {
            floor: 44,
            ceil: 45,
            result: 'Obtain an object',
          },
          {
            floor: 46,
            ceil: 47,
            result: 'Pay a debt',
          },
          {
            floor: 48,
            ceil: 49,
            result: 'Protect a lifeform',
          },
          {
            floor: 50,
            ceil: 51,
            result: 'Protect a secret',
          },
          {
            floor: 52,
            ceil: 53,
            result: 'Prove worthiness',
          },
          {
            floor: 54,
            ceil: 55,
            result: 'Rebel against power',
          },
          {
            floor: 56,
            ceil: 57,
            result: 'Refute a falsehood',
          },
          {
            floor: 58,
            ceil: 59,
            result: 'Repair a technology',
          },
          {
            floor: 60,
            ceil: 61,
            result: 'Resolve a dispute',
          },
          {
            floor: 62,
            ceil: 63,
            result: 'Restore a relationship',
          },
          {
            floor: 64,
            ceil: 65,
            result: 'Sabotage a technology',
          },
          {
            floor: 66,
            ceil: 68,
            result: 'Secure a resource',
          },
          {
            floor: 69,
            ceil: 70,
            result: 'Seek redemption',
          },
          {
            floor: 71,
            ceil: 72,
            result: 'Seize power',
          },
          {
            floor: 73,
            ceil: 74,
            result: 'Solve a mystery',
          },
          {
            floor: 75,
            ceil: 76,
            result: 'Spread faith',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Travel to a place',
          },
          {
            floor: 79,
            ceil: 80,
            result: 'Undermine a relationship',
          },
          {
            floor: 81,
            ceil: 90,
            result: 'Action + Theme',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
      'Revealed Aspect': {
        table: [
          {
            floor: 1,
            ceil: 1,
            result: 'Addicted',
          },
          {
            floor: 2,
            ceil: 2,
            result: 'Adventurous',
          },
          {
            floor: 3,
            ceil: 3,
            result: 'Afflicted',
          },
          {
            floor: 4,
            ceil: 4,
            result: 'Aggressive',
          },
          {
            floor: 5,
            ceil: 5,
            result: 'Ambitious',
          },
          {
            floor: 6,
            ceil: 6,
            result: 'Angry',
          },
          {
            floor: 7,
            ceil: 7,
            result: 'Anxious',
          },
          {
            floor: 8,
            ceil: 8,
            result: 'Apathetic',
          },
          {
            floor: 9,
            ceil: 9,
            result: 'Bitter',
          },
          {
            floor: 10,
            ceil: 10,
            result: 'Boastful',
          },
          {
            floor: 11,
            ceil: 11,
            result: 'Boisterous',
          },
          {
            floor: 12,
            ceil: 12,
            result: 'Bold',
          },
          {
            floor: 13,
            ceil: 13,
            result: 'Brave',
          },
          {
            floor: 14,
            ceil: 14,
            result: 'Careless',
          },
          {
            floor: 15,
            ceil: 15,
            result: 'Cautious',
          },
          {
            floor: 16,
            ceil: 16,
            result: 'Charismatic',
          },
          {
            floor: 17,
            ceil: 17,
            result: 'Clever',
          },
          {
            floor: 18,
            ceil: 18,
            result: 'Conceited',
          },
          {
            floor: 19,
            ceil: 19,
            result: 'Confident',
          },
          {
            floor: 20,
            ceil: 20,
            result: 'Confused',
          },
          {
            floor: 21,
            ceil: 21,
            result: 'Connected',
          },
          {
            floor: 22,
            ceil: 22,
            result: 'Corrupted',
          },
          {
            floor: 23,
            ceil: 23,
            result: 'Cowardly',
          },
          {
            floor: 24,
            ceil: 24,
            result: 'Creative',
          },
          {
            floor: 25,
            ceil: 25,
            result: 'Critical',
          },
          {
            floor: 26,
            ceil: 26,
            result: 'Cruel',
          },
          {
            floor: 27,
            ceil: 27,
            result: 'Cunning',
          },
          {
            floor: 28,
            ceil: 28,
            result: 'Dangerous',
          },
          {
            floor: 29,
            ceil: 29,
            result: 'Deceitful',
          },
          {
            floor: 30,
            ceil: 30,
            result: 'Defiant',
          },
          {
            floor: 31,
            ceil: 31,
            result: 'Determined',
          },
          {
            floor: 32,
            ceil: 32,
            result: 'Disabled',
          },
          {
            floor: 33,
            ceil: 33,
            result: 'Doomed',
          },
          {
            floor: 34,
            ceil: 34,
            result: 'Driven',
          },
          {
            floor: 35,
            ceil: 35,
            result: 'Dying',
          },
          {
            floor: 36,
            ceil: 36,
            result: 'Envious',
          },
          {
            floor: 37,
            ceil: 37,
            result: 'Experienced',
          },
          {
            floor: 38,
            ceil: 38,
            result: 'Faithful',
          },
          {
            floor: 39,
            ceil: 39,
            result: 'Generous',
          },
          {
            floor: 40,
            ceil: 40,
            result: 'Gifted',
          },
          {
            floor: 41,
            ceil: 41,
            result: 'Greedy',
          },
          {
            floor: 42,
            ceil: 42,
            result: 'Grief-stricken',
          },
          {
            floor: 43,
            ceil: 43,
            result: 'Handy',
          },
          {
            floor: 44,
            ceil: 44,
            result: 'Hardhearted',
          },
          {
            floor: 45,
            ceil: 45,
            result: 'Haunted',
          },
          {
            floor: 46,
            ceil: 46,
            result: 'Honorable',
          },
          {
            floor: 47,
            ceil: 47,
            result: 'Hot-tempered',
          },
          {
            floor: 48,
            ceil: 48,
            result: 'Impulsive',
          },
          {
            floor: 49,
            ceil: 49,
            result: 'Incompetent',
          },
          {
            floor: 50,
            ceil: 50,
            result: 'Independent',
          },
          {
            floor: 51,
            ceil: 51,
            result: 'Infamous',
          },
          {
            floor: 52,
            ceil: 52,
            result: 'Influential',
          },
          {
            floor: 53,
            ceil: 53,
            result: 'Insensitive',
          },
          {
            floor: 54,
            ceil: 54,
            result: 'Insightful',
          },
          {
            floor: 55,
            ceil: 55,
            result: 'Intelligent',
          },
          {
            floor: 56,
            ceil: 56,
            result: 'Intolerant',
          },
          {
            floor: 57,
            ceil: 57,
            result: 'Ironsworn',
          },
          {
            floor: 58,
            ceil: 58,
            result: 'Kind',
          },
          {
            floor: 59,
            ceil: 59,
            result: 'Law-abiding',
          },
          {
            floor: 60,
            ceil: 60,
            result: 'Lonely',
          },
          {
            floor: 61,
            ceil: 61,
            result: 'Loving',
          },
          {
            floor: 62,
            ceil: 62,
            result: 'Loyal',
          },
          {
            floor: 63,
            ceil: 63,
            result: 'Manipulative',
          },
          {
            floor: 64,
            ceil: 64,
            result: 'Oblivious',
          },
          {
            floor: 65,
            ceil: 65,
            result: 'Obsessed',
          },
          {
            floor: 66,
            ceil: 66,
            result: 'Oppressed',
          },
          {
            floor: 67,
            ceil: 67,
            result: 'Passive',
          },
          {
            floor: 68,
            ceil: 68,
            result: 'Powerful',
          },
          {
            floor: 69,
            ceil: 69,
            result: 'Proud',
          },
          {
            floor: 70,
            ceil: 70,
            result: 'Quiet',
          },
          {
            floor: 71,
            ceil: 71,
            result: 'Quirky',
          },
          {
            floor: 72,
            ceil: 72,
            result: 'Rebellious',
          },
          {
            floor: 73,
            ceil: 73,
            result: 'Reclusive',
          },
          {
            floor: 74,
            ceil: 74,
            result: 'Relaxed',
          },
          {
            floor: 75,
            ceil: 75,
            result: 'Remorseful',
          },
          {
            floor: 76,
            ceil: 76,
            result: 'Resourceful',
          },
          {
            floor: 77,
            ceil: 77,
            result: 'Secretive',
          },
          {
            floor: 78,
            ceil: 78,
            result: 'Selfish',
          },
          {
            floor: 79,
            ceil: 79,
            result: 'Sociable',
          },
          {
            floor: 80,
            ceil: 80,
            result: 'Stealthy',
          },
          {
            floor: 81,
            ceil: 81,
            result: 'Stern',
          },
          {
            floor: 82,
            ceil: 82,
            result: 'Stingy',
          },
          {
            floor: 83,
            ceil: 83,
            result: 'Stoic',
          },
          {
            floor: 84,
            ceil: 84,
            result: 'Strong',
          },
          {
            floor: 85,
            ceil: 85,
            result: 'Stubborn',
          },
          {
            floor: 86,
            ceil: 86,
            result: 'Successful',
          },
          {
            floor: 87,
            ceil: 87,
            result: 'Suspicious',
          },
          {
            floor: 88,
            ceil: 88,
            result: 'Talented',
          },
          {
            floor: 89,
            ceil: 89,
            result: 'Technical',
          },
          {
            floor: 90,
            ceil: 90,
            result: 'Timid',
          },
          {
            floor: 91,
            ceil: 91,
            result: 'Tolerant',
          },
          {
            floor: 92,
            ceil: 92,
            result: 'Tough',
          },
          {
            floor: 93,
            ceil: 93,
            result: 'Vengeful',
          },
          {
            floor: 94,
            ceil: 94,
            result: 'Violent',
          },
          {
            floor: 95,
            ceil: 95,
            result: 'Wary',
          },
          {
            floor: 96,
            ceil: 96,
            result: 'Watchful',
          },
          {
            floor: 97,
            ceil: 97,
            result: 'Weak',
          },
          {
            floor: 98,
            ceil: 98,
            result: 'Weary',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'Wild',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Wise',
          },
        ],
      },
      Name: {
        oracles: {
          'Given Name': {
            table: [
              {
                floor: 1,
                ceil: 1,
                result: 'Akim',
              },
              {
                floor: 2,
                ceil: 2,
                result: 'Alex',
              },
              {
                floor: 3,
                ceil: 3,
                result: 'Alexis',
              },
              {
                floor: 4,
                ceil: 4,
                result: 'Alisa',
              },
              {
                floor: 5,
                ceil: 5,
                result: 'Althea',
              },
              {
                floor: 6,
                ceil: 6,
                result: 'Amari',
              },
              {
                floor: 7,
                ceil: 7,
                result: 'Aparna',
              },
              {
                floor: 8,
                ceil: 8,
                result: 'Argus',
              },
              {
                floor: 9,
                ceil: 9,
                result: 'Arnav',
              },
              {
                floor: 10,
                ceil: 10,
                result: 'Ash',
              },
              {
                floor: 11,
                ceil: 11,
                result: 'Asha',
              },
              {
                floor: 12,
                ceil: 12,
                result: 'Astrid',
              },
              {
                floor: 13,
                ceil: 13,
                result: 'Aurora',
              },
              {
                floor: 14,
                ceil: 14,
                result: 'Ayako',
              },
              {
                floor: 15,
                ceil: 15,
                result: 'Azriel',
              },
              {
                floor: 16,
                ceil: 16,
                result: 'Blake',
              },
              {
                floor: 17,
                ceil: 17,
                result: 'Brennan',
              },
              {
                floor: 18,
                ceil: 18,
                result: 'Brianna',
              },
              {
                floor: 19,
                ceil: 19,
                result: 'Bruna',
              },
              {
                floor: 20,
                ceil: 20,
                result: 'Bruno',
              },
              {
                floor: 21,
                ceil: 21,
                result: 'Cassidy',
              },
              {
                floor: 22,
                ceil: 22,
                result: 'Christa',
              },
              {
                floor: 23,
                ceil: 23,
                result: 'Cole',
              },
              {
                floor: 24,
                ceil: 24,
                result: 'Corey',
              },
              {
                floor: 25,
                ceil: 25,
                result: 'Creed',
              },
              {
                floor: 26,
                ceil: 26,
                result: 'Derya',
              },
              {
                floor: 27,
                ceil: 27,
                result: 'Dex',
              },
              {
                floor: 28,
                ceil: 28,
                result: 'Doran',
              },
              {
                floor: 29,
                ceil: 29,
                result: 'Echo',
              },
              {
                floor: 30,
                ceil: 30,
                result: 'Eren',
              },
              {
                floor: 31,
                ceil: 31,
                result: 'Erim',
              },
              {
                floor: 32,
                ceil: 32,
                result: 'Esana',
              },
              {
                floor: 33,
                ceil: 33,
                result: 'Eveline',
              },
              {
                floor: 34,
                ceil: 34,
                result: 'Faye',
              },
              {
                floor: 35,
                ceil: 35,
                result: 'Fletcher',
              },
              {
                floor: 36,
                ceil: 36,
                result: 'Flint',
              },
              {
                floor: 37,
                ceil: 37,
                result: 'Florian',
              },
              {
                floor: 38,
                ceil: 38,
                result: 'Gavin',
              },
              {
                floor: 39,
                ceil: 39,
                result: 'Halia',
              },
              {
                floor: 40,
                ceil: 40,
                result: 'Ike',
              },
              {
                floor: 41,
                ceil: 41,
                result: 'Isaac',
              },
              {
                floor: 42,
                ceil: 42,
                result: 'James',
              },
              {
                floor: 43,
                ceil: 43,
                result: 'Janya',
              },
              {
                floor: 44,
                ceil: 44,
                result: 'Jihun',
              },
              {
                floor: 45,
                ceil: 45,
                result: 'Jorunn',
              },
              {
                floor: 46,
                ceil: 46,
                result: 'Juliana',
              },
              {
                floor: 47,
                ceil: 47,
                result: 'Juro',
              },
              {
                floor: 48,
                ceil: 48,
                result: 'Kaisa',
              },
              {
                floor: 49,
                ceil: 49,
                result: 'Karthik',
              },
              {
                floor: 50,
                ceil: 50,
                result: 'Kayla',
              },
              {
                floor: 51,
                ceil: 51,
                result: 'Kei',
              },
              {
                floor: 52,
                ceil: 52,
                result: 'Kiana',
              },
              {
                floor: 53,
                ceil: 53,
                result: 'Kieran',
              },
              {
                floor: 54,
                ceil: 54,
                result: 'Kierra',
              },
              {
                floor: 55,
                ceil: 55,
                result: 'Kimora',
              },
              {
                floor: 56,
                ceil: 56,
                result: 'Kiri',
              },
              {
                floor: 57,
                ceil: 57,
                result: 'Kirsa',
              },
              {
                floor: 58,
                ceil: 58,
                result: 'Kwan',
              },
              {
                floor: 59,
                ceil: 59,
                result: 'Kylar',
              },
              {
                floor: 60,
                ceil: 60,
                result: 'Landry',
              },
              {
                floor: 61,
                ceil: 61,
                result: 'Logan',
              },
              {
                floor: 62,
                ceil: 62,
                result: 'Lowell',
              },
              {
                floor: 63,
                ceil: 63,
                result: 'Lucas',
              },
              {
                floor: 64,
                ceil: 64,
                result: 'Curtis',
              },
              {
                floor: 65,
                ceil: 65,
                result: 'Luna',
              },
              {
                floor: 66,
                ceil: 66,
                result: 'Lux',
              },
              {
                floor: 67,
                ceil: 67,
                result: 'Mae',
              },
              {
                floor: 68,
                ceil: 68,
                result: 'Magnus',
              },
              {
                floor: 69,
                ceil: 69,
                result: 'Mave',
              },
              {
                floor: 70,
                ceil: 70,
                result: 'Merrick',
              },
              {
                floor: 71,
                ceil: 71,
                result: 'Mina',
              },
              {
                floor: 72,
                ceil: 72,
                result: 'Nashida',
              },
              {
                floor: 73,
                ceil: 73,
                result: 'Nassar',
              },
              {
                floor: 74,
                ceil: 74,
                result: 'Ostara',
              },
              {
                floor: 75,
                ceil: 75,
                result: 'Qasira',
              },
              {
                floor: 76,
                ceil: 76,
                result: 'Quinn',
              },
              {
                floor: 77,
                ceil: 77,
                result: 'Ragnar',
              },
              {
                floor: 78,
                ceil: 78,
                result: 'Raven',
              },
              {
                floor: 79,
                ceil: 79,
                result: 'Ria',
              },
              {
                floor: 80,
                ceil: 80,
                result: 'Rokuro',
              },
              {
                floor: 81,
                ceil: 81,
                result: 'Roland',
              },
              {
                floor: 82,
                ceil: 82,
                result: 'Rowena',
              },
              {
                floor: 83,
                ceil: 83,
                result: 'Sage',
              },
              {
                floor: 84,
                ceil: 84,
                result: 'Saren',
              },
              {
                floor: 85,
                ceil: 85,
                result: 'Annora',
              },
              {
                floor: 86,
                ceil: 86,
                result: 'Severinus',
              },
              {
                floor: 87,
                ceil: 87,
                result: 'Shen',
              },
              {
                floor: 88,
                ceil: 88,
                result: 'Talia',
              },
              {
                floor: 89,
                ceil: 89,
                result: 'Tomiko',
              },
              {
                floor: 90,
                ceil: 90,
                result: 'Ulan',
              },
              {
                floor: 91,
                ceil: 91,
                result: 'Valda',
              },
              {
                floor: 92,
                ceil: 92,
                result: 'Venri',
              },
              {
                floor: 93,
                ceil: 93,
                result: 'Vesper',
              },
              {
                floor: 94,
                ceil: 94,
                result: 'Vuldar',
              },
              {
                floor: 95,
                ceil: 95,
                result: 'William',
              },
              {
                floor: 96,
                ceil: 96,
                result: 'Yelena',
              },
              {
                floor: 97,
                ceil: 97,
                result: 'Zakia',
              },
              {
                floor: 98,
                ceil: 98,
                result: 'Zari',
              },
              {
                floor: 99,
                ceil: 99,
                result: 'Zephyr',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Zoya',
              },
            ],
            description:
              'Given and family names can be used independently as standalone names. In many cases you can reverse the order.',
          },
          Callsign: {
            table: [
              {
                floor: 1,
                ceil: 1,
                result: 'Albatross',
              },
              {
                floor: 2,
                ceil: 2,
                result: 'Angler',
              },
              {
                floor: 3,
                ceil: 3,
                result: 'Anvil',
              },
              {
                floor: 4,
                ceil: 4,
                result: 'Badger',
              },
              {
                floor: 5,
                ceil: 5,
                result: 'Bandit',
              },
              {
                floor: 6,
                ceil: 6,
                result: 'Bash',
              },
              {
                floor: 7,
                ceil: 7,
                result: 'Basilisk',
              },
              {
                floor: 8,
                ceil: 8,
                result: 'Bingo',
              },
              {
                floor: 9,
                ceil: 9,
                result: 'Blackbird',
              },
              {
                floor: 10,
                ceil: 10,
                result: 'Blade',
              },
              {
                floor: 11,
                ceil: 11,
                result: 'Bloodshot',
              },
              {
                floor: 12,
                ceil: 12,
                result: 'Bluewing',
              },
              {
                floor: 13,
                ceil: 13,
                result: 'Bonfire',
              },
              {
                floor: 14,
                ceil: 14,
                result: 'Book',
              },
              {
                floor: 15,
                ceil: 15,
                result: 'Breaker',
              },
              {
                floor: 16,
                ceil: 16,
                result: 'Brick',
              },
              {
                floor: 17,
                ceil: 17,
                result: 'Buzz',
              },
              {
                floor: 18,
                ceil: 18,
                result: 'Buzzard',
              },
              {
                floor: 19,
                ceil: 19,
                result: 'Centurion',
              },
              {
                floor: 20,
                ceil: 20,
                result: 'Chimera',
              },
              {
                floor: 21,
                ceil: 21,
                result: 'Circuit',
              },
              {
                floor: 22,
                ceil: 22,
                result: 'Clank',
              },
              {
                floor: 23,
                ceil: 23,
                result: 'Cleric',
              },
              {
                floor: 24,
                ceil: 24,
                result: 'Crash',
              },
              {
                floor: 25,
                ceil: 25,
                result: 'Cutter',
              },
              {
                floor: 26,
                ceil: 26,
                result: 'Cutthroat',
              },
              {
                floor: 27,
                ceil: 27,
                result: 'Cypher',
              },
              {
                floor: 28,
                ceil: 28,
                result: 'Dagger',
              },
              {
                floor: 29,
                ceil: 29,
                result: 'Dancer',
              },
              {
                floor: 30,
                ceil: 30,
                result: 'Dash',
              },
              {
                floor: 31,
                ceil: 31,
                result: 'Deadeye',
              },
              {
                floor: 32,
                ceil: 32,
                result: 'Deuce',
              },
              {
                floor: 33,
                ceil: 33,
                result: 'Failsafe',
              },
              {
                floor: 34,
                ceil: 34,
                result: 'Farseer',
              },
              {
                floor: 35,
                ceil: 35,
                result: 'Fidget',
              },
              {
                floor: 36,
                ceil: 36,
                result: 'Firestarter',
              },
              {
                floor: 37,
                ceil: 37,
                result: 'Fixer',
              },
              {
                floor: 38,
                ceil: 38,
                result: 'Flatline',
              },
              {
                floor: 39,
                ceil: 39,
                result: 'Ghost',
              },
              {
                floor: 40,
                ceil: 40,
                result: 'Grudge',
              },
              {
                floor: 41,
                ceil: 41,
                result: 'Gutshot',
              },
              {
                floor: 42,
                ceil: 42,
                result: 'Harrow',
              },
              {
                floor: 43,
                ceil: 43,
                result: 'Havoc',
              },
              {
                floor: 44,
                ceil: 44,
                result: 'Hellhound',
              },
              {
                floor: 45,
                ceil: 45,
                result: 'Hellion',
              },
              {
                floor: 46,
                ceil: 46,
                result: 'Hex',
              },
              {
                floor: 47,
                ceil: 47,
                result: 'Hush',
              },
              {
                floor: 48,
                ceil: 48,
                result: 'Ironclad',
              },
              {
                floor: 49,
                ceil: 49,
                result: 'Jackal',
              },
              {
                floor: 50,
                ceil: 50,
                result: 'Jackpot',
              },
              {
                floor: 51,
                ceil: 51,
                result: 'Jester',
              },
              {
                floor: 52,
                ceil: 52,
                result: 'Link',
              },
              {
                floor: 53,
                ceil: 53,
                result: 'Longshot',
              },
              {
                floor: 54,
                ceil: 54,
                result: 'Mainframe',
              },
              {
                floor: 55,
                ceil: 55,
                result: 'Mantis',
              },
              {
                floor: 56,
                ceil: 56,
                result: 'Mimic',
              },
              {
                floor: 57,
                ceil: 57,
                result: 'Mole',
              },
              {
                floor: 58,
                ceil: 58,
                result: 'Monarch',
              },
              {
                floor: 59,
                ceil: 59,
                result: 'Mongoose',
              },
              {
                floor: 60,
                ceil: 60,
                result: 'Nails',
              },
              {
                floor: 61,
                ceil: 61,
                result: 'Ogre',
              },
              {
                floor: 62,
                ceil: 62,
                result: 'Omega',
              },
              {
                floor: 63,
                ceil: 63,
                result: 'Overload',
              },
              {
                floor: 64,
                ceil: 64,
                result: 'Packrat',
              },
              {
                floor: 65,
                ceil: 65,
                result: 'Paladin',
              },
              {
                floor: 66,
                ceil: 66,
                result: 'Phantom',
              },
              {
                floor: 67,
                ceil: 67,
                result: 'Phoenix',
              },
              {
                floor: 68,
                ceil: 68,
                result: 'Pyro',
              },
              {
                floor: 69,
                ceil: 69,
                result: 'Quickdraw',
              },
              {
                floor: 70,
                ceil: 70,
                result: 'Razor',
              },
              {
                floor: 71,
                ceil: 71,
                result: 'Rogue',
              },
              {
                floor: 72,
                ceil: 72,
                result: 'Rook',
              },
              {
                floor: 73,
                ceil: 73,
                result: 'Rover',
              },
              {
                floor: 74,
                ceil: 74,
                result: 'Scout',
              },
              {
                floor: 75,
                ceil: 75,
                result: 'Shadow',
              },
              {
                floor: 76,
                ceil: 76,
                result: 'Shark',
              },
              {
                floor: 77,
                ceil: 77,
                result: 'Shutdown',
              },
              {
                floor: 78,
                ceil: 78,
                result: 'Slack',
              },
              {
                floor: 79,
                ceil: 79,
                result: 'Slash',
              },
              {
                floor: 80,
                ceil: 80,
                result: 'Snipe',
              },
              {
                floor: 81,
                ceil: 81,
                result: 'Spider',
              },
              {
                floor: 82,
                ceil: 82,
                result: 'Splinter',
              },
              {
                floor: 83,
                ceil: 83,
                result: 'Static',
              },
              {
                floor: 84,
                ceil: 84,
                result: 'Stinger',
              },
              {
                floor: 85,
                ceil: 85,
                result: 'Straggler',
              },
              {
                floor: 86,
                ceil: 86,
                result: 'Swindle',
              },
              {
                floor: 87,
                ceil: 87,
                result: 'Tinker',
              },
              {
                floor: 88,
                ceil: 88,
                result: 'Touchdown',
              },
              {
                floor: 89,
                ceil: 89,
                result: 'Tycoon',
              },
              {
                floor: 90,
                ceil: 90,
                result: 'Vagabond',
              },
              {
                floor: 91,
                ceil: 91,
                result: 'Valkyrie',
              },
              {
                floor: 92,
                ceil: 92,
                result: 'Vanguard',
              },
              {
                floor: 93,
                ceil: 93,
                result: 'Vertigo',
              },
              {
                floor: 94,
                ceil: 94,
                result: 'Warden',
              },
              {
                floor: 95,
                ceil: 95,
                result: 'Watchdog',
              },
              {
                floor: 96,
                ceil: 96,
                result: 'Wayfinder',
              },
              {
                floor: 97,
                ceil: 97,
                result: 'Whisper',
              },
              {
                floor: 98,
                ceil: 98,
                result: 'Wraith',
              },
              {
                floor: 99,
                ceil: 99,
                result: 'Wrongway',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Zephyr',
              },
            ],
            description:
              'Spacers are often known only by their callsigns, with their “dirtside names” reserved for family and close friends.',
          },
          'Family Name': {
            table: [
              {
                floor: 1,
                ceil: 1,
                result: 'Kuzmin',
              },
              {
                floor: 2,
                ceil: 2,
                result: 'Durant',
              },
              {
                floor: 3,
                ceil: 3,
                result: 'Jefferies',
              },
              {
                floor: 4,
                ceil: 4,
                result: 'Velez',
              },
              {
                floor: 5,
                ceil: 5,
                result: 'Lontoc',
              },
              {
                floor: 6,
                ceil: 6,
                result: 'Wade',
              },
              {
                floor: 7,
                ceil: 7,
                result: 'Kade',
              },
              {
                floor: 8,
                ceil: 8,
                result: 'Thorn',
              },
              {
                floor: 9,
                ceil: 9,
                result: 'Khosla',
              },
              {
                floor: 10,
                ceil: 10,
                result: 'Hendrix',
              },
              {
                floor: 11,
                ceil: 11,
                result: 'Okiro',
              },
              {
                floor: 12,
                ceil: 12,
                result: 'Ripley',
              },
              {
                floor: 13,
                ceil: 13,
                result: 'Talin',
              },
              {
                floor: 14,
                ceil: 14,
                result: 'Jin',
              },
              {
                floor: 15,
                ceil: 15,
                result: 'Finn',
              },
              {
                floor: 16,
                ceil: 16,
                result: 'Solas',
              },
              {
                floor: 17,
                ceil: 17,
                result: 'Quint',
              },
              {
                floor: 18,
                ceil: 18,
                result: 'Keelan',
              },
              {
                floor: 19,
                ceil: 19,
                result: 'Silva',
              },
              {
                floor: 20,
                ceil: 20,
                result: 'Valk',
              },
              {
                floor: 21,
                ceil: 21,
                result: "O'Brien",
              },
              {
                floor: 22,
                ceil: 22,
                result: 'Ruiz',
              },
              {
                floor: 23,
                ceil: 23,
                result: 'Stallard',
              },
              {
                floor: 24,
                ceil: 24,
                result: 'Mackenson',
              },
              {
                floor: 25,
                ceil: 25,
                result: 'Jensen',
              },
              {
                floor: 26,
                ceil: 26,
                result: 'Sakir',
              },
              {
                floor: 27,
                ceil: 27,
                result: 'Tolari',
              },
              {
                floor: 28,
                ceil: 28,
                result: 'Kain',
              },
              {
                floor: 29,
                ceil: 29,
                result: 'Carr',
              },
              {
                floor: 30,
                ceil: 30,
                result: 'Valenus',
              },
              {
                floor: 31,
                ceil: 31,
                result: 'Kaan',
              },
              {
                floor: 32,
                ceil: 32,
                result: 'Taylan',
              },
              {
                floor: 33,
                ceil: 33,
                result: 'Legrand',
              },
              {
                floor: 34,
                ceil: 34,
                result: 'Jemison',
              },
              {
                floor: 35,
                ceil: 35,
                result: 'Arden',
              },
              {
                floor: 36,
                ceil: 36,
                result: 'Sayer',
              },
              {
                floor: 37,
                ceil: 37,
                result: 'Kai',
              },
              {
                floor: 38,
                ceil: 38,
                result: 'Slater',
              },
              {
                floor: 39,
                ceil: 39,
                result: 'Edris',
              },
              {
                floor: 40,
                ceil: 40,
                result: 'Sutton',
              },
              {
                floor: 41,
                ceil: 41,
                result: 'Savarin',
              },
              {
                floor: 42,
                ceil: 42,
                result: 'Bridger',
              },
              {
                floor: 43,
                ceil: 43,
                result: 'Mital',
              },
              {
                floor: 44,
                ceil: 44,
                result: 'Shin',
              },
              {
                floor: 45,
                ceil: 45,
                result: 'Nadir',
              },
              {
                floor: 46,
                ceil: 46,
                result: 'Santos',
              },
              {
                floor: 47,
                ceil: 47,
                result: 'Mihara',
              },
              {
                floor: 48,
                ceil: 48,
                result: 'Buhari',
              },
              {
                floor: 49,
                ceil: 49,
                result: 'Salvi',
              },
              {
                floor: 50,
                ceil: 50,
                result: 'Adler',
              },
              {
                floor: 51,
                ceil: 51,
                result: 'Takara',
              },
              {
                floor: 52,
                ceil: 52,
                result: 'Shelton',
              },
              {
                floor: 53,
                ceil: 53,
                result: 'Vandu',
              },
              {
                floor: 54,
                ceil: 54,
                result: 'Vega',
              },
              {
                floor: 55,
                ceil: 55,
                result: 'Zhang',
              },
              {
                floor: 56,
                ceil: 56,
                result: 'Savela',
              },
              {
                floor: 57,
                ceil: 57,
                result: 'Hawking',
              },
              {
                floor: 58,
                ceil: 58,
                result: 'Jen',
              },
              {
                floor: 59,
                ceil: 59,
                result: 'Hobbs',
              },
              {
                floor: 60,
                ceil: 60,
                result: 'Holland',
              },
              {
                floor: 61,
                ceil: 61,
                result: 'Silvius',
              },
              {
                floor: 62,
                ceil: 62,
                result: 'Freeman',
              },
              {
                floor: 63,
                ceil: 63,
                result: 'Barbosa',
              },
              {
                floor: 64,
                ceil: 64,
                result: 'Winter',
              },
              {
                floor: 65,
                ceil: 65,
                result: 'Hammond',
              },
              {
                floor: 66,
                ceil: 66,
                result: 'Archer',
              },
              {
                floor: 67,
                ceil: 67,
                result: 'Barlowe',
              },
              {
                floor: 68,
                ceil: 68,
                result: 'Shepherd',
              },
              {
                floor: 69,
                ceil: 69,
                result: 'Griffin',
              },
              {
                floor: 70,
                ceil: 70,
                result: 'Frost',
              },
              {
                floor: 71,
                ceil: 71,
                result: 'Quon',
              },
              {
                floor: 72,
                ceil: 72,
                result: 'Malek',
              },
              {
                floor: 73,
                ceil: 73,
                result: 'Murad',
              },
              {
                floor: 74,
                ceil: 74,
                result: 'Becker',
              },
              {
                floor: 75,
                ceil: 75,
                result: 'Ammar',
              },
              {
                floor: 76,
                ceil: 76,
                result: 'Braddock',
              },
              {
                floor: 77,
                ceil: 77,
                result: 'Blackstone',
              },
              {
                floor: 78,
                ceil: 78,
                result: 'Hadley',
              },
              {
                floor: 79,
                ceil: 79,
                result: 'Farin',
              },
              {
                floor: 80,
                ceil: 80,
                result: 'Kobayashi',
              },
              {
                floor: 81,
                ceil: 81,
                result: 'Duval',
              },
              {
                floor: 82,
                ceil: 82,
                result: 'Hunter',
              },
              {
                floor: 83,
                ceil: 83,
                result: 'Beckett',
              },
              {
                floor: 84,
                ceil: 84,
                result: 'Dykstra',
              },
              {
                floor: 85,
                ceil: 85,
                result: 'Gray',
              },
              {
                floor: 86,
                ceil: 86,
                result: 'Sedano',
              },
              {
                floor: 87,
                ceil: 87,
                result: 'Bai',
              },
              {
                floor: 88,
                ceil: 88,
                result: 'Booker',
              },
              {
                floor: 89,
                ceil: 89,
                result: 'Sato',
              },
              {
                floor: 90,
                ceil: 90,
                result: 'Vayan',
              },
              {
                floor: 91,
                ceil: 91,
                result: 'Bond',
              },
              {
                floor: 92,
                ceil: 92,
                result: 'Stark',
              },
              {
                floor: 93,
                ceil: 93,
                result: 'Stirling',
              },
              {
                floor: 94,
                ceil: 94,
                result: 'Wolfe',
              },
              {
                floor: 95,
                ceil: 95,
                result: "O'Niel",
              },
              {
                floor: 96,
                ceil: 96,
                result: 'Petrov',
              },
              {
                floor: 97,
                ceil: 97,
                result: 'Nazari',
              },
              {
                floor: 98,
                ceil: 98,
                result: 'Darwin',
              },
              {
                floor: 99,
                ceil: 99,
                result: 'Pearson',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Volkov',
              },
            ],
            description:
              'Given and family names can be used independently as standalone names. In many cases you can reverse the order.',
          },
        },
      },
    },
  },
  Core: {
    oracles: {
      Action: {
        table: [
          {
            floor: 1,
            ceil: 1,
            result: 'Abandon',
          },
          {
            floor: 2,
            ceil: 2,
            result: 'Acquire',
          },
          {
            floor: 3,
            ceil: 3,
            result: 'Advance',
          },
          {
            floor: 4,
            ceil: 4,
            result: 'Affect',
          },
          {
            floor: 5,
            ceil: 5,
            result: 'Aid',
          },
          {
            floor: 6,
            ceil: 6,
            result: 'Arrive',
          },
          {
            floor: 7,
            ceil: 7,
            result: 'Assault',
          },
          {
            floor: 8,
            ceil: 8,
            result: 'Attack',
          },
          {
            floor: 9,
            ceil: 9,
            result: 'Avenge',
          },
          {
            floor: 10,
            ceil: 10,
            result: 'Avoid',
          },
          {
            floor: 11,
            ceil: 11,
            result: 'Await',
          },
          {
            floor: 12,
            ceil: 12,
            result: 'Begin',
          },
          {
            floor: 13,
            ceil: 13,
            result: 'Betray',
          },
          {
            floor: 14,
            ceil: 14,
            result: 'Bolster',
          },
          {
            floor: 15,
            ceil: 15,
            result: 'Breach',
          },
          {
            floor: 16,
            ceil: 16,
            result: 'Break',
          },
          {
            floor: 17,
            ceil: 17,
            result: 'Capture',
          },
          {
            floor: 18,
            ceil: 18,
            result: 'Challenge',
          },
          {
            floor: 19,
            ceil: 19,
            result: 'Change',
          },
          {
            floor: 20,
            ceil: 20,
            result: 'Charge',
          },
          {
            floor: 21,
            ceil: 21,
            result: 'Clash',
          },
          {
            floor: 22,
            ceil: 22,
            result: 'Command',
          },
          {
            floor: 23,
            ceil: 23,
            result: 'Communicate',
          },
          {
            floor: 24,
            ceil: 24,
            result: 'Construct',
          },
          {
            floor: 25,
            ceil: 25,
            result: 'Control',
          },
          {
            floor: 26,
            ceil: 26,
            result: 'Coordinate',
          },
          {
            floor: 27,
            ceil: 27,
            result: 'Create',
          },
          {
            floor: 28,
            ceil: 28,
            result: 'Debate',
          },
          {
            floor: 29,
            ceil: 29,
            result: 'Defeat',
          },
          {
            floor: 30,
            ceil: 30,
            result: 'Defend',
          },
          {
            floor: 31,
            ceil: 31,
            result: 'Deflect',
          },
          {
            floor: 32,
            ceil: 32,
            result: 'Defy',
          },
          {
            floor: 33,
            ceil: 33,
            result: 'Deliver',
          },
          {
            floor: 34,
            ceil: 34,
            result: 'Demand',
          },
          {
            floor: 35,
            ceil: 35,
            result: 'Depart',
          },
          {
            floor: 36,
            ceil: 36,
            result: 'Destroy',
          },
          {
            floor: 37,
            ceil: 37,
            result: 'Distract',
          },
          {
            floor: 38,
            ceil: 38,
            result: 'Eliminate',
          },
          {
            floor: 39,
            ceil: 39,
            result: 'Endure',
          },
          {
            floor: 40,
            ceil: 40,
            result: 'Escalate',
          },
          {
            floor: 41,
            ceil: 41,
            result: 'Escort',
          },
          {
            floor: 42,
            ceil: 42,
            result: 'Evade',
          },
          {
            floor: 43,
            ceil: 43,
            result: 'Explore',
          },
          {
            floor: 44,
            ceil: 44,
            result: 'Falter',
          },
          {
            floor: 45,
            ceil: 45,
            result: 'Find',
          },
          {
            floor: 46,
            ceil: 46,
            result: 'Finish',
          },
          {
            floor: 47,
            ceil: 47,
            result: 'Focus',
          },
          {
            floor: 48,
            ceil: 48,
            result: 'Follow',
          },
          {
            floor: 49,
            ceil: 49,
            result: 'Fortify',
          },
          {
            floor: 50,
            ceil: 50,
            result: 'Gather',
          },
          {
            floor: 51,
            ceil: 51,
            result: 'Guard',
          },
          {
            floor: 52,
            ceil: 52,
            result: 'Hide',
          },
          {
            floor: 53,
            ceil: 53,
            result: 'Hold',
          },
          {
            floor: 54,
            ceil: 54,
            result: 'Hunt',
          },
          {
            floor: 55,
            ceil: 55,
            result: 'Impress',
          },
          {
            floor: 56,
            ceil: 56,
            result: 'Initiate',
          },
          {
            floor: 57,
            ceil: 57,
            result: 'Inspect',
          },
          {
            floor: 58,
            ceil: 58,
            result: 'Investigate',
          },
          {
            floor: 59,
            ceil: 59,
            result: 'Journey',
          },
          {
            floor: 60,
            ceil: 60,
            result: 'Learn',
          },
          {
            floor: 61,
            ceil: 61,
            result: 'Leave',
          },
          {
            floor: 62,
            ceil: 62,
            result: 'Locate',
          },
          {
            floor: 63,
            ceil: 63,
            result: 'Lose',
          },
          {
            floor: 64,
            ceil: 64,
            result: 'Manipulate',
          },
          {
            floor: 65,
            ceil: 65,
            result: 'Mourn',
          },
          {
            floor: 66,
            ceil: 66,
            result: 'Move',
          },
          {
            floor: 67,
            ceil: 67,
            result: 'Oppose',
          },
          {
            floor: 68,
            ceil: 68,
            result: 'Overwhelm',
          },
          {
            floor: 69,
            ceil: 69,
            result: 'Persevere',
          },
          {
            floor: 70,
            ceil: 70,
            result: 'Preserve',
          },
          {
            floor: 71,
            ceil: 71,
            result: 'Protect',
          },
          {
            floor: 72,
            ceil: 72,
            result: 'Raid',
          },
          {
            floor: 73,
            ceil: 73,
            result: 'Reduce',
          },
          {
            floor: 74,
            ceil: 74,
            result: 'Refuse',
          },
          {
            floor: 75,
            ceil: 75,
            result: 'Reject',
          },
          {
            floor: 76,
            ceil: 76,
            result: 'Release',
          },
          {
            floor: 77,
            ceil: 77,
            result: 'Remove',
          },
          {
            floor: 78,
            ceil: 78,
            result: 'Research',
          },
          {
            floor: 79,
            ceil: 79,
            result: 'Resist',
          },
          {
            floor: 80,
            ceil: 80,
            result: 'Restore',
          },
          {
            floor: 81,
            ceil: 81,
            result: 'Reveal',
          },
          {
            floor: 82,
            ceil: 82,
            result: 'Risk',
          },
          {
            floor: 83,
            ceil: 83,
            result: 'Scheme',
          },
          {
            floor: 84,
            ceil: 84,
            result: 'Search',
          },
          {
            floor: 85,
            ceil: 85,
            result: 'Secure',
          },
          {
            floor: 86,
            ceil: 86,
            result: 'Seize',
          },
          {
            floor: 87,
            ceil: 87,
            result: 'Serve',
          },
          {
            floor: 88,
            ceil: 88,
            result: 'Share',
          },
          {
            floor: 89,
            ceil: 89,
            result: 'Strengthen',
          },
          {
            floor: 90,
            ceil: 90,
            result: 'Summon',
          },
          {
            floor: 91,
            ceil: 91,
            result: 'Support',
          },
          {
            floor: 92,
            ceil: 92,
            result: 'Suppress',
          },
          {
            floor: 93,
            ceil: 93,
            result: 'Surrender',
          },
          {
            floor: 94,
            ceil: 94,
            result: 'Swear',
          },
          {
            floor: 95,
            ceil: 95,
            result: 'Threaten',
          },
          {
            floor: 96,
            ceil: 96,
            result: 'Transform',
          },
          {
            floor: 97,
            ceil: 97,
            result: 'Uncover',
          },
          {
            floor: 98,
            ceil: 98,
            result: 'Uphold',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'Weaken',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Withdraw',
          },
        ],
        description:
          'Use these oracle tables to reveal details about a goal, situation, or event. They provide a word or phrase that can be taken literally or interpreted as an abstraction.\n\nAction and Theme can answer questions such as:\n\n  * “What does this character want?”\n  * “What is this faction’s mission?”\n  * “What caused the downfall of this settlement?”\n  * “What is this device’s purpose?”',
      },
      Theme: {
        table: [
          {
            floor: 1,
            ceil: 1,
            result: 'Ability',
          },
          {
            floor: 2,
            ceil: 2,
            result: 'Advantage',
          },
          {
            floor: 3,
            ceil: 3,
            result: 'Alliance',
          },
          {
            floor: 4,
            ceil: 4,
            result: 'Authority',
          },
          {
            floor: 5,
            ceil: 5,
            result: 'Balance',
          },
          {
            floor: 6,
            ceil: 6,
            result: 'Barrier',
          },
          {
            floor: 7,
            ceil: 7,
            result: 'Belief',
          },
          {
            floor: 8,
            ceil: 8,
            result: 'Blood',
          },
          {
            floor: 9,
            ceil: 9,
            result: 'Bond',
          },
          {
            floor: 10,
            ceil: 10,
            result: 'Burden',
          },
          {
            floor: 11,
            ceil: 11,
            result: 'Commerce',
          },
          {
            floor: 12,
            ceil: 12,
            result: 'Community',
          },
          {
            floor: 13,
            ceil: 13,
            result: 'Corruption',
          },
          {
            floor: 14,
            ceil: 14,
            result: 'Creation',
          },
          {
            floor: 15,
            ceil: 15,
            result: 'Crime',
          },
          {
            floor: 16,
            ceil: 16,
            result: 'Culture',
          },
          {
            floor: 17,
            ceil: 17,
            result: 'Cure',
          },
          {
            floor: 18,
            ceil: 18,
            result: 'Danger',
          },
          {
            floor: 19,
            ceil: 19,
            result: 'Death',
          },
          {
            floor: 20,
            ceil: 20,
            result: 'Debt',
          },
          {
            floor: 21,
            ceil: 21,
            result: 'Decay',
          },
          {
            floor: 22,
            ceil: 22,
            result: 'Deception',
          },
          {
            floor: 23,
            ceil: 23,
            result: 'Defense',
          },
          {
            floor: 24,
            ceil: 24,
            result: 'Destiny',
          },
          {
            floor: 25,
            ceil: 25,
            result: 'Disaster',
          },
          {
            floor: 26,
            ceil: 26,
            result: 'Discovery',
          },
          {
            floor: 27,
            ceil: 27,
            result: 'Disease',
          },
          {
            floor: 28,
            ceil: 28,
            result: 'Dominion',
          },
          {
            floor: 29,
            ceil: 29,
            result: 'Dream',
          },
          {
            floor: 30,
            ceil: 30,
            result: 'Duty',
          },
          {
            floor: 31,
            ceil: 31,
            result: 'Enemy',
          },
          {
            floor: 32,
            ceil: 32,
            result: 'Expedition',
          },
          {
            floor: 33,
            ceil: 33,
            result: 'Faction',
          },
          {
            floor: 34,
            ceil: 34,
            result: 'Fame',
          },
          {
            floor: 35,
            ceil: 35,
            result: 'Family',
          },
          {
            floor: 36,
            ceil: 36,
            result: 'Fear',
          },
          {
            floor: 37,
            ceil: 37,
            result: 'Fellowship',
          },
          {
            floor: 38,
            ceil: 38,
            result: 'Freedom',
          },
          {
            floor: 39,
            ceil: 39,
            result: 'Greed',
          },
          {
            floor: 40,
            ceil: 40,
            result: 'Hardship',
          },
          {
            floor: 41,
            ceil: 41,
            result: 'Hate',
          },
          {
            floor: 42,
            ceil: 42,
            result: 'Health',
          },
          {
            floor: 43,
            ceil: 43,
            result: 'History',
          },
          {
            floor: 44,
            ceil: 44,
            result: 'Home',
          },
          {
            floor: 45,
            ceil: 45,
            result: 'Honor',
          },
          {
            floor: 46,
            ceil: 46,
            result: 'Hope',
          },
          {
            floor: 47,
            ceil: 47,
            result: 'Humanity',
          },
          {
            floor: 48,
            ceil: 48,
            result: 'Innocence',
          },
          {
            floor: 49,
            ceil: 49,
            result: 'Knowledge',
          },
          {
            floor: 50,
            ceil: 50,
            result: 'Labor',
          },
          {
            floor: 51,
            ceil: 51,
            result: 'Language',
          },
          {
            floor: 52,
            ceil: 52,
            result: 'Law',
          },
          {
            floor: 53,
            ceil: 53,
            result: 'Legacy',
          },
          {
            floor: 54,
            ceil: 54,
            result: 'Life',
          },
          {
            floor: 55,
            ceil: 55,
            result: 'Love',
          },
          {
            floor: 56,
            ceil: 56,
            result: 'Memory',
          },
          {
            floor: 57,
            ceil: 57,
            result: 'Nature',
          },
          {
            floor: 58,
            ceil: 58,
            result: 'Opportunity',
          },
          {
            floor: 59,
            ceil: 59,
            result: 'Passage',
          },
          {
            floor: 60,
            ceil: 60,
            result: 'Peace',
          },
          {
            floor: 61,
            ceil: 61,
            result: 'Phenomenon',
          },
          {
            floor: 62,
            ceil: 62,
            result: 'Possession',
          },
          {
            floor: 63,
            ceil: 63,
            result: 'Power',
          },
          {
            floor: 64,
            ceil: 64,
            result: 'Price',
          },
          {
            floor: 65,
            ceil: 65,
            result: 'Pride',
          },
          {
            floor: 66,
            ceil: 66,
            result: 'Prize',
          },
          {
            floor: 67,
            ceil: 67,
            result: 'Prophesy',
          },
          {
            floor: 68,
            ceil: 68,
            result: 'Protection',
          },
          {
            floor: 69,
            ceil: 69,
            result: 'Quest',
          },
          {
            floor: 70,
            ceil: 70,
            result: 'Relationship',
          },
          {
            floor: 71,
            ceil: 71,
            result: 'Religion',
          },
          {
            floor: 72,
            ceil: 72,
            result: 'Reputation',
          },
          {
            floor: 73,
            ceil: 73,
            result: 'Resource',
          },
          {
            floor: 74,
            ceil: 74,
            result: 'Revenge',
          },
          {
            floor: 75,
            ceil: 75,
            result: 'Rival',
          },
          {
            floor: 76,
            ceil: 76,
            result: 'Rumor',
          },
          {
            floor: 77,
            ceil: 77,
            result: 'Safety',
          },
          {
            floor: 78,
            ceil: 78,
            result: 'Sanctuary',
          },
          {
            floor: 79,
            ceil: 79,
            result: 'Secret',
          },
          {
            floor: 80,
            ceil: 80,
            result: 'Solution',
          },
          {
            floor: 81,
            ceil: 81,
            result: 'Spirit',
          },
          {
            floor: 82,
            ceil: 82,
            result: 'Stranger',
          },
          {
            floor: 83,
            ceil: 83,
            result: 'Strategy',
          },
          {
            floor: 84,
            ceil: 84,
            result: 'Strength',
          },
          {
            floor: 85,
            ceil: 85,
            result: 'Superstition',
          },
          {
            floor: 86,
            ceil: 86,
            result: 'Supply',
          },
          {
            floor: 87,
            ceil: 87,
            result: 'Survival',
          },
          {
            floor: 88,
            ceil: 88,
            result: 'Technology',
          },
          {
            floor: 89,
            ceil: 89,
            result: 'Time',
          },
          {
            floor: 90,
            ceil: 90,
            result: 'Tool',
          },
          {
            floor: 91,
            ceil: 91,
            result: 'Trade',
          },
          {
            floor: 92,
            ceil: 92,
            result: 'Truth',
          },
          {
            floor: 93,
            ceil: 93,
            result: 'Vengeance',
          },
          {
            floor: 94,
            ceil: 94,
            result: 'Vow',
          },
          {
            floor: 95,
            ceil: 95,
            result: 'War',
          },
          {
            floor: 96,
            ceil: 96,
            result: 'Warning',
          },
          {
            floor: 97,
            ceil: 97,
            result: 'Weakness',
          },
          {
            floor: 98,
            ceil: 98,
            result: 'Wealth',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'Weapon',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'World',
          },
        ],
        description:
          'Use these oracle tables to reveal details about a goal, situation, or event. They provide a word or phrase that can be taken literally or interpreted as an abstraction.\n\nAction and Theme can answer questions such as:\n\n  * “What does this character want?”\n  * “What is this faction’s mission?”\n  * “What caused the downfall of this settlement?”\n  * “What is this device’s purpose?”',
      },
      Descriptor: {
        table: [
          {
            floor: 1,
            ceil: 1,
            result: 'Abandoned',
          },
          {
            floor: 2,
            ceil: 2,
            result: 'Abundant',
          },
          {
            floor: 3,
            ceil: 3,
            result: 'Active',
          },
          {
            floor: 4,
            ceil: 4,
            result: 'Advanced',
          },
          {
            floor: 5,
            ceil: 5,
            result: 'Alien',
          },
          {
            floor: 6,
            ceil: 6,
            result: 'Ancient',
          },
          {
            floor: 7,
            ceil: 7,
            result: 'Archaic',
          },
          {
            floor: 8,
            ceil: 8,
            result: 'Automated',
          },
          {
            floor: 9,
            ceil: 9,
            result: 'Barren',
          },
          {
            floor: 10,
            ceil: 10,
            result: 'Biological',
          },
          {
            floor: 11,
            ceil: 11,
            result: 'Blighted',
          },
          {
            floor: 12,
            ceil: 12,
            result: 'Blocked',
          },
          {
            floor: 13,
            ceil: 13,
            result: 'Breached',
          },
          {
            floor: 14,
            ceil: 14,
            result: 'Broken',
          },
          {
            floor: 15,
            ceil: 15,
            result: 'Captured',
          },
          {
            floor: 16,
            ceil: 16,
            result: 'Chaotic',
          },
          {
            floor: 17,
            ceil: 17,
            result: 'Civilized',
          },
          {
            floor: 18,
            ceil: 18,
            result: 'Collapsed',
          },
          {
            floor: 19,
            ceil: 19,
            result: 'Colossal',
          },
          {
            floor: 20,
            ceil: 20,
            result: 'Confined',
          },
          {
            floor: 21,
            ceil: 21,
            result: 'Conspicuous',
          },
          {
            floor: 22,
            ceil: 22,
            result: 'Constructed',
          },
          {
            floor: 23,
            ceil: 23,
            result: 'Contested',
          },
          {
            floor: 24,
            ceil: 24,
            result: 'Corrupted',
          },
          {
            floor: 25,
            ceil: 25,
            result: 'Created',
          },
          {
            floor: 26,
            ceil: 26,
            result: 'Damaged',
          },
          {
            floor: 27,
            ceil: 27,
            result: 'Dead',
          },
          {
            floor: 28,
            ceil: 28,
            result: 'Deadly',
          },
          {
            floor: 29,
            ceil: 29,
            result: 'Decaying',
          },
          {
            floor: 30,
            ceil: 30,
            result: 'Defended',
          },
          {
            floor: 31,
            ceil: 31,
            result: 'Depleted',
          },
          {
            floor: 32,
            ceil: 32,
            result: 'Desolate',
          },
          {
            floor: 33,
            ceil: 33,
            result: 'Destroyed',
          },
          {
            floor: 34,
            ceil: 34,
            result: 'Diverse',
          },
          {
            floor: 35,
            ceil: 35,
            result: 'Empty',
          },
          {
            floor: 36,
            ceil: 36,
            result: 'Engulfed',
          },
          {
            floor: 37,
            ceil: 37,
            result: 'Ensnaring',
          },
          {
            floor: 38,
            ceil: 38,
            result: 'Expansive',
          },
          {
            floor: 39,
            ceil: 39,
            result: 'Exposed',
          },
          {
            floor: 40,
            ceil: 40,
            result: 'Fiery',
          },
          {
            floor: 41,
            ceil: 41,
            result: 'Foreboding',
          },
          {
            floor: 42,
            ceil: 42,
            result: 'Forgotten',
          },
          {
            floor: 43,
            ceil: 43,
            result: 'Forsaken',
          },
          {
            floor: 44,
            ceil: 44,
            result: 'Fortified',
          },
          {
            floor: 45,
            ceil: 45,
            result: 'Foul',
          },
          {
            floor: 46,
            ceil: 46,
            result: 'Fragile',
          },
          {
            floor: 47,
            ceil: 47,
            result: 'Frozen',
          },
          {
            floor: 48,
            ceil: 48,
            result: 'Functional',
          },
          {
            floor: 49,
            ceil: 49,
            result: 'Grim',
          },
          {
            floor: 50,
            ceil: 50,
            result: 'Guarded',
          },
          {
            floor: 51,
            ceil: 51,
            result: 'Haunted',
          },
          {
            floor: 52,
            ceil: 52,
            result: 'Hidden',
          },
          {
            floor: 53,
            ceil: 53,
            result: 'Hoarded',
          },
          {
            floor: 54,
            ceil: 54,
            result: 'Hostile',
          },
          {
            floor: 55,
            ceil: 55,
            result: 'Immersed',
          },
          {
            floor: 56,
            ceil: 56,
            result: 'Inaccessible',
          },
          {
            floor: 57,
            ceil: 57,
            result: 'Infested',
          },
          {
            floor: 58,
            ceil: 58,
            result: 'Inhabited',
          },
          {
            floor: 59,
            ceil: 59,
            result: 'Isolated',
          },
          {
            floor: 60,
            ceil: 60,
            result: 'Living',
          },
          {
            floor: 61,
            ceil: 61,
            result: 'Lost',
          },
          {
            floor: 62,
            ceil: 62,
            result: 'Lush',
          },
          {
            floor: 63,
            ceil: 63,
            result: 'Makeshift',
          },
          {
            floor: 64,
            ceil: 64,
            result: 'Mechanical',
          },
          {
            floor: 65,
            ceil: 65,
            result: 'Misleading',
          },
          {
            floor: 66,
            ceil: 66,
            result: 'Moving',
          },
          {
            floor: 67,
            ceil: 67,
            result: 'Mysterious',
          },
          {
            floor: 68,
            ceil: 68,
            result: 'Natural',
          },
          {
            floor: 69,
            ceil: 69,
            result: 'New',
          },
          {
            floor: 70,
            ceil: 70,
            result: 'Obscured',
          },
          {
            floor: 71,
            ceil: 71,
            result: 'Open',
          },
          {
            floor: 72,
            ceil: 72,
            result: 'Peaceful',
          },
          {
            floor: 73,
            ceil: 73,
            result: 'Perilous',
          },
          {
            floor: 74,
            ceil: 74,
            result: 'Pillaged',
          },
          {
            floor: 75,
            ceil: 75,
            result: 'Powerful',
          },
          {
            floor: 76,
            ceil: 76,
            result: 'Preserved',
          },
          {
            floor: 77,
            ceil: 77,
            result: 'Prominent',
          },
          {
            floor: 78,
            ceil: 78,
            result: 'Protected',
          },
          {
            floor: 79,
            ceil: 79,
            result: 'Radiant',
          },
          {
            floor: 80,
            ceil: 80,
            result: 'Rare',
          },
          {
            floor: 81,
            ceil: 81,
            result: 'Remote',
          },
          {
            floor: 82,
            ceil: 82,
            result: 'Rich',
          },
          {
            floor: 83,
            ceil: 83,
            result: 'Ruined',
          },
          {
            floor: 84,
            ceil: 84,
            result: 'Sacred',
          },
          {
            floor: 85,
            ceil: 85,
            result: 'Safe',
          },
          {
            floor: 86,
            ceil: 86,
            result: 'Sealed',
          },
          {
            floor: 87,
            ceil: 87,
            result: 'Secret',
          },
          {
            floor: 88,
            ceil: 88,
            result: 'Settled',
          },
          {
            floor: 89,
            ceil: 89,
            result: 'Shrouded',
          },
          {
            floor: 90,
            ceil: 90,
            result: 'Stolen',
          },
          {
            floor: 91,
            ceil: 91,
            result: 'Strange',
          },
          {
            floor: 92,
            ceil: 92,
            result: 'Subsurface',
          },
          {
            floor: 93,
            ceil: 93,
            result: 'Toxic',
          },
          {
            floor: 94,
            ceil: 94,
            result: 'Trapped',
          },
          {
            floor: 95,
            ceil: 95,
            result: 'Undiscovered',
          },
          {
            floor: 96,
            ceil: 96,
            result: 'Unnatural',
          },
          {
            floor: 97,
            ceil: 97,
            result: 'Unstable',
          },
          {
            floor: 98,
            ceil: 98,
            result: 'Untamed',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'Valuable',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Violent',
          },
        ],
        description:
          'Use these oracles to generate the details of a location, discovery, or encounter. The Descriptor oracle is particularly handy for quick generation of a location. For example, use it to describe the basic nature of a planet instead of rolling on the detailed planet oracles.\n\nDescriptor and Focus can answer questions such as:\n\n  * “What is this ship’s cargo?”\n  * “What is the nature of this planet?”\n  * “What is inside this station?”\n  * “What hazard do I encounter?”',
      },
      Focus: {
        table: [
          {
            floor: 1,
            ceil: 1,
            result: 'Alarm',
          },
          {
            floor: 2,
            ceil: 2,
            result: 'Anomaly',
          },
          {
            floor: 3,
            ceil: 3,
            result: 'Apparition',
          },
          {
            floor: 4,
            ceil: 4,
            result: 'Archive',
          },
          {
            floor: 5,
            ceil: 5,
            result: 'Art',
          },
          {
            floor: 6,
            ceil: 6,
            result: 'Artifact',
          },
          {
            floor: 7,
            ceil: 7,
            result: 'Atmosphere',
          },
          {
            floor: 8,
            ceil: 8,
            result: 'Battleground',
          },
          {
            floor: 9,
            ceil: 9,
            result: 'Beacon',
          },
          {
            floor: 10,
            ceil: 10,
            result: 'Being',
          },
          {
            floor: 11,
            ceil: 11,
            result: 'Blockade',
          },
          {
            floor: 12,
            ceil: 12,
            result: 'Boundary',
          },
          {
            floor: 13,
            ceil: 13,
            result: 'Cache',
          },
          {
            floor: 14,
            ceil: 14,
            result: 'Cargo',
          },
          {
            floor: 15,
            ceil: 15,
            result: 'Commodity',
          },
          {
            floor: 16,
            ceil: 16,
            result: 'Confinement',
          },
          {
            floor: 17,
            ceil: 17,
            result: 'Connection',
          },
          {
            floor: 18,
            ceil: 18,
            result: 'Container',
          },
          {
            floor: 19,
            ceil: 19,
            result: 'Creation',
          },
          {
            floor: 20,
            ceil: 20,
            result: 'Creature',
          },
          {
            floor: 21,
            ceil: 21,
            result: 'Crossing',
          },
          {
            floor: 22,
            ceil: 22,
            result: 'Data',
          },
          {
            floor: 23,
            ceil: 23,
            result: 'Debris',
          },
          {
            floor: 24,
            ceil: 24,
            result: 'Device',
          },
          {
            floor: 25,
            ceil: 25,
            result: 'Dimension',
          },
          {
            floor: 26,
            ceil: 26,
            result: 'Discovery',
          },
          {
            floor: 27,
            ceil: 27,
            result: 'Ecosystem',
          },
          {
            floor: 28,
            ceil: 28,
            result: 'Enclosure',
          },
          {
            floor: 29,
            ceil: 29,
            result: 'Energy',
          },
          {
            floor: 30,
            ceil: 30,
            result: 'Environment',
          },
          {
            floor: 31,
            ceil: 31,
            result: 'Equipment',
          },
          {
            floor: 32,
            ceil: 32,
            result: 'Experiment',
          },
          {
            floor: 33,
            ceil: 33,
            result: 'Facility',
          },
          {
            floor: 34,
            ceil: 34,
            result: 'Faction',
          },
          {
            floor: 35,
            ceil: 35,
            result: 'Fleet',
          },
          {
            floor: 36,
            ceil: 36,
            result: 'Force',
          },
          {
            floor: 37,
            ceil: 37,
            result: 'Fortification',
          },
          {
            floor: 38,
            ceil: 38,
            result: 'Gas',
          },
          {
            floor: 39,
            ceil: 39,
            result: 'Grave',
          },
          {
            floor: 40,
            ceil: 40,
            result: 'Habitat',
          },
          {
            floor: 41,
            ceil: 41,
            result: 'Hazard',
          },
          {
            floor: 42,
            ceil: 42,
            result: 'Hideaway',
          },
          {
            floor: 43,
            ceil: 43,
            result: 'Home',
          },
          {
            floor: 44,
            ceil: 44,
            result: 'Illusion',
          },
          {
            floor: 45,
            ceil: 45,
            result: 'Industry',
          },
          {
            floor: 46,
            ceil: 46,
            result: 'Intelligence',
          },
          {
            floor: 47,
            ceil: 47,
            result: 'Lair',
          },
          {
            floor: 48,
            ceil: 48,
            result: 'Lifeform',
          },
          {
            floor: 49,
            ceil: 49,
            result: 'Liquid',
          },
          {
            floor: 50,
            ceil: 50,
            result: 'Machine',
          },
          {
            floor: 51,
            ceil: 51,
            result: 'Material',
          },
          {
            floor: 52,
            ceil: 52,
            result: 'Mechanism',
          },
          {
            floor: 53,
            ceil: 53,
            result: 'Message',
          },
          {
            floor: 54,
            ceil: 54,
            result: 'Mineral',
          },
          {
            floor: 55,
            ceil: 55,
            result: 'Monument',
          },
          {
            floor: 56,
            ceil: 56,
            result: 'Obstacle',
          },
          {
            floor: 57,
            ceil: 57,
            result: 'Organism',
          },
          {
            floor: 58,
            ceil: 58,
            result: 'Outbreak',
          },
          {
            floor: 59,
            ceil: 59,
            result: 'Outpost',
          },
          {
            floor: 60,
            ceil: 60,
            result: 'Path',
          },
          {
            floor: 61,
            ceil: 61,
            result: 'People',
          },
          {
            floor: 62,
            ceil: 62,
            result: 'Person',
          },
          {
            floor: 63,
            ceil: 63,
            result: 'Plant',
          },
          {
            floor: 64,
            ceil: 64,
            result: 'Portal',
          },
          {
            floor: 65,
            ceil: 65,
            result: 'Reality',
          },
          {
            floor: 66,
            ceil: 66,
            result: 'Refuge',
          },
          {
            floor: 67,
            ceil: 67,
            result: 'Relic',
          },
          {
            floor: 68,
            ceil: 68,
            result: 'Remains',
          },
          {
            floor: 69,
            ceil: 69,
            result: 'Rendezvous',
          },
          {
            floor: 70,
            ceil: 70,
            result: 'Resource',
          },
          {
            floor: 71,
            ceil: 71,
            result: 'Route',
          },
          {
            floor: 72,
            ceil: 72,
            result: 'Ruins',
          },
          {
            floor: 73,
            ceil: 73,
            result: 'Salvage',
          },
          {
            floor: 74,
            ceil: 74,
            result: 'Settlement',
          },
          {
            floor: 75,
            ceil: 75,
            result: 'Shelter',
          },
          {
            floor: 76,
            ceil: 76,
            result: 'Ship',
          },
          {
            floor: 77,
            ceil: 77,
            result: 'Shortcut',
          },
          {
            floor: 78,
            ceil: 78,
            result: 'Signal',
          },
          {
            floor: 79,
            ceil: 79,
            result: 'Sound',
          },
          {
            floor: 80,
            ceil: 80,
            result: 'Storage',
          },
          {
            floor: 81,
            ceil: 81,
            result: 'Storm',
          },
          {
            floor: 82,
            ceil: 82,
            result: 'Structure',
          },
          {
            floor: 83,
            ceil: 83,
            result: 'Supply',
          },
          {
            floor: 84,
            ceil: 84,
            result: 'Symbol',
          },
          {
            floor: 85,
            ceil: 85,
            result: 'System',
          },
          {
            floor: 86,
            ceil: 86,
            result: 'Technology',
          },
          {
            floor: 87,
            ceil: 87,
            result: 'Terrain',
          },
          {
            floor: 88,
            ceil: 88,
            result: 'Territory',
          },
          {
            floor: 89,
            ceil: 89,
            result: 'Threshold',
          },
          {
            floor: 90,
            ceil: 90,
            result: 'Time',
          },
          {
            floor: 91,
            ceil: 91,
            result: 'Transport',
          },
          {
            floor: 92,
            ceil: 92,
            result: 'Trap',
          },
          {
            floor: 93,
            ceil: 93,
            result: 'Treasure',
          },
          {
            floor: 94,
            ceil: 94,
            result: 'Vault',
          },
          {
            floor: 95,
            ceil: 95,
            result: 'Vehicle',
          },
          {
            floor: 96,
            ceil: 96,
            result: 'Viewpoint',
          },
          {
            floor: 97,
            ceil: 97,
            result: 'Void',
          },
          {
            floor: 98,
            ceil: 98,
            result: 'Weapon',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'World',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Wreckage',
          },
        ],
        description:
          'Use these oracles to generate the details of a location, discovery, or encounter. The Descriptor oracle is particularly handy for quick generation of a location. For example, use it to describe the basic nature of a planet instead of rolling on the detailed planet oracles.\n\nDescriptor and Focus can answer questions such as:\n\n  * “What is this ship’s cargo?”\n  * “What is the nature of this planet?”\n  * “What is inside this station?”\n  * “What hazard do I encounter?”',
      },
    },
  },
  Creatures: {
    oracles: {
      Environment: {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Space',
          },
          {
            floor: 6,
            ceil: 15,
            result: 'Interior',
          },
          {
            floor: 16,
            ceil: 55,
            result: 'Land',
          },
          {
            floor: 56,
            ceil: 80,
            result: 'Liquid',
          },
          {
            floor: 81,
            ceil: 100,
            result: 'Air',
          },
        ],
        description:
          'Choose the closest match for your location. Or roll to identify the primary habitat of a creature.',
      },
      Scale: {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Minuscule (bug-sized)',
          },
          {
            floor: 4,
            ceil: 10,
            result: 'Tiny (rodent-sized)',
          },
          {
            floor: 11,
            ceil: 25,
            result: 'Small (dog-sized)',
          },
          {
            floor: 26,
            ceil: 60,
            result: 'Medium (person-sized)',
          },
          {
            floor: 61,
            ceil: 90,
            result: 'Large (vehicle-sized)',
          },
          {
            floor: 91,
            ceil: 99,
            result: 'Huge (whale-sized)',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Ultra-scale',
          },
        ],
      },
      'Ultra-scale': {
        table: [
          {
            floor: 1,
            ceil: 89,
            result: 'Titanic (hill-sized)',
          },
          {
            floor: 90,
            ceil: 99,
            result: 'Colossal (mountain-sized)',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Vast (planet-sized)',
          },
        ],
      },
      'Basic Form': {
        oracles: {
          Space: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'Amoeba / pseudopods',
              },
              {
                floor: 6,
                ceil: 20,
                result: 'Amorphous / elemental',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Avian / winged',
              },
              {
                floor: 31,
                ceil: 32,
                result: 'Beast / mammal',
              },
              {
                floor: 33,
                ceil: 34,
                result: 'Crustacean / shelled',
              },
              {
                floor: 35,
                ceil: 37,
                result: 'Fish / torpedo-shaped',
              },
              {
                floor: 38,
                ceil: 39,
                result: 'Humanoid / bipedal',
              },
              {
                floor: 40,
                ceil: 41,
                result: 'Insectoid / exoskeletal',
              },
              {
                floor: 42,
                ceil: 60,
                result: 'Jellyfish / gasbag',
              },
              {
                floor: 61,
                ceil: 62,
                result: 'Lizard / reptilian',
              },
              {
                floor: 63,
                ceil: 67,
                result: 'Octopoid / tentacled',
              },
              {
                floor: 68,
                ceil: 72,
                result: 'Plant / fungus',
              },
              {
                floor: 73,
                ceil: 82,
                result: 'Ray / flat-bodied',
              },
              {
                floor: 83,
                ceil: 84,
                result: 'Snake / eel',
              },
              {
                floor: 85,
                ceil: 86,
                result: 'Spider / web-weaver',
              },
              {
                floor: 87,
                ceil: 88,
                result: 'Starfish / symmetrical',
              },
              {
                floor: 89,
                ceil: 90,
                result: 'Worm / slug / larva',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Interior: {
            table: [
              {
                floor: 1,
                ceil: 3,
                result: 'Amoeba / pseudopods',
              },
              {
                floor: 4,
                ceil: 6,
                result: 'Amorphous / elemental',
              },
              {
                floor: 7,
                ceil: 12,
                result: 'Avian / winged',
              },
              {
                floor: 13,
                ceil: 19,
                result: 'Beast / mammal',
              },
              {
                floor: 20,
                ceil: 22,
                result: 'Crustacean / shelled',
              },
              {
                floor: 23,
                ceil: 24,
                result: 'Fish / torpedo-shaped',
              },
              {
                floor: 25,
                ceil: 37,
                result: 'Humanoid / bipedal',
              },
              {
                floor: 38,
                ceil: 49,
                result: 'Insectoid / exoskeletal',
              },
              {
                floor: 50,
                ceil: 51,
                result: 'Jellyfish / gasbag',
              },
              {
                floor: 52,
                ceil: 56,
                result: 'Lizard / reptilian',
              },
              {
                floor: 57,
                ceil: 58,
                result: 'Octopoid / tentacled',
              },
              {
                floor: 59,
                ceil: 63,
                result: 'Plant / fungus',
              },
              {
                floor: 64,
                ceil: 65,
                result: 'Ray / flat-bodied',
              },
              {
                floor: 66,
                ceil: 68,
                result: 'Snake / eel',
              },
              {
                floor: 69,
                ceil: 83,
                result: 'Spider / web-weaver',
              },
              {
                floor: 84,
                ceil: 85,
                result: 'Starfish / symmetrical',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Worm / slug / larva',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Land: {
            table: [
              {
                floor: 1,
                ceil: 2,
                result: 'Amoeba / pseudopods',
              },
              {
                floor: 3,
                ceil: 5,
                result: 'Amorphous / elemental',
              },
              {
                floor: 6,
                ceil: 10,
                result: 'Avian / winged',
              },
              {
                floor: 11,
                ceil: 25,
                result: 'Beast / mammal',
              },
              {
                floor: 26,
                ceil: 32,
                result: 'Crustacean / shelled',
              },
              {
                floor: 33,
                ceil: 34,
                result: 'Fish / torpedo-shaped',
              },
              {
                floor: 35,
                ceil: 39,
                result: 'Humanoid / bipedal',
              },
              {
                floor: 40,
                ceil: 49,
                result: 'Insectoid / exoskeletal',
              },
              {
                floor: 50,
                ceil: 51,
                result: 'Jellyfish / gasbag',
              },
              {
                floor: 52,
                ceil: 58,
                result: 'Lizard / reptilian',
              },
              {
                floor: 59,
                ceil: 60,
                result: 'Octopoid / tentacled',
              },
              {
                floor: 61,
                ceil: 65,
                result: 'Plant / fungus',
              },
              {
                floor: 66,
                ceil: 67,
                result: 'Ray / flat-bodied',
              },
              {
                floor: 68,
                ceil: 74,
                result: 'Snake / eel',
              },
              {
                floor: 75,
                ceil: 81,
                result: 'Spider / web-weaver',
              },
              {
                floor: 82,
                ceil: 83,
                result: 'Starfish / symmetrical',
              },
              {
                floor: 84,
                ceil: 90,
                result: 'Worm / slug / larva',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Liquid: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'Amoeba / pseudopods',
              },
              {
                floor: 6,
                ceil: 8,
                result: 'Amorphous / elemental',
              },
              {
                floor: 9,
                ceil: 11,
                result: 'Avian / winged',
              },
              {
                floor: 12,
                ceil: 17,
                result: 'Beast / mammal',
              },
              {
                floor: 18,
                ceil: 24,
                result: 'Crustacean / shelled',
              },
              {
                floor: 25,
                ceil: 39,
                result: 'Fish / torpedo-shaped',
              },
              {
                floor: 40,
                ceil: 42,
                result: 'Humanoid / bipedal',
              },
              {
                floor: 43,
                ceil: 45,
                result: 'Insectoid / exoskeletal',
              },
              {
                floor: 46,
                ceil: 53,
                result: 'Jellyfish / gasbag',
              },
              {
                floor: 54,
                ceil: 56,
                result: 'Lizard / reptilian',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Octopoid / tentacled',
              },
              {
                floor: 64,
                ceil: 68,
                result: 'Plant / fungus',
              },
              {
                floor: 69,
                ceil: 75,
                result: 'Ray / flat-bodied',
              },
              {
                floor: 76,
                ceil: 80,
                result: 'Snake / eel',
              },
              {
                floor: 81,
                ceil: 82,
                result: 'Spider / web-weaver',
              },
              {
                floor: 83,
                ceil: 87,
                result: 'Starfish / symmetrical',
              },
              {
                floor: 88,
                ceil: 90,
                result: 'Worm / slug / larva',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Air: {
            table: [
              {
                floor: 1,
                ceil: 2,
                result: 'Amoeba / pseudopods',
              },
              {
                floor: 3,
                ceil: 12,
                result: 'Amorphous / elemental',
              },
              {
                floor: 13,
                ceil: 37,
                result: 'Avian / winged',
              },
              {
                floor: 38,
                ceil: 40,
                result: 'Beast / mammal',
              },
              {
                floor: 41,
                ceil: 42,
                result: 'Crustacean / shelled',
              },
              {
                floor: 43,
                ceil: 47,
                result: 'Fish / torpedo-shaped',
              },
              {
                floor: 48,
                ceil: 49,
                result: 'Humanoid / bipedal',
              },
              {
                floor: 50,
                ceil: 51,
                result: 'Insectoid / exoskeletal',
              },
              {
                floor: 52,
                ceil: 66,
                result: 'Jellyfish / gasbag',
              },
              {
                floor: 67,
                ceil: 68,
                result: 'Lizard / reptilian',
              },
              {
                floor: 69,
                ceil: 70,
                result: 'Octopoid / tentacled',
              },
              {
                floor: 71,
                ceil: 72,
                result: 'Plant / fungus',
              },
              {
                floor: 73,
                ceil: 82,
                result: 'Ray / flat-bodied',
              },
              {
                floor: 83,
                ceil: 84,
                result: 'Snake / eel',
              },
              {
                floor: 85,
                ceil: 86,
                result: 'Spider / web-weaver',
              },
              {
                floor: 87,
                ceil: 88,
                result: 'Starfish / symmetrical',
              },
              {
                floor: 89,
                ceil: 90,
                result: 'Worm / slug / larva',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
        },
        description: 'Roll for a basic form, and flesh out the creature’s appearance using the First Look table.',
      },
      'First Look': {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'Antennae or sensory organs',
          },
          {
            floor: 3,
            ceil: 4,
            result: 'Armored',
          },
          {
            floor: 5,
            ceil: 6,
            result: 'Beautiful',
          },
          {
            floor: 7,
            ceil: 8,
            result: 'Biotech',
          },
          {
            floor: 9,
            ceil: 10,
            result: 'Bony or gaunt',
          },
          {
            floor: 11,
            ceil: 12,
            result: 'Brutish or muscled',
          },
          {
            floor: 13,
            ceil: 14,
            result: 'Camouflaged',
          },
          {
            floor: 15,
            ceil: 16,
            result: 'Claws or talons',
          },
          {
            floor: 17,
            ceil: 18,
            result: 'Compound eyes',
          },
          {
            floor: 19,
            ceil: 20,
            result: 'Comprised of many creatures',
          },
          {
            floor: 21,
            ceil: 22,
            result: 'Corrupted',
          },
          {
            floor: 23,
            ceil: 24,
            result: 'Crystalline',
          },
          {
            floor: 25,
            ceil: 26,
            result: 'Dead or undead',
          },
          {
            floor: 27,
            ceil: 28,
            result: 'Distinctive markings',
          },
          {
            floor: 29,
            ceil: 30,
            result: 'Distinctive smell',
          },
          {
            floor: 31,
            ceil: 32,
            result: 'Distinctive sound',
          },
          {
            floor: 33,
            ceil: 34,
            result: 'Dripping mucus',
          },
          {
            floor: 35,
            ceil: 36,
            result: 'Elongated Neck',
          },
          {
            floor: 37,
            ceil: 38,
            result: 'Energy emissions',
          },
          {
            floor: 39,
            ceil: 40,
            result: 'Extra limbs',
          },
          {
            floor: 41,
            ceil: 42,
            result: 'Faceless or inexpressive',
          },
          {
            floor: 43,
            ceil: 44,
            result: 'Fangs or rows of teeth',
          },
          {
            floor: 45,
            ceil: 46,
            result: 'Feathered',
          },
          {
            floor: 47,
            ceil: 48,
            result: 'Fungal growth',
          },
          {
            floor: 49,
            ceil: 50,
            result: 'Fur, hair, or filaments',
          },
          {
            floor: 51,
            ceil: 52,
            result: 'Graceful',
          },
          {
            floor: 53,
            ceil: 54,
            result: 'Hideous',
          },
          {
            floor: 55,
            ceil: 56,
            result: 'Hooded or crested',
          },
          {
            floor: 57,
            ceil: 58,
            result: 'Immobile or trapped',
          },
          {
            floor: 59,
            ceil: 60,
            result: 'Injured or scarred',
          },
          {
            floor: 61,
            ceil: 62,
            result: 'Iridescent',
          },
          {
            floor: 63,
            ceil: 64,
            result: 'Long-limbed',
          },
          {
            floor: 65,
            ceil: 66,
            result: 'Luminescent',
          },
          {
            floor: 67,
            ceil: 68,
            result: 'Mandibles or pincers',
          },
          {
            floor: 69,
            ceil: 70,
            result: 'Many-eyed',
          },
          {
            floor: 71,
            ceil: 72,
            result: 'Mineral or metallic',
          },
          {
            floor: 73,
            ceil: 74,
            result: 'Multi-jointed',
          },
          {
            floor: 75,
            ceil: 76,
            result: 'Multi-segmented body',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Ornamented or colorful',
          },
          {
            floor: 79,
            ceil: 80,
            result: 'Oversized mouth',
          },
          {
            floor: 81,
            ceil: 82,
            result: 'Prominent tail',
          },
          {
            floor: 83,
            ceil: 84,
            result: 'Prominent wings or fins',
          },
          {
            floor: 85,
            ceil: 86,
            result: 'Ridges or plates',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Scaled',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Single eye or oversized eyes',
          },
          {
            floor: 91,
            ceil: 92,
            result: 'Spikes or spines',
          },
          {
            floor: 93,
            ceil: 94,
            result: 'Stinger or barbs',
          },
          {
            floor: 95,
            ceil: 96,
            result: 'Tentacles or tendrils',
          },
          {
            floor: 97,
            ceil: 98,
            result: 'Translucent',
          },
          {
            floor: 99,
            ceil: 100,
            result: 'Visible symbiote',
          },
        ],
        description: 'Roll for a basic form, and flesh out the creature’s appearance using the First Look table.',
      },
      'Encountered Behavior': {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Ambusher',
          },
          {
            floor: 6,
            ceil: 10,
            result: 'Apex predator',
          },
          {
            floor: 11,
            ceil: 14,
            result: 'Builder',
          },
          {
            floor: 15,
            ceil: 19,
            result: 'Camouflager',
          },
          {
            floor: 20,
            ceil: 24,
            result: 'Forager',
          },
          {
            floor: 25,
            ceil: 29,
            result: 'Grazer',
          },
          {
            floor: 30,
            ceil: 33,
            result: 'Herder',
          },
          {
            floor: 34,
            ceil: 37,
            result: 'Hibernator',
          },
          {
            floor: 38,
            ceil: 41,
            result: 'Hoarder',
          },
          {
            floor: 42,
            ceil: 46,
            result: 'Hunter',
          },
          {
            floor: 47,
            ceil: 51,
            result: 'Lurer',
          },
          {
            floor: 52,
            ceil: 55,
            result: 'Migratory',
          },
          {
            floor: 56,
            ceil: 60,
            result: 'Mimic',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Nester',
          },
          {
            floor: 66,
            ceil: 70,
            result: 'Pack hunter',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Prey',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Protector',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Scavenger',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Tracker',
          },
          {
            floor: 91,
            ceil: 95,
            result: 'Trapper',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
        description:
          'Roll once on the Encountered Behavior table to define this creature’s motivation and frame how the encounter begins.',
      },
      'Revealed Aspect': {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'Alternative environment',
          },
          {
            floor: 3,
            ceil: 4,
            result: 'Alternative movement',
          },
          {
            floor: 5,
            ceil: 6,
            result: 'Alternative senses',
          },
          {
            floor: 7,
            ceil: 8,
            result: 'Burrower',
          },
          {
            floor: 9,
            ceil: 10,
            result: 'Chameleon',
          },
          {
            floor: 11,
            ceil: 12,
            result: 'Clever',
          },
          {
            floor: 13,
            ceil: 14,
            result: 'Consumes energy',
          },
          {
            floor: 15,
            ceil: 16,
            result: 'Consumes inorganic matter',
          },
          {
            floor: 17,
            ceil: 18,
            result: 'Controlled or puppeteered',
          },
          {
            floor: 19,
            ceil: 20,
            result: 'Controls lesser creatures',
          },
          {
            floor: 21,
            ceil: 22,
            result: 'Corrosive excretion',
          },
          {
            floor: 23,
            ceil: 24,
            result: 'Crusher or constrictor',
          },
          {
            floor: 25,
            ceil: 26,
            result: 'Egg sac or carried offspring',
          },
          {
            floor: 27,
            ceil: 28,
            result: 'Electric shock',
          },
          {
            floor: 29,
            ceil: 30,
            result: 'Electromagnetic pulse',
          },
          {
            floor: 31,
            ceil: 32,
            result: 'Energy breath',
          },
          {
            floor: 33,
            ceil: 34,
            result: 'Energy manipulation',
          },
          {
            floor: 35,
            ceil: 36,
            result: 'Engineered biology',
          },
          {
            floor: 37,
            ceil: 38,
            result: 'Enhanced senses',
          },
          {
            floor: 39,
            ceil: 40,
            result: 'Enhanced strength',
          },
          {
            floor: 41,
            ceil: 42,
            result: 'Entangling secretion',
          },
          {
            floor: 43,
            ceil: 44,
            result: 'Extradimensional',
          },
          {
            floor: 45,
            ceil: 46,
            result: 'Hallucinogen secretion',
          },
          {
            floor: 47,
            ceil: 48,
            result: 'Hidden symbiote',
          },
          {
            floor: 49,
            ceil: 50,
            result: 'Hive mind',
          },
          {
            floor: 51,
            ceil: 52,
            result: 'Illusionary',
          },
          {
            floor: 53,
            ceil: 54,
            result: 'Infectious',
          },
          {
            floor: 55,
            ceil: 56,
            result: 'Infested with parasites',
          },
          {
            floor: 57,
            ceil: 58,
            result: 'Intimidating threat display',
          },
          {
            floor: 59,
            ceil: 60,
            result: 'Limited sense',
          },
          {
            floor: 61,
            ceil: 62,
            result: 'Magnetic',
          },
          {
            floor: 63,
            ceil: 64,
            result: 'Mental influence or control',
          },
          {
            floor: 65,
            ceil: 66,
            result: 'Metamorphic',
          },
          {
            floor: 67,
            ceil: 68,
            result: 'Noxious cloud or spores',
          },
          {
            floor: 69,
            ceil: 70,
            result: 'Paralytic toxin',
          },
          {
            floor: 71,
            ceil: 72,
            result: 'Parasitic',
          },
          {
            floor: 73,
            ceil: 74,
            result: 'Pheromones',
          },
          {
            floor: 75,
            ceil: 76,
            result: 'Poisonous',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Powerful bite',
          },
          {
            floor: 79,
            ceil: 80,
            result: 'Proboscis or inner jaw',
          },
          {
            floor: 81,
            ceil: 82,
            result: 'Projectile attack',
          },
          {
            floor: 83,
            ceil: 84,
            result: 'Radioactive',
          },
          {
            floor: 85,
            ceil: 86,
            result: 'Regeneration',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Replication',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Sacrificial defense',
          },
          {
            floor: 91,
            ceil: 92,
            result: 'Shapechanger',
          },
          {
            floor: 93,
            ceil: 94,
            result: 'Telekinetic',
          },
          {
            floor: 95,
            ceil: 96,
            result: 'Teleportation',
          },
          {
            floor: 97,
            ceil: 98,
            result: 'Territorial',
          },
          {
            floor: 99,
            ceil: 100,
            result: 'Toxic spew',
          },
        ],
        description:
          'Roll on this table as you interact with the creature to introduce new features or behaviors. Some results may contradict the established nature of a creature. For example, an amorphous creature which you envisioned as a mass of pure energy would not have typical physical features. If a result doesn’t fit, feel free to ignore, reroll, or adjust. Or simply envision how this contradiction signals a new understanding or unexpected transformation.',
      },
    },
  },
  Derelicts: {
    oracles: {
      Location: {
        table: [
          {
            floor: 1,
            ceil: 40,
            result: 'Planetside',
          },
          {
            floor: 41,
            ceil: 60,
            result: 'Orbital',
          },
          {
            floor: 61,
            ceil: 100,
            result: 'Deep Space',
          },
        ],
      },
      Type: {
        oracles: {
          Planetside: {
            table: [
              {
                floor: 1,
                ceil: 25,
                result: 'Starship',
              },
              {
                floor: 26,
                ceil: 100,
                result: 'Settlement',
              },
            ],
          },
          Orbital: {
            table: [
              {
                floor: 1,
                ceil: 40,
                result: 'Starship',
              },
              {
                floor: 41,
                ceil: 100,
                result: 'Settlement',
              },
            ],
          },
          'Deep Space': {
            table: [
              {
                floor: 1,
                ceil: 75,
                result: 'Starship',
              },
              {
                floor: 76,
                ceil: 100,
                result: 'Settlement',
              },
            ],
          },
        },
      },
      Condition: {
        table: [
          {
            floor: 1,
            ceil: 10,
            result: 'Functional',
          },
          {
            floor: 11,
            ceil: 30,
            result: 'Limited power',
          },
          {
            floor: 31,
            ceil: 60,
            result: 'Cold and dark',
          },
          {
            floor: 61,
            ceil: 90,
            result: 'Damaged or breached',
          },
          {
            floor: 91,
            ceil: 98,
            result: 'Heavily damaged',
          },
          {
            floor: 99,
            ceil: 100,
            result: 'Impending destruction',
          },
        ],
      },
      'Outer First Look': {
        table: [
          {
            floor: 1,
            ceil: 15,
            result: 'Blocked access',
          },
          {
            floor: 16,
            ceil: 30,
            result: 'Corpses',
          },
          {
            floor: 31,
            ceil: 45,
            result: 'Hazardous readings',
          },
          {
            floor: 46,
            ceil: 50,
            result: 'Mutated structure',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Odd orientation',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Overgrown or entangled',
          },
          {
            floor: 66,
            ceil: 80,
            result: 'Sending a signal or message',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Signs that others are here',
          },
          {
            floor: 86,
            ceil: 95,
            result: 'Stripped exterior',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Time or reality distortions',
          },
        ],
      },
      'Inner First Look': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Abnormal gravity',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Active bots',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Archaic equipment',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Automated announcements',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Biological infestation',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Charred surfaces',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Claw marks',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Cluttered with debris',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Corroded surfaces',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Cramped spaces',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Creaking hull',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Esoteric writing or symbols',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Evidence of new inhabitants',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Exposed wiring or conduits',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Flashing strobe lights',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Fluctuating power',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Haunting visions of the dead',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Hazardous temperature',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Heavy steam or moisture',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Littered with corpses',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Nesting or feeding creatures',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Ornate furnishings',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Scarred by gunfire',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Sealed against intruders',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Signs of looting or scavenging',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Smell of decay',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Splattered with blood',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Temporal distortions',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Thick haze or smoke',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Unstable energy surges',
          },
          {
            floor: 91,
            ceil: 93,
            result: 'Watchful AI',
          },
          {
            floor: 94,
            ceil: 100,
            result: 'Descriptor + Focus',
          },
        ],
      },
      Zones: {
        oracles: {
          Starship: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'Access',
              },
              {
                floor: 1,
                ceil: 5,
                result: 'Community',
              },
              {
                floor: 6,
                ceil: 30,
                result: 'Engineering',
              },
              {
                floor: 31,
                ceil: 55,
                result: 'Living',
              },
              {
                floor: 56,
                ceil: 65,
                result: 'Medical',
              },
              {
                floor: 66,
                ceil: 85,
                result: 'Operations',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Production',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Research',
              },
            ],
          },
          Settlement: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'Access',
              },
              {
                floor: 1,
                ceil: 20,
                result: 'Community',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Engineering',
              },
              {
                floor: 31,
                ceil: 50,
                result: 'Living',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Medical',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Operations',
              },
              {
                floor: 71,
                ceil: 90,
                result: 'Production',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Research',
              },
            ],
          },
        },
      },
      Access: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 50,
                result: 'Corridor',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Stairs',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Lift or elevator',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Catwalk or bridge',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'Vertical shaft or ladder',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Hub or intersection',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Crawl space or duct',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Airlock or external',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'Abandoned gear',
              },
              {
                floor: 6,
                ceil: 10,
                result: 'Blood trail',
              },
              {
                floor: 11,
                ceil: 15,
                result: 'Breached door or hatch',
              },
              {
                floor: 16,
                ceil: 20,
                result: 'Control or terminal station',
              },
              {
                floor: 21,
                ceil: 25,
                result: 'Corpse',
              },
              {
                floor: 26,
                ceil: 30,
                result: 'Dismantled equipment',
              },
              {
                floor: 31,
                ceil: 35,
                result: 'Flashing strobes',
              },
              {
                floor: 36,
                ceil: 40,
                result: 'Leaking pipes',
              },
              {
                floor: 41,
                ceil: 45,
                result: 'Makeshift barricade',
              },
              {
                floor: 46,
                ceil: 50,
                result: 'Opened or missing panels',
              },
              {
                floor: 51,
                ceil: 55,
                result: 'Organic growths',
              },
              {
                floor: 56,
                ceil: 60,
                result: 'Ruined bot',
              },
              {
                floor: 61,
                ceil: 65,
                result: 'Scrawled warning',
              },
              {
                floor: 66,
                ceil: 70,
                result: 'Sealed breach',
              },
              {
                floor: 71,
                ceil: 75,
                result: 'Sounds of movement',
              },
              {
                floor: 76,
                ceil: 80,
                result: 'Steam or smoke',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'Wandering bot',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Windows or viewports',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Wrecked passage or debris',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Alarm or failsafe is triggered',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Automated defenses',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Blocked or sealed path',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Dreadful scene of death or violence',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Foe closes in',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Gear is failing or broken',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Hazardous environmental change',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Path is trapped',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Unsettling sound or disturbance',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Directions, shortcut, or alternate path',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Encounter with a friendly survivor, explorer, or denizen',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Hopeful signs of life',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Opening to outmaneuver or escape a threat or foe',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Useful equipment',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
      Community: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Bar or club',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Classroom or education',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Concourse or hub',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Entertainment',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Gym or fitness',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Market or trade',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Park or garden',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Promenade or overlook',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Restaurant or dining',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Temple or chapel',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'New zone',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'New zone via Access',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Ad-hoc memorials',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Art depicting historic event',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Artificial environment',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Automated announcements',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Barricaded area',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Gaming devices or interfaces',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Graffiti or vandalization',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Guard post or surveillance',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Mass grave or corpses',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Panoramic viewport',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Rubble or debris',
              },
              {
                floor: 89,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Biological infestation',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Breached or broken structure',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Distressing signs of mass violence or death',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Flooded environment',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Foe lurks within concealment',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Fragile structural integrity',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Haunting vision of life here before the fall',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Hazardous environmental change',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Heartbreaking memento of lost lives',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Culturally significant object or artifact',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Salvageable goods or resources',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Secure area offers a moment of peace',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Terminal with access to site details',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Valuable item',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
      Engineering: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Control room',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Engine room or power core',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Engineering offices',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Equipment storage',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Fuel or coolant tanks',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Life support',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Maintenance tube',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Vehicle bay or garage',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Water processing',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Workshop',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'New zone',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'New zone via Access',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Cluttered workbench',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Control terminal',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Crane or lift',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Disassembled equipment',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Flickering status monitors',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Jury-rigged equipment',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Multilevel layout',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Pipes and valves',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Sharp ozone smell',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Unfinished project',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Utility bots',
              },
              {
                floor: 89,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Corrosive leak',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Erratic utility bots',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Failing equipment requires a specific part or skill',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Fire or energy surge',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Precarious or broken path',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Radioactive hotspot',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Sabotaged equipment',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Shrouded atmosphere conceals a lurking foe',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Unstable or failing power core',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Advanced or experimental equipment',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Chance to restore power or function',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Helpful plans or schematics',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Helpful utility bot',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Useful tool or device',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
      Living: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Food storage',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Galley or kitchen',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Laundry',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Locker room or storage',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Mess hall or dining',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Observation lounge',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Quarters (communal)',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Quarters (individual)',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Restroom or showers',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Sleeping pods',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'New zone',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'New zone via Access',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Abandoned pet',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Audible music',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Cherished personal item',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Failed barricade',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Half-eaten food',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Messages from loved ones',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Ransacked belongings',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Remains of the dead',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Scuttling vermin',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Shrine or altar',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Unusual art',
              },
              {
                floor: 89,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Booby trap',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Distressing written message',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Disturbing evidence of exploitive living conditions',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Dreadful scene of death or violence',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Lured into danger by signs of life',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Recorded message reveals a threat or complication',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Sealed door or hatch blocks access',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Signs of unwelcome invaders',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Unsettling sound or disturbance',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Culturally significant object or artifact',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Hidden stash of valuable contraband',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Intact barricade or protected area',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Recorded message reveals helpful aspects of this site',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Useful personal gear',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
      Medical: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Crematorium',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Emergency or triage',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Isolation or containment',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Medical lab',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Medical offices',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Morgue',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Operating room',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Pharmacy or drug locker',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Prosthetics workshop',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Ward or clinic',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'New zone',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'New zone via Access',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Autopsied corpse',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Biological specimens',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Blood spatter or pools',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Bloody medical supplies',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Broken prosthetics',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Corpse of a healer',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Dissected specimen',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Improvised overflow beds',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Medical monitors',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Medical records or scans',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Stacks of body bags',
              },
              {
                floor: 89,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Disgusting sight / smell',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Disturbing evidence of medical misconduct',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Erratic medical bots',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Evidence of a virulent disease',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Malfunctioning medical equipment',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Repercussions of a medical experiment',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Restless dead',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Signs of a horrific death',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Signs of broken quarantine',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Cache of medicine',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Clues to a medical mystery',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Helpful medical bot',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Unusual or rare specimen',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Useful medical equipment',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
      Operations: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Admin or command offices',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Armory',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Bridge or command center',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Brig or cells',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Comms center',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Computer core',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Conference or briefing room',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Landing bay or hangar',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Lounge',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Security',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'New zone',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'New zone via Access',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Automated warning',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Buckled blast doors',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Control terminal',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Emergency lighting',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'EV suit storage',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Hissing comms channel',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Intricate control panels',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Map of the site',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Recorded message',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Video surveillance monitors',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Written logs',
              },
              {
                floor: 89,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Automated defenses target you',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Broken equipment limits control',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Coded message or puzzling security device',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Discouraging evidence of failed plans or defenses',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Displays reveal a new threat elsewhere in this site',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Failing power',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Hostile AI',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Sealed blast doors block access',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Sensors indicate the arrival of an external threat',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Cache of weapons or ammo',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Helpful AI',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Keycard or access code',
              },
              {
                floor: 61,
                ceil: 80,
                result: "Log offers insight into this site's downfall",
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Secure area offers a moment of peace',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
      Production: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Airlock or staging area',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Assembly or processing',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Cargo bay',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Equipment storage',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Exosuit bay',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Harvesting or mining platform',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Monitoring or control room',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Processed goods storage',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Raw materials storage',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Scrapyard',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'New zone',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'New zone via Access',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Cargo lifts',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Control panels',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Disassembled machinery',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Elevated walkways',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Environment suits',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Ill-fated workers',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Immense machinery',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Sealed or locked containers',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Tools',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Vats of chemicals or gas',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Written manifest',
              },
              {
                floor: 89,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Claustrophobic spaces',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Dangerous machinery',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Disturbing evidence of exploited labor',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Extreme temperatures',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Hazardous materials',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Impending industrial disaster',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Malfunctioning automation',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Rivals seek to secure these resources',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Signs of an unearthed or manufactured threat',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Helpful vehicle or transport',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Rare or valuable resource',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Salvageable materials',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Useful equipment',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Valuable cargo',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
      Research: {
        oracles: {
          Area: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Clean room',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Cold storage',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Creature or animal pens',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Decontamination room',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Hazardous material storage',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Hydroponics or agriculture',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Isolation or containment',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Lab',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Library or records',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Secure vault',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'New zone',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'New zone via Access',
              },
            ],
            description:
              'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](Moves#Undertake-an-Expedition), an area can serve as a waypoint in your survey of the derelict.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Aquarium or tank',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Biological specimens',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Bones or fossils',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Broken equipment',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Cryptic research notes',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Hastily destroyed data',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Hazmat suits',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Inscrutable artifact',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Invasive plant growth',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Recorded research log',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Spilled chemicals',
              },
              {
                floor: 89,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Automated containment protocols are activated',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Biological infestation',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Dangerous specimen',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Disturbing outcome of a failed experiment',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Evidence of sinister experiments',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Fragile vault holds a dire threat',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Signs of broken containment',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Toxic environment',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Unstable technology',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Helpful research data',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Records of a notable discovery',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Specialized research tools',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Unique prototype',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Useful navigational data',
              },
            ],
            description:
              'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
          },
        },
      },
    },
    description:
      'Derelicts are the forsaken relics of human endeavors. Use these First Look tables for your initial survey of the derelict. To reveal more about the look and original function or nature of the site, roll on appropriate tables in the Starship or Settlement oracles. If you explore the depths of a derelict, you may use the zone oracles on the following pages to help envision what you find.',
  },
  Factions: {
    oracles: {
      Type: {
        table: [
          {
            floor: 1,
            ceil: 40,
            result: 'Dominion',
          },
          {
            floor: 41,
            ceil: 70,
            result: 'Guild',
          },
          {
            floor: 71,
            ceil: 100,
            result: 'Fringe Group',
          },
        ],
      },
      Influence: {
        table: [
          {
            floor: 1,
            ceil: 10,
            result: 'Forsaken',
          },
          {
            floor: 11,
            ceil: 30,
            result: 'Isolated',
          },
          {
            floor: 31,
            ceil: 50,
            result: 'Localized',
          },
          {
            floor: 51,
            ceil: 70,
            result: 'Established',
          },
          {
            floor: 71,
            ceil: 85,
            result: 'Notable',
          },
          {
            floor: 86,
            ceil: 95,
            result: 'Dominant',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Inescapable',
          },
        ],
      },
      Dominion: {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Agriculture',
          },
          {
            floor: 6,
            ceil: 9,
            result: 'Artistry',
          },
          {
            floor: 10,
            ceil: 14,
            result: 'Commerce',
          },
          {
            floor: 15,
            ceil: 18,
            result: 'Conquest',
          },
          {
            floor: 19,
            ceil: 22,
            result: 'Construction',
          },
          {
            floor: 23,
            ceil: 26,
            result: 'Diplomacy',
          },
          {
            floor: 27,
            ceil: 30,
            result: 'Education',
          },
          {
            floor: 31,
            ceil: 34,
            result: 'Environmentalism',
          },
          {
            floor: 35,
            ceil: 38,
            result: 'Exploration',
          },
          {
            floor: 39,
            ceil: 42,
            result: 'Faith',
          },
          {
            floor: 43,
            ceil: 46,
            result: 'History',
          },
          {
            floor: 47,
            ceil: 50,
            result: 'Honor',
          },
          {
            floor: 51,
            ceil: 55,
            result: 'Industry',
          },
          {
            floor: 56,
            ceil: 59,
            result: 'Isolationism',
          },
          {
            floor: 60,
            ceil: 63,
            result: 'Law',
          },
          {
            floor: 64,
            ceil: 67,
            result: 'Mysticism',
          },
          {
            floor: 68,
            ceil: 71,
            result: 'Pacifism',
          },
          {
            floor: 72,
            ceil: 75,
            result: 'Prophecy',
          },
          {
            floor: 76,
            ceil: 79,
            result: 'Science',
          },
          {
            floor: 80,
            ceil: 83,
            result: 'Secrecy',
          },
          {
            floor: 84,
            ceil: 87,
            result: 'Technology',
          },
          {
            floor: 88,
            ceil: 91,
            result: 'Treachery',
          },
          {
            floor: 92,
            ceil: 96,
            result: 'Warfare',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Wealth',
          },
        ],
      },
      Leadership: {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Anarchist',
          },
          {
            floor: 6,
            ceil: 15,
            result: 'Disputed leadership',
          },
          {
            floor: 16,
            ceil: 30,
            result: 'Authoritarian dictatorship',
          },
          {
            floor: 31,
            ceil: 45,
            result: 'Oligarchical elite',
          },
          {
            floor: 46,
            ceil: 60,
            result: 'Dynastic lineage',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'Fated or prophesied leader',
          },
          {
            floor: 71,
            ceil: 80,
            result: 'Clan chiefs or elders',
          },
          {
            floor: 81,
            ceil: 90,
            result: 'Elected representatives',
          },
          {
            floor: 91,
            ceil: 95,
            result: 'Machine intelligence',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Varied / decentralized',
          },
        ],
      },
      Guild: {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Assassins',
          },
          {
            floor: 6,
            ceil: 10,
            result: 'Bounty Hunters',
          },
          {
            floor: 11,
            ceil: 15,
            result: 'Couriers',
          },
          {
            floor: 16,
            ceil: 20,
            result: 'Courtesans',
          },
          {
            floor: 21,
            ceil: 25,
            result: 'Engineers',
          },
          {
            floor: 26,
            ceil: 30,
            result: 'Healers',
          },
          {
            floor: 31,
            ceil: 40,
            result: 'Industrialists',
          },
          {
            floor: 41,
            ceil: 50,
            result: 'Mercenaries',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Merchants',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Mystics',
          },
          {
            floor: 66,
            ceil: 75,
            result: 'Navigators',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Peacekeepers',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Researchers',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Spies',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
      'Fringe Group': {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Cultists',
          },
          {
            floor: 6,
            ceil: 15,
            result: 'Exiles',
          },
          {
            floor: 16,
            ceil: 25,
            result: 'Gangsters',
          },
          {
            floor: 26,
            ceil: 35,
            result: 'Hackers',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Monster hunters',
          },
          {
            floor: 41,
            ceil: 50,
            result: 'Pirates',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Raiders',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'Rebels',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Rogue AI',
          },
          {
            floor: 76,
            ceil: 85,
            result: 'Scavengers',
          },
          {
            floor: 86,
            ceil: 95,
            result: 'Smugglers',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
      Projects: {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Broaden scope of the faction to include a new focus',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Build or secure a powerful device',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Consolidate control of a valuable commodity',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Destroy or defeat a rival',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Disrupt the operations of a rival',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Escape the control of another faction or power',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Establish a monument or memorial',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Establish a safe refuge or headquarters',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Expand operations to a new location or sector',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Form an alliance',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Fulfill a prophecy',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Give aid to a faction',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Harness unnatural or forbidden power',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Hunt down a rogue asset',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Incite conflict among rivals',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Negotiate an agreement',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Obtain a needed commodity',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Obtain an important cultural artifact',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Obtain crucial data or information',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Obtain incriminating information about a rival',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Prevent a prophecy',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Put down an internal revolt or rebellion',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Repay a debt',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Rescue or recover a group or asset',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Research an innovation',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Resolve a conflict with another faction',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Reunite splintered elements of the faction',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Seize a powerful artifact or valuable treasure',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Seize rival territory or operations',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Subsume another faction',
          },
          {
            floor: 91,
            ceil: 93,
            result: 'Transport a valued asset',
          },
          {
            floor: 94,
            ceil: 96,
            result: 'Usurp leadership within a rival faction',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Action + Theme',
          },
        ],
        description:
          'Pick or roll on this table to reveal the current focus of a faction. Then, use the nature of the organization to help envision the meaning of the project. The result may introduce events that motivate your character to aid or resist the project, or can serve as background detail for your setting. If you would like to track the faction’s progress, set a clock for the project using the campaign clock guidelines on page 235.',
      },
      Relationships: {
        table: [
          {
            floor: 1,
            ceil: 4,
            result: 'Antagonistic towards',
          },
          {
            floor: 5,
            ceil: 8,
            result: 'Apathetic or unaware of',
          },
          {
            floor: 9,
            ceil: 11,
            result: 'Betrayed by',
          },
          {
            floor: 12,
            ceil: 14,
            result: 'Broke faith with',
          },
          {
            floor: 15,
            ceil: 18,
            result: 'Distrustful of',
          },
          {
            floor: 19,
            ceil: 22,
            result: 'Does business with',
          },
          {
            floor: 23,
            ceil: 25,
            result: 'Extorted by',
          },
          {
            floor: 26,
            ceil: 29,
            result: 'Holds contempt for',
          },
          {
            floor: 30,
            ceil: 33,
            result: 'Holds leverage over',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'In control of',
          },
          {
            floor: 37,
            ceil: 40,
            result: 'Maneuvering against',
          },
          {
            floor: 41,
            ceil: 44,
            result: 'Needs aid from',
          },
          {
            floor: 45,
            ceil: 47,
            result: 'Negotiating with',
          },
          {
            floor: 48,
            ceil: 51,
            result: 'Open alliance with',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Owes a debt to',
          },
          {
            floor: 55,
            ceil: 58,
            result: 'Shares a rivalry with',
          },
          {
            floor: 59,
            ceil: 61,
            result: 'Shares power with',
          },
          {
            floor: 62,
            ceil: 64,
            result: 'Shows respect for',
          },
          {
            floor: 65,
            ceil: 67,
            result: 'Splintered from',
          },
          {
            floor: 68,
            ceil: 70,
            result: 'Subordinate to',
          },
          {
            floor: 71,
            ceil: 74,
            result: 'Supplied with resources by',
          },
          {
            floor: 75,
            ceil: 78,
            result: 'Supplies resources to',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Temporary alliance with',
          },
          {
            floor: 82,
            ceil: 85,
            result: 'Tolerates',
          },
          {
            floor: 86,
            ceil: 89,
            result: 'Trades favors with',
          },
          {
            floor: 90,
            ceil: 92,
            result: 'Unjustly accused by',
          },
          {
            floor: 93,
            ceil: 96,
            result: 'Warring with',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
        description:
          'Factions add scale and narrative opportunities to your setting. But keep it manageable. Don’t overload your campaign with factions. Instead, focus on your interactions and entanglements with members of a few interesting factions. Then, when you have a question about the relationship of one faction to another, use this table. The result is the commonly understood connection between those factions. Further investigations or events may reveal a deeper or alternate truth.',
      },
      'Name Template': {
        table: [
          {
            floor: 1,
            ceil: 40,
            result: '[Legacy] [Affiliation]',
          },
          {
            floor: 41,
            ceil: 55,
            result: '[Legacy] [Identity]',
          },
          {
            floor: 56,
            ceil: 70,
            result: '[Identity] *of the* [Legacy] [Affiliation]',
          },
          {
            floor: 71,
            ceil: 100,
            result: '[Affiliation] *of the* [Legacy] [Identity]',
          },
        ],
        description:
          'To generate a faction name, first roll or choose the name template. Then, follow the structure of the template to build the name from individual tables. If you’ve already set the faction type, picking from the tables (instead of rolling) will likely provide a more appropriate result. For example, “Silver Jackals” is a fitting name for a criminal organization. The “Empire of the Undying Suns” is a less apt name for that gang—unless their leader is prone to delusions of grandeur. In short, choosing a name will give you more control. Rolling might give you a result that doesn’t square with known aspects, but those contradictions may prove inspiring.\n\nAn alternative approach to generating a faction from scratch is to start with a random name. Then, consider what the name evokes and choose an appropriate faction type instead of rolling on those tables. For example, “Bloody Ravens” might suggest a mercenary guild, while the “Republic of the Radiant Servants” brings to mind a dominion built upon a religion, or one that idolizes a prophesied leader. If a result doesn’t inspire anything interesting, roll again or pick.',
      },
      Legacy: {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'Ancient',
          },
          {
            floor: 3,
            ceil: 4,
            result: 'Ashen',
          },
          {
            floor: 5,
            ceil: 6,
            result: 'Awakened',
          },
          {
            floor: 7,
            ceil: 8,
            result: 'Azure',
          },
          {
            floor: 9,
            ceil: 10,
            result: 'Blessed',
          },
          {
            floor: 11,
            ceil: 12,
            result: 'Bloody',
          },
          {
            floor: 13,
            ceil: 14,
            result: 'Broken',
          },
          {
            floor: 15,
            ceil: 16,
            result: 'Ceaseless',
          },
          {
            floor: 17,
            ceil: 18,
            result: 'Crimson',
          },
          {
            floor: 19,
            ceil: 20,
            result: 'Cursed',
          },
          {
            floor: 21,
            ceil: 22,
            result: 'Dawning',
          },
          {
            floor: 23,
            ceil: 24,
            result: 'Dissident',
          },
          {
            floor: 25,
            ceil: 26,
            result: 'Ebon',
          },
          {
            floor: 27,
            ceil: 28,
            result: 'Elder',
          },
          {
            floor: 29,
            ceil: 30,
            result: 'Enduring',
          },
          {
            floor: 31,
            ceil: 32,
            result: 'Enlightened',
          },
          {
            floor: 33,
            ceil: 34,
            result: 'Exalted',
          },
          {
            floor: 35,
            ceil: 36,
            result: 'Fallen',
          },
          {
            floor: 37,
            ceil: 38,
            result: 'Fated',
          },
          {
            floor: 39,
            ceil: 40,
            result: 'First',
          },
          {
            floor: 41,
            ceil: 42,
            result: 'Forgotten',
          },
          {
            floor: 43,
            ceil: 44,
            result: 'Forsaken',
          },
          {
            floor: 45,
            ceil: 46,
            result: 'Gloaming',
          },
          {
            floor: 47,
            ceil: 48,
            result: 'Golden',
          },
          {
            floor: 49,
            ceil: 50,
            result: 'Hidden',
          },
          {
            floor: 51,
            ceil: 52,
            result: 'Infernal',
          },
          {
            floor: 53,
            ceil: 54,
            result: 'Infinite',
          },
          {
            floor: 55,
            ceil: 56,
            result: 'Iron',
          },
          {
            floor: 57,
            ceil: 58,
            result: 'Kindred',
          },
          {
            floor: 59,
            ceil: 60,
            result: 'Obsidian',
          },
          {
            floor: 61,
            ceil: 62,
            result: 'Radiant',
          },
          {
            floor: 63,
            ceil: 64,
            result: 'Risen',
          },
          {
            floor: 65,
            ceil: 66,
            result: 'Sacred',
          },
          {
            floor: 67,
            ceil: 68,
            result: 'Sapphire',
          },
          {
            floor: 69,
            ceil: 70,
            result: 'Scarlet',
          },
          {
            floor: 71,
            ceil: 72,
            result: 'Serene',
          },
          {
            floor: 73,
            ceil: 74,
            result: 'Shattered',
          },
          {
            floor: 75,
            ceil: 76,
            result: 'Shining',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Silent',
          },
          {
            floor: 79,
            ceil: 80,
            result: 'Silver',
          },
          {
            floor: 81,
            ceil: 82,
            result: 'Sovereign',
          },
          {
            floor: 83,
            ceil: 84,
            result: 'Stellar',
          },
          {
            floor: 85,
            ceil: 86,
            result: 'Sundered',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Supreme',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Undying',
          },
          {
            floor: 91,
            ceil: 92,
            result: 'Unified',
          },
          {
            floor: 93,
            ceil: 94,
            result: 'United',
          },
          {
            floor: 95,
            ceil: 96,
            result: 'Universal',
          },
          {
            floor: 97,
            ceil: 98,
            result: 'Veiled',
          },
          {
            floor: 99,
            ceil: 100,
            result: 'Wandering',
          },
        ],
      },
      Affiliation: {
        table: [
          {
            floor: 1,
            ceil: 4,
            result: 'Accord',
          },
          {
            floor: 5,
            ceil: 8,
            result: 'Alliance',
          },
          {
            floor: 9,
            ceil: 12,
            result: 'Ascendancy',
          },
          {
            floor: 13,
            ceil: 16,
            result: 'Circle',
          },
          {
            floor: 17,
            ceil: 20,
            result: 'Coalition',
          },
          {
            floor: 21,
            ceil: 24,
            result: 'Collective',
          },
          {
            floor: 25,
            ceil: 28,
            result: 'Commonwealth',
          },
          {
            floor: 29,
            ceil: 32,
            result: 'Confederation',
          },
          {
            floor: 33,
            ceil: 36,
            result: 'Consortium',
          },
          {
            floor: 37,
            ceil: 40,
            result: 'Council',
          },
          {
            floor: 41,
            ceil: 44,
            result: 'Court',
          },
          {
            floor: 45,
            ceil: 48,
            result: 'Covenant',
          },
          {
            floor: 49,
            ceil: 52,
            result: 'Dominion',
          },
          {
            floor: 53,
            ceil: 56,
            result: 'Empire',
          },
          {
            floor: 57,
            ceil: 60,
            result: 'Federation',
          },
          {
            floor: 61,
            ceil: 64,
            result: 'Imperium',
          },
          {
            floor: 65,
            ceil: 68,
            result: 'League',
          },
          {
            floor: 69,
            ceil: 72,
            result: 'Legion',
          },
          {
            floor: 73,
            ceil: 76,
            result: 'Order',
          },
          {
            floor: 77,
            ceil: 80,
            result: 'Pact',
          },
          {
            floor: 81,
            ceil: 84,
            result: 'Regiment',
          },
          {
            floor: 85,
            ceil: 88,
            result: 'Republic',
          },
          {
            floor: 89,
            ceil: 92,
            result: 'Sphere',
          },
          {
            floor: 93,
            ceil: 96,
            result: 'Syndicate',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Union',
          },
        ],
      },
      Identity: {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'Blades',
          },
          {
            floor: 3,
            ceil: 4,
            result: 'Builders',
          },
          {
            floor: 5,
            ceil: 6,
            result: 'Daggers',
          },
          {
            floor: 7,
            ceil: 8,
            result: 'Defenders',
          },
          {
            floor: 9,
            ceil: 10,
            result: 'Disciples',
          },
          {
            floor: 11,
            ceil: 12,
            result: 'Domains',
          },
          {
            floor: 13,
            ceil: 14,
            result: 'Drifters',
          },
          {
            floor: 15,
            ceil: 16,
            result: 'Embers',
          },
          {
            floor: 17,
            ceil: 18,
            result: 'Flames',
          },
          {
            floor: 19,
            ceil: 20,
            result: 'Fleet',
          },
          {
            floor: 21,
            ceil: 22,
            result: 'Guardians',
          },
          {
            floor: 23,
            ceil: 24,
            result: 'Hammers',
          },
          {
            floor: 25,
            ceil: 26,
            result: 'Harbingers',
          },
          {
            floor: 27,
            ceil: 28,
            result: 'Heralds',
          },
          {
            floor: 29,
            ceil: 30,
            result: 'Hounds',
          },
          {
            floor: 31,
            ceil: 32,
            result: 'Hunters',
          },
          {
            floor: 33,
            ceil: 34,
            result: 'Jackals',
          },
          {
            floor: 35,
            ceil: 36,
            result: 'Keepers',
          },
          {
            floor: 37,
            ceil: 38,
            result: 'Knights',
          },
          {
            floor: 39,
            ceil: 40,
            result: 'Menders',
          },
          {
            floor: 41,
            ceil: 42,
            result: 'Outcasts',
          },
          {
            floor: 43,
            ceil: 44,
            result: 'Phantoms',
          },
          {
            floor: 45,
            ceil: 46,
            result: 'Planets',
          },
          {
            floor: 47,
            ceil: 48,
            result: 'Raiders',
          },
          {
            floor: 49,
            ceil: 50,
            result: 'Ravens',
          },
          {
            floor: 51,
            ceil: 52,
            result: 'Realms',
          },
          {
            floor: 53,
            ceil: 54,
            result: 'Reavers',
          },
          {
            floor: 55,
            ceil: 56,
            result: 'Relics',
          },
          {
            floor: 57,
            ceil: 58,
            result: 'Seekers',
          },
          {
            floor: 59,
            ceil: 60,
            result: 'Sentinels',
          },
          {
            floor: 61,
            ceil: 62,
            result: 'Serpents',
          },
          {
            floor: 63,
            ceil: 64,
            result: 'Servants',
          },
          {
            floor: 65,
            ceil: 66,
            result: 'Shadows',
          },
          {
            floor: 67,
            ceil: 68,
            result: 'Shards',
          },
          {
            floor: 69,
            ceil: 70,
            result: 'Skulls',
          },
          {
            floor: 71,
            ceil: 72,
            result: 'Souls',
          },
          {
            floor: 73,
            ceil: 74,
            result: 'Specters',
          },
          {
            floor: 75,
            ceil: 76,
            result: 'Stars',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Suns',
          },
          {
            floor: 79,
            ceil: 80,
            result: 'Swarm',
          },
          {
            floor: 81,
            ceil: 82,
            result: 'Swords',
          },
          {
            floor: 83,
            ceil: 84,
            result: 'Talons',
          },
          {
            floor: 85,
            ceil: 86,
            result: 'Vanguards',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Wardens',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Watchers',
          },
          {
            floor: 91,
            ceil: 92,
            result: 'Wolves',
          },
          {
            floor: 93,
            ceil: 94,
            result: 'Worlds',
          },
          {
            floor: 95,
            ceil: 96,
            result: 'Wraiths',
          },
          {
            floor: 97,
            ceil: 98,
            result: 'Wreckers',
          },
          {
            floor: 99,
            ceil: 100,
            result: 'Wrights',
          },
        ],
      },
      Quirks: {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Ancient or coded language',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Animal or creature motif used as a faction symbol',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Banishes the disloyal',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Body augmentations are respected and valued',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Body ornamentations signify castes or roles',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Conceals individual identity',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Dependent on an addictive substance',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Distinctive or elaborate clothing',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Elite soldiers provide defense or serve as bodyguards',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Favors a signature weapon',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Guided by superstition or prophecy',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Heavily stratified social structure',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Hoards precursor artifacts',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Honors the fallen through unusual death rites',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Idolizes a long-dead founder or martyr',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Keeps exhaustive records or archives',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Lives off-planet in spaceborne fleets',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Members take a new name when joining the faction',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Nomadic people and mobile operations',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Operates under strict codes or laws',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Recognizes others through a distinctive greeting or gesture',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Reliant on machine intelligence',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Resolves disputes through formal duels',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Rites of adulthood or ascension',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Shuns or distrusts machine intelligence',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Starships share a distinctive and recognizable profile',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Suspicious of outsiders',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Symbiotic relationship with a specific type of creature',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Trades in a unique currency or commodity',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Trains in a demanding physical discipline or martial art',
          },
          {
            floor: 91,
            ceil: 93,
            result: 'Wields unnatural abilities or strange technologies',
          },
          {
            floor: 94,
            ceil: 96,
            result: 'Work or environment causes mutations',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Action + Theme',
          },
        ],
        description:
          'Roll or pick known characteristics of the faction and its members using this table. But keep in mind that even within a small or specialized faction, there are no absolutes. These quirks represent common attitudes, practices, or approaches, but are not universal to every member of that faction. Leave room in your portrayal for diversity and contradictions.',
      },
      Rumors: {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Caught in the crossfire of feuding factions',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Colluding with a criminal enterprise',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Corrupted by a dangerous power',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Critical resource is in short supply',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Defenses are overextended',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Developing revolutionary technology',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Digital systems are corrupted or infiltrated',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Heavily in debt',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Hit hard by a recent attack or calamity',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Holds a powerful artifact',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Holds incriminating information against a leader or faction',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Hoarding a valuable commodity',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Infiltrated by a rival faction',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Knows the location of a fabled treasure or lost technology',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Leaders are haunted by a dark prophecy',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Leaders are incompetent',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Leaders are puppets of another power or faction',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Lesser members of the leadership are plotting a coup',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'New belief or religion is creating a schism among members',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Operations are a false front for their true purpose',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Overdependence on a failing or vulnerable technology',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Plagued by infighting and low morale',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Plotting to betray an allied faction',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Preparing a major offensive or operation',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Pulling the strings of a leader or faction',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Recently acquired an unexpected fortune',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Secretly supporting a reviled faction',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Sheltering an infamous or dangerous fugitive',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Suffered destructive sabotage from within',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Suffering a shortage of key workers or personnel',
          },
          {
            floor: 91,
            ceil: 93,
            result: 'Uprising or revolt is brewing from within',
          },
          {
            floor: 94,
            ceil: 96,
            result: 'Vulnerable to attack or aggression',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Action + Theme',
          },
        ],
        description:
          'Use this table when you are in a position to investigate a faction by uncovering secrets or fishing for gossip.',
      },
    },
  },
  'Location Themes': {
    oracles: {
      'Theme Type': {
        table: [
          {
            floor: 1,
            ceil: 15,
            result: 'Chaotic',
          },
          {
            floor: 16,
            ceil: 25,
            result: 'Fortified',
          },
          {
            floor: 26,
            ceil: 35,
            result: 'Haunted',
          },
          {
            floor: 36,
            ceil: 50,
            result: 'Infested',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Inhabited',
          },
          {
            floor: 61,
            ceil: 75,
            result: 'Mechanical',
          },
          {
            floor: 76,
            ceil: 90,
            result: 'Ruined',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Sacred',
          },
        ],
        description:
          'You will typically choose a theme which supports what you know of that location’s nature. If you want a random theme, roll on the table above.',
      },
      Chaotic: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Alterations in the flow of time',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Chaotic portal, focus, or conduit',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Corrupted or warped architecture or terrain',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Corrupted or warped environment or ecosystem',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Corrupted or warped technology',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Cryptic device harnesses or powers chaos',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Distortions of gravity or other natural forces',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Energy field or barrier',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Glimpses of alternate realities',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Lifeforms mutated or altered by chaos',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Lifeforms spawned from chaos',
              },
              {
                floor: 89,
                ceil: 96,
                result: 'Visions of your past or future',
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'Chaos makes its mark upon you',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Chaos spreads or intensifies',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Chaos tempts or lures you',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Chaotic energies block the path or assail you',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Disorienting changes in time or location',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Dreadful scene of those who fell prey to chaos',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Equipment is made unstable or dangerous',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Foes harness or wield chaos',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Hazardous environmental changes',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Lifeforms made hostile by chaos',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Chaos ebbs or withdraws for a time',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Chaos empowers you with strange but useful abilities',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Chaos manifests as comforting or inspiring visions',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Chaotic changes hamper your foes',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Insight into the source or nature of the chaos',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'Reality is corrupted or warped in this place.',
      },
      Fortified: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Captives or prisoners',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Control area or terminal',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Empty or inactive area',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Enemy forces assembled for an event',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Enemy forces off-duty or at leisure',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Enemy forces on guard',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Enemy forces on patrol',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Enemy forces transporting supplies or equipment',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Enemy leader makes an inspection',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Prototype technology or equipment',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Robotic assistant or watchful AI',
              },
              {
                floor: 89,
                ceil: 96,
                result: 'Support personnel at work',
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'Alarm is triggered',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Automated security or weapons target you',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Checkpoint or path with restricted access',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Enemies converge on this area',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Enemies reveal new capabilities or technology',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Enemies trick you or lure you into a trap',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Powerful enemy appears',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Problematic alliance or affiliation is revealed',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Revealed schemes of an enemy leader create new urgency',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Your plan is undone by an unexpected complication',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Insight into the plans or methods of the enemy force',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Opening to get the drop on an enemy',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Opening to outmaneuver or escape enemies',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Potential collaborator or informant reveals themselves',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Access to useful equipment or weapons',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'Enemies defend this place against intruders.',
      },
      Haunted: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Disembodied voices',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Eerie cold',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Foreboding omen or message',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Ghostly visions of this place in another time',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Glimpses of shadowy movement',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Objects move of their own accord',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Sensation of being watched',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Signs of death or violence',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Spectral sounds',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Twisted or altered architecture or terrain',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Unnatural blight, decay, or ruin',
              },
              {
                floor: 89,
                ceil: 96,
                result: 'Unnatural mists or darkness',
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'Assailed by an angry or vengeful being',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Beguiling illusions tempt you to linger or stay',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Besieged by frightening sensations',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Equipment is plagued by unexplainable malfunctions',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Plunged into disorienting darkness or illusionary surroundings',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Spectral manifestations of your fears',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Spirits or undead reveal surprising abilities or motivations',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Sudden, shocking reveal of a ghostly manifestation or undead form',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Trickery leads you into danger',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Visions reveal a horrifying aspect of this place',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Encounter with a benign spirit or being',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Helpful vision of past events',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Message or clue offers insight into the nature of this haunting',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Secret area or path is revealed',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Useful or interesting artifact or device',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'Restless spirits are bound to this place.',
      },
      Infested: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Corpse of an unfortunate victim',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Eggs, cocoons, or nest',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Environment corrupted by the infestation',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Evidence of a lurking creature',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Evidence of an ill-fated victim',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Hoarded food',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Indistinct movement or sounds',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Lair of lesser creatures',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Ravaged supplies or equipment',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Remains of a creature or remnants of a previous form',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Territorial markings',
              },
              {
                floor: 89,
                ceil: 96,
                result: "Trail or evidence of a creature's passage",
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'Creatures attack without warning',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Creatures guided or controlled by a greater threat',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Creatures reveal new aspects or abilities',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Creatures reveal surprising cleverness',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Creatures take or destroy something important',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Discovery of a live but threatened victim',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Hazardous architecture or terrain',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Lured or driven into a trap or dead-end',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Powerful or dominant creature reveals itself',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Toxic or sickening environment',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Clue to the nature or vulnerabilities of these creatures',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Creatures turn on each other',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Early warning of an attack or ambush',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'External event provides a helpful distraction',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Helpful resource or equipment',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'Foul creatures have overrun this place.',
      },
      Inhabited: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Conspicuous patrols or surveillance',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Crews at work',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Display or monument honors a notable cultural event',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Emergency teams responding to an incident or crisis',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Families gathering or children playing',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Festival, celebration, or observance',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Fight breaks out',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Notable figure stands out from the crowd',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Protest or strike',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Unrepaired damage',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Unusually empty or quiet area',
              },
              {
                floor: 89,
                ceil: 96,
                result: 'Vendor or merchant hawking their wares',
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'Announcement or notification brings harrowing news',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Arrival of a foe or rival',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Blockade or security cordon cuts off needed access',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Caught in the crossfire of a dispute',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Disturbing evidence of exploitive conditions',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Lured into danger',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Signs of disease, infestation, or toxic environment',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Signs of unrest or rebellion',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Signs that you are being watched or followed',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Unwanted attention from authority or enemies',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Intriguing offer from an unexpected source',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Lively festival or gathering place provides a chance to socialize',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Local gossip proves interesting or helpful',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Needed item, resource, or buyer is available',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Old friend or connection resurfaces',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'People have built a community in this place.',
      },
      Mechanical: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Control station or terminal',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Device or technology with a mysterious function',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Disassembled machinery or parts',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Heavy machinery at work',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Machine fabrication or repair',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Machines emulating or fusing with biological life',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Machines in stasis or powered down',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Machines single-mindedly executing a function or program',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Major project under construction',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Mechanical environment in motion or transforming',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Mechanical wreckage or destruction',
              },
              {
                floor: 89,
                ceil: 96,
                result: 'Power source for the machines',
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'Alarm or warning is triggered',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Automated weapon or trap is activated',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Environment made unsuitable for life',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Hostile machines on patrol',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Machines transform to reveal new capabilities',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Machines with corrupted or hacked programming',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Malfunctioning machines or technology',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Moving machinery creates a danger or obstacle',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Under surveillance by a central machine intelligence',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Volatile technology',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Helpful device',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Insight into the workings or purpose of the machines',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Intelligent machine offers aid',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Salvageable resource',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Wondrous technology',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'Machines and technology hold sway in this place.',
      },
      Ruined: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Collapsed or broken structures or terrain',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Device or artifact with residual power or function',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Focal point or nexus of the destruction',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Graves or corpses',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Innermost or hidden spaces laid bare by the destruction',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Message or recording from before the fall',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Overgrown or entombed spaces',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Rubble-strewn paths',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Sad memento of a lost life',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Sights or sounds of structural instability',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Signs of looting or scavenging',
              },
              {
                floor: 89,
                ceil: 96,
                result: 'Survivors or guardians dwell among the ruins',
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'Dreadful atmosphere of loss and destruction weighs upon you',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Evidence of a horrible fate for others who passed this way',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Hazardous atmosphere or environment',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Hostile creature has staked out their territory',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Imminent collapse or destruction',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Lured into a trap or targeted by automated defenses',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Source of the destruction persists or returns anew',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Unearthed secrets best left buried',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Unstable or broken path',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Volatile device or artifact',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Access to an untouched or preserved area',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Insight into what brought this place to ruin',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Interesting or useful device or artifact',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Salvageable equipment or resources',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Shortcut or passage through the destruction',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'Time, disaster, or war have ravaged this place.',
      },
      Sacred: {
        oracles: {
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 8,
                result: 'Adherents performing worship or enacting rituals',
              },
              {
                floor: 9,
                ceil: 16,
                result: 'Altar or temple',
              },
              {
                floor: 17,
                ceil: 24,
                result: 'Dwellings for the faithful',
              },
              {
                floor: 25,
                ceil: 32,
                result: 'Enigmatic symbols',
              },
              {
                floor: 33,
                ceil: 40,
                result: 'Graves or remains of glorified disciples',
              },
              {
                floor: 41,
                ceil: 48,
                result: 'Holy text or archives',
              },
              {
                floor: 49,
                ceil: 56,
                result: 'Offerings or atonements',
              },
              {
                floor: 57,
                ceil: 64,
                result: 'Pilgrims arriving to pay homage',
              },
              {
                floor: 65,
                ceil: 72,
                result: 'Protected reliquary of an artifact or token',
              },
              {
                floor: 73,
                ceil: 80,
                result: 'Religious art or idols',
              },
              {
                floor: 81,
                ceil: 88,
                result: 'Subtle manifestations of mystical power or visions',
              },
              {
                floor: 89,
                ceil: 96,
                result: "Tokens or motifs representing the faith's domain",
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description: 'Use this table to reveal a new aspect of the location.',
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 9,
                result: 'An aspect of the faith beguiles you or lures you into danger',
              },
              {
                floor: 10,
                ceil: 18,
                result: 'Dreadful aspects or powers of the faith are revealed',
              },
              {
                floor: 19,
                ceil: 27,
                result: 'Embodiment of a god or power is given corrupted form or purpose',
              },
              {
                floor: 28,
                ceil: 36,
                result: 'Guardians seek martyrdom in defense of this place',
              },
              {
                floor: 37,
                ceil: 45,
                result: 'Leaders corrupt or exploit their followers to oppose you',
              },
              {
                floor: 46,
                ceil: 54,
                result: 'Prophecies portend a dire threat',
              },
              {
                floor: 55,
                ceil: 63,
                result: 'Protective ward or enigmatic puzzle blocks the way',
              },
              {
                floor: 64,
                ceil: 72,
                result: 'Religious artifact evokes unnerving power',
              },
              {
                floor: 73,
                ceil: 81,
                result: 'Unnatural corruption or decay fouls the environment',
              },
              {
                floor: 82,
                ceil: 90,
                result: 'Zealots enact a ceremony to unlock forbidden powers',
              },
              {
                floor: 91,
                ceil: 98,
                result: 'Action + Theme',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description: 'Use this table to help envision a complication or hazard.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Access to a hidden or sealed area',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Encounter with a helpful adherent or heretic',
              },
              {
                floor: 41,
                ceil: 60,
                result: 'Insight into the nature or history of the faith',
              },
              {
                floor: 61,
                ceil: 80,
                result: 'Insight into the schemes or methods of religious zealots',
              },
              {
                floor: 81,
                ceil: 100,
                result: 'Interesting or valuable artifact or device',
              },
            ],
            description:
              'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.',
          },
        },
        description: 'Worshipers glorify strange powers in this place.',
      },
    },
    description:
      'Themes help you envision atmosphere, features, and encounters within an unusual, aberrant, or important location. You can answer questions about a place using only the tables provided for a theme, such as when delving into an **Infested** cave. Or you can pair a theme with other location oracles for more flavor and variety; for example, you might explore a **Haunted Grave World**, a **Ruined Derelict**, a **Sacred Precusor Vault**, or an **Inhabited Settlement**.\n\nEach theme on the following pages includes a set of oracles.\n\n  * **Feature:** Use this table to reveal a new aspect of the location.\n  * **Peril:** Use this table to help envision a complication or hazard.\n  * **Opportunity:** Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.\n\nWhen mixing-and-matching a theme with another set of tables, use the techniques described for an **oracle array** (page 378) to determine which oracle you will reference for that question or phase of your exploration.',
  },
  Misc: {
    oracles: {
      'Story Complication': {
        table: [
          {
            floor: 1,
            ceil: 4,
            result: 'Crucial equipment or device fails',
          },
          {
            floor: 5,
            ceil: 7,
            result: 'Crucial equipment or device is sabotaged',
          },
          {
            floor: 8,
            ceil: 10,
            result: 'Debt or promise comes due',
          },
          {
            floor: 11,
            ceil: 14,
            result: 'Enemy reveals unexpected powers, abilities, or influence',
          },
          {
            floor: 15,
            ceil: 17,
            result: 'Enemy reveals their true agenda or nature',
          },
          {
            floor: 18,
            ceil: 20,
            result: 'Enemy unexpectedly benefits from your actions',
          },
          {
            floor: 21,
            ceil: 23,
            result: 'Key location is made inaccessible',
          },
          {
            floor: 24,
            ceil: 26,
            result: 'Key location is threatened or made unsafe',
          },
          {
            floor: 27,
            ceil: 29,
            result: 'Natural disaster is imminent',
          },
          {
            floor: 30,
            ceil: 33,
            result: 'Needed item or resource is unavailable',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Object of a quest is not what you assumed',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Old enemy resurfaces',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Simultaneous problems force a hard choice',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Someone important betrays your trust',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Someone important is threatened or endangered',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Someone important reveals their problematic secret or history',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Something important goes missing',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Technology or device is shown to have unexpected effects',
          },
          {
            floor: 58,
            ceil: 61,
            result: 'Time pressure suddenly increases',
          },
          {
            floor: 62,
            ceil: 65,
            result: 'Trap is sprung',
          },
          {
            floor: 66,
            ceil: 68,
            result: 'True agenda of a connection or patron is revealed',
          },
          {
            floor: 69,
            ceil: 72,
            result: 'Trusted information is shown to be false',
          },
          {
            floor: 73,
            ceil: 76,
            result: 'Two seemingly unrelated problems are shown to be connected',
          },
          {
            floor: 77,
            ceil: 80,
            result: 'Undermined by self-doubt or vulnerabilities',
          },
          {
            floor: 81,
            ceil: 84,
            result: 'Unexpected enemies appear',
          },
          {
            floor: 85,
            ceil: 88,
            result: 'Urgent message distracts you from your quest',
          },
          {
            floor: 89,
            ceil: 92,
            result: 'You are tracked or followed',
          },
          {
            floor: 93,
            ceil: 95,
            result: 'You were diverted from the true crisis',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
        description:
          'This oracle will introduce narrative turns, troubles, and revelations. It can be used as an alternative to the Pay the Price table when you encounter a negative outcome at a crucial moment. In particular, you might use this table after rolling matched 10s on the challenge dice.',
      },
      'Story Clue': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Affirms a previously understood fact or clue',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Connects to a known rumor or scandal',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Connects to a previously unrelated mystery or quest',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Connects to your own expertise or interests',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Contradicts a previously understood fact or clue',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Evokes a personal memory',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Evokes a remarkable anomaly or phenomenon',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Evokes a vision or prophecy',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Involves a cultural touchstone',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Involves a hidden or mysterious faction',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Involves a hidden or mysterious person',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Involves a key or means of access',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Involves a machine or technology',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Involves a non-human being or creature',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Involves a notable faction',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Involves a notable person',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Involves a person or faction from your background',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Involves a personal item',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Involves an enemy or rival',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Involves an organism or biological evidence',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Involves an unusual ability or power',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Involves someone you trust',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Involves something rare, expensive, or precious',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Leads to a distant or unfamiliar place',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Leads to a hidden or forgotten place',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Leads to a nearby or familiar place',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Leads to a notable or central place',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Suggests a history of similar incidents',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Suggests a looming event or deadline',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Suggests an imposter or forgery',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Descriptor + Focus',
          },
        ],
        description:
          'When you [Gather Information](Moves#Gather-Information) to investigate a mystery, you might uncover clues in the form of messages, rumors, eyewitness reports, data, or physical evidence. You can use this oracle to help reveal what this evidence connects to or implicates. Then, use the outcome of the [Gather Information](Moves#Gather-Information) roll—strong hit, weak hit, or miss—to guide whether the clue brings clarity or complications.',
      },
      'Anomaly Effect': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Alters or focuses gravity',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Alters or reshapes nonliving matter',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Alters surrounding air or atmosphere',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Alters surrounding ecosystems',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Awakens the dead',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Causes distressing visions or nightmares',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Causes rapid biological growth or infestation',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Causes sickness or weakness',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Corrupts living matter',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Corrupts or infects devices or computers',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Creates manifestations or illusions',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Decays or weakens surrounding terrain or structures',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Drains energy from equipment or devices',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Emits forceful or destructive energy',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Emits radiation',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Generates a barrier or ward',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Generates intense lights and sounds',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Generates tendrils of energy that slither or grasp',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Harvests or destroys living matter',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Harvests or destroys nonliving matter',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Nullifies or destroys equipment or devices',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Opens a path to another location',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Replicates living matter',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Replicates nonliving matter',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Reveals glimpses of the distant past',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Reveals glimpses of the far future',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Reverses time by a few moments or minutes',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Slows or stops time',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Summons or manifests an ancient being or intelligence',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Summons or manifests creatures',
          },
          {
            floor: 91,
            ceil: 93,
            result: 'Transports to another location',
          },
          {
            floor: 94,
            ceil: 96,
            result: 'Triggers an impending catastrophic explosion',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
        description:
          'Meddling with alien artifacts or forbidden magic may put you at the mercy of chaos. Use this table to resolve the effects of ancient tech, rituals, or other strange forces. Results on this table may have devastating implications, so use it only in rare and dramatic moments.',
      },
      'Combat Action': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Block a path or cut off an objective',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Cause reckless damage',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Change weapons or tactics',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Compel a surrender or concession',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Coordinate with allies',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Corner, trap, or entangle',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Counter or reflect an attack',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Create a distraction',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Destroy something or render it useless',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Fall back or stand off',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Hide or sneak',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Intimidate, taunt, or frighten',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Leverage the advantage of a weapon or ability',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Leverage the terrain or surroundings',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Lure into a vulnerable position',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Make a cautious or probing attack',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Make a ferocious or powerful attack',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Make a precise or careful attack',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Make a sacrificial attack',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Make an indirect attack',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Move in close or grapple',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Nullify a system, device, or weapon',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Overrun a position',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Perform a feint or trick',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Press an advantage',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Provoke a careless response',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Ready a decisive action',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Shift the fight to a new area',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Summon aid or reinforcements',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Take cover or bolster defenses',
          },
          {
            floor: 91,
            ceil: 93,
            result: 'Use an unexpected weapon or ability',
          },
          {
            floor: 94,
            ceil: 96,
            result: 'Weaken defenses',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
        description:
          'Use this oracle to help inspire an action for a foe in a fight. When you’re not sure what an enemy does next, particularly when they have you in a bad spot, roll on this table and interpret the result as appropriate to the nature of the enemy and your objective.',
      },
    },
  },
  Moves: {
    oracles: {
      'Ask the Oracle': {
        oracles: {
          'Almost Certain': {
            table: [
              {
                floor: 1,
                ceil: 90,
                result: 'Yes',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'No',
              },
            ],
          },
          Likely: {
            table: [
              {
                floor: 1,
                ceil: 75,
                result: 'Yes',
              },
              {
                floor: 76,
                ceil: 100,
                result: 'No',
              },
            ],
          },
          '50/50': {
            table: [
              {
                floor: 1,
                ceil: 50,
                result: 'Yes',
              },
              {
                floor: 51,
                ceil: 100,
                result: 'No',
              },
            ],
          },
          Unlikely: {
            table: [
              {
                floor: 1,
                ceil: 25,
                result: 'Yes',
              },
              {
                floor: 26,
                ceil: 100,
                result: 'No',
              },
            ],
          },
          'Small Chance': {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Yes',
              },
              {
                floor: 11,
                ceil: 100,
                result: 'No',
              },
            ],
          },
        },
      },
      'Begin a Session': {
        table: [
          {
            floor: 1,
            ceil: 10,
            result: 'Flashback reveals an aspect of your background or nature',
          },
          {
            floor: 11,
            ceil: 20,
            result: 'Flashback reveals an aspect of another character, place, or faction',
          },
          {
            floor: 21,
            ceil: 30,
            result: 'Influential character or faction is introduced or given new detail',
          },
          {
            floor: 31,
            ceil: 40,
            result: 'Seemingly unrelated situations are shown to be connected',
          },
          {
            floor: 41,
            ceil: 50,
            result: 'External factors create new danger, urgency, or importance for a quest',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Important character is put in danger or suffers a misadventure',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'Key location is made unsafe or becomes mired in conflict',
          },
          {
            floor: 71,
            ceil: 80,
            result: 'Unexpected return of an enemy or threat',
          },
          {
            floor: 81,
            ceil: 90,
            result: 'Peril lies ahead or lurks just out of view',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Unforeseen aid is on the way or within reach',
          },
        ],
      },
      'Make a Discovery': {
        table: [
          {
            floor: 1,
            ceil: 4,
            result: 'Advanced technology waiting to be harnessed or salvaged',
          },
          {
            floor: 5,
            ceil: 8,
            result: 'Ancient archive or message',
          },
          {
            floor: 9,
            ceil: 10,
            result: 'Artificial consciousness evolved to a higher state',
          },
          {
            floor: 11,
            ceil: 12,
            result: 'Clues to a crucial resource or uncharted domain',
          },
          {
            floor: 13,
            ceil: 14,
            result: 'Envoy from another time or reality',
          },
          {
            floor: 15,
            ceil: 22,
            result: 'Extraordinary natural phenomenon',
          },
          {
            floor: 23,
            ceil: 24,
            result: 'First contact with intelligent life',
          },
          {
            floor: 25,
            ceil: 26,
            result: 'Gateway to another time or alternate reality',
          },
          {
            floor: 27,
            ceil: 28,
            result: 'Key to unlocking a language or method of communication',
          },
          {
            floor: 29,
            ceil: 34,
            result: 'Lost or hidden people',
          },
          {
            floor: 35,
            ceil: 42,
            result: 'Majestic or unusual lifeforms',
          },
          {
            floor: 43,
            ceil: 46,
            result: 'Marvel of ancient engineering',
          },
          {
            floor: 47,
            ceil: 50,
            result: 'Miraculously preserved artifact or specimen',
          },
          {
            floor: 51,
            ceil: 56,
            result: 'Monumental architecture or artistry of an ancient civilization',
          },
          {
            floor: 57,
            ceil: 62,
            result: 'Mysterious device or artifact of potential value',
          },
          {
            floor: 63,
            ceil: 66,
            result: 'New understanding of an enduring mystery',
          },
          {
            floor: 67,
            ceil: 68,
            result: 'Pathway or means of travel to a distant location',
          },
          {
            floor: 69,
            ceil: 70,
            result: 'Person or lifeform with phenomenal abilities',
          },
          {
            floor: 71,
            ceil: 78,
            result: 'Place of awe-inspiring beauty',
          },
          {
            floor: 79,
            ceil: 86,
            result: 'Rare and valuable resource',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Safeguarded or idyllic location',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Visions or prophesies of the future',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
      'Confront Chaos': {
        table: [
          {
            floor: 1,
            ceil: 4,
            result: 'Baneful weapon of mass destruction',
          },
          {
            floor: 5,
            ceil: 9,
            result: 'Cataclysmic environmental effects',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Dead given unnatural life',
          },
          {
            floor: 13,
            ceil: 17,
            result: 'Destructive lifeform of monstrous proportion',
          },
          {
            floor: 18,
            ceil: 20,
            result: 'Dread hallucinations or illusions',
          },
          {
            floor: 21,
            ceil: 24,
            result: 'Harbingers of an imminent invasion',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Horde of insatiable hunger or fury',
          },
          {
            floor: 28,
            ceil: 32,
            result: 'Horrific lifeforms of inscrutable purpose',
          },
          {
            floor: 33,
            ceil: 36,
            result: 'Impostors in human form',
          },
          {
            floor: 37,
            ceil: 41,
            result: 'Machines made enemy',
          },
          {
            floor: 42,
            ceil: 45,
            result: 'Malignant contagion or parasite',
          },
          {
            floor: 46,
            ceil: 50,
            result: 'Messenger or signal with a dire warning',
          },
          {
            floor: 51,
            ceil: 53,
            result: 'Passage to a grim alternate reality',
          },
          {
            floor: 54,
            ceil: 58,
            result: 'People corrupted by chaos',
          },
          {
            floor: 59,
            ceil: 63,
            result: 'Powerful distortions of time or space',
          },
          {
            floor: 64,
            ceil: 68,
            result: 'Signs of an impending catastrophe',
          },
          {
            floor: 69,
            ceil: 72,
            result: 'Site of a baffling disappearance',
          },
          {
            floor: 73,
            ceil: 77,
            result: 'Site of a horrible disaster',
          },
          {
            floor: 78,
            ceil: 82,
            result: 'Site of terrible carnage',
          },
          {
            floor: 83,
            ceil: 87,
            result: 'Technology nullified or made unstable',
          },
          {
            floor: 88,
            ceil: 92,
            result: 'Technology warped for dark purpose',
          },
          {
            floor: 93,
            ceil: 96,
            result: 'Vault of dread technology or power',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Worshipers of great and malevolent powers',
          },
        ],
      },
      'Take Decisive Action': {
        table: [
          {
            floor: 1,
            ceil: 40,
            result: 'It’s worse than you thought: Make a suffer move (-2)',
          },
          {
            floor: 41,
            ceil: 52,
            result: 'Victory is short-lived: A new peril or foe appears',
          },
          {
            floor: 53,
            ceil: 64,
            result: 'You face collateral damage: Something is lost, damaged, or broken',
          },
          {
            floor: 65,
            ceil: 76,
            result: 'Others pay the price: Someone else suffers the cost',
          },
          {
            floor: 77,
            ceil: 88,
            result: 'Others won’t forget: You are marked for vengeance',
          },
          {
            floor: 89,
            ceil: 100,
            result: 'It gets complicated: The true nature of a foe or objective is revealed',
          },
        ],
      },
      'Endure Harm': {
        table: [
          {
            floor: 1,
            ceil: 10,
            result: 'You suffer mortal harm. [Face Death](Moves#Face-Death).',
          },
          {
            floor: 11,
            ceil: 20,
            result:
              'You are dying. Within an hour or two, you must [Heal](Moves#Heal) and raise your health above 0, or [Face Death](Moves#Face-Death).',
          },
          {
            floor: 21,
            ceil: 35,
            result:
              'You are unconscious and out of action. If left alone, you come back to your senses in an hour or two. If you are vulnerable to ongoing harm, [Face Death](Moves#Face-Death).',
          },
          {
            floor: 36,
            ceil: 50,
            result:
              'You are reeling and fighting to stay conscious. If you engage in any vigorous activity before taking a breather for a few minutes, roll on this table again (before resolving the other move).',
          },
          {
            floor: 51,
            ceil: 100,
            result: 'You are still standing.',
          },
        ],
      },
      'Endure Stress': {
        table: [
          {
            floor: 1,
            ceil: 10,
            result: 'You are overwhelmed. [Face Desolation](Moves#Face-Desolation).',
          },
          {
            floor: 11,
            ceil: 25,
            result: 'You give up. [Forsake Your Vow](Moves#Forsake-Your-Vow).',
          },
          {
            floor: 26,
            ceil: 50,
            result: 'You give in to fear or compulsion, and act against your better instincts.',
          },
          {
            floor: 51,
            ceil: 100,
            result: 'You persevere.',
          },
        ],
      },
      'Withstand Damage': {
        table: [
          {
            floor: 1,
            ceil: 10,
            result:
              'Immediate catastrophic destruction. All aboard must [Endure Harm](Moves#Endure-Harm) or [Face Death](Moves#Face-Death), as appropriate.',
          },
          {
            floor: 11,
            ceil: 25,
            result:
              'Destruction is imminent and unavoidable. If you do not have the means or intention to get clear, [Endure Harm](Moves#Endure-Harm) or [Face Death](Moves#Face-Death) as appropriate.',
          },
          {
            floor: 26,
            ceil: 40,
            result:
              'Destruction is imminent, but can be averted if you [Repair](Moves#Repair) your vehicle and raise its integrity above 0. If you fail, see 11-25.',
          },
          {
            floor: 41,
            ceil: 55,
            result:
              'You cannot [Repair](Moves#Repair) this vehicle until you [Resupply](Moves#Resupply) and obtain a crucial replacement part. If you roll this result again prior to that, see 11-25.',
          },
          {
            floor: 56,
            ceil: 70,
            result:
              'The vehicle is crippled or out of your control. To get it back in action, you must [Repair](Moves#Repair) and raise its integrity above 0.',
          },
          {
            floor: 71,
            ceil: 85,
            result:
              "It's a rough ride. All aboard must make the [Endure Harm](Moves#Endure-Harm), [Endure Stress](Moves#Endure-Stress), or [Companion Takes a Hit](Moves#Companion-Takes-a-Hit) move, suffering a serious (-2) cost.",
          },
          {
            floor: 86,
            ceil: 95,
            result: 'You’ve lost fuel, energy, or cargo. [Sacrifice Resources](Moves#Sacrifice-Resources) (-2).',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Against all odds, the vehicle holds together.',
          },
        ],
      },
      'Pay the Price': {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'A trusted individual or community acts against you',
          },
          {
            floor: 3,
            ceil: 4,
            result: 'An individual or community you care about is exposed to danger',
          },
          {
            floor: 5,
            ceil: 7,
            result: 'You encounter signs of a looming threat',
          },
          {
            floor: 8,
            ceil: 10,
            result: 'You create an opportunity for an enemy',
          },
          {
            floor: 11,
            ceil: 14,
            result: 'You face a tough choice',
          },
          {
            floor: 15,
            ceil: 18,
            result: 'You face the consequences of an earlier choice',
          },
          {
            floor: 19,
            ceil: 22,
            result: 'A surprising development complicates your quest',
          },
          {
            floor: 23,
            ceil: 26,
            result: 'You are separated from something or someone',
          },
          {
            floor: 27,
            ceil: 32,
            result: 'Your action causes collateral damage or has an unintended effect',
          },
          {
            floor: 33,
            ceil: 38,
            result: 'Something of value is lost or destroyed',
          },
          {
            floor: 39,
            ceil: 44,
            result: 'The environment or terrain introduces a new hazard',
          },
          {
            floor: 45,
            ceil: 50,
            result: 'A new enemy is revealed',
          },
          {
            floor: 51,
            ceil: 56,
            result: 'A friend, companion, or ally is in harm’s way (or you are, if alone)',
          },
          {
            floor: 57,
            ceil: 62,
            result: 'Your equipment or vehicle malfunctions',
          },
          {
            floor: 63,
            ceil: 68,
            result: 'Your vehicle suffers damage',
          },
          {
            floor: 69,
            ceil: 74,
            result: 'You waste resources',
          },
          {
            floor: 75,
            ceil: 81,
            result: 'You are harmed',
          },
          {
            floor: 82,
            ceil: 88,
            result: 'You are stressed',
          },
          {
            floor: 89,
            ceil: 95,
            result: 'You are delayed or put at a disadvantage',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
    },
  },
  Planets: {
    oracles: {
      Class: {
        table: [
          {
            floor: 1,
            ceil: 15,
            result: 'Desert World',
          },
          {
            floor: 16,
            ceil: 30,
            result: 'Furnace World',
          },
          {
            floor: 31,
            ceil: 35,
            result: 'Grave World',
          },
          {
            floor: 36,
            ceil: 50,
            result: 'Ice World',
          },
          {
            floor: 51,
            ceil: 65,
            result: 'Jovian World',
          },
          {
            floor: 66,
            ceil: 70,
            result: 'Jungle World',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Ocean World',
          },
          {
            floor: 76,
            ceil: 90,
            result: 'Rocky World',
          },
          {
            floor: 91,
            ceil: 92,
            result: 'Shattered World',
          },
          {
            floor: 93,
            ceil: 98,
            result: 'Tainted World',
          },
          {
            floor: 99,
            ceil: 100,
            result: 'Vital World',
          },
        ],
        description:
          'This oracle provides a simple method of generating a planetary class. If this is enough information, stop there and envision the world as appropriate to its type. For a bit more detail, make a roll on the Descriptor oracle and envision how that aspect defines the nature of the planet or a specific planetside location.',
      },
      Peril: {
        oracles: {
          Lifebearing: {
            table: [
              {
                floor: 1,
                ceil: 3,
                result: 'Corrupted or mutated lifeform',
              },
              {
                floor: 4,
                ceil: 6,
                result: "Signs of a lifeform's power or cunning",
              },
              {
                floor: 7,
                ceil: 9,
                result: 'Hazardous plant life or malignant spores',
              },
              {
                floor: 10,
                ceil: 12,
                result: 'Lifeform hunts for prey',
              },
              {
                floor: 13,
                ceil: 15,
                result: 'Lifeform lairs here',
              },
              {
                floor: 16,
                ceil: 18,
                result: 'Lifeforms guided by a greater threat',
              },
              {
                floor: 19,
                ceil: 21,
                result: 'Lifeforms spooked or stampeding',
              },
              {
                floor: 22,
                ceil: 24,
                result: 'Threatening lifeform draws near',
              },
              {
                floor: 25,
                ceil: 27,
                result: 'Life is revealed or takes an unexpected form',
              },
              {
                floor: 28,
                ceil: 30,
                result: 'Blocked or impassible path',
              },
              {
                floor: 31,
                ceil: 33,
                result: 'Corrosive substance or environment',
              },
              {
                floor: 34,
                ceil: 36,
                result: 'Disturbing remains or evidence of death',
              },
              {
                floor: 37,
                ceil: 39,
                result: 'Drastic environmental change',
              },
              {
                floor: 40,
                ceil: 42,
                result: 'Enemy holds this area',
              },
              {
                floor: 43,
                ceil: 45,
                result: 'Entangling or engulfing hazard',
              },
              {
                floor: 46,
                ceil: 48,
                result: 'Equipment fails or malfunctions',
              },
              {
                floor: 49,
                ceil: 51,
                result: 'Guarded or patrolled path',
              },
              {
                floor: 52,
                ceil: 54,
                result: 'Led astray',
              },
              {
                floor: 55,
                ceil: 57,
                result: 'Lost the path',
              },
              {
                floor: 58,
                ceil: 60,
                result: 'Meteorites fall from the sky',
              },
              {
                floor: 61,
                ceil: 63,
                result: 'Irradiated area or object',
              },
              {
                floor: 64,
                ceil: 66,
                result: 'Realization that something was left behind',
              },
              {
                floor: 67,
                ceil: 69,
                result: 'Seismic or volcanic upheaval',
              },
              {
                floor: 70,
                ceil: 72,
                result: 'Signs of a lurking or trailing foe',
              },
              {
                floor: 73,
                ceil: 75,
                result: 'Storm or atmospheric disruption',
              },
              {
                floor: 76,
                ceil: 78,
                result: 'Toxic or sickening environment',
              },
              {
                floor: 79,
                ceil: 81,
                result: 'Trap or alarm',
              },
              {
                floor: 82,
                ceil: 84,
                result: 'Treacherous or arduous path',
              },
              {
                floor: 85,
                ceil: 87,
                result: 'Troubling visions or apparitions',
              },
              {
                floor: 88,
                ceil: 90,
                result: 'Visibility hindered by atmospheric effects',
              },
              {
                floor: 91,
                ceil: 93,
                result: 'Worrying arrival of a ship or vehicle',
              },
              {
                floor: 94,
                ceil: 96,
                result: 'Wreckage or ruins portend a new threat',
              },
              {
                floor: 97,
                ceil: 99,
                result: 'Action + Theme',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Lifeless: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'Corrupted or mutated lifeform',
              },
              {
                floor: null,
                ceil: null,
                result: "Signs of a lifeform's power or cunning",
              },
              {
                floor: null,
                ceil: null,
                result: 'Hazardous plant life or malignant spores',
              },
              {
                floor: null,
                ceil: null,
                result: 'Lifeform hunts for prey',
              },
              {
                floor: null,
                ceil: null,
                result: 'Lifeform lairs here',
              },
              {
                floor: null,
                ceil: null,
                result: 'Lifeforms guided by a greater threat',
              },
              {
                floor: null,
                ceil: null,
                result: 'Lifeforms spooked or stampeding',
              },
              {
                floor: null,
                ceil: null,
                result: 'Threatening lifeform draws near',
              },
              {
                floor: 1,
                ceil: 3,
                result: 'Life is revealed or takes an unexpected form',
              },
              {
                floor: 4,
                ceil: 7,
                result: 'Blocked or impassible path',
              },
              {
                floor: 8,
                ceil: 11,
                result: 'Corrosive substance or environment',
              },
              {
                floor: 12,
                ceil: 15,
                result: 'Disturbing remains or evidence of death',
              },
              {
                floor: 16,
                ceil: 19,
                result: 'Drastic environmental change',
              },
              {
                floor: 20,
                ceil: 23,
                result: 'Enemy holds this area',
              },
              {
                floor: 24,
                ceil: 27,
                result: 'Entangling or engulfing hazard',
              },
              {
                floor: 28,
                ceil: 31,
                result: 'Equipment fails or malfunctions',
              },
              {
                floor: 32,
                ceil: 35,
                result: 'Guarded or patrolled path',
              },
              {
                floor: 36,
                ceil: 39,
                result: 'Led astray',
              },
              {
                floor: 40,
                ceil: 43,
                result: 'Lost the path',
              },
              {
                floor: 44,
                ceil: 47,
                result: 'Meteorites fall from the sky',
              },
              {
                floor: 48,
                ceil: 51,
                result: 'Irradiated area or object',
              },
              {
                floor: 52,
                ceil: 55,
                result: 'Realization that something was left behind',
              },
              {
                floor: 56,
                ceil: 59,
                result: 'Seismic or volcanic upheaval',
              },
              {
                floor: 60,
                ceil: 63,
                result: 'Signs of a lurking or trailing foe',
              },
              {
                floor: 64,
                ceil: 67,
                result: 'Storm or atmospheric disruption',
              },
              {
                floor: 68,
                ceil: 71,
                result: 'Toxic or sickening environment',
              },
              {
                floor: 72,
                ceil: 75,
                result: 'Trap or alarm',
              },
              {
                floor: 76,
                ceil: 79,
                result: 'Treacherous or arduous path',
              },
              {
                floor: 80,
                ceil: 83,
                result: 'Troubling visions or apparitions',
              },
              {
                floor: 84,
                ceil: 87,
                result: 'Visibility hindered by atmospheric effects',
              },
              {
                floor: 88,
                ceil: 91,
                result: 'Worrying arrival of a ship or vehicle',
              },
              {
                floor: 92,
                ceil: 95,
                result: 'Wreckage or ruins portend a new threat',
              },
              {
                floor: 96,
                ceil: 99,
                result: 'Action + Theme',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
        },
        description:
          'Choose or roll on this table when you want inspiration for a trouble during planetside exploration or a planetside expedition.',
      },
      Opportunity: {
        oracles: {
          Lifebearing: {
            table: [
              {
                floor: 1,
                ceil: 4,
                result: "Clue to a lifeform's nature or vulnerabilities",
              },
              {
                floor: 5,
                ceil: 8,
                result: 'Friendly interaction with a benign lifeform',
              },
              {
                floor: 9,
                ceil: 12,
                result: 'Hunting or foraging opportunities are plentiful',
              },
              {
                floor: 13,
                ceil: 16,
                result: 'Interesting or helpful aspect of benign creatures',
              },
              {
                floor: 17,
                ceil: 20,
                result: 'Interesting or helpful aspect of local plant life',
              },
              {
                floor: 21,
                ceil: 24,
                result: 'Encounter reveals unexpected benign lifeforms',
              },
              {
                floor: 25,
                ceil: 28,
                result: 'Abandoned camp or vehicle',
              },
              {
                floor: 29,
                ceil: 32,
                result: 'Advance warning of an environmental threat',
              },
              {
                floor: 33,
                ceil: 36,
                result: 'Clear path through otherwise perilous terrain',
              },
              {
                floor: 37,
                ceil: 40,
                result: 'Clue offers insight into a current quest or mystery',
              },
              {
                floor: 41,
                ceil: 44,
                result: 'Clue to the history or nature of this place',
              },
              {
                floor: 45,
                ceil: 48,
                result: 'Evidence that others have passed this way',
              },
              {
                floor: 49,
                ceil: 52,
                result: 'Foe reveals themselves or tips their hand',
              },
              {
                floor: 53,
                ceil: 56,
                result: 'Fortuitous change in the weather or atmosphere',
              },
              {
                floor: 57,
                ceil: 60,
                result: 'Friendly traveler crosses your path',
              },
              {
                floor: 61,
                ceil: 64,
                result: 'Helpful resource is in ample supply',
              },
              {
                floor: 65,
                ceil: 68,
                result: 'Impressive vista offers comfort or inspiration',
              },
              {
                floor: 69,
                ceil: 72,
                result: 'Interesting artifact or device',
              },
              {
                floor: 73,
                ceil: 76,
                result: 'Interesting site offers opportunities for exploration',
              },
              {
                floor: 77,
                ceil: 80,
                result: 'Moment of fellowship or inner peace',
              },
              {
                floor: 81,
                ceil: 84,
                result: 'Opening to distract, escape, or avoid foes',
              },
              {
                floor: 85,
                ceil: 88,
                result: 'Opening to get the drop on a foe',
              },
              {
                floor: 89,
                ceil: 92,
                result: 'Plea for help from a potential benefactor',
              },
              {
                floor: 93,
                ceil: 96,
                result: 'Refuge offers a place to hide, plan, or recover',
              },
              {
                floor: 97,
                ceil: 100,
                result: 'Vantage point reveals the lay of the land',
              },
            ],
          },
          Lifeless: {
            table: [
              {
                floor: null,
                ceil: null,
                result: "Clue to a lifeform's nature or vulnerabilities",
              },
              {
                floor: null,
                ceil: null,
                result: 'Friendly interaction with a benign lifeform',
              },
              {
                floor: null,
                ceil: null,
                result: 'Hunting or foraging opportunities are plentiful',
              },
              {
                floor: null,
                ceil: null,
                result: 'Interesting or helpful aspect of benign creatures',
              },
              {
                floor: null,
                ceil: null,
                result: 'Interesting or helpful aspect of local plant life',
              },
              {
                floor: 1,
                ceil: 5,
                result: 'Encounter reveals unexpected benign lifeforms',
              },
              {
                floor: 6,
                ceil: 10,
                result: 'Abandoned camp or vehicle',
              },
              {
                floor: 11,
                ceil: 15,
                result: 'Advance warning of an environmental threat',
              },
              {
                floor: 16,
                ceil: 20,
                result: 'Clear path through otherwise perilous terrain',
              },
              {
                floor: 21,
                ceil: 25,
                result: 'Clue offers insight into a current quest or mystery',
              },
              {
                floor: 26,
                ceil: 30,
                result: 'Clue to the history or nature of this place',
              },
              {
                floor: 31,
                ceil: 35,
                result: 'Evidence that others have passed this way',
              },
              {
                floor: 36,
                ceil: 40,
                result: 'Foe reveals themselves or tips their hand',
              },
              {
                floor: 41,
                ceil: 45,
                result: 'Fortuitous change in the weather or atmosphere',
              },
              {
                floor: 46,
                ceil: 50,
                result: 'Friendly traveler crosses your path',
              },
              {
                floor: 51,
                ceil: 55,
                result: 'Helpful resource is in ample supply',
              },
              {
                floor: 56,
                ceil: 60,
                result: 'Impressive vista offers comfort or inspiration',
              },
              {
                floor: 61,
                ceil: 65,
                result: 'Interesting artifact or device',
              },
              {
                floor: 66,
                ceil: 70,
                result: 'Interesting site offers opportunities for exploration',
              },
              {
                floor: 71,
                ceil: 75,
                result: 'Moment of fellowship or inner peace',
              },
              {
                floor: 76,
                ceil: 80,
                result: 'Opening to distract, escape, or avoid foes',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'Opening to get the drop on a foe',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Plea for help from a potential benefactor',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Refuge offers a place to hide, plan, or recover',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Vantage point reveals the lay of the land',
              },
            ],
          },
        },
        description:
          'Choose or roll on this table when you want inspiration for a beneficial encounter or event on a planetside journey, such as when you roll a strong hit with a match as you Undertake an Expedition, or if you Explore a Waypoint and find an opportunity.',
      },
      Desert: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'None/thin',
              },
              {
                floor: 11,
                ceil: 25,
                result: 'Toxic',
              },
              {
                floor: 26,
                ceil: 40,
                result: 'Corrosive',
              },
              {
                floor: 41,
                ceil: 70,
                result: 'Marginal',
              },
              {
                floor: 71,
                ceil: 95,
                result: 'Breathable',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 50,
                    result: 'None',
                  },
                  {
                    floor: 51,
                    ceil: 60,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 61,
                    ceil: 80,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 81,
                    ceil: 92,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 93,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 75,
                    result: 'None',
                  },
                  {
                    floor: 76,
                    ceil: 83,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 84,
                    ceil: 95,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 90,
                    result: 'None',
                  },
                  {
                    floor: 91,
                    ceil: 96,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 97,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Dry seabeds',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Expansive dune seas',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Massive canyons',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Perpetual daylight',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Rugged mountains',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Sprawling salt flats',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Vast plateaus',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Vibrant terrain colors',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Cavernous sinkholes',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Engulfing sandstorms',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Fleeting rainstorms and flash floods',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Flooded grottos',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Petrified forest',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Rampaging whirlwinds',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Scorched glass plains',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Severe temperature fluctuations',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Sunbaked bones of titanic creatures',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Timeworn cliffside caves',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Towering rock formations',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Violent electrical storms',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Windborne metallic sand',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'None',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Extinct',
              },
              {
                floor: 41,
                ceil: 70,
                result: 'Scarce',
              },
              {
                floor: 71,
                ceil: 90,
                result: 'Diverse',
              },
              {
                floor: 91,
                ceil: 97,
                result: 'Bountiful',
              },
              {
                floor: 98,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A pitiless planet of searing heat, blowing sand, and sunbaked rock.',
      },
      Furnace: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'None/thin',
              },
              {
                floor: 11,
                ceil: 50,
                result: 'Toxic',
              },
              {
                floor: 51,
                ceil: 65,
                result: 'Corrosive',
              },
              {
                floor: 66,
                ceil: 90,
                result: 'Marginal',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Breathable',
              },
              {
                floor: null,
                ceil: null,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 60,
                    result: 'None',
                  },
                  {
                    floor: 61,
                    ceil: 75,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 76,
                    ceil: 87,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 88,
                    ceil: 96,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 97,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 85,
                    result: 'None',
                  },
                  {
                    floor: 86,
                    ceil: 92,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 93,
                    ceil: 97,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 98,
                    ceil: 99,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 100,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 95,
                    result: 'None',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Fiery world-spanning chasms',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Glowing rivers of lava',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Lightning-wracked ash clouds',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Magma seas',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Massive supervolcano',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Once verdant terrain',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Towering mountain ranges',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'World-spanning fissures',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Blinding ash storms',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Catastrophic earthquakes',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Colorful geothermal springs',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Intricate volcanic rock formations',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Lava tube tunnel networks',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Masses of scorched bones',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Plains of volcanic glass',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Pools of liquid metal',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Rocky islands adrift on magma',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Roiling clouds of superheated gas',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Scalding geysers',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Silica or metal storms',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Steaming mudflats',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 35,
                result: 'None',
              },
              {
                floor: 36,
                ceil: 60,
                result: 'Extinct',
              },
              {
                floor: 61,
                ceil: 85,
                result: 'Scarce',
              },
              {
                floor: 86,
                ceil: 95,
                result: 'Diverse',
              },
              {
                floor: 96,
                ceil: 98,
                result: 'Bountiful',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A planet with relentless volcanic activity, wreathed in fire and ash.',
      },
      Grave: {
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
          'Requiem',
          'Stygia',
          'Tartarus',
          'Thrace',
        ],
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'None/thin',
              },
              {
                floor: 11,
                ceil: 45,
                result: 'Toxic',
              },
              {
                floor: 46,
                ceil: 70,
                result: 'Corrosive',
              },
              {
                floor: 71,
                ceil: 90,
                result: 'Marginal',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Breathable',
              },
              {
                floor: null,
                ceil: null,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 80,
                    result: 'None',
                  },
                  {
                    floor: 81,
                    ceil: 90,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 91,
                    ceil: 95,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 90,
                    result: 'None',
                  },
                  {
                    floor: 91,
                    ceil: 97,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 98,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 95,
                    result: 'None',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Broken moon',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Perpetual overcast',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Cratered surface',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Sky-breaching ruins',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Dry seabeds',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Vast wastelands',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Irradiated atmosphere',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Orbiting ship graveyard',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Acid pools',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Ash dunes',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Corrosive rains',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Dead forests',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Fetid mudflats',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Mass graves',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Moldering bones',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Noxious fog',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Radioactive hotspots',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Ravaged cities',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Scarred battlefields',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Ship graveyards',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Whispers of the dead',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 25,
                result: 'None',
              },
              {
                floor: 26,
                ceil: 75,
                result: 'Extinct',
              },
              {
                floor: 76,
                ceil: 95,
                result: 'Scarce',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Diverse',
              },
              {
                floor: null,
                ceil: null,
                result: 'Bountiful',
              },
              {
                floor: null,
                ceil: null,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A once-thriving world—now a grim monument to a fallen civilization.',
      },
      Ice: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: 1,
                ceil: 15,
                result: 'None/thin',
              },
              {
                floor: 16,
                ceil: 35,
                result: 'Toxic',
              },
              {
                floor: 36,
                ceil: 40,
                result: 'Corrosive',
              },
              {
                floor: 41,
                ceil: 70,
                result: 'Marginal',
              },
              {
                floor: 71,
                ceil: 95,
                result: 'Breathable',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 50,
                    result: 'None',
                  },
                  {
                    floor: 51,
                    ceil: 60,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 61,
                    ceil: 80,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 81,
                    ceil: 92,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 93,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 75,
                    result: 'None',
                  },
                  {
                    floor: 76,
                    ceil: 83,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 84,
                    ceil: 95,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 90,
                    result: 'None',
                  },
                  {
                    floor: 91,
                    ceil: 96,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 97,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Feeble sunlight',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Supersized ice volcano',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Frozen oceans',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Vibrantly colored ice',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Rocky glacial islands',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'World-spanning ice canyon',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Snowbound mountains',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Sky-breaching geysers',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Abyssal ice fissures',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Blinding snow storms',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Clusters of ice spikes',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Colossal ice caves',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Glistening ice spires',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Massive snow drifts',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Preserved carcasses',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Rocky islands amid icy wastes',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Shattered plains of pack ice',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Steaming hot springs',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Subsurface liquid oceans',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Vibrant auroras',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Wind-carved ice formations',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'None',
              },
              {
                floor: 21,
                ceil: 40,
                result: 'Extinct',
              },
              {
                floor: 41,
                ceil: 70,
                result: 'Scarce',
              },
              {
                floor: 71,
                ceil: 90,
                result: 'Diverse',
              },
              {
                floor: 91,
                ceil: 97,
                result: 'Bountiful',
              },
              {
                floor: 98,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A rugged, frozen world—locked in an unending winter.',
      },
      Jovian: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'None/thin',
              },
              {
                floor: 1,
                ceil: 50,
                result: 'Toxic',
              },
              {
                floor: 51,
                ceil: 65,
                result: 'Corrosive',
              },
              {
                floor: 66,
                ceil: 85,
                result: 'Marginal',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'Breathable',
              },
              {
                floor: null,
                ceil: null,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 50,
                    result: 'None',
                  },
                  {
                    floor: 51,
                    ceil: 70,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 71,
                    ceil: 85,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 86,
                    ceil: 95,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 96,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 75,
                    result: 'None',
                  },
                  {
                    floor: 76,
                    ceil: 87,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 88,
                    ceil: 95,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 90,
                    result: 'None',
                  },
                  {
                    floor: 91,
                    ceil: 96,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 97,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Complex ring system',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Intense gravity well',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Numerous moons',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Perpetual superstorm',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Powerful magnetic field',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Severe electrical storms',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Superheated atmosphere',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Unusual atmospheric colors',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Clouds of metal particles',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Crystalline rains',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Floating glaciers',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Floating islands',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Layer of suspended liquid',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Pockets of explosive gases',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Powerful vortexes',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Radiation fields',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Storm-swept rocky debris',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Torrential rain',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Towering thunderheads',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Violent turbulence',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Zones of localized atmosphere',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 35,
                result: 'None',
              },
              {
                floor: 36,
                ceil: 60,
                result: 'Extinct',
              },
              {
                floor: 61,
                ceil: 85,
                result: 'Scarce',
              },
              {
                floor: 86,
                ceil: 95,
                result: 'Diverse',
              },
              {
                floor: 96,
                ceil: 98,
                result: 'Bountiful',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A massive planet with vast layers of dense gases surrounding a rocky core.',
      },
      Jungle: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'None/thin',
              },
              {
                floor: 1,
                ceil: 25,
                result: 'Toxic',
              },
              {
                floor: 26,
                ceil: 30,
                result: 'Corrosive',
              },
              {
                floor: 31,
                ceil: 60,
                result: 'Marginal',
              },
              {
                floor: 61,
                ceil: 90,
                result: 'Breathable',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 40,
                    result: 'None',
                  },
                  {
                    floor: 41,
                    ceil: 55,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 56,
                    ceil: 80,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 81,
                    ceil: 92,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 93,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 65,
                    result: 'None',
                  },
                  {
                    floor: 66,
                    ceil: 75,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 76,
                    ceil: 92,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 93,
                    ceil: 97,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 98,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 85,
                    result: 'None',
                  },
                  {
                    floor: 86,
                    ceil: 90,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 91,
                    ceil: 97,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 98,
                    ceil: 99,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 100,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Cloud-breaching trees',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Towering mountains',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Expansive rivers or wetlands',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Unbroken canopy',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Inland seas',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Unusual vegetation color',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Massive canyons',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Persistent cloud cover',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Bioluminescent flora',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Deep river gorges',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Extensive exposed root systems',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Immense tiered waterfalls',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Languid rivers',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Low-lying fog',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Plunging sinkholes',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Scarred clearings',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Sinking quagmires',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Surging rivers',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Torrential rainstorms',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Violent electrical storms',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Waterlogged caves',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'None',
              },
              {
                floor: null,
                ceil: null,
                result: 'Extinct',
              },
              {
                floor: 1,
                ceil: 5,
                result: 'Scarce',
              },
              {
                floor: 6,
                ceil: 35,
                result: 'Diverse',
              },
              {
                floor: 36,
                ceil: 75,
                result: 'Bountiful',
              },
              {
                floor: 76,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A humid, rain-soaked planet that keeps its secrets under a thick canopy of vegetation.',
      },
      Ocean: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'None/thin',
              },
              {
                floor: 6,
                ceil: 20,
                result: 'Toxic',
              },
              {
                floor: 21,
                ceil: 25,
                result: 'Corrosive',
              },
              {
                floor: 26,
                ceil: 60,
                result: 'Marginal',
              },
              {
                floor: 61,
                ceil: 90,
                result: 'Breathable',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 40,
                    result: 'None',
                  },
                  {
                    floor: 41,
                    ceil: 55,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 56,
                    ceil: 80,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 81,
                    ceil: 92,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 93,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 65,
                    result: 'None',
                  },
                  {
                    floor: 66,
                    ceil: 75,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 76,
                    ceil: 92,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 93,
                    ceil: 97,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 98,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 85,
                    result: 'None',
                  },
                  {
                    floor: 86,
                    ceil: 90,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 91,
                    ceil: 97,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 98,
                    ceil: 99,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 100,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Complex reef systems',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Emerging volcanoes',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Floating forests',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Global hurricanes',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Large moon and strong tides',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Scattered islands',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Semi-frozen oceans',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Unusual water color',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Abyssal trenches',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Living islands',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Luminescent seas',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Roaming icebergs',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Shallow-water plains',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Subsurface volcanoes',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Titanic waves',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Undersea air pockets',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Undersea caves',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Undersea forests',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Unrelenting rainfall',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Violent currents',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Windborne waterspouts',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'None',
              },
              {
                floor: 6,
                ceil: 15,
                result: 'Extinct',
              },
              {
                floor: 16,
                ceil: 30,
                result: 'Scarce',
              },
              {
                floor: 31,
                ceil: 60,
                result: 'Diverse',
              },
              {
                floor: 61,
                ceil: 90,
                result: 'Bountiful',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A planet completely or almost entirely covered by a boundless ocean.',
      },
      Rocky: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: 1,
                ceil: 65,
                result: 'None/thin',
              },
              {
                floor: 66,
                ceil: 85,
                result: 'Toxic',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Corrosive',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Marginal',
              },
              {
                floor: null,
                ceil: null,
                result: 'Breathable',
              },
              {
                floor: null,
                ceil: null,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 50,
                    result: 'None',
                  },
                  {
                    floor: 51,
                    ceil: 70,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 71,
                    ceil: 85,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 86,
                    ceil: 95,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 96,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 75,
                    result: 'None',
                  },
                  {
                    floor: 76,
                    ceil: 87,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 88,
                    ceil: 95,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 90,
                    result: 'None',
                  },
                  {
                    floor: 91,
                    ceil: 96,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 97,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Barren plains',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Constant asteroid strikes',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Dense ring system',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Jagged mountains',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Massive impact crater',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Misshapen form (low gravity)',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Perpetual night',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Towering plateaus',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Crystalline formations',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Crystalline caves',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Exposed mineral deposits',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Geometric terrain features',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Geothermal vents',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Glassy impact craters',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Massive dust dunes',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Powerful magnetic fields',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Rubble-strewn lava fields',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Steam-heated caves',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Subsurface magma flows',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Swirling low-lying gases',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Towering rocky spires',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 65,
                result: 'None',
              },
              {
                floor: 66,
                ceil: 80,
                result: 'Extinct',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Scarce',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Diverse',
              },
              {
                floor: 96,
                ceil: 98,
                result: 'Bountiful',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A rugged planet scarred by eons of destructive asteroid impacts.',
      },
      Shattered: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: 1,
                ceil: 93,
                result: 'None/thin',
              },
              {
                floor: 94,
                ceil: 95,
                result: 'Toxic',
              },
              {
                floor: 96,
                ceil: 97,
                result: 'Corrosive',
              },
              {
                floor: 98,
                ceil: 99,
                result: 'Marginal',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Breathable',
              },
              {
                floor: null,
                ceil: null,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 70,
                    result: 'None',
                  },
                  {
                    floor: 71,
                    ceil: 90,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 91,
                    ceil: 95,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 85,
                    result: 'None',
                  },
                  {
                    floor: 86,
                    ceil: 96,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 97,
                    ceil: 99,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 100,
                    ceil: 100,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 95,
                    result: 'None',
                  },
                  {
                    floor: 96,
                    ceil: 99,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 100,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Demolished space fleet',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Preserved planetary fragment',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Dense ring system',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Swirling debris field',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Fiery planetary core',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Unbroken moon',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Geomagnetic storms',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Intense solar radiation',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Broken cities',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Colliding fragments',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Energy storms',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Exposed caverns',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Fluctuating gravity',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Magnetic disturbances',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Molten fissures',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Phantom visions of the past',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Pocket atmosphere',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Residual energy storms',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Swirling corrosive gases',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Unstable and fracturing terrain',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Venting magma',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: 1,
                ceil: 30,
                result: 'None',
              },
              {
                floor: 31,
                ceil: 85,
                result: 'Extinct',
              },
              {
                floor: 86,
                ceil: 95,
                result: 'Scarce',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Diverse',
              },
              {
                floor: null,
                ceil: null,
                result: 'Bountiful',
              },
              {
                floor: null,
                ceil: null,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A planet sundered by cataclysmic destruction.',
      },
      Tainted: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'None/thin',
              },
              {
                floor: 1,
                ceil: 65,
                result: 'Toxic',
              },
              {
                floor: 66,
                ceil: 85,
                result: 'Corrosive',
              },
              {
                floor: 86,
                ceil: 95,
                result: 'Marginal',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Breathable',
              },
              {
                floor: null,
                ceil: null,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 80,
                    result: 'None',
                  },
                  {
                    floor: 81,
                    ceil: 90,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 91,
                    ceil: 95,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 90,
                    result: 'None',
                  },
                  {
                    floor: 91,
                    ceil: 97,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 98,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 95,
                    result: 'None',
                  },
                  {
                    floor: 96,
                    ceil: 98,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: null,
                    ceil: null,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Expansive fungal plains',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Stagnant cloud cover',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Fungal forests',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Thick, murky atmosphere',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'Scabrous, infected terrain',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Toxic seas',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Sky-breaching fungus',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Sludge-filled river networks',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Caustic gas storms',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Corrosive, low-lying fog',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Fungus-encrusted caves',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Gelatinous ponds',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Hallucinogenic toxins',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Layers of fast-growing lichen',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Moldering bones',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Mutated flora',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Poisonous gas vents',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Spore clouds',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Terrain marred by fleshy pustules',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Toxic rain',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Virulent fungal infestations',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'None',
              },
              {
                floor: null,
                ceil: null,
                result: 'Extinct',
              },
              {
                floor: 1,
                ceil: 10,
                result: 'Scarce',
              },
              {
                floor: 11,
                ceil: 35,
                result: 'Diverse',
              },
              {
                floor: 36,
                ceil: 65,
                result: 'Bountiful',
              },
              {
                floor: 66,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'A foul planet wracked by a poisonous climate and virulent growths.',
      },
      Vital: {
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
        oracles: {
          Atmosphere: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'None/thin',
              },
              {
                floor: null,
                ceil: null,
                result: 'Toxic',
              },
              {
                floor: null,
                ceil: null,
                result: 'Corrosive',
              },
              {
                floor: 1,
                ceil: 20,
                result: 'Marginal',
              },
              {
                floor: 21,
                ceil: 50,
                result: 'Breathable',
              },
              {
                floor: 51,
                ceil: 100,
                result: 'Ideal',
              },
            ],
          },
          Settlements: {
            oracles: {
              Terminus: {
                table: [
                  {
                    floor: 1,
                    ceil: 20,
                    result: 'None',
                  },
                  {
                    floor: 21,
                    ceil: 30,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 31,
                    ceil: 70,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 71,
                    ceil: 90,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 91,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Outlands: {
                table: [
                  {
                    floor: 1,
                    ceil: 50,
                    result: 'None',
                  },
                  {
                    floor: 51,
                    ceil: 55,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 56,
                    ceil: 85,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 86,
                    ceil: 95,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 96,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
              Expanse: {
                table: [
                  {
                    floor: 1,
                    ceil: 80,
                    result: 'None',
                  },
                  {
                    floor: 81,
                    ceil: 83,
                    result: 'Orbital settlement',
                  },
                  {
                    floor: 84,
                    ceil: 93,
                    result: 'Planetside settlement',
                  },
                  {
                    floor: 94,
                    ceil: 98,
                    result: 'Multiple settlements',
                  },
                  {
                    floor: 99,
                    ceil: 100,
                    result: 'Settlements in conflict',
                  },
                ],
              },
            },
          },
          'Observed From Space': {
            table: [
              {
                floor: 1,
                ceil: 11,
                result: 'Complex ring system',
              },
              {
                floor: 12,
                ceil: 22,
                result: 'Numerous small moons',
              },
              {
                floor: 23,
                ceil: 33,
                result: 'Dramatic seasonal variation',
              },
              {
                floor: 34,
                ceil: 44,
                result: 'Unusual day or night cycle',
              },
              {
                floor: 45,
                ceil: 55,
                result: 'High gravity',
              },
              {
                floor: 56,
                ceil: 66,
                result: 'Vibrantly colored landscapes',
              },
              {
                floor: 67,
                ceil: 77,
                result: 'Large moon',
              },
              {
                floor: 78,
                ceil: 88,
                result: 'Narrow livable band',
              },
              {
                floor: 89,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (orbital)',
              },
            ],
          },
          Diversity: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Simple (two biomes)',
              },
              {
                floor: 21,
                ceil: 70,
                result: 'Diverse (three biomes)',
              },
              {
                floor: 71,
                ceil: 90,
                result: 'Complex (four biomes)',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Garden world (five or more biomes)',
              },
            ],
          },
          Biomes: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'Caves',
              },
              {
                floor: 6,
                ceil: 10,
                result: 'Cold forest',
              },
              {
                floor: 11,
                ceil: 15,
                result: 'Fungal',
              },
              {
                floor: 16,
                ceil: 20,
                result: 'Glacial or snow',
              },
              {
                floor: 21,
                ceil: 25,
                result: 'Grassland',
              },
              {
                floor: 26,
                ceil: 30,
                result: 'Islands',
              },
              {
                floor: 31,
                ceil: 35,
                result: 'Jungle',
              },
              {
                floor: 36,
                ceil: 40,
                result: 'Mountainous',
              },
              {
                floor: 41,
                ceil: 45,
                result: 'Ocean',
              },
              {
                floor: 46,
                ceil: 50,
                result: 'Rocky desert',
              },
              {
                floor: 51,
                ceil: 55,
                result: 'Sandy desert',
              },
              {
                floor: 56,
                ceil: 60,
                result: 'Savanna',
              },
              {
                floor: 61,
                ceil: 65,
                result: 'Shallow seas',
              },
              {
                floor: 66,
                ceil: 70,
                result: 'Shrubland',
              },
              {
                floor: 71,
                ceil: 75,
                result: 'Temperate rainforest',
              },
              {
                floor: 76,
                ceil: 80,
                result: 'Temperate forest',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'Tundra',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Volcanic',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Waterways',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Wetland',
              },
            ],
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 7,
                result: 'Background radiation',
              },
              {
                floor: 8,
                ceil: 14,
                result: 'Chaotically juxtaposed biomes',
              },
              {
                floor: 15,
                ceil: 21,
                result: 'Creature boneyards',
              },
              {
                floor: 22,
                ceil: 28,
                result: 'Creature lairs or watering holes',
              },
              {
                floor: 29,
                ceil: 35,
                result: 'Crystalline formations',
              },
              {
                floor: 36,
                ceil: 42,
                result: 'Fierce electrical storms',
              },
              {
                floor: 43,
                ceil: 49,
                result: 'Floating terrain',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Frequent seismic activity',
              },
              {
                floor: 57,
                ceil: 63,
                result: 'Magnetic disturbances',
              },
              {
                floor: 64,
                ceil: 70,
                result: 'Scarred or excavated terrain',
              },
              {
                floor: 71,
                ceil: 77,
                result: 'Signs of an engineered biosphere',
              },
              {
                floor: 78,
                ceil: 84,
                result: 'Sudden weather fluctuations',
              },
              {
                floor: 85,
                ceil: 91,
                result: 'Towering geological formations',
              },
              {
                floor: 92,
                ceil: 98,
                result: 'Descriptor + Focus',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Precursor Vault (planetside)',
              },
            ],
          },
          Life: {
            table: [
              {
                floor: null,
                ceil: null,
                result: 'None',
              },
              {
                floor: null,
                ceil: null,
                result: 'Extinct',
              },
              {
                floor: 1,
                ceil: 10,
                result: 'Scarce',
              },
              {
                floor: 11,
                ceil: 45,
                result: 'Diverse',
              },
              {
                floor: 46,
                ceil: 85,
                result: 'Bountiful',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'Overrun',
              },
            ],
          },
        },
        description: 'This diverse, life-bearing planet might provide some small measure of hope.',
      },
    },
  },
  Settlements: {
    oracles: {
      Location: {
        table: [
          {
            floor: 1,
            ceil: 40,
            result: 'Planetside',
          },
          {
            floor: 41,
            ceil: 75,
            result: 'Orbital',
          },
          {
            floor: 76,
            ceil: 100,
            result: 'Deep Space',
          },
        ],
      },
      Population: {
        oracles: {
          Terminus: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Few',
              },
              {
                floor: 11,
                ceil: 25,
                result: 'Dozens',
              },
              {
                floor: 26,
                ceil: 55,
                result: 'Hundreds',
              },
              {
                floor: 56,
                ceil: 85,
                result: 'Thousands',
              },
              {
                floor: 86,
                ceil: 100,
                result: 'Tens of thousands',
              },
            ],
          },
          Outlands: {
            table: [
              {
                floor: 1,
                ceil: 15,
                result: 'Few',
              },
              {
                floor: 16,
                ceil: 35,
                result: 'Dozens',
              },
              {
                floor: 36,
                ceil: 65,
                result: 'Hundreds',
              },
              {
                floor: 66,
                ceil: 90,
                result: 'Thousands',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Tens of thousands',
              },
            ],
          },
          Expanse: {
            table: [
              {
                floor: 1,
                ceil: 20,
                result: 'Few',
              },
              {
                floor: 21,
                ceil: 50,
                result: 'Dozens',
              },
              {
                floor: 51,
                ceil: 80,
                result: 'Hundreds',
              },
              {
                floor: 81,
                ceil: 95,
                result: 'Thousands',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Tens of thousands',
              },
            ],
          },
        },
      },
      'First Look': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Beautiful architecture',
          },
          {
            floor: 4,
            ceil: 9,
            result: 'Built from organic materials',
          },
          {
            floor: 10,
            ceil: 15,
            result: 'Built from random scrap',
          },
          {
            floor: 16,
            ceil: 21,
            result: 'Built within repurposed ship',
          },
          {
            floor: 22,
            ceil: 26,
            result: 'Built within terrain or asteroid',
          },
          {
            floor: 27,
            ceil: 31,
            result: 'Defensible location',
          },
          {
            floor: 32,
            ceil: 35,
            result: 'Elevated or multi-level construction',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Hidden or subsurface location',
          },
          {
            floor: 41,
            ceil: 43,
            result: 'High-tech construction',
          },
          {
            floor: 44,
            ceil: 49,
            result: 'Industrial architecture',
          },
          {
            floor: 50,
            ceil: 53,
            result: 'Intimidating defenses',
          },
          {
            floor: 54,
            ceil: 56,
            result: 'Moving or transforming',
          },
          {
            floor: 57,
            ceil: 61,
            result: 'Obvious social stratification',
          },
          {
            floor: 62,
            ceil: 66,
            result: 'Precarious location',
          },
          {
            floor: 67,
            ceil: 72,
            result: 'Rustic architecture',
          },
          {
            floor: 73,
            ceil: 76,
            result: 'Significant structural damage',
          },
          {
            floor: 77,
            ceil: 80,
            result: 'Sprawling or dispersed structures',
          },
          {
            floor: 81,
            ceil: 83,
            result: 'Temporary or seasonal location',
          },
          {
            floor: 84,
            ceil: 87,
            result: 'Toxic or polluted habitat',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Within or near Precursor Vault',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Descriptor + Focus',
          },
        ],
      },
      'Initial Contact': {
        table: [
          {
            floor: 1,
            ceil: 20,
            result: 'Welcoming',
          },
          {
            floor: 21,
            ceil: 30,
            result: 'Neutral / automated',
          },
          {
            floor: 31,
            ceil: 50,
            result: 'Wary',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Uncooperative',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'Hostile',
          },
          {
            floor: 71,
            ceil: 83,
            result: 'Asking for help',
          },
          {
            floor: 84,
            ceil: 86,
            result: 'In battle',
          },
          {
            floor: 87,
            ceil: 89,
            result: 'Captured',
          },
          {
            floor: 90,
            ceil: 92,
            result: 'Unresponsive',
          },
          {
            floor: 93,
            ceil: 95,
            result: 'Destroyed',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Derelict',
          },
        ],
      },
      Authority: {
        table: [
          {
            floor: 1,
            ceil: 15,
            result: 'None / lawless',
          },
          {
            floor: 16,
            ceil: 30,
            result: 'Ineffectual',
          },
          {
            floor: 31,
            ceil: 45,
            result: 'Tolerant',
          },
          {
            floor: 46,
            ceil: 55,
            result: 'Fair',
          },
          {
            floor: 56,
            ceil: 70,
            result: 'Unyielding',
          },
          {
            floor: 71,
            ceil: 85,
            result: 'Corrupt',
          },
          {
            floor: 86,
            ceil: 100,
            result: 'Oppressive',
          },
        ],
      },
      Projects: {
        table: [
          {
            floor: 1,
            ceil: 5,
            result: 'Agriculture',
          },
          {
            floor: 6,
            ceil: 7,
            result: 'Archeology',
          },
          {
            floor: 8,
            ceil: 9,
            result: 'Automation',
          },
          {
            floor: 10,
            ceil: 11,
            result: 'Black market',
          },
          {
            floor: 12,
            ceil: 13,
            result: 'Command',
          },
          {
            floor: 14,
            ceil: 17,
            result: 'Defense',
          },
          {
            floor: 18,
            ceil: 22,
            result: 'Energy',
          },
          {
            floor: 23,
            ceil: 25,
            result: 'Engineering',
          },
          {
            floor: 26,
            ceil: 27,
            result: 'Entertainment',
          },
          {
            floor: 28,
            ceil: 29,
            result: 'Environmentalism',
          },
          {
            floor: 30,
            ceil: 31,
            result: 'Evacuation',
          },
          {
            floor: 32,
            ceil: 33,
            result: 'Expansion',
          },
          {
            floor: 34,
            ceil: 37,
            result: 'Exploration',
          },
          {
            floor: 38,
            ceil: 39,
            result: 'Festival',
          },
          {
            floor: 40,
            ceil: 41,
            result: 'History',
          },
          {
            floor: 42,
            ceil: 43,
            result: 'Hunting',
          },
          {
            floor: 44,
            ceil: 46,
            result: 'Manufacturing',
          },
          {
            floor: 47,
            ceil: 49,
            result: 'Medical',
          },
          {
            floor: 50,
            ceil: 51,
            result: 'Migration',
          },
          {
            floor: 52,
            ceil: 57,
            result: 'Mining',
          },
          {
            floor: 58,
            ceil: 59,
            result: 'Pacifism',
          },
          {
            floor: 60,
            ceil: 62,
            result: 'Raiding',
          },
          {
            floor: 63,
            ceil: 65,
            result: 'Research',
          },
          {
            floor: 66,
            ceil: 69,
            result: 'Salvage',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Secrecy',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Shipbuilding',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Spirituality',
          },
          {
            floor: 79,
            ceil: 84,
            result: 'Subsistence',
          },
          {
            floor: 85,
            ceil: 86,
            result: 'Surveillance',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Terraforming',
          },
          {
            floor: 89,
            ceil: 92,
            result: 'Trade',
          },
          {
            floor: 93,
            ceil: 95,
            result: 'Warfare',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Action + Theme',
          },
        ],
        description:
          'Check the Settlement Projects table when it’s appropriate for your character to know or uncover these details. Projects are the main industry, function, or focus of a settlement. They do not necessarily represent every activity at the site—particularly at a large settlement—but are the most visible or noteworthy aspects.',
      },
      Trouble: {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Battle for leadership',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Betrayal from within',
          },
          {
            floor: 7,
            ceil: 8,
            result: 'Caught in the crossfire',
          },
          {
            floor: 9,
            ceil: 11,
            result: 'Changing environment',
          },
          {
            floor: 12,
            ceil: 13,
            result: 'Clash of cultures',
          },
          {
            floor: 14,
            ceil: 17,
            result: 'Dangerous discovery',
          },
          {
            floor: 18,
            ceil: 21,
            result: 'Depleted supplies',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Deprived of a resource',
          },
          {
            floor: 25,
            ceil: 28,
            result: 'Failing technology',
          },
          {
            floor: 29,
            ceil: 32,
            result: 'Feuding factions',
          },
          {
            floor: 33,
            ceil: 34,
            result: 'Ghostly visitations',
          },
          {
            floor: 35,
            ceil: 38,
            result: 'Hazardous environment',
          },
          {
            floor: 39,
            ceil: 42,
            result: 'Hostile lifeforms',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Impassable route',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Impending attack',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Impending natural disaster',
          },
          {
            floor: 52,
            ceil: 53,
            result: 'Invasive organisms',
          },
          {
            floor: 54,
            ceil: 55,
            result: 'Mounting debt',
          },
          {
            floor: 56,
            ceil: 57,
            result: 'Mysterious deaths',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Overdue delivery',
          },
          {
            floor: 61,
            ceil: 62,
            result: 'Plagued by sickness',
          },
          {
            floor: 63,
            ceil: 65,
            result: 'Preyed upon by raiders',
          },
          {
            floor: 66,
            ceil: 67,
            result: 'Revolt against leadership',
          },
          {
            floor: 68,
            ceil: 69,
            result: 'Sabotaged technology',
          },
          {
            floor: 70,
            ceil: 71,
            result: 'Shunned by others',
          },
          {
            floor: 72,
            ceil: 74,
            result: 'Social strife',
          },
          {
            floor: 75,
            ceil: 76,
            result: 'Someone is ill or injured',
          },
          {
            floor: 77,
            ceil: 78,
            result: 'Someone is missing',
          },
          {
            floor: 79,
            ceil: 80,
            result: 'Stolen technology or object',
          },
          {
            floor: 81,
            ceil: 83,
            result: 'Strange phenomenon',
          },
          {
            floor: 84,
            ceil: 86,
            result: 'Toxic waste or pollution',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Volatile energy source',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Vulnerable lifeforms',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Action + Theme',
          },
        ],
        description:
          'Check the Settlement Trouble table when it’s appropriate for your character to know or uncover these details. The Settlement Trouble table provides a broad description of the site’s most dramatic current issue.',
      },
      Name: {
        table: [
          {
            floor: 1,
            ceil: 1,
            result: 'Aegis',
          },
          {
            floor: 2,
            ceil: 2,
            result: 'Altair',
          },
          {
            floor: 3,
            ceil: 3,
            result: 'Altura',
          },
          {
            floor: 4,
            ceil: 4,
            result: 'Amity',
          },
          {
            floor: 5,
            ceil: 5,
            result: 'Apex',
          },
          {
            floor: 6,
            ceil: 6,
            result: 'Apogee',
          },
          {
            floor: 7,
            ceil: 7,
            result: 'Argosy',
          },
          {
            floor: 8,
            ceil: 8,
            result: 'Astra',
          },
          {
            floor: 9,
            ceil: 9,
            result: 'Aurora',
          },
          {
            floor: 10,
            ceil: 10,
            result: 'Beacon',
          },
          {
            floor: 11,
            ceil: 11,
            result: 'Brink',
          },
          {
            floor: 12,
            ceil: 12,
            result: 'Bulwark',
          },
          {
            floor: 13,
            ceil: 13,
            result: 'Burnell',
          },
          {
            floor: 14,
            ceil: 14,
            result: 'Burrow',
          },
          {
            floor: 15,
            ceil: 15,
            result: 'Concord',
          },
          {
            floor: 16,
            ceil: 16,
            result: 'Crux',
          },
          {
            floor: 17,
            ceil: 17,
            result: 'Deadrock',
          },
          {
            floor: 18,
            ceil: 18,
            result: 'Deception',
          },
          {
            floor: 19,
            ceil: 19,
            result: 'Elysium',
          },
          {
            floor: 20,
            ceil: 20,
            result: 'Enigma',
          },
          {
            floor: 21,
            ceil: 21,
            result: 'Erebus',
          },
          {
            floor: 22,
            ceil: 22,
            result: 'Eris',
          },
          {
            floor: 23,
            ceil: 23,
            result: 'Evenfall',
          },
          {
            floor: 24,
            ceil: 24,
            result: 'Eventide',
          },
          {
            floor: 25,
            ceil: 25,
            result: 'Farpoint',
          },
          {
            floor: 26,
            ceil: 26,
            result: 'Felicity',
          },
          {
            floor: 27,
            ceil: 27,
            result: 'Florin',
          },
          {
            floor: 28,
            ceil: 28,
            result: 'Forlorn',
          },
          {
            floor: 29,
            ceil: 29,
            result: 'Forsaken',
          },
          {
            floor: 30,
            ceil: 30,
            result: 'Freya',
          },
          {
            floor: 31,
            ceil: 31,
            result: 'Glimmer',
          },
          {
            floor: 32,
            ceil: 32,
            result: 'Gloam',
          },
          {
            floor: 33,
            ceil: 33,
            result: 'Hearth',
          },
          {
            floor: 34,
            ceil: 34,
            result: 'Helia',
          },
          {
            floor: 35,
            ceil: 35,
            result: 'Hypatia',
          },
          {
            floor: 36,
            ceil: 36,
            result: 'Hyperion',
          },
          {
            floor: 37,
            ceil: 37,
            result: 'Janus',
          },
          {
            floor: 38,
            ceil: 38,
            result: 'Karma',
          },
          {
            floor: 39,
            ceil: 39,
            result: 'Kepler',
          },
          {
            floor: 40,
            ceil: 40,
            result: 'Koshiba',
          },
          {
            floor: 41,
            ceil: 41,
            result: 'Lagrange',
          },
          {
            floor: 42,
            ceil: 42,
            result: 'Larissa',
          },
          {
            floor: 43,
            ceil: 43,
            result: 'Lasthope',
          },
          {
            floor: 44,
            ceil: 44,
            result: 'Lastport',
          },
          {
            floor: 45,
            ceil: 45,
            result: 'Legacy',
          },
          {
            floor: 46,
            ceil: 46,
            result: 'Lodestar',
          },
          {
            floor: 47,
            ceil: 47,
            result: 'Luminus',
          },
          {
            floor: 48,
            ceil: 48,
            result: 'Lyra',
          },
          {
            floor: 49,
            ceil: 49,
            result: 'Marrow',
          },
          {
            floor: 50,
            ceil: 50,
            result: 'Meridian',
          },
          {
            floor: 51,
            ceil: 51,
            result: 'Moirai',
          },
          {
            floor: 52,
            ceil: 52,
            result: 'Mudd',
          },
          {
            floor: 53,
            ceil: 53,
            result: 'Neoma',
          },
          {
            floor: 54,
            ceil: 54,
            result: 'Nerio',
          },
          {
            floor: 55,
            ceil: 55,
            result: 'Nova',
          },
          {
            floor: 56,
            ceil: 56,
            result: 'Nyx',
          },
          {
            floor: 57,
            ceil: 57,
            result: 'Osseus',
          },
          {
            floor: 58,
            ceil: 58,
            result: 'Paradox',
          },
          {
            floor: 59,
            ceil: 59,
            result: 'Paragon',
          },
          {
            floor: 60,
            ceil: 60,
            result: 'Paxton',
          },
          {
            floor: 61,
            ceil: 61,
            result: 'Perchance',
          },
          {
            floor: 62,
            ceil: 62,
            result: 'Pinnacle',
          },
          {
            floor: 63,
            ceil: 63,
            result: 'Polaris',
          },
          {
            floor: 64,
            ceil: 64,
            result: 'Portent',
          },
          {
            floor: 65,
            ceil: 65,
            result: 'Prism',
          },
          {
            floor: 66,
            ceil: 66,
            result: 'Providence',
          },
          {
            floor: 67,
            ceil: 67,
            result: 'Purgatory',
          },
          {
            floor: 68,
            ceil: 68,
            result: 'Rampart',
          },
          {
            floor: 69,
            ceil: 69,
            result: 'Ramshackle',
          },
          {
            floor: 70,
            ceil: 70,
            result: 'Redemption',
          },
          {
            floor: 71,
            ceil: 71,
            result: 'Redhaven',
          },
          {
            floor: 72,
            ceil: 72,
            result: 'Relic',
          },
          {
            floor: 73,
            ceil: 73,
            result: 'Reprise',
          },
          {
            floor: 74,
            ceil: 74,
            result: 'Reverie',
          },
          {
            floor: 75,
            ceil: 75,
            result: 'Rhiannon',
          },
          {
            floor: 76,
            ceil: 76,
            result: 'Rockhome',
          },
          {
            floor: 77,
            ceil: 77,
            result: 'Rust',
          },
          {
            floor: 78,
            ceil: 78,
            result: 'Sagan',
          },
          {
            floor: 79,
            ceil: 79,
            result: 'Sanctity',
          },
          {
            floor: 80,
            ceil: 80,
            result: 'Selena',
          },
          {
            floor: 81,
            ceil: 81,
            result: 'Sepulcher',
          },
          {
            floor: 82,
            ceil: 82,
            result: 'Sigil',
          },
          {
            floor: 83,
            ceil: 83,
            result: 'Silvana',
          },
          {
            floor: 84,
            ceil: 84,
            result: 'Sirius',
          },
          {
            floor: 85,
            ceil: 85,
            result: 'Sisyphus',
          },
          {
            floor: 86,
            ceil: 86,
            result: 'Solitude',
          },
          {
            floor: 87,
            ceil: 87,
            result: 'Spire',
          },
          {
            floor: 88,
            ceil: 88,
            result: 'Starfall',
          },
          {
            floor: 89,
            ceil: 89,
            result: 'Summit',
          },
          {
            floor: 90,
            ceil: 90,
            result: 'Tranquility',
          },
          {
            floor: 91,
            ceil: 91,
            result: 'Tyson',
          },
          {
            floor: 92,
            ceil: 92,
            result: 'Unity',
          },
          {
            floor: 93,
            ceil: 93,
            result: 'Utopia',
          },
          {
            floor: 94,
            ceil: 94,
            result: 'Vega',
          },
          {
            floor: 95,
            ceil: 95,
            result: 'Vesper',
          },
          {
            floor: 96,
            ceil: 96,
            result: 'Wayward',
          },
          {
            floor: 97,
            ceil: 97,
            result: 'Welkin',
          },
          {
            floor: 98,
            ceil: 98,
            result: 'Wellspring',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'Weyland',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Wreck',
          },
        ],
        description:
          'Choose a name appropriate to the nature of the settlement, or roll for a random result. You can let the name stand alone, or pair it with one of the following tags: Base, Citadel, Depot, Fortress, Hold, Landing, Outpost, Port, Station, Terminal.',
      },
    },
  },
  Space: {
    oracles: {
      Sighting: {
        oracles: {
          Terminus: {
            table: [
              {
                floor: 1,
                ceil: 15,
                result: 'Stellar Object',
              },
              {
                floor: 16,
                ceil: 35,
                result: 'Planet',
              },
              {
                floor: 36,
                ceil: 40,
                result: 'Settlement',
              },
              {
                floor: 41,
                ceil: 47,
                result: 'Starship',
              },
              {
                floor: 48,
                ceil: 51,
                result: 'Derelict',
              },
              {
                floor: 52,
                ceil: 53,
                result: 'Precursor Vault',
              },
              {
                floor: 54,
                ceil: 55,
                result: 'Creature',
              },
              {
                floor: 56,
                ceil: 60,
                result: 'Descriptor + Focus',
              },
              {
                floor: 61,
                ceil: 65,
                result: 'Debris field: Mineral asteroids',
              },
              {
                floor: 66,
                ceil: 68,
                result: 'Debris field: Frozen asteroids',
              },
              {
                floor: 69,
                ceil: 70,
                result: 'Debris field: Crystalline asteroids',
              },
              {
                floor: 71,
                ceil: 72,
                result: 'Debris field: Creature boneyard',
              },
              {
                floor: 73,
                ceil: 74,
                result: 'Debris field: Metallic wreckage',
              },
              {
                floor: 75,
                ceil: 76,
                result: 'Large rogue asteroid',
              },
              {
                floor: 77,
                ceil: 78,
                result: 'Comet with a tail of ionized gas',
              },
              {
                floor: 79,
                ceil: 81,
                result: 'Fiery energy storm',
              },
              {
                floor: 82,
                ceil: 83,
                result: 'Chaotic meteoroid storm',
              },
              {
                floor: 84,
                ceil: 85,
                result: 'Turbulent gravitational wave',
              },
              {
                floor: 86,
                ceil: 93,
                result: 'Dense nebula cloud',
              },
              {
                floor: 94,
                ceil: 98,
                result: 'Roll twice',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll three times',
              },
            ],
          },
          Outlands: {
            table: [
              {
                floor: 1,
                ceil: 15,
                result: 'Stellar Object',
              },
              {
                floor: 16,
                ceil: 35,
                result: 'Planet',
              },
              {
                floor: 36,
                ceil: 38,
                result: 'Settlement',
              },
              {
                floor: 39,
                ceil: 43,
                result: 'Starship',
              },
              {
                floor: 44,
                ceil: 46,
                result: 'Derelict',
              },
              {
                floor: 47,
                ceil: 49,
                result: 'Precursor Vault',
              },
              {
                floor: 50,
                ceil: 52,
                result: 'Creature',
              },
              {
                floor: 53,
                ceil: 58,
                result: 'Descriptor + Focus',
              },
              {
                floor: 59,
                ceil: 63,
                result: 'Debris field: Mineral asteroids',
              },
              {
                floor: 64,
                ceil: 66,
                result: 'Debris field: Frozen asteroids',
              },
              {
                floor: 67,
                ceil: 68,
                result: 'Debris field: Crystalline asteroids',
              },
              {
                floor: 69,
                ceil: 70,
                result: 'Debris field: Creature boneyard',
              },
              {
                floor: 71,
                ceil: 72,
                result: 'Debris field: Metallic wreckage',
              },
              {
                floor: 73,
                ceil: 74,
                result: 'Large rogue asteroid',
              },
              {
                floor: 75,
                ceil: 76,
                result: 'Comet with a tail of ionized gas',
              },
              {
                floor: 77,
                ceil: 80,
                result: 'Fiery energy storm',
              },
              {
                floor: 81,
                ceil: 82,
                result: 'Chaotic meteoroid storm',
              },
              {
                floor: 83,
                ceil: 85,
                result: 'Turbulent gravitational wave',
              },
              {
                floor: 86,
                ceil: 93,
                result: 'Dense nebula cloud',
              },
              {
                floor: 94,
                ceil: 98,
                result: 'Roll twice',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll three times',
              },
            ],
          },
          Expanse: {
            table: [
              {
                floor: 1,
                ceil: 15,
                result: 'Stellar Object',
              },
              {
                floor: 16,
                ceil: 35,
                result: 'Planet',
              },
              {
                floor: 36,
                ceil: 37,
                result: 'Settlement',
              },
              {
                floor: 38,
                ceil: 39,
                result: 'Starship',
              },
              {
                floor: 40,
                ceil: 41,
                result: 'Derelict',
              },
              {
                floor: 42,
                ceil: 45,
                result: 'Precursor Vault',
              },
              {
                floor: 46,
                ceil: 49,
                result: 'Creature',
              },
              {
                floor: 50,
                ceil: 56,
                result: 'Descriptor + Focus',
              },
              {
                floor: 57,
                ceil: 61,
                result: 'Debris field: Mineral asteroids',
              },
              {
                floor: 62,
                ceil: 64,
                result: 'Debris field: Frozen asteroids',
              },
              {
                floor: 65,
                ceil: 66,
                result: 'Debris field: Crystalline asteroids',
              },
              {
                floor: 67,
                ceil: 68,
                result: 'Debris field: Creature boneyard',
              },
              {
                floor: 69,
                ceil: 70,
                result: 'Debris field: Metallic wreckage',
              },
              {
                floor: 71,
                ceil: 72,
                result: 'Large rogue asteroid',
              },
              {
                floor: 73,
                ceil: 74,
                result: 'Comet with a tail of ionized gas',
              },
              {
                floor: 75,
                ceil: 79,
                result: 'Fiery energy storm',
              },
              {
                floor: 80,
                ceil: 81,
                result: 'Chaotic meteoroid storm',
              },
              {
                floor: 82,
                ceil: 85,
                result: 'Turbulent gravitational wave',
              },
              {
                floor: 86,
                ceil: 93,
                result: 'Dense nebula cloud',
              },
              {
                floor: 94,
                ceil: 98,
                result: 'Roll twice',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Roll three times',
              },
            ],
          },
        },
        description:
          'Use the Space Sightings oracle to introduce a location or encounter on a spaceborne expedition. For example, roll on this table when you [Ask the Oracle](Moves#Ask-the-Oracle) to envision the primary feature of a waypoint as you [Undertake an Expedition](Moves#Undertake-an-Expedition). Check your result by referencing the column for your current location: Terminus, Outlands, or Expanse.',
      },
      'Sector Name': {
        oracles: {
          Prefix: {
            table: [
              {
                floor: 1,
                ceil: 2,
                result: 'Accursed',
              },
              {
                floor: 3,
                ceil: 4,
                result: 'Ashen',
              },
              {
                floor: 5,
                ceil: 6,
                result: 'Asteria',
              },
              {
                floor: 7,
                ceil: 8,
                result: 'Bitter',
              },
              {
                floor: 9,
                ceil: 10,
                result: 'Blighted',
              },
              {
                floor: 11,
                ceil: 12,
                result: 'Bloodied',
              },
              {
                floor: 13,
                ceil: 14,
                result: 'Boundless',
              },
              {
                floor: 15,
                ceil: 16,
                result: 'Burning',
              },
              {
                floor: 17,
                ceil: 18,
                result: 'Cortana',
              },
              {
                floor: 19,
                ceil: 20,
                result: 'Corvus',
              },
              {
                floor: 21,
                ceil: 22,
                result: 'Crimson',
              },
              {
                floor: 23,
                ceil: 24,
                result: 'Cygnus',
              },
              {
                floor: 25,
                ceil: 26,
                result: 'Delphi',
              },
              {
                floor: 27,
                ceil: 28,
                result: 'Delphian',
              },
              {
                floor: 29,
                ceil: 30,
                result: "Devil's",
              },
              {
                floor: 31,
                ceil: 32,
                result: 'Ebon',
              },
              {
                floor: 33,
                ceil: 34,
                result: 'Essus',
              },
              {
                floor: 35,
                ceil: 36,
                result: 'Fallen',
              },
              {
                floor: 37,
                ceil: 38,
                result: 'Ferrous',
              },
              {
                floor: 39,
                ceil: 40,
                result: "Fool's",
              },
              {
                floor: 41,
                ceil: 42,
                result: 'Forgotten',
              },
              {
                floor: 43,
                ceil: 44,
                result: 'Haunted',
              },
              {
                floor: 45,
                ceil: 46,
                result: 'Hidden',
              },
              {
                floor: 47,
                ceil: 48,
                result: 'Hollow',
              },
              {
                floor: 49,
                ceil: 50,
                result: 'Igneous',
              },
              {
                floor: 51,
                ceil: 52,
                result: 'Infernal',
              },
              {
                floor: 53,
                ceil: 54,
                result: 'Invidia',
              },
              {
                floor: 55,
                ceil: 56,
                result: 'Iron',
              },
              {
                floor: 57,
                ceil: 58,
                result: 'Kalidas',
              },
              {
                floor: 59,
                ceil: 60,
                result: 'Kronos',
              },
              {
                floor: 61,
                ceil: 62,
                result: 'Lacuna',
              },
              {
                floor: 63,
                ceil: 64,
                result: 'Lumen',
              },
              {
                floor: 65,
                ceil: 66,
                result: 'Mobius',
              },
              {
                floor: 67,
                ceil: 68,
                result: 'Morien',
              },
              {
                floor: 69,
                ceil: 70,
                result: 'Onyx',
              },
              {
                floor: 71,
                ceil: 72,
                result: 'Outer',
              },
              {
                floor: 73,
                ceil: 74,
                result: 'Sanguis',
              },
              {
                floor: 75,
                ceil: 76,
                result: 'Scarred',
              },
              {
                floor: 77,
                ceil: 78,
                result: 'Scorched',
              },
              {
                floor: 79,
                ceil: 80,
                result: 'Shattered',
              },
              {
                floor: 81,
                ceil: 82,
                result: 'Shrouded',
              },
              {
                floor: 83,
                ceil: 84,
                result: 'Sindri',
              },
              {
                floor: 85,
                ceil: 86,
                result: 'Solana',
              },
              {
                floor: 87,
                ceil: 88,
                result: 'Stygian',
              },
              {
                floor: 89,
                ceil: 90,
                result: 'Sulaco',
              },
              {
                floor: 91,
                ceil: 92,
                result: 'Sundered',
              },
              {
                floor: 93,
                ceil: 94,
                result: 'Thunor',
              },
              {
                floor: 95,
                ceil: 96,
                result: 'Vanguard',
              },
              {
                floor: 97,
                ceil: 98,
                result: 'Veiled',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Wasted',
              },
            ],
            description:
              'To give a sector or region of space a random name, roll once for the first word and once for the second word. Or just roll once choose a suitable pairing from anywhere in that row.',
          },
          Suffix: {
            table: [
              {
                floor: 1,
                ceil: 2,
                result: 'Abyss',
              },
              {
                floor: 3,
                ceil: 4,
                result: 'Anvil',
              },
              {
                floor: 5,
                ceil: 6,
                result: 'Arch',
              },
              {
                floor: 7,
                ceil: 8,
                result: 'Breach',
              },
              {
                floor: 9,
                ceil: 10,
                result: 'Chain',
              },
              {
                floor: 11,
                ceil: 12,
                result: 'Channel',
              },
              {
                floor: 13,
                ceil: 14,
                result: 'Chasm',
              },
              {
                floor: 15,
                ceil: 16,
                result: 'Circlet',
              },
              {
                floor: 17,
                ceil: 18,
                result: 'Cluster',
              },
              {
                floor: 19,
                ceil: 20,
                result: 'Crossing',
              },
              {
                floor: 21,
                ceil: 22,
                result: 'Crown',
              },
              {
                floor: 23,
                ceil: 24,
                result: 'Currents',
              },
              {
                floor: 25,
                ceil: 26,
                result: 'Deep',
              },
              {
                floor: 27,
                ceil: 28,
                result: 'Desolation',
              },
              {
                floor: 29,
                ceil: 30,
                result: 'Drift',
              },
              {
                floor: 31,
                ceil: 32,
                result: 'Flow',
              },
              {
                floor: 33,
                ceil: 34,
                result: 'Flux',
              },
              {
                floor: 35,
                ceil: 36,
                result: 'Gap',
              },
              {
                floor: 37,
                ceil: 38,
                result: 'Gate',
              },
              {
                floor: 39,
                ceil: 40,
                result: 'Gyre',
              },
              {
                floor: 41,
                ceil: 42,
                result: 'Heart',
              },
              {
                floor: 43,
                ceil: 44,
                result: 'Helix',
              },
              {
                floor: 45,
                ceil: 46,
                result: 'Juncture',
              },
              {
                floor: 47,
                ceil: 48,
                result: 'Limits',
              },
              {
                floor: 49,
                ceil: 50,
                result: 'Locus',
              },
              {
                floor: 51,
                ceil: 52,
                result: 'Maelstrom',
              },
              {
                floor: 53,
                ceil: 54,
                result: 'Margin',
              },
              {
                floor: 55,
                ceil: 56,
                result: 'Maw',
              },
              {
                floor: 57,
                ceil: 58,
                result: 'Maze',
              },
              {
                floor: 59,
                ceil: 60,
                result: 'Nexus',
              },
              {
                floor: 61,
                ceil: 62,
                result: 'Oasis',
              },
              {
                floor: 63,
                ceil: 64,
                result: 'Pass',
              },
              {
                floor: 65,
                ceil: 66,
                result: 'Pit',
              },
              {
                floor: 67,
                ceil: 68,
                result: 'Pyre',
              },
              {
                floor: 69,
                ceil: 70,
                result: 'Reach',
              },
              {
                floor: 71,
                ceil: 72,
                result: 'Rest',
              },
              {
                floor: 73,
                ceil: 74,
                result: 'Rift',
              },
              {
                floor: 75,
                ceil: 76,
                result: 'Sanctum',
              },
              {
                floor: 77,
                ceil: 78,
                result: 'Shallows',
              },
              {
                floor: 79,
                ceil: 80,
                result: 'Shoal',
              },
              {
                floor: 81,
                ceil: 82,
                result: 'Spine',
              },
              {
                floor: 83,
                ceil: 84,
                result: 'Straits',
              },
              {
                floor: 85,
                ceil: 86,
                result: 'Threshold',
              },
              {
                floor: 87,
                ceil: 88,
                result: 'Tide',
              },
              {
                floor: 89,
                ceil: 90,
                result: 'Verge',
              },
              {
                floor: 91,
                ceil: 92,
                result: 'Vertex',
              },
              {
                floor: 93,
                ceil: 94,
                result: 'Vigil',
              },
              {
                floor: 95,
                ceil: 96,
                result: 'Void',
              },
              {
                floor: 97,
                ceil: 98,
                result: 'Web',
              },
              {
                floor: 99,
                ceil: 100,
                result: 'Zenith',
              },
            ],
            description:
              'To give a sector or region of space a random name, roll once for the first word and once for the second word. Or just roll once choose a suitable pairing from anywhere in that row.',
          },
        },
      },
      'Stellar Object': {
        table: [
          {
            floor: 1,
            ceil: 15,
            result: 'Smoldering red star',
          },
          {
            floor: 16,
            ceil: 30,
            result: 'Glowing orange star',
          },
          {
            floor: 31,
            ceil: 45,
            result: 'Burning yellow star',
          },
          {
            floor: 46,
            ceil: 50,
            result: 'Blazing blue star',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Young star incubating in a molecular cloud',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'White dwarf shining with spectral light',
          },
          {
            floor: 71,
            ceil: 75,
            result: 'Corrupted star radiating with unnatural light',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Neutron star surrounded by intense magnetic fields',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Two stars in close orbit connected by fiery tendrils of energy',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Black hole allows nothing to escape—not even light',
          },
          {
            floor: 91,
            ceil: 98,
            result: 'Hypergiant star generating turbulent solar winds',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'Artificial star constructed by a long-dead civilization',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Unstable star showing signs of impending supernova',
          },
        ],
        description:
          'Use the Stellar Object oracle to learn more about the primary star at a location. This is mostly to help you visualize your surroundings, but the strange or hazardous nature of some rare stars can incite new adventures.',
      },
      Peril: {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Artificial gravity generator malfunctions',
          },
          {
            floor: 4,
            ceil: 6,
            result: 'Automated defenses or mines protect this area',
          },
          {
            floor: 7,
            ceil: 9,
            result: 'Compartment catches fire or is breached',
          },
          {
            floor: 10,
            ceil: 12,
            result: 'Contagion or illness threatens to take hold',
          },
          {
            floor: 13,
            ceil: 15,
            result: 'Dust clouds imperil navigation or conceal foes',
          },
          {
            floor: 16,
            ceil: 18,
            result: 'Energy storm looms',
          },
          {
            floor: 19,
            ceil: 21,
            result: 'Familiar foe appears or sends an ominous message',
          },
          {
            floor: 22,
            ceil: 24,
            result: 'Gravity well or vortex takes hold',
          },
          {
            floor: 25,
            ceil: 27,
            result: 'Imperiled ship calls for help',
          },
          {
            floor: 28,
            ceil: 30,
            result: 'Important device fails or malfunctions',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Infestation is revealed',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Intruder or stowaway creates trouble',
          },
          {
            floor: 37,
            ceil: 39,
            result: 'Isolation or fear presses in',
          },
          {
            floor: 40,
            ceil: 42,
            result: 'Life support system malfunctions',
          },
          {
            floor: 43,
            ceil: 45,
            result: 'Meteoroid storm fills the sky',
          },
          {
            floor: 46,
            ceil: 48,
            result: 'Mysterious wreckage portends a new threat',
          },
          {
            floor: 49,
            ceil: 51,
            result: 'Nearby settlement calls for help',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Old repair or patch fails',
          },
          {
            floor: 55,
            ceil: 57,
            result: 'Onboard dispute or inner turmoil causes a disruption',
          },
          {
            floor: 58,
            ceil: 60,
            result: 'Others obstruct your path or form a blockade',
          },
          {
            floor: 61,
            ceil: 63,
            result: 'Phantom signals suggest a lurking foe',
          },
          {
            floor: 64,
            ceil: 66,
            result: 'Pirates hunt for prey',
          },
          {
            floor: 67,
            ceil: 69,
            result: 'Power fails',
          },
          {
            floor: 70,
            ceil: 72,
            result: 'Primary drive or generator malfunctions',
          },
          {
            floor: 73,
            ceil: 75,
            result: 'Sabotage is revealed',
          },
          {
            floor: 76,
            ceil: 78,
            result: 'Shockwave or gravity wave approaches',
          },
          {
            floor: 79,
            ceil: 81,
            result: 'Someone questions your presence here',
          },
          {
            floor: 82,
            ceil: 84,
            result: 'Stellar anomaly emits hazardous energies',
          },
          {
            floor: 85,
            ceil: 87,
            result: 'Threatening lifeform draws near',
          },
          {
            floor: 88,
            ceil: 90,
            result: 'Troubling visions or apparitions',
          },
          {
            floor: 91,
            ceil: 93,
            result: 'True nature of a cargo, occupant, or passenger is revealed',
          },
          {
            floor: 94,
            ceil: 96,
            result: 'Unsettling sounds or disturbances',
          },
          {
            floor: 97,
            ceil: 99,
            result: 'Action + Theme',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
        description:
          'Choose or roll on this table when you want inspiration for a trouble during spaceborne exploration or on an interstellar expedition.',
      },
      Opportunity: {
        table: [
          {
            floor: 1,
            ceil: 4,
            result: 'Advance warning of an environmental threat',
          },
          {
            floor: 5,
            ceil: 8,
            result: 'Automated signal offers a helpful message or warning',
          },
          {
            floor: 9,
            ceil: 12,
            result: 'Cache of cargo or supplies',
          },
          {
            floor: 13,
            ceil: 16,
            result: 'Chance for fellowship or a moment of inner peace',
          },
          {
            floor: 17,
            ceil: 20,
            result: 'Clear path through otherwise perilous space',
          },
          {
            floor: 21,
            ceil: 24,
            result: 'Clue offers insight into a current quest or mystery',
          },
          {
            floor: 25,
            ceil: 28,
            result: "Clue to a lifeform's nature or vulnerabilities",
          },
          {
            floor: 29,
            ceil: 32,
            result: 'Derelict ripe for the picking',
          },
          {
            floor: 33,
            ceil: 36,
            result: 'Foe inadvertently reveals themselves or tips their hand',
          },
          {
            floor: 37,
            ceil: 40,
            result: 'Friendly interaction with a benign lifeform',
          },
          {
            floor: 41,
            ceil: 44,
            result: 'Friendly settlement in range',
          },
          {
            floor: 45,
            ceil: 48,
            result: 'Friendly spacers at work here',
          },
          {
            floor: 49,
            ceil: 52,
            result: 'Friendly starship crosses your path',
          },
          {
            floor: 53,
            ceil: 56,
            result: 'Helpful or encouraging message from an acquaintance',
          },
          {
            floor: 57,
            ceil: 60,
            result: 'Impressive vista offers comfort or inspiration',
          },
          {
            floor: 61,
            ceil: 64,
            result: 'Interesting site offers opportunities for exploration',
          },
          {
            floor: 65,
            ceil: 68,
            result: 'Mineral or energy resource detected',
          },
          {
            floor: 69,
            ceil: 72,
            result: 'Navigational or environmental hazard is left behind',
          },
          {
            floor: 73,
            ceil: 76,
            result: 'Opening to escape or avoid foes',
          },
          {
            floor: 77,
            ceil: 80,
            result: 'Plea for help from a potential benefactor',
          },
          {
            floor: 81,
            ceil: 84,
            result: 'Probe or beacon with useful data',
          },
          {
            floor: 85,
            ceil: 88,
            result: 'Refuge offers a place to hide, plan, or recover',
          },
          {
            floor: 89,
            ceil: 92,
            result: 'Sensors pinpoint a lurking foe',
          },
          {
            floor: 93,
            ceil: 96,
            result: 'Sensors reveal helpful or interesting environmental data',
          },
          {
            floor: 97,
            ceil: 100,
            result: 'Vehicle or equipment performs beyond expectations',
          },
        ],
        description:
          'Choose or roll on this table when you want inspiration for a beneficial encounter or event on a spaceborne journey, such as when you roll a strong hit with a match as you [Undertake an Expedition](Moves#Undertake-an-Expedition), or if you [Explore a Waypoint](Moves#Explore-a-Waypoint) and find an opportunity.',
      },
    },
  },
  Starships: {
    oracles: {
      Type: {
        table: [
          {
            floor: 1,
            ceil: 2,
            result: 'Carrier',
          },
          {
            floor: 3,
            ceil: 6,
            result: 'Corvette',
          },
          {
            floor: 7,
            ceil: 11,
            result: 'Courier',
          },
          {
            floor: 12,
            ceil: 14,
            result: 'Cruiser',
          },
          {
            floor: 15,
            ceil: 16,
            result: 'Dreadnought',
          },
          {
            floor: 17,
            ceil: 19,
            result: 'Escape pod',
          },
          {
            floor: 20,
            ceil: 22,
            result: 'Foundry',
          },
          {
            floor: 23,
            ceil: 27,
            result: 'Harvester',
          },
          {
            floor: 28,
            ceil: 33,
            result: 'Hauler',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Hunter',
          },
          {
            floor: 37,
            ceil: 38,
            result: 'Ironhome',
          },
          {
            floor: 39,
            ceil: 42,
            result: 'Mender',
          },
          {
            floor: 43,
            ceil: 47,
            result: 'Outbounder',
          },
          {
            floor: 48,
            ceil: 50,
            result: 'Pennant',
          },
          {
            floor: 51,
            ceil: 56,
            result: 'Prospector',
          },
          {
            floor: 57,
            ceil: 61,
            result: 'Reclaimer',
          },
          {
            floor: 62,
            ceil: 64,
            result: 'Shuttle',
          },
          {
            floor: 65,
            ceil: 67,
            result: 'Snub fighter',
          },
          {
            floor: 68,
            ceil: 82,
            result: 'Multipurpose',
          },
          {
            floor: 83,
            ceil: 84,
            result: 'Unusual or unknown',
          },
          {
            floor: 85,
            ceil: 94,
            result: 'Fleet',
          },
          {
            floor: 95,
            ceil: 100,
            result: 'Ships in conflict (roll twice)',
          },
        ],
      },
      Fleet: {
        table: [
          {
            floor: 1,
            ceil: 10,
            result: 'Battle fleet',
          },
          {
            floor: 11,
            ceil: 25,
            result: 'Pirate wing',
          },
          {
            floor: 26,
            ceil: 35,
            result: 'Raider horde',
          },
          {
            floor: 36,
            ceil: 50,
            result: 'Salvager hive',
          },
          {
            floor: 51,
            ceil: 60,
            result: 'Settler caravan',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'Trade caravan',
          },
          {
            floor: 71,
            ceil: 90,
            result: 'Transport and escorts',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Starship Mission',
          },
        ],
      },
      'Initial Contact': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Familiar',
          },
          {
            floor: 4,
            ceil: 15,
            result: 'Friendly',
          },
          {
            floor: 16,
            ceil: 25,
            result: 'Neutral / automated',
          },
          {
            floor: 26,
            ceil: 35,
            result: 'Wary',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Dismissive',
          },
          {
            floor: 41,
            ceil: 50,
            result: 'Uncooperative',
          },
          {
            floor: 51,
            ceil: 65,
            result: 'Hostile',
          },
          {
            floor: 66,
            ceil: 80,
            result: 'Asking for help',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'In battle',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Unresponsive',
          },
          {
            floor: 91,
            ceil: 95,
            result: 'Destroyed',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Derelict',
          },
        ],
      },
      'First Look': {
        table: [
          {
            floor: 1,
            ceil: 4,
            result: 'Abnormal sensor readings',
          },
          {
            floor: 5,
            ceil: 8,
            result: 'Brightly painted',
          },
          {
            floor: 9,
            ceil: 13,
            result: 'Bristling with weapons',
          },
          {
            floor: 14,
            ceil: 18,
            result: 'Dark or stealthy',
          },
          {
            floor: 19,
            ceil: 23,
            result: 'Heavy armor',
          },
          {
            floor: 24,
            ceil: 28,
            result: 'Immobile',
          },
          {
            floor: 29,
            ceil: 33,
            result: 'Intimidating profile',
          },
          {
            floor: 34,
            ceil: 37,
            result: 'Large sensor arrays',
          },
          {
            floor: 38,
            ceil: 41,
            result: 'Leaking radiation',
          },
          {
            floor: 42,
            ceil: 45,
            result: 'Low-profile or disguised',
          },
          {
            floor: 46,
            ceil: 49,
            result: 'Modern or advanced design',
          },
          {
            floor: 50,
            ceil: 54,
            result: 'Obsolete design',
          },
          {
            floor: 55,
            ceil: 59,
            result: 'Obvious damage',
          },
          {
            floor: 60,
            ceil: 63,
            result: 'Biological components',
          },
          {
            floor: 64,
            ceil: 67,
            result: 'Ornate markings',
          },
          {
            floor: 68,
            ceil: 71,
            result: 'Oversized engines',
          },
          {
            floor: 72,
            ceil: 75,
            result: 'Prominent guild emblem',
          },
          {
            floor: 76,
            ceil: 80,
            result: 'Refitted or repurposed hull',
          },
          {
            floor: 81,
            ceil: 85,
            result: 'Scarred hull',
          },
          {
            floor: 86,
            ceil: 90,
            result: 'Built from scrap',
          },
          {
            floor: 91,
            ceil: 94,
            result: 'Towing or linked',
          },
          {
            floor: 95,
            ceil: 100,
            result: 'Descriptor + Focus',
          },
        ],
      },
      Mission: {
        oracles: {
          Terminus: {
            table: [
              {
                floor: 1,
                ceil: 3,
                result: 'Blockade a location',
              },
              {
                floor: 4,
                ceil: 6,
                result: 'Break a blockade',
              },
              {
                floor: 7,
                ceil: 9,
                result: 'Collect a resource',
              },
              {
                floor: 10,
                ceil: 11,
                result: 'Command others',
              },
              {
                floor: 12,
                ceil: 14,
                result: 'Conduct diplomacy',
              },
              {
                floor: 15,
                ceil: 17,
                result: 'Conduct espionage',
              },
              {
                floor: 18,
                ceil: 20,
                result: 'Conduct piracy',
              },
              {
                floor: 21,
                ceil: 23,
                result: 'Conduct research',
              },
              {
                floor: 24,
                ceil: 26,
                result: 'Defend against an attack',
              },
              {
                floor: 27,
                ceil: 29,
                result: 'Deliver messages or data',
              },
              {
                floor: 30,
                ceil: 32,
                result: 'Establish a settlement',
              },
              {
                floor: 33,
                ceil: 35,
                result: 'Evacuate a location',
              },
              {
                floor: 36,
                ceil: 37,
                result: 'Explore a region',
              },
              {
                floor: 38,
                ceil: 39,
                result: 'Hold prisoners',
              },
              {
                floor: 40,
                ceil: 42,
                result: 'Hunt down another ship',
              },
              {
                floor: 43,
                ceil: 45,
                result: 'Launch an attack',
              },
              {
                floor: 46,
                ceil: 48,
                result: 'Patrol an area',
              },
              {
                floor: 49,
                ceil: 51,
                result: 'Provide medical aid',
              },
              {
                floor: 52,
                ceil: 54,
                result: 'Provide repairs',
              },
              {
                floor: 55,
                ceil: 57,
                result: 'Provide shelter',
              },
              {
                floor: 58,
                ceil: 59,
                result: 'Quarantine a danger',
              },
              {
                floor: 60,
                ceil: 62,
                result: 'Raid a settlement',
              },
              {
                floor: 63,
                ceil: 65,
                result: 'Resupply a settlement',
              },
              {
                floor: 66,
                ceil: 68,
                result: 'Retrieve salvage',
              },
              {
                floor: 69,
                ceil: 71,
                result: 'Search and rescue',
              },
              {
                floor: 72,
                ceil: 74,
                result: 'Smuggle cargo',
              },
              {
                floor: 75,
                ceil: 77,
                result: 'Survey a site',
              },
              {
                floor: 78,
                ceil: 79,
                result: 'Test a technology',
              },
              {
                floor: 80,
                ceil: 82,
                result: 'Transport cargo',
              },
              {
                floor: 83,
                ceil: 85,
                result: 'Transport passengers',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Action + Theme',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Outlands: {
            table: [
              {
                floor: 1,
                ceil: 2,
                result: 'Blockade a location',
              },
              {
                floor: 3,
                ceil: 4,
                result: 'Break a blockade',
              },
              {
                floor: 5,
                ceil: 7,
                result: 'Collect a resource',
              },
              {
                floor: 8,
                ceil: 9,
                result: 'Command others',
              },
              {
                floor: 10,
                ceil: 11,
                result: 'Conduct diplomacy',
              },
              {
                floor: 12,
                ceil: 13,
                result: 'Conduct espionage',
              },
              {
                floor: 14,
                ceil: 16,
                result: 'Conduct piracy',
              },
              {
                floor: 17,
                ceil: 20,
                result: 'Conduct research',
              },
              {
                floor: 21,
                ceil: 24,
                result: 'Defend against an attack',
              },
              {
                floor: 25,
                ceil: 28,
                result: 'Deliver messages or data',
              },
              {
                floor: 29,
                ceil: 32,
                result: 'Establish a settlement',
              },
              {
                floor: 33,
                ceil: 36,
                result: 'Evacuate a location',
              },
              {
                floor: 37,
                ceil: 40,
                result: 'Explore a region',
              },
              {
                floor: 41,
                ceil: 42,
                result: 'Hold prisoners',
              },
              {
                floor: 43,
                ceil: 45,
                result: 'Hunt down another ship',
              },
              {
                floor: 46,
                ceil: 48,
                result: 'Launch an attack',
              },
              {
                floor: 49,
                ceil: 50,
                result: 'Patrol an area',
              },
              {
                floor: 51,
                ceil: 53,
                result: 'Provide medical aid',
              },
              {
                floor: 54,
                ceil: 56,
                result: 'Provide repairs',
              },
              {
                floor: 57,
                ceil: 59,
                result: 'Provide shelter',
              },
              {
                floor: 60,
                ceil: 61,
                result: 'Quarantine a danger',
              },
              {
                floor: 62,
                ceil: 64,
                result: 'Raid a settlement',
              },
              {
                floor: 65,
                ceil: 68,
                result: 'Resupply a settlement',
              },
              {
                floor: 69,
                ceil: 71,
                result: 'Retrieve salvage',
              },
              {
                floor: 72,
                ceil: 73,
                result: 'Search and rescue',
              },
              {
                floor: 74,
                ceil: 75,
                result: 'Smuggle cargo',
              },
              {
                floor: 76,
                ceil: 78,
                result: 'Survey a site',
              },
              {
                floor: 79,
                ceil: 80,
                result: 'Test a technology',
              },
              {
                floor: 81,
                ceil: 83,
                result: 'Transport cargo',
              },
              {
                floor: 84,
                ceil: 85,
                result: 'Transport passengers',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Action + Theme',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Expanse: {
            table: [
              {
                floor: 1,
                ceil: 2,
                result: 'Blockade a location',
              },
              {
                floor: 3,
                ceil: 4,
                result: 'Break a blockade',
              },
              {
                floor: 5,
                ceil: 8,
                result: 'Collect a resource',
              },
              {
                floor: 9,
                ceil: 10,
                result: 'Command others',
              },
              {
                floor: 11,
                ceil: 12,
                result: 'Conduct diplomacy',
              },
              {
                floor: 13,
                ceil: 14,
                result: 'Conduct espionage',
              },
              {
                floor: 15,
                ceil: 16,
                result: 'Conduct piracy',
              },
              {
                floor: 17,
                ceil: 22,
                result: 'Conduct research',
              },
              {
                floor: 23,
                ceil: 25,
                result: 'Defend against an attack',
              },
              {
                floor: 26,
                ceil: 29,
                result: 'Deliver messages or data',
              },
              {
                floor: 30,
                ceil: 35,
                result: 'Establish a settlement',
              },
              {
                floor: 36,
                ceil: 39,
                result: 'Evacuate a location',
              },
              {
                floor: 40,
                ceil: 45,
                result: 'Explore a region',
              },
              {
                floor: 46,
                ceil: 47,
                result: 'Hold prisoners',
              },
              {
                floor: 48,
                ceil: 49,
                result: 'Hunt down another ship',
              },
              {
                floor: 50,
                ceil: 51,
                result: 'Launch an attack',
              },
              {
                floor: 52,
                ceil: 53,
                result: 'Patrol an area',
              },
              {
                floor: 54,
                ceil: 55,
                result: 'Provide medical aid',
              },
              {
                floor: 56,
                ceil: 57,
                result: 'Provide repairs',
              },
              {
                floor: 58,
                ceil: 61,
                result: 'Provide shelter',
              },
              {
                floor: 62,
                ceil: 63,
                result: 'Quarantine a danger',
              },
              {
                floor: 64,
                ceil: 65,
                result: 'Raid a settlement',
              },
              {
                floor: 66,
                ceil: 69,
                result: 'Resupply a settlement',
              },
              {
                floor: 70,
                ceil: 71,
                result: 'Retrieve salvage',
              },
              {
                floor: 72,
                ceil: 73,
                result: 'Search and rescue',
              },
              {
                floor: 74,
                ceil: 75,
                result: 'Smuggle cargo',
              },
              {
                floor: 76,
                ceil: 77,
                result: 'Survey a site',
              },
              {
                floor: 78,
                ceil: 79,
                result: 'Test a technology',
              },
              {
                floor: 80,
                ceil: 83,
                result: 'Transport cargo',
              },
              {
                floor: 84,
                ceil: 85,
                result: 'Transport passengers',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Action + Theme',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
        },
        description:
          'Use the Starship Mission table when prompted by another oracle, or to flesh out the nature of a ship or fleet which has a flexible or uncertain role. You can also roll to generate the focus of a spaceborne quest.',
      },
      Name: {
        table: [
          {
            floor: 1,
            ceil: 1,
            result: 'Arclight',
          },
          {
            floor: 2,
            ceil: 2,
            result: 'Argent Arrow',
          },
          {
            floor: 3,
            ceil: 3,
            result: 'Artemis',
          },
          {
            floor: 4,
            ceil: 4,
            result: 'Astral Explorer',
          },
          {
            floor: 5,
            ceil: 5,
            result: 'Atlas',
          },
          {
            floor: 6,
            ceil: 6,
            result: 'Aurora',
          },
          {
            floor: 7,
            ceil: 7,
            result: 'Avari’s Wake',
          },
          {
            floor: 8,
            ceil: 8,
            result: 'Banshee’s Cry',
          },
          {
            floor: 9,
            ceil: 9,
            result: 'Beowulf',
          },
          {
            floor: 10,
            ceil: 10,
            result: 'Bloody Jaw',
          },
          {
            floor: 11,
            ceil: 11,
            result: 'Broken Sword',
          },
          {
            floor: 12,
            ceil: 12,
            result: 'Buccaneer',
          },
          {
            floor: 13,
            ceil: 13,
            result: 'Cerelis Nine',
          },
          {
            floor: 14,
            ceil: 14,
            result: 'Clarion Call',
          },
          {
            floor: 15,
            ceil: 15,
            result: 'Dawn’s Herald',
          },
          {
            floor: 16,
            ceil: 16,
            result: 'Dead Reckoning',
          },
          {
            floor: 17,
            ceil: 17,
            result: 'Drift Runner',
          },
          {
            floor: 18,
            ceil: 18,
            result: 'Eclipse',
          },
          {
            floor: 19,
            ceil: 19,
            result: 'Elara Five',
          },
          {
            floor: 20,
            ceil: 20,
            result: 'Enchantress',
          },
          {
            floor: 21,
            ceil: 21,
            result: 'Endurance',
          },
          {
            floor: 22,
            ceil: 22,
            result: 'Excalibur',
          },
          {
            floor: 23,
            ceil: 23,
            result: 'Eye of the Void',
          },
          {
            floor: 24,
            ceil: 24,
            result: 'Fall of Icarus',
          },
          {
            floor: 25,
            ceil: 25,
            result: 'Fallen Light',
          },
          {
            floor: 26,
            ceil: 26,
            result: 'False Hope',
          },
          {
            floor: 27,
            ceil: 27,
            result: 'Firebreak',
          },
          {
            floor: 28,
            ceil: 28,
            result: 'First Light',
          },
          {
            floor: 29,
            ceil: 29,
            result: 'Forge Flier',
          },
          {
            floor: 30,
            ceil: 30,
            result: 'Fortune’s Favor',
          },
          {
            floor: 31,
            ceil: 31,
            result: 'Freya’s Wrath',
          },
          {
            floor: 32,
            ceil: 32,
            result: 'Ghost',
          },
          {
            floor: 33,
            ceil: 33,
            result: 'Guiding Star',
          },
          {
            floor: 34,
            ceil: 34,
            result: 'Hand of Fate',
          },
          {
            floor: 35,
            ceil: 35,
            result: 'Herald of Doom',
          },
          {
            floor: 36,
            ceil: 36,
            result: 'Implacable',
          },
          {
            floor: 37,
            ceil: 37,
            result: 'Implicit',
          },
          {
            floor: 38,
            ceil: 38,
            result: 'Inferno',
          },
          {
            floor: 39,
            ceil: 39,
            result: 'Invictus',
          },
          {
            floor: 40,
            ceil: 40,
            result: 'Iron Cairn',
          },
          {
            floor: 41,
            ceil: 41,
            result: 'Karena’s Reverie',
          },
          {
            floor: 42,
            ceil: 42,
            result: 'Kraken',
          },
          {
            floor: 43,
            ceil: 43,
            result: 'Kuno’s Hammer',
          },
          {
            floor: 44,
            ceil: 44,
            result: 'Lightline',
          },
          {
            floor: 45,
            ceil: 45,
            result: 'Lodestar',
          },
          {
            floor: 46,
            ceil: 46,
            result: 'Long Haul',
          },
          {
            floor: 47,
            ceil: 47,
            result: 'Lost Fortune',
          },
          {
            floor: 48,
            ceil: 48,
            result: 'Luminous Sorrow',
          },
          {
            floor: 49,
            ceil: 49,
            result: 'Manta',
          },
          {
            floor: 50,
            ceil: 50,
            result: 'Mercy',
          },
          {
            floor: 51,
            ceil: 51,
            result: 'Mutara',
          },
          {
            floor: 52,
            ceil: 52,
            result: 'Nebula Prowler',
          },
          {
            floor: 53,
            ceil: 53,
            result: 'Newton’s Folly',
          },
          {
            floor: 54,
            ceil: 54,
            result: 'Nightfall',
          },
          {
            floor: 55,
            ceil: 55,
            result: 'Nomad',
          },
          {
            floor: 56,
            ceil: 56,
            result: 'Obsidian Trident',
          },
          {
            floor: 57,
            ceil: 57,
            result: 'Onslaught',
          },
          {
            floor: 58,
            ceil: 58,
            result: 'Orca',
          },
          {
            floor: 59,
            ceil: 59,
            result: 'Outward Bound',
          },
          {
            floor: 60,
            ceil: 60,
            result: 'Phantom',
          },
          {
            floor: 61,
            ceil: 61,
            result: 'Photon',
          },
          {
            floor: 62,
            ceil: 62,
            result: 'Poltergeist',
          },
          {
            floor: 63,
            ceil: 63,
            result: 'Profit Margin',
          },
          {
            floor: 64,
            ceil: 64,
            result: 'Raven’s Call',
          },
          {
            floor: 65,
            ceil: 65,
            result: 'Raya’s Promise',
          },
          {
            floor: 66,
            ceil: 66,
            result: 'Reaper',
          },
          {
            floor: 67,
            ceil: 67,
            result: 'Reforged Hope',
          },
          {
            floor: 68,
            ceil: 68,
            result: 'Relentless',
          },
          {
            floor: 69,
            ceil: 69,
            result: 'Royal Signet',
          },
          {
            floor: 70,
            ceil: 70,
            result: 'Rubicon',
          },
          {
            floor: 71,
            ceil: 71,
            result: 'Sareea’s Tribute',
          },
          {
            floor: 72,
            ceil: 72,
            result: 'Second Chance',
          },
          {
            floor: 73,
            ceil: 73,
            result: 'Shard of the Sun',
          },
          {
            floor: 74,
            ceil: 74,
            result: 'Shattered Siege',
          },
          {
            floor: 75,
            ceil: 75,
            result: 'Shattered Star',
          },
          {
            floor: 76,
            ceil: 76,
            result: 'Silver Talon',
          },
          {
            floor: 77,
            ceil: 77,
            result: 'Smoldering Flame',
          },
          {
            floor: 78,
            ceil: 78,
            result: 'Sovereign Skies',
          },
          {
            floor: 79,
            ceil: 79,
            result: 'Sparrowhawk',
          },
          {
            floor: 80,
            ceil: 80,
            result: 'Stardust',
          },
          {
            floor: 81,
            ceil: 81,
            result: 'Starfall',
          },
          {
            floor: 82,
            ceil: 82,
            result: 'Stellar Hawk',
          },
          {
            floor: 83,
            ceil: 83,
            result: 'Stormswept',
          },
          {
            floor: 84,
            ceil: 84,
            result: 'Sundered Aegis',
          },
          {
            floor: 85,
            ceil: 85,
            result: 'Sundown',
          },
          {
            floor: 86,
            ceil: 86,
            result: 'Sureshot',
          },
          {
            floor: 87,
            ceil: 87,
            result: 'Terminus Clipper',
          },
          {
            floor: 88,
            ceil: 88,
            result: 'Terrapin',
          },
          {
            floor: 89,
            ceil: 89,
            result: 'Timber Wolf',
          },
          {
            floor: 90,
            ceil: 90,
            result: 'Tip of the Spear',
          },
          {
            floor: 91,
            ceil: 91,
            result: 'Titan',
          },
          {
            floor: 92,
            ceil: 92,
            result: 'Tormentor',
          },
          {
            floor: 93,
            ceil: 93,
            result: 'Trithia Six',
          },
          {
            floor: 94,
            ceil: 94,
            result: 'Ultraviolet',
          },
          {
            floor: 95,
            ceil: 95,
            result: 'Valora’s Comet',
          },
          {
            floor: 96,
            ceil: 96,
            result: 'Vengeance',
          },
          {
            floor: 97,
            ceil: 97,
            result: 'Venture',
          },
          {
            floor: 98,
            ceil: 98,
            result: 'Vigilant',
          },
          {
            floor: 99,
            ceil: 99,
            result: 'Voidtreader',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'Vulture',
          },
        ],
        description:
          'Give a starship a name when it has an important role in your story. Scan this table and select a name which fits what you know of the ship’s appearance and role. Or generate a random result and let any contradictions contribute to the ship’s history or nature.',
      },
    },
  },
  Vaults: {
    oracles: {
      Location: {
        table: [
          {
            floor: 1,
            ceil: 50,
            result: 'Planetside',
          },
          {
            floor: 51,
            ceil: 75,
            result: 'Orbital',
          },
          {
            floor: 76,
            ceil: 100,
            result: 'Deep Space',
          },
        ],
      },
      Scale: {
        table: [
          {
            floor: 1,
            ceil: 30,
            result: 'Minor, confined site',
          },
          {
            floor: 31,
            ceil: 65,
            result: 'Typical site of limited scope',
          },
          {
            floor: 66,
            ceil: 90,
            result: 'Large, elaborate site',
          },
          {
            floor: 91,
            ceil: 99,
            result: 'Vast site of unfathomable complexity',
          },
          {
            floor: 100,
            ceil: 100,
            result: 'World-spanning site or megastructure',
          },
        ],
      },
      Form: {
        table: [
          {
            floor: 1,
            ceil: 35,
            result: 'Structure',
          },
          {
            floor: 36,
            ceil: 60,
            result: 'Vessel',
          },
          {
            floor: 61,
            ceil: 80,
            result: 'Monument',
          },
          {
            floor: 81,
            ceil: 95,
            result: 'Machine',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Incomprehensible',
          },
        ],
      },
      Shape: {
        table: [
          {
            floor: 1,
            ceil: 15,
            result: 'Practical or functional',
          },
          {
            floor: 16,
            ceil: 20,
            result: 'Geometric (complex shape)',
          },
          {
            floor: 21,
            ceil: 25,
            result: 'Geometric (cube)',
          },
          {
            floor: 26,
            ceil: 30,
            result: 'Geometric (obelisk)',
          },
          {
            floor: 31,
            ceil: 35,
            result: 'Geometric (pyramid)',
          },
          {
            floor: 36,
            ceil: 40,
            result: 'Geometric (ring or torus)',
          },
          {
            floor: 41,
            ceil: 45,
            result: 'Geometric (sphere)',
          },
          {
            floor: 46,
            ceil: 55,
            result: 'Organic or curved',
          },
          {
            floor: 56,
            ceil: 60,
            result: 'Platform or disc',
          },
          {
            floor: 61,
            ceil: 65,
            result: 'Spires or towers',
          },
          {
            floor: 66,
            ceil: 68,
            result: 'Domed',
          },
          {
            floor: 69,
            ceil: 73,
            result: 'Spiky',
          },
          {
            floor: 74,
            ceil: 76,
            result: 'Sculptural or effigy',
          },
          {
            floor: 77,
            ceil: 79,
            result: 'Amorphous',
          },
          {
            floor: 80,
            ceil: 85,
            result: 'Transforming',
          },
          {
            floor: 86,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
      Material: {
        table: [
          {
            floor: 1,
            ceil: 30,
            result: 'Metallic (industrial)',
          },
          {
            floor: 31,
            ceil: 60,
            result: 'Metallic (smooth)',
          },
          {
            floor: 61,
            ceil: 70,
            result: 'Rocky or stone-like',
          },
          {
            floor: 71,
            ceil: 74,
            result: 'Crystalline or glass-like',
          },
          {
            floor: 75,
            ceil: 78,
            result: 'Bone-like',
          },
          {
            floor: 79,
            ceil: 82,
            result: 'Flesh-like',
          },
          {
            floor: 83,
            ceil: 86,
            result: 'Plant-like',
          },
          {
            floor: 87,
            ceil: 88,
            result: 'Energy',
          },
          {
            floor: 89,
            ceil: 90,
            result: 'Liquid',
          },
          {
            floor: 91,
            ceil: 100,
            result: 'Roll twice',
          },
        ],
      },
      'Outer First Look': {
        table: [
          {
            floor: 1,
            ceil: 3,
            result: 'Corrupting its environment',
          },
          {
            floor: 4,
            ceil: 7,
            result: 'Automated defenses',
          },
          {
            floor: 8,
            ceil: 10,
            result: 'Breached exterior',
          },
          {
            floor: 11,
            ceil: 14,
            result: 'Broken or fragmented',
          },
          {
            floor: 15,
            ceil: 17,
            result: 'Camouflaged or hidden',
          },
          {
            floor: 18,
            ceil: 20,
            result: 'Cavernous opening',
          },
          {
            floor: 21,
            ceil: 23,
            result: 'Dispersed structures',
          },
          {
            floor: 24,
            ceil: 26,
            result: 'Dreadful premonitions',
          },
          {
            floor: 27,
            ceil: 30,
            result: 'Electromagnetic field',
          },
          {
            floor: 31,
            ceil: 33,
            result: 'Embedded within terrain',
          },
          {
            floor: 34,
            ceil: 36,
            result: 'Encased in an energy field',
          },
          {
            floor: 37,
            ceil: 40,
            result: 'Energy core or conduit',
          },
          {
            floor: 41,
            ceil: 43,
            result: 'Fractal patterns',
          },
          {
            floor: 44,
            ceil: 47,
            result: 'Glyphs or symbols',
          },
          {
            floor: 48,
            ceil: 51,
            result: 'Hazardous readings',
          },
          {
            floor: 52,
            ceil: 54,
            result: 'Levitating or in motion',
          },
          {
            floor: 55,
            ceil: 58,
            result: 'Lighted or illuminated',
          },
          {
            floor: 59,
            ceil: 61,
            result: 'No obvious point of entry',
          },
          {
            floor: 62,
            ceil: 64,
            result: 'Overgrown or entangled',
          },
          {
            floor: 65,
            ceil: 67,
            result: 'Perfectly preserved',
          },
          {
            floor: 68,
            ceil: 70,
            result: 'Phasing in and out of reality',
          },
          {
            floor: 71,
            ceil: 73,
            result: 'Physical barrier',
          },
          {
            floor: 74,
            ceil: 76,
            result: 'Pitted or scarred',
          },
          {
            floor: 77,
            ceil: 79,
            result: 'Scaled for outsized beings',
          },
          {
            floor: 80,
            ceil: 82,
            result: 'Shrouded in mist or haze',
          },
          {
            floor: 83,
            ceil: 85,
            result: 'Signs of invaders',
          },
          {
            floor: 86,
            ceil: 89,
            result: 'Sound or signal',
          },
          {
            floor: 90,
            ceil: 92,
            result: 'Strong gravity well',
          },
          {
            floor: 93,
            ceil: 95,
            result: 'Surrounded by destruction',
          },
          {
            floor: 96,
            ceil: 100,
            result: 'Descriptor + Focus',
          },
        ],
      },
      Interior: {
        oracles: {
          'First Look': {
            table: [
              {
                floor: 1,
                ceil: 3,
                result: 'Abnormal gravity',
              },
              {
                floor: 4,
                ceil: 6,
                result: 'Automated defenses',
              },
              {
                floor: 7,
                ceil: 9,
                result: 'Biological infestation',
              },
              {
                floor: 10,
                ceil: 12,
                result: 'Carried tech is disrupted',
              },
              {
                floor: 13,
                ceil: 15,
                result: 'Complex textures or patterns',
              },
              {
                floor: 16,
                ceil: 18,
                result: 'Corpses of intruders',
              },
              {
                floor: 19,
                ceil: 21,
                result: 'Damage and debris',
              },
              {
                floor: 22,
                ceil: 24,
                result: 'Deteriorating spaces',
              },
              {
                floor: 25,
                ceil: 27,
                result: 'Dissonant tones or music',
              },
              {
                floor: 28,
                ceil: 30,
                result: 'Energy surges',
              },
              {
                floor: 31,
                ceil: 33,
                result: 'Environment reacts to your presence',
              },
              {
                floor: 34,
                ceil: 36,
                result: 'Evidence of looting or scavenging',
              },
              {
                floor: 37,
                ceil: 39,
                result: 'Excessive cold',
              },
              {
                floor: 40,
                ceil: 42,
                result: 'Excessive heat',
              },
              {
                floor: 43,
                ceil: 45,
                result: 'Faint ambient lighting',
              },
              {
                floor: 46,
                ceil: 48,
                result: 'Impenetrable darkness',
              },
              {
                floor: 49,
                ceil: 51,
                result: 'Intense smell',
              },
              {
                floor: 52,
                ceil: 54,
                result: 'Magnetic surfaces',
              },
              {
                floor: 55,
                ceil: 57,
                result: 'Material does not match exterior',
              },
              {
                floor: 58,
                ceil: 60,
                result: 'Ornate markings or symbols',
              },
              {
                floor: 61,
                ceil: 63,
                result: 'Reactive lighting responds to your presence',
              },
              {
                floor: 64,
                ceil: 66,
                result: 'Scale does not match exterior',
              },
              {
                floor: 67,
                ceil: 69,
                result: 'Signs of invasive lifeforms',
              },
              {
                floor: 70,
                ceil: 72,
                result: 'Surfaces respond to touch',
              },
              {
                floor: 73,
                ceil: 75,
                result: 'Thick haze or smoke',
              },
              {
                floor: 76,
                ceil: 78,
                result: 'Thick or fluid atmosphere',
              },
              {
                floor: 79,
                ceil: 81,
                result: 'Thrumming or droning sound',
              },
              {
                floor: 82,
                ceil: 84,
                result: 'Toxic atmosphere',
              },
              {
                floor: 85,
                ceil: 87,
                result: 'Toxic residue',
              },
              {
                floor: 88,
                ceil: 90,
                result: 'Well-preserved',
              },
              {
                floor: 91,
                ceil: 93,
                result: 'Wet or humid',
              },
              {
                floor: 94,
                ceil: 100,
                result: 'Descriptor + Focus',
              },
            ],
            description:
              'Use this table to reveal what you see or encounter when first entering the site. These aspects, combined with the exterior features, will help you envision the nature and condition of the vault and provide context for the rest of your exploration.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 3,
                result: 'Ascending or descending path',
              },
              {
                floor: 4,
                ceil: 6,
                result: 'Biological growths',
              },
              {
                floor: 7,
                ceil: 8,
                result: 'Blood trail',
              },
              {
                floor: 9,
                ceil: 10,
                result: 'Breached or ruptured area',
              },
              {
                floor: 11,
                ceil: 13,
                result: 'Broken or inactive machinery',
              },
              {
                floor: 14,
                ceil: 15,
                result: 'Clinging mist',
              },
              {
                floor: 16,
                ceil: 18,
                result: 'Damage or debris',
              },
              {
                floor: 19,
                ceil: 20,
                result: 'Echoing noises',
              },
              {
                floor: 21,
                ceil: 22,
                result: 'Elevated path over chasm or shaft',
              },
              {
                floor: 23,
                ceil: 25,
                result: 'Energy discharges',
              },
              {
                floor: 26,
                ceil: 28,
                result: 'Enigmatic controls or terminal',
              },
              {
                floor: 29,
                ceil: 30,
                result: 'Garden or invasive plant life',
              },
              {
                floor: 31,
                ceil: 32,
                result: 'Inscrutable object lies dark and silent',
              },
              {
                floor: 33,
                ceil: 35,
                result: 'Intersection or hub',
              },
              {
                floor: 36,
                ceil: 38,
                result: 'Intricate symbols or pictographs',
              },
              {
                floor: 39,
                ceil: 41,
                result: 'Looted or dismantled technology',
              },
              {
                floor: 42,
                ceil: 44,
                result: 'Looted or empty containers',
              },
              {
                floor: 45,
                ceil: 47,
                result: 'Mazelike passages',
              },
              {
                floor: 48,
                ceil: 49,
                result: 'Moving platform or lift',
              },
              {
                floor: 50,
                ceil: 52,
                result: 'Mummified or decayed corpses',
              },
              {
                floor: 53,
                ceil: 55,
                result: 'Narrowing or widening path',
              },
              {
                floor: 56,
                ceil: 58,
                result: 'Pooled liquid',
              },
              {
                floor: 59,
                ceil: 61,
                result: 'Remains of intruders',
              },
              {
                floor: 62,
                ceil: 63,
                result: 'Scattered bones',
              },
              {
                floor: 64,
                ceil: 66,
                result: 'Scrawled markings',
              },
              {
                floor: 67,
                ceil: 68,
                result: 'Signs of an attack or battle',
              },
              {
                floor: 69,
                ceil: 71,
                result: 'Signs of invasive creatures',
              },
              {
                floor: 72,
                ceil: 73,
                result: 'Surfaces honeycombed with openings',
              },
              {
                floor: 74,
                ceil: 76,
                result: 'Unintelligible recorded message',
              },
              {
                floor: 77,
                ceil: 79,
                result: 'Unintelligible whispers',
              },
              {
                floor: 80,
                ceil: 82,
                result: 'Vaulted chamber',
              },
              {
                floor: 83,
                ceil: 85,
                result: 'Vertical shaft',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Transition into the Sanctum',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Descriptor + Focus',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'Broken path',
              },
              {
                floor: 6,
                ceil: 10,
                result: 'Change in atmosphere or environment',
              },
              {
                floor: 11,
                ceil: 15,
                result: 'Corrosive environment',
              },
              {
                floor: 16,
                ceil: 20,
                result: 'Dire warning left by other explorers',
              },
              {
                floor: 21,
                ceil: 25,
                result: 'Foes close in',
              },
              {
                floor: 26,
                ceil: 30,
                result: 'Fragile structural integrity',
              },
              {
                floor: 31,
                ceil: 35,
                result: 'Hazardous path designed for traversal by other beings',
              },
              {
                floor: 36,
                ceil: 40,
                result: 'Important gear malfunctions',
              },
              {
                floor: 41,
                ceil: 45,
                result: 'Isolation or fear presses in',
              },
              {
                floor: 46,
                ceil: 50,
                result: 'Mechanical trap',
              },
              {
                floor: 51,
                ceil: 55,
                result: 'Mist or darkness conceals dangers',
              },
              {
                floor: 56,
                ceil: 60,
                result: 'Puzzling mystery blocks the way',
              },
              {
                floor: 61,
                ceil: 65,
                result: 'Radioactive hot spot',
              },
              {
                floor: 66,
                ceil: 70,
                result: 'Rivals seek what lay within',
              },
              {
                floor: 71,
                ceil: 75,
                result: 'Signs of a contagion',
              },
              {
                floor: 76,
                ceil: 80,
                result: 'Signs of a lurking foe',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'Tempting location or object holds hidden dangers',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Toxic atmosphere',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Unnerving sound or sensation',
              },
              {
                floor: 96,
                ceil: 99,
                result: 'Action + Theme',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Use this table to help envision a complication within a vault, such as when you [Explore a Waypoint](Moves#Explore-a-Waypoint) and are prompted to envision a peril.',
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Clue points the way to your destination or target',
              },
              {
                floor: 11,
                ceil: 20,
                result: "Clue to a lifeform's nature or vulnerabilities",
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Helpful gear left by another explorer',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Insight into the nature or history of this site',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Intriguing device or artifact',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Opening to get the drop on a foe',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Opening to outmaneuver or escape a threat or foe',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Salvageable resource',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Secure area offers a moment of peace',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Shortcut or less perilous path speeds your way',
              },
            ],
            description:
              'Use this table to help envision a favorable circumstance within a vault, such as when you [Explore a Waypoint](Moves#Explore-a-Waypoint) and are prompted to envision an opportunity.',
          },
        },
        description:
          'If you enter the site, check the Inner First Look table for initial impressions of what lies within. If you explore further, use the Interior Feature table to define what you find or encounter. If you Undertake an Expedition within a vault, check this table if you want help setting the scene for a waypoint.',
      },
      Sanctum: {
        oracles: {
          Purpose: {
            table: [
              {
                floor: 1,
                ceil: 3,
                result: 'Capture or control of other beings',
              },
              {
                floor: 4,
                ceil: 6,
                result: 'Command or communication relay',
              },
              {
                floor: 7,
                ceil: 9,
                result: 'Commemoration of an event',
              },
              {
                floor: 10,
                ceil: 12,
                result: 'Conduit to mystical powers',
              },
              {
                floor: 13,
                ceil: 16,
                result: 'Conservation of living specimens',
              },
              {
                floor: 17,
                ceil: 20,
                result: 'Containment of a powerful being',
              },
              {
                floor: 21,
                ceil: 24,
                result: 'Containment of dangerous creatures',
              },
              {
                floor: 25,
                ceil: 27,
                result: 'Containment of weapons',
              },
              {
                floor: 28,
                ceil: 31,
                result: 'Control of a destructive weapon',
              },
              {
                floor: 32,
                ceil: 34,
                result: 'Generation of defenses or barriers',
              },
              {
                floor: 35,
                ceil: 38,
                result: 'Generation or transformation of energy',
              },
              {
                floor: 39,
                ceil: 41,
                result: 'Harvesting of resources',
              },
              {
                floor: 42,
                ceil: 44,
                result: 'Interment of the dead',
              },
              {
                floor: 45,
                ceil: 47,
                result: 'Manipulation of spacetime',
              },
              {
                floor: 48,
                ceil: 50,
                result: 'Manufacturing of lifeforms',
              },
              {
                floor: 51,
                ceil: 53,
                result: 'Manufacturing of machines or devices',
              },
              {
                floor: 54,
                ceil: 56,
                result: 'Passage to another location',
              },
              {
                floor: 57,
                ceil: 59,
                result: 'Preservation of an ancient intelligence',
              },
              {
                floor: 60,
                ceil: 62,
                result: 'Preservation of maps or navigational data',
              },
              {
                floor: 63,
                ceil: 66,
                result: 'Protection of a sacred artifact',
              },
              {
                floor: 67,
                ceil: 69,
                result: 'Researching science or technology',
              },
              {
                floor: 70,
                ceil: 73,
                result: 'Safekeeping of cultural records or memories',
              },
              {
                floor: 74,
                ceil: 77,
                result: 'Shelter for inhabitants',
              },
              {
                floor: 78,
                ceil: 80,
                result: 'Stockpiling of resources',
              },
              {
                floor: 81,
                ceil: 83,
                result: 'Surveying or monitoring of a location',
              },
              {
                floor: 84,
                ceil: 87,
                result: 'Transformation of terrain or environments',
              },
              {
                floor: 88,
                ceil: 90,
                result: 'Worship of a god or being',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Action + Theme',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
            description:
              'Because precursor vaults are alien and enigmatic, understanding their ultimate purpose requires investigation and exploration. Use this table to reveal the vault’s original function or role at an appropriate point in your survey. This can come as an outcome of completing an expedition, or when your story naturally leads you to a revelation of the site’s nature.',
          },
          Feature: {
            table: [
              {
                floor: 1,
                ceil: 2,
                result: 'Abyssal pit or chasm',
              },
              {
                floor: 3,
                ceil: 5,
                result: 'Altered gravity',
              },
              {
                floor: 6,
                ceil: 7,
                result: 'Area filled with strange liquid',
              },
              {
                floor: 8,
                ceil: 10,
                result: 'Area humming with aberrant energy',
              },
              {
                floor: 11,
                ceil: 13,
                result: 'Blasted or wrecked area',
              },
              {
                floor: 14,
                ceil: 16,
                result: 'Central chamber of immense proportions or grandeur',
              },
              {
                floor: 17,
                ceil: 19,
                result: 'Colossal machine',
              },
              {
                floor: 20,
                ceil: 21,
                result: 'Corrupted plant life',
              },
              {
                floor: 22,
                ceil: 24,
                result: 'Enigmatic mechanisms come to life',
              },
              {
                floor: 25,
                ceil: 26,
                result: 'Haze of spores or nanomachines',
              },
              {
                floor: 27,
                ceil: 28,
                result: 'Incomprehensible architecture or geometry',
              },
              {
                floor: 29,
                ceil: 31,
                result: 'Incongruent space contradicts the nature of this site',
              },
              {
                floor: 32,
                ceil: 34,
                result: 'Inscrutable object emits sound and energy',
              },
              {
                floor: 35,
                ceil: 37,
                result: 'Machinery fused with organic growths',
              },
              {
                floor: 38,
                ceil: 40,
                result: 'Moving chamber or passage',
              },
              {
                floor: 41,
                ceil: 43,
                result: 'Mutated remains of the dead',
              },
              {
                floor: 44,
                ceil: 46,
                result: 'Nest of invasive creatures',
              },
              {
                floor: 47,
                ceil: 49,
                result: 'Pockets or layers of altered atmosphere',
              },
              {
                floor: 50,
                ceil: 51,
                result: 'Pods or chambers with preserved corpses',
              },
              {
                floor: 52,
                ceil: 54,
                result: 'Pools of strange liquid',
              },
              {
                floor: 55,
                ceil: 57,
                result: 'Pulsating surfaces',
              },
              {
                floor: 58,
                ceil: 60,
                result: 'Rampant biological infestation',
              },
              {
                floor: 61,
                ceil: 63,
                result: 'Repository of biological specimens',
              },
              {
                floor: 64,
                ceil: 66,
                result: 'Sealed chamber',
              },
              {
                floor: 67,
                ceil: 69,
                result: 'Sealed containers of inscrutable purpose',
              },
              {
                floor: 70,
                ceil: 72,
                result: 'Simulated or illusionary environment',
              },
              {
                floor: 73,
                ceil: 74,
                result: 'Surfaces covered in slime or fungus',
              },
              {
                floor: 75,
                ceil: 76,
                result: 'Temporal distortions',
              },
              {
                floor: 77,
                ceil: 79,
                result: 'Transforming spaces',
              },
              {
                floor: 80,
                ceil: 82,
                result: 'Visions of this place in another time',
              },
              {
                floor: 83,
                ceil: 85,
                result: 'Visions or reflections of another reality',
              },
              {
                floor: 86,
                ceil: 88,
                result: 'Warped or misshapen spaces',
              },
              {
                floor: 89,
                ceil: 90,
                result: 'Whispering voices speak to you',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'Descriptor + Focus',
              },
              {
                floor: 96,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Peril: {
            table: [
              {
                floor: 1,
                ceil: 5,
                result: 'Camouflaged or transforming foe reveals itself',
              },
              {
                floor: 6,
                ceil: 10,
                result: 'Confounding distortions of the timestream',
              },
              {
                floor: 11,
                ceil: 15,
                result: 'Destructive environmental disturbance',
              },
              {
                floor: 16,
                ceil: 20,
                result: 'Horrifying fate for a previous intruder',
              },
              {
                floor: 21,
                ceil: 25,
                result: 'Important equipment rendered useless',
              },
              {
                floor: 26,
                ceil: 30,
                result: 'Led astray or lured into danger by a manifestation or illusion',
              },
              {
                floor: 31,
                ceil: 35,
                result: 'Lost the way or separated from others',
              },
              {
                floor: 36,
                ceil: 40,
                result: 'Manifestations prey upon your weaknesses or worries',
              },
              {
                floor: 41,
                ceil: 45,
                result: 'Other intruders have been corrupted or mutated by this place',
              },
              {
                floor: 46,
                ceil: 50,
                result: 'Paranoia or suspicion takes hold',
              },
              {
                floor: 51,
                ceil: 55,
                result: 'Path behind you is sealed',
              },
              {
                floor: 56,
                ceil: 60,
                result: 'Powerful foe strikes without warning',
              },
              {
                floor: 61,
                ceil: 65,
                result: 'Restless dead awaken',
              },
              {
                floor: 66,
                ceil: 70,
                result: 'Scene of hideous violence or death',
              },
              {
                floor: 71,
                ceil: 75,
                result: 'Snared in an unnatural trap',
              },
              {
                floor: 76,
                ceil: 80,
                result: 'Spawning or swarming foes surround you',
              },
              {
                floor: 81,
                ceil: 85,
                result: 'Sudden structural collapse or failure',
              },
              {
                floor: 86,
                ceil: 90,
                result: 'Temptations to linger or remain in this site',
              },
              {
                floor: 91,
                ceil: 95,
                result: 'You are marked by physical corruption or mutation',
              },
              {
                floor: 96,
                ceil: 99,
                result: 'Action + Theme',
              },
              {
                floor: 100,
                ceil: 100,
                result: 'Roll twice',
              },
            ],
          },
          Opportunity: {
            table: [
              {
                floor: 1,
                ceil: 10,
                result: 'Access to a secret or protected area',
              },
              {
                floor: 11,
                ceil: 20,
                result: 'Clue points the way to your destination or target',
              },
              {
                floor: 21,
                ceil: 30,
                result: 'Comforting illusion or vision',
              },
              {
                floor: 31,
                ceil: 40,
                result: 'Control or terminal adjusts to accept your input',
              },
              {
                floor: 41,
                ceil: 50,
                result: 'Deeper insight into the history or nature of this site',
              },
              {
                floor: 51,
                ceil: 60,
                result: 'Device or artifact reveals its purpose',
              },
              {
                floor: 61,
                ceil: 70,
                result: 'Environment adjusts to better suit you',
              },
              {
                floor: 71,
                ceil: 80,
                result: 'Foes stand down or give way',
              },
              {
                floor: 81,
                ceil: 90,
                result: 'Key offers control of a function or aspect of this site',
              },
              {
                floor: 91,
                ceil: 100,
                result: 'Shortcut or less perilous path speeds your way',
              },
            ],
          },
        },
        description:
          'As you delve deeper into a vault, the corruption and strangeness of the place takes hold. Use the Sanctum Feature table to represent the aberrant nature of a vault’s depths.',
      },
    },
    description:
      '# Summary: Exploring Precursor Vaults\n\nWhen you first come upon a vault, use the tables on the previous two pages to help envision its form and nature. For a more abstract prompt, just use the Descriptor oracle (page 298). In either case—if that’s enough detail for the role of the vault in your story—stop there.\n\n## Detailed Precursor Vault Generation\n\nIf the survey of a vault is a focus for your current quest, use the oracle tables in this section to generate a more complete picture of the site. See the next page for a diagram of the three main phases of exploration.\n\n  * Exterior: Start by generating the basic form and characteristics of the vault using the tables on the previous two pages. These features represent what you observe from a safe distance.\n  * Interior: If you enter the site, check the Inner First Look table (page 1)   for initial impressions of what lies within. If you explore further, use the Interior Feature table (page 366) to define what you find or encounter. If you Undertake an Expedition within a vault, check this table if you want help setting the scene for a waypoint.\n  * Sanctum: As you delve deeper into a vault, the corruption and strangeness of the place takes hold. Use the Sanctum Feature table (page 368) to represent the aberrant nature of a vault’s depths.',
  },
};

const starNames = [
  'Acamar',
  'Achernar',
  'Achird',
  'Acrux',
  'Acubens',
  'Adhafera',
  'Adhara',
  'Adhil',
  'Aladfar',
  'Albireo',
  'Alchibah',
  'Alcor',
  'Alcyone',
  'Aldebaran',
  'Alderamin',
  'Alfirk',
  'Algenib',
  'Algol',
  'Algorab',
  'Alioth',
  'Alkaid',
  'Alkalurops',
  'Alkes',
  'Almach',
  'Almeisan',
  'Alnilam',
  'Alnitak',
  'Alphard',
  'Alpheratz',
  'Alsafi',
  'Alshain',
  'Altair',
  'Alterf',
  'Aludra',
  'Alula',
  'Alya',
  'Ancha',
  'Ankaa',
  'Antares',
  'Arcturus',
  'Arkab',
  'Arneb',
  'Arrakis',
  'Ascella',
  'Asellus',
  'Asmidiske',
  'Asterope',
  'Atik',
  'Atlas',
  'Atria',
  'Auva',
  'Avior',
  'Azha',
  'Baham',
  'Baten',
  'Bellatrix',
  'Betelgeuse',
  'Botein',
  'Canopus',
  'Capella',
  'Caph',
  'Castor',
  'Celaeno',
  'Chara',
  'Cheleb',
  'Choo',
  'Chow',
  'Coxa',
  'Cujam',
  'Cursa',
  'Dabih',
  'Deneb',
  'Denebola',
  'Diphda',
  'Dschubba',
  'Dziban',
  'Edasich',
  'Electra',
  'Eltanin',
  'Enif',
  'Fomalhaut',
  'Furud',
  'Gacrux',
  'Gemma',
  'Giauzar',
  'Gienah',
  'Gomeisa',
  'Graffias',
  'Grumium',
  'Hadar',
  'Hamal',
  'Heka',
  'Heze',
  'Homam',
  'Jabbah',
  'Jabhat',
  'Kabdhilinan',
  'Kaffaljidhmah',
  'Kaou',
  'Kaus',
  'Kitalpha',
  'Kochab',
  'Kornephoros',
  'Kuma',
  'Kurhah',
  'Lesath',
  'Maasim',
  'Maaz',
  'Maia',
  'Marfik',
  'Markab',
  'Matar',
  'Mebsuta',
  'Megrez',
  'Mekbuda',
  'Menkalinan',
  'Menkar',
  'Menkent',
  'Menkib',
  'Merak',
  'Merope',
  'Mesarthim',
  'Miaplacidus',
  'Mimosa',
  'Minhar',
  'Minkar',
  'Mintaka',
  'Mira',
  'Mirach',
  'Mirfak',
  'Mirzam',
  'Mizar',
  'Mothallah',
  'Muhlifain',
  'Muliphein',
  'Muphrid',
  'Muscida',
  'Naos',
  'Nashira',
  'Nekkar',
  'Nihal',
  'Nodus',
  'Nunki',
  'Nusakan',
  'Phact',
  'Phad',
  'Pherkab',
  'Pleione',
  'Polaris',
  'Pollux',
  'Porrima',
  'Praecipula',
  'Prijipati',
  'Primus',
  'Procyon',
  'Propus',
  'Rana',
  'Rasalas',
  'Rastaban',
  'Rigel',
  'Rotanev',
  'Ruchba',
  'Ruchbah',
  'Rukbat',
  'Sabik',
  'Sadachbia',
  'Sadal',
  'Sadalbari',
  'Sadatoni',
  'Sadr',
  'Saiph',
  'Sargas',
  'Sarin',
  'Scheat',
  'Schedar',
  'Schemali',
  'Scutulum',
  'Segin',
  'Seginus',
  'Shaula',
  'Sheliak',
  'Sheratan',
  'Sirius',
  'Situla',
  'Skat',
  'Spica',
  'Sualocin',
  'Suhail',
  'Sulafat',
  'Syrma',
  'Talitha',
  'Tania',
  'Tarazed',
  'Tarf',
  'Taygeta',
  'Tegmine',
  'Tejat',
  'Thabit',
  'Thuban',
  'Tseen',
  'Tsih',
  'Tsze',
  'Ukdah',
  'Unuk',
  'Vega',
  'Vindemiatrix',
  'Wasat',
  'Wezen',
  'Wezn',
  'Yildun',
  'Zaniah',
  'Zaurak',
  'Zavijava',
  'Zozma',
  'Zuben',
  'Zubenhakrabi',
];
