import { IOracle } from 'src/components/models';

export const Truths: { [index: string]: IOracle } = {
  Cataclysm: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'The Sun Plague extinguished the stars in our home galaxy.',
        subtable: [
          {
            floor: 1,
            ceil: 25,
            result: 'Temporal distortions from a supermassive black hole',
          },
          {
            floor: 26,
            ceil: 50,
            result: 'Sudden dark matter decay',
          },
          {
            floor: 51,
            ceil: 75,
            result: 'Superweapon run amok',
          },
          {
            floor: 76,
            ceil: 100,
            result: 'Scientific experiment gone awry',
          },
        ],
        summary:
          'The anomaly traveled at incredible speeds, many times faster than light itself, and snuffed out the stars around us before we realized it was coming. Few of us survived as we made our way to this new galaxy. Here in the Forge, the stars are still aflame. We cling to their warmth like weary travelers huddled around a fire.\n\nWe suspect the Sun Plague was caused by:',
      },
      {
        floor: 34,
        ceil: 67,
        result: 'Interdimensional entities invaded our reality.',
        subtable: [
          {
            floor: 1,
            ceil: 15,
            result: 'Corrupting biological scourges',
          },
          {
            floor: 16,
            ceil: 30,
            result: 'Swarming, animalistic creatures',
          },
          {
            floor: 31,
            ceil: 44,
            result: 'Monstrous humanoids',
          },
          {
            floor: 45,
            ceil: 58,
            result: 'Spirits of alluring, divine form',
          },
          {
            floor: 59,
            ceil: 72,
            result: 'Beings of chaotic energy',
          },
          {
            floor: 73,
            ceil: 86,
            result: 'Titanic creatures of horrific power',
          },
          {
            floor: 87,
            ceil: 100,
            result: 'World-eating abominations of unimaginable scale',
          },
        ],
        summary:
          'Without warning, these implacable and enigmatic beings ravaged our homeworlds. We could not stand against them. With the last of our defenses destroyed, our hope gone, we cast our fate to the Forge. Here, we can hide. Survive.\n\nThese entities took the form of:',
      },
      {
        floor: 68,
        ceil: 100,
        result: 'We escaped the ravages of a catastrophic war.',
        subtable: [
          {
            floor: 1,
            ceil: 20,
            result: 'Artificial intelligence',
          },
          {
            floor: 21,
            ceil: 40,
            result: 'Religious zealots',
          },
          {
            floor: 41,
            ceil: 60,
            result: 'Genetically engineered soldiers',
          },
          {
            floor: 61,
            ceil: 80,
            result: 'Self-replicating nanomachines',
          },
          {
            floor: 81,
            ceil: 100,
            result: 'A tyrannical faction or leader',
          },
        ],
        summary:
          'Over millennia, we consumed resources and shattered lives as we fueled the engines of industry, expansion, and war. In the end, a powerful foe took advantage of our rivalries in a violent bid for power. Fleeing the devastation, we assembled our fleets and traveled to the Forge. A new home. A fresh start.\n\nIn this final war, we were set upon by:',
      },
    ],
  },
  Exodus: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result:
          'When the Exodus fleet set off on a ponderous journey to a new home outside our galaxy, they marked the Forge as their destination. Countless generations lived out their lives aboard those titanic ships during the millennia-long passage.',
        summary:
          'The refugees built a rich legacy of culture and tradition during the Exodus. Some even remained in the ships after their arrival in the Forge, unwilling or unable to leave their familiar confines. Those vessels, the Ironhomes, still sail the depths of this galaxy.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          'A ragtag fleet of ships—propelled at tremendous speeds by experimental FTL drives—carried our ancestors to the Forge. But the technology that powered the ships is said to be the source of the Sundering, a fracturing of reality that plagues us here today.',
        summary:
          'The experimental drives used by the Exodus fleet are forbidden, but the damage is done. The Sundering spreads across our reality like cracks on the surface of an icy pond. Those fissures unleash even more perilous realities upon our own. Did we flee one cataclysm, only to inadvertently create another?',
      },
      {
        floor: 68,
        ceil: 100,
        result: 'Mysterious alien gates provided instantaneous one-way passage to the Forge.',
        summary:
          "In the midst of the cataclysm, our ancestors found a strange metal pillar on our homeworld's moon. A map on the surface of this alien relic detailed the deep-space locations of the Iron Gates—massive devices that powered artificial wormholes. With no other options, the Exodus ships fled through the gates and emerged here in the Forge.",
      },
    ],
  },
  Communities: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'Few survived the journey to the Forge, and we are scattered to the winds in this perilous place.',
        summary:
          'Our settlements are often small, starved for resources, and on the brink of ruin. Hundreds of far-flung settlements are lost and isolated within the untamed chaos of this galaxy, and we do not know their fate.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          'Dangers abound, but there is safety in numbers. Many ships and settlements are united under the banner of one of the Founder Clans.',
        summary:
          'We have a tentative foothold in this galaxy. Each of the five Founder Clans honor the name and legacy of a leader who guided their people in the chaotic time after the Exodus. Vast reaches of the settled domains are claimed by the clans, and territorial skirmishes are common.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'We have made our mark in this galaxy, but the energy storms we call balefires threaten to undo that progress, leaving our communities isolated and vulnerable.',
        summary:
          "Starships navigate along bustling trade routes between settlements. We've built burgeoning outposts on the fringes of known sectors, and bold spacers chart new paths into unexplored domains. But this hard-earned success is threatened by the chaotic balefires, intense energy anomalies that cut off trade routes and threaten entire planets.",
      },
    ],
  },
  Iron: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'Iron vows are sworn upon the remnants of ships that carried our people to the Forge.',
        summary:
          'Many of our outposts were built from the iron bones of the Exodus ships. Fragments of the ships were also given to survivors as a remembrance, and passed from one generation to the next. Today, the Ironsworn swear vows upon the shards to honor the sacrifice of their forebears, the essence of the places left behind, and the souls of those great ships.',
      },
      {
        floor: 34,
        ceil: 67,
        result: 'Iron vows are sworn upon totems crafted from the enigmatic metal we call black iron.',
        summary:
          'Black iron was first forged by a long-dead civilization. Some say it is a living metal, attuned to the hidden depths of the universe. Remnants of this prized resource are found within ancient sites throughout the Forge. It is resistant to damage and corrosion, but can be molded using superheated plasma at specialized facilities. The Ironsworn carry weapons, armor, or tokens crafted from black iron, and swear vows upon it.',
      },
      {
        floor: 68,
        ceil: 100,
        result: 'The Ironsworn bind their honor to iron blades.',
        summary:
          'Aboard a starship, where stray gunfire can destroy fragile equipment or pierce hulls, the brutal practicality of a sword makes for a useful weapon. A few also favor the silent efficiency of a blade for infiltration or espionage. Most importantly, when the Ironsworn swear a vow upon a sword, they bind their commitment to the metal. If they forsake a vow, that iron must be abandoned. To be Ironsworn without a blade is to be disgraced.',
      },
    ],
  },
  Laws: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result:
          'Much of the settled domains are a lawless frontier. Criminal factions and corrupt leaders often hold sway.',
        summary:
          'Powers rise and fall in the Forge, so any authority is fleeting. In the end, we must fend for ourselves. A few communities are bastions of successful autonomy, but many are corrupted or preyed upon by petty despots, criminals, and raiders.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          'Laws and governance vary across settled domains, but bounty hunters are given wide latitude to pursue their contracts. Their authority is almost universally recognized, and supersedes local laws.',
        summary:
          'Through tradition and influence, bounty hunter guilds are given free rein to track and capture fugitives in most settled places. Only the foolish stand between a determined bounty hunter and their target.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'Our communities are bound under the terms of the Covenant, a charter established after the Exodus. The organization called the Keepers is sworn to uphold those laws.',
        summary:
          'Most settlements are still governed under the Covenant and yield to the authority of the Keepers. But a few view the Covenant as a dogmatic, impractical, and unjust relic of our past; in those places, the Keepers find no welcome.',
      },
    ],
  },
  Religion: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'Our gods failed us. We left them behind.',
        summary:
          'The Exodus was a tipping point. The gods offered no help to the billions who died in the cataclysm, and spirituality has little meaning in the Forge. Most now see religion as a useless relic of our past. But the search for meaning continues, and many are all-too-willing to follow a charismatic leader who claims to offer a better way.',
      },
      {
        floor: 34,
        ceil: 67,
        result: 'Our faith is as diverse as our people.',
        summary:
          'Many have no religion, or offer an occasional prayer out of habit. Others pay homage to the gods of our forebears as a way of connecting to their roots. Some idealize the natural order of the universe, and see the divine in the gravitational dance of stars or the complex mechanisms of a planetary ecosystem. And many now worship the Primordials—gods of a fallen people who once dwelt within the Forge.',
      },
      {
        floor: 68,
        ceil: 100,
        result: 'Three dominant religious orders, the Triumvirate, battle for influence and power within the Forge.',
        summary:
          'Our communities are often sworn to serve one of the three doctrines of the Triumvirate. For many, faith offers purpose and meaning. But it also divides us. Throughout our brief history in the Forge, the leaders of the Triumvirate have pitted us against one another. For this reason, some are apostates who disavow these religions and follow a different path.',
      },
    ],
  },
  Magic: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'Magic does not exist.',
        summary:
          'Some look to superstition and age-old traditions for comfort in this unforgiving galaxy. But that is foolishness. What some call magic is simply a product of technologies or natural forces we aren’t yet equipped to understand.',
      },
      {
        floor: 34,
        ceil: 67,
        result: 'Supernatural powers are wielded by those rare people we call paragons.',
        subtable: [
          {
            floor: 1,
            ceil: 20,
            result: 'Genetic engineering',
          },
          {
            floor: 21,
            ceil: 40,
            result: 'Psychic experimentation',
          },
          {
            floor: 41,
            ceil: 60,
            result: 'Evolutionary mutations',
          },
          {
            floor: 61,
            ceil: 80,
            result: 'Magitech augmentations',
          },
          {
            floor: 81,
            ceil: 100,
            result: 'Ancient knowledge held by secretive orders',
          },
        ],
        summary:
          'While not magic in the truest sense, the abilities of the paragons are as close to magic as we can conjure.\n\nThese powers are born of:',
      },
      {
        floor: 68,
        ceil: 100,
        result: 'Unnatural energies flow through the Forge. Magic and science are two sides of the same coin.',
        summary:
          "Soon after our arrival, some displayed the ability to harness the Forge's energies. Today, mystics invoke this power to manipulate matter or see beyond the veils of our own universe. But this can be a corrupting force, and the most powerful mystics are respected and feared in equal measure.",
      },
    ],
  },
  'Communication and Data': {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'Much was lost when we came to the Forge. It is a dark age.',
        summary:
          'The knowledge that remains is a commodity as valuable as the rarest resource. Information is collected, hoarded, and jealously guarded. Ships and outposts endure prolonged periods of isolation, and rumors or disinformation are used to gain advantage or undermine foes.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          'Information is life. We rely on spaceborne couriers to transport messages and data across the vast distances between settlements.',
        summary:
          'Direct communication and transmissions beyond the near-space of a ship or outpost are impossible. Digital archives are available at larger outposts, but the information is not always up-to-date or reliable. Therefore, the most important communications and discoveries are carried by couriers who swear vows to see that data safely to its destination.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'In settled domains, a network of data hubs called the Weave allow near-instantaneous communication and data-sharing between ships and outposts.',
        summary:
          'Because of their importance, Weave hubs are often targets for sabotage, and communication blackouts are not uncommon. Beyond the most populous sectors, travelers and outposts are still commonly isolated and entirely off the grid.',
      },
    ],
  },
  Medicine: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'Our advanced medical technologies and expertise was lost during the Exodus.',
        summary:
          'Healers are rare and ill-equipped. Untold numbers have succumbed to sickness, injury, and disease. Those who survive often bear the scars of a hard and dangerous life in the Forge.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          'To help offset a scarcity of medical supplies and knowledge, the resourceful technicians we call riggers create basic organ and limb replacements.',
        summary:
          "Much was lost in the Exodus, and what remains of our medical technologies and expertise is co-opted by the privileged and powerful. For most, advanced medical care is out of reach. When someone suffers a grievous injury, they'll often turn to a rigger for a makeshift mechanical solution.",
      },
      {
        floor: 68,
        ceil: 100,
        result: 'Orders of sworn healers preserve our medical knowledge and train new generations of caregivers.',
        summary:
          "Life-saving advanced care is available within larger communities throughout the settled sectors of the Forge. Even remote communities are often served by a novice healer, or can request help from a healer's guild in an emergency.",
      },
    ],
  },
  'Artificial Intelligence': {
    table: [
      {
        floor: 1,
        ceil: 33,
        result:
          'We no longer have access to advanced computer systems. Instead, we must rely on the seers we call Adepts.',
        subtable: [
          {
            floor: 1,
            ceil: 33,
            result: 'The energies of the Forge corrupt advanced systems',
          },
          {
            floor: 34,
            ceil: 67,
            result: 'AI was outlawed in the aftermath of the machine wars',
          },
          {
            floor: 68,
            ceil: 100,
            result: 'We have lost the knowledge to create and maintain AI',
          },
        ],
        summary:
          'Our computers are limited to simple digital systems and the most basic machine intelligence. This is because: ______.\n\nThe Adepts serve in place of those advanced systems. They utilize mind-altering drugs to see the universe as a dazzling lattice of data, identifying trends and predicting outcomes with uncanny accuracy. But to gain this insight they sacrifice much of themselves.',
      },
      {
        floor: 34,
        ceil: 67,
        result: 'The vestiges of advanced machine intelligence are coveted and wielded by those in power.',
        summary:
          'Much of our AI technology was lost in the Exodus. What remains is under the control of powerful organizations and people, and is often wielded as a weapon or deterrent. The rest of us must make do with primitive systems.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'Artificial consciousness emerged in the time before the Exodus, and sentient machines live with us here in the Forge.',
        summary:
          'Our ships, digital assistants, bots, and other systems often house advanced AI. For a lone traveler, machine intelligence can provide companionship and aid within the perilous depths of the Forge.',
      },
    ],
  },
  War: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result:
          'Here in the Forge, resources are too precious to support organized fighting forces or advanced weaponry.',
        summary:
          'Weapons are simple and cheap. Starships are often cobbled together from salvage. Most communities rely on ragtag bands of poorly equipped conscripts or volunteers to defend their holdings, and raiders prowl the Forge in search of easy prey.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          'Professional soldiers defend or expand the holdings of those who are able to pay. The rest of us are on our own.',
        summary:
          'Mercenary guilds wield power in the Forge. Some are scrappy outfits of no more than a dozen soldiers. Others are sector-spanning enterprises deploying legions of skilled fighting forces and fleets of powerful starships. Most hold no loyalty except to the highest bidder.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'War never ends. Talented weaponsmiths and shipwrights craft deadly, high-tech tools of destruction. Dominant factions wield mighty fleets and battle-hardened troops.',
        summary:
          'Those in power have access to weapons of horrific destructive potential. Skirmishes and wars flare across the settled domains, and most are pawns or casualties in these destructive campaigns.',
      },
    ],
  },
  Lifeforms: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result: 'This is a perilous and often inhospitable galaxy, but life finds a way.',
        summary:
          'Life in the Forge is diverse. Planets are often home to a vast array of creatures, and our starships cruise with spaceborne lifeforms riding their wake. Even animals from our homeworld—carried aboard the Exodus ships—have adapted to live with us in the Forge.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          'Many sites and planets are infested by dreadful forgespawn. These aberrant creatures threaten to overrun other life in the galaxy.',
        summary:
          'The forgespawn are hostile creatures born of the chaotic energies of this galaxy. Hundreds of abandoned or devastated outposts and derelict ships stand as testament to their dreadful power and cunning.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'Life in the Forge was seeded and engineered by the Essentia, ancient entities who enact their inscrutable will in this galaxy.',
        summary:
          'The Essentia are the architects of life within the Forge. These omniscient beings are rarely encountered, and have powers and purpose beyond our comprehension. Some worship them. Others resist or rebel against them. But trying to defy the will of the Essentia is like standing at the shore of an ocean to thwart the tide. They are inevitable.',
      },
    ],
  },
  Precursors: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result:
          'Over eons, a vast number of civilizations rose and fell within the Forge. Today, the folk we call grubs—scavenger crews and audacious explorers—delve into the mysterious monuments and ruins of those ancient beings.',
        summary:
          'Incomprehensible technologies, inexorable time, and the strange energies of the Forge have corrupted the vaults of the precursors. Despite the perils, grubs scour those places for useful resources and discoveries. But some secrets are best left buried, and many have been lost to the forsaken depths of the vaults.',
      },
      {
        floor: 34,
        ceil: 67,
        result:
          "The Ascendancy, an advanced spacefaring empire, once ruled the entirety of the Forge. Vaults of inscrutable purpose are all that remain to mark the Ascendancy's legacy, but those places are untethered from our own reality.",
        summary:
          'Ascendancy vaults can appear spontaneously, washed up like flotsam in the tides of time. Their gravity and atmospheres pay no heed to natural laws. Some are corrupted and ruined. Others are unmarred and intact. Some are both at once. They are chaos.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'The biomechanical lifeforms we call the Remnants, engineered by civilizations as weapons in a cataclysmic war, survived the death of their creators.',
        summary:
          'On scarred planets and within precursor vaults throughout the Forge, the Remnants still guard ancient secrets and fight unending wars.',
      },
    ],
  },
  Horrors: {
    table: [
      {
        floor: 1,
        ceil: 33,
        result:
          'Put enough alcohol in a spacer, and they’ll tell you stories of ghost ships crewed by vengeful undead. It’s nonsense.',
        summary:
          "Within the Forge, space and time are as mutable and unstable as a flooding river. When reality can't be trusted, we are bound to encounter unsettling phenomenon.",
      },
      {
        floor: 34,
        ceil: 67,
        result: 'Most insist that horrors aren’t real. Spacers know the truth.',
        summary:
          'When you travel the depths of the Forge, be wary. Some say we are cursed by those who did not survive the cataclysm, and the veil between life and death is forever weakened. Supernatural occurrences and entities are especially common near a white dwarf star. These stellar objects, which spacers call ghost lights, are the decaying remnants of a dead star.',
      },
      {
        floor: 68,
        ceil: 100,
        result:
          'The strange energies of the Forge give unnatural life to the dead. The Soulbinders are an organization sworn to confront these horrifying entities.',
        summary:
          'The woken dead are a plague within the Forge. Some of these beings are benevolent or seek absolution, but most are hollowed and corrupted by death. They are driven by hate and a hunger for the warmth of life that is forever lost to them. The Soulbinders are dedicated to putting them to rest—whatever the cost.',
      },
    ],
  },
};
