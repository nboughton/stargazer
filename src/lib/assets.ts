import { IAsset } from 'src/components/models';
import { v4 as uuid } from 'uuid';

export const NewAsset = (): IAsset => {
  return {
    id: uuid(),
    title: 'Custom Asset',
    type: 'Custom',
    items: [
      {
        text: 'Asset item text 1',
        marked: false,
      },
      {
        text: 'Asset item text 2',
        marked: false,
      },
      {
        text: 'Asset item text 3',
        marked: false,
      },
    ],
  };
};

export const Assets: { [index: string]: IAsset } = {
  Ace: {
    type: 'Path',
    title: 'Ace',

    items: [
      {
        text: '<p>When you <i>Face Danger</i> or <i>React Under Fire</i> by guiding your vehicle through a hazard or out of harm&rsquo;s way, add +1 and take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Gain Ground</i> by maneuvering your vehicle against a foe, add +1. If you roll a strong hit with a 4, 5, or 6 on the action die, you may put yourself in firing position. If you do, set side the action die or note its value. If you or an ally <i>Strike</i> using the vehicle&rsquo;s weapons, use that value for the action die (rolling only the challenge dice). This persists until you fail to score a strong hit on that move, or until you make another move which changes your vehicle&rsquo;s position.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you must <i>Endure Stress</i> while piloting a vehicle, you may roll +integrity. If you do, take +1 momentum on a strong hit.</p>\n',
        marked: false,
      },
    ],
  },
  Agent: {
    type: 'Path',
    title: 'Agent',

    items: [
      {
        text: '<p>When you make a move to break into a secure site, infiltrate a protected area, or hack or manipulate a secure system, add +1 and take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Face Danger</i> or <i>Secure an Advantage</i> to establish a false identity, add +1. On a hit, you may add +1 when using that identity to deceive or influence others. If you roll a miss with a match when using that identity, your deception is completely and dramatically undone.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you covertly <i>Gather Information</i>, you may roll +shadow. If you do, take +1 momentum on a hit. On a strong hit with a match, you also uncover a surprising aspect of an adversary&rsquo;s plan or a connection to another quest or relationship; mark progress twice on a related quest.</p>\n',
        marked: false,
      },
    ],
  },
  Archer: {
    type: 'Path',
    title: 'Archer',

    items: [
      {
        text: '<p>Your bow has 6 ammo. When you <i>Strike</i> or <i>Clash</i>, you may add +1 or +2 and suffer that amount as -ammo. To replenish your ammo by crafting projectiles, roll +wits. On a strong hit, take your action die value as +ammo. On a weak hit, as above, but <i>Sacrifice Resources</i> (-1). On a miss, <i>Sacrifice Resources</i> (-1).</p>\n',
        marked: true,
      },
      {
        text: '<p>You may <i>Enter the Fray</i> by unleashing a volley of bow shots. If you do, roll +ammo and suffer -1 ammo. On a hit, mark progress.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you load a specialized projectile such as a zip line, explosive, or electromagnetic disrupter, suffer -1 ammo. When you then take your shot by making a move, you may set the value of your action die to 5. On a hit, envision the effects and take +1 momentum.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 6,
      max: 6,
      min: 0,
    },
  },
  Armored: {
    type: 'Path',
    title: 'Armored',
    subtitle: 'If you wear your finely crafted set of personal armor...',

    items: [
      {
        text: '<p>When you <i>Face Danger</i>, <i>React Under Fire</i>,or <i>Clash</i> against physical attacks or impact, you may put trust in your armor&rsquo;s protection. If you do, set the value of your action die to 4 instead of rolling that die.</p>\n',
        marked: true,
      },
      {
        text: '<p>You add an important new piece to your set of armor, or upgrade its materials. As above, but set the value of your action die to 5 instead of 4.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you must <i>Endure Harm</i>, you may instead let your armor take the hit. If you do, roll your action die. On a 4 or greater, ignore the harm. On a 1-3, ignore the harm but your armor is now broken; you must <i>Repair</i> and spend 5 repair points to bring it back to working condition.</p>\n',
        marked: false,
      },
    ],
  },
  Augmented: {
    type: 'Path',
    title: 'Augmented',
    input: {
      label: 'One',
      text: ' ',
    },
    items: [
      {
        text: '<p>You are equipped with an advanced prosthetic, implant, or mechanical enhancement. When you make a move directly aided by the augment, envision how it gives you exceptional capabilities and add +1. On a strong hit with a match, your augment exceeds expectations; take +2 momentum. On a miss with a match, the augment is broken; you must <i>Repair</i> and spend 3 repair points to bring it back to working condition.</p>\n',
        marked: true,
      },
      {
        text: '<p>You are equipped with a second augment. It functions as above, but the benefits of the two augments do not stack.</p>\n',
        marked: false,
        input: {
          label: 'Two',
          text: ' ',
        },
      },
      {
        text: '<p>When you must <i>Endure Harm</i> or <i>Face Death</i>, you may instead mark an augment as broken. <i>Repair</i> it as detailed above.</p>\n',
        marked: false,
      },
    ],
  },
  Bannersworn: {
    type: 'Path',
    title: 'Bannersworn',
    input: {
      label: 'Ideology',
      text: ' ',
    },
    items: [
      {
        text: '<p>You are bound to a clan, faction, or creed. When you <i>Swear an Iron Vow</i> in service to this ideology, reroll any dice. On a hit, mark 1 tick on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you or an ally <i>Sojourn</i> and score a strong hit with a match, you may envision meeting someone of the same ideology. If you <i>Make a Connection</i> with them and score a hit, mark 1 tick on your bonds legacy track. When you <i>Forge a Bond</i> with anyone of your ideology, make the legacy reward one rank higher (1 extra box if already epic).</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a progress move in direct service to your ideology, you may reroll one challenge die. If you then score a strong hit with a match, mark 1 tick on your bonds legacy track.</p>\n',
        marked: false,
      },
    ],
  },
  Banshee: {
    type: 'Companion',
    title: 'Banshee',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your banshee companion accompanies you on planetside missions, using its echolocation to help guide the way. When you ride your banshee as you <i>Undertake an Expedition</i> or <i>Set a Course</i>, you may roll +its health.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move astride the banshee to detect a threat or avoid a fight, add +1 and take +1 momentum on a hit. On a strong hit with a match, you&rsquo;re gone in a flash; take another +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a combat move and roll a 1 on your action die, the banshee senses the danger and emits a powerful scream to alert you or distract your foes. You may reroll that die, but must first <i>Lose Momentum</i> (-1).</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Blademaster: {
    type: 'Path',
    title: 'Blademaster',
    subtitle: 'If you wield a bladed weapon...',

    items: [
      {
        text: '<p>When you <i>Clash</i> or <i>Strike</i> in close quarters, add +1. On a strong hit with a match, mark progress. Also, once per fight, you may reroll any dice as you make a move to attack or defend using your blade.</p>\n',
        marked: true,
      },
      {
        text: '<p>If you <i>Gain Ground</i> by moving into close quarters against your foe, choose your approach.</p>\n\n<ul>\n<li>Charge: Roll +heart, and mark progress on a hit.</li>\n<li>Evade: Roll +edge, and take +1 momentum on a hit.</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Swear an Iron Vow</i> and bind the oath to your blade, add +1. On a hit, take +2 momentum or +2 spirit.</p>\n',
        marked: false,
      },
    ],
  },
  Bonded: {
    type: 'Deed',
    title: 'Bonded',
    subtitle: 'One time only, once you [Forge a Bond](#Forge-a-Bond) with a special individual...',
    input: {
      label: 'Bond-mate',
      text: ' ',
    },
    items: [
      {
        text: '<p>This person is your bond-mate. When you <i>Sojourn</i> at their home, <i>Hearten</i> in their presence, or <i>Test Your Relationship</i> or <i>Develop Your Relationship</i> with them, reroll any dice. On a strong hit, take +1 momentum.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Set a Course</i> back to your bond-mate&rsquo;s location, add +heart. On a strong hit with a match, envision a special reunion and mark two ticks on your bonds legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move in a crucial moment and score a miss, you may cling to thoughts of your bond-mate for support. If you do, reroll any dice. On another miss, in addition to the outcome of the move, you must mark shaken or traumatized. If both debilities are already marked, <i>Face Desolation</i>.</p>\n',
        marked: false,
      },
    ],
  },
  'Bounty Hunter': {
    type: 'Path',
    title: 'Bounty Hunter',

    items: [
      {
        text: '<p>When you take a bounty contract and <i>Swear an Iron Vow</i> to see it done, add +1. On a strong hit, you&rsquo;ve got a solid lead and may immediately mark progress. When you <i>Fulfill Your Vow</i>, make the legacy reward one rank higher (1 extra box if already epic).</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Gather Information</i> related to a bounty, add +2. On a strong hit with a match, you reveal a surprising aspect of the contract; envision what you discover, and choose one.</p>\n\n<ul>\n<li>Forge ahead: Mark progress twice.</li>\n<li>Change loyalties: <i>Forsake Your Vow</i> and mark 2 ticks on your bonds legacy track.</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Take Decisive Action</i> in a fight against a bounty target or their agents, you may reroll one challenge die.</p>\n',
        marked: false,
      },
    ],
  },
  Brawler: {
    type: 'Path',
    title: 'Brawler',
    subtitle: 'If you fight unarmed or with a close quarters weapon...',

    items: [
      {
        text: '<p>When you <i>Gain Ground</i> by attempting to disarm, trip, shove, grapple, or stun your foe, add +1 and take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Clash</i> in close quarters, you may draw on your momentum to gain advantage. If you do, <i>Lose Momentum</i> (-2) and choose one (before rolling).</p>\n\n<ul>\n<li>Aggressive: Count a weak hit as a strong hit.</li>\n<li>Defensive: Count a miss as a weak hit.</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Enter the Fray</i> already positioned in close quarters against your foe, mark progress on a hit. On a strong hit with a match, your initial assault leaves them stunned; also take +2 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  'Combat Bot': {
    type: 'Companion',
    title: 'Combat Bot',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your combat bot companion fights at your side. When you <i>Strike</i> aided by the bot, add +1; if you <i>Clash</i>, take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you use the threat of violence to <i>Compel</i> or <i>Gain Ground</i> while the bot brings its weapons to bear, you may roll +its health. If you do, take +1 momentum on a hit. On a strong hit with a match, the bot&rsquo;s display is especially persuasive; take another +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>Once per fight, when you <i>React Under Fire</i> by using the bot to draw fire or create a diversion, roll +its health. On a strong hit, mark progress. On a weak hit, face the cost as normal, but then you are in control.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 5,
      max: 5,
      min: 0,
    },
  },
  Commander: {
    type: 'Path',
    title: 'Commander',

    items: [
      {
        text: '<p>When you <i>Aid Your Ally</i> through leadership, coordination, or planning, add +1. On a strong hit, any allies who are present take +1 momentum.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Enter the Fray</i> (+heart) by coordinating with your team as they wade into the fight, make your move before your allies act. On a strong hit, all allies may take an automatic strong hit. On a strong hit with a match, also mark progress on any objectives in this fight.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move to influence someone (not an ally) through leadership, add +1 and take +1 momentum on a hit. On a strong hit with a match, your command galvanizes them into unexpected action. Take another +1 momentum, and mark 1 tick on your bonds legacy track.</p>\n',
        marked: false,
      },
    ],
  },
  Courier: {
    type: 'Path',
    title: 'Courier',

    items: [
      {
        text: '<p>When you <i>Swear an Iron Vow</i> to transport and protect something precious, set its safety to 5. When you <i>Undertake an Expedition</i> or <i>Set a Course</i> and score a weak hit or miss, you may suffer -1 safety as the cost. On a miss with a match, you must suffer -2 safety as the cost. When safety falls to 0, envision a major complication related to this mission. If you overcome the threat, mark progress twice on this quest. Then, set safety to 3.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Sojourn</i> during a courier mission, you may roll +safety. On a strong hit, take +1 safety or +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Fulfill Your Vow</i> to a connection by finishing a courier mission, you may <i>Develop Your Relationship</i> and mark progress twice.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 5,
      max: 5,
      min: 0,
    },
  },
  Devotant: {
    type: 'Path',
    title: 'Devotant',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>You worship a god, power, or entity. Give it a name and choose one of your stats to represent its nature. When you <i>Secure an Advantage</i> or <i>Gain Ground</i> by calling on it for guidance or blessings, roll +linked stat. On a hit, take +1 momentum or +1 spirit. On a strong hit with a match, a miracle or sign manifests; take another +1 momentum or +1 spirit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Swear an Iron Vow</i> in service to your faith, roll +linked stat. On a strong hit, mark progress. When you <i>Fulfill Your Vow</i> on a divine quest (formidable or greater) and score a hit, also mark 2 ticks on your bonds legacy track.</p>\n',
        marked: false,
        input: {
          label: 'Linked Stat',
          text: ' ',
        },
      },
      {
        text: '<p>When you <i>Hearten</i> through contemplation or sharing of your faith, you may roll +linked stat. If you do, take +1 spirit or +1 momentum on a strong hit.</p>\n',
        marked: false,
      },
    ],
  },
  Diplomat: {
    type: 'Path',
    title: 'Diplomat',

    items: [
      {
        text: '<p>When you <i>Swear an Iron Vow</i> to resolve a dispute, negotiate an agreement, or gather allies, add +1. On a strong hit, mark progress. When you <i>Fulfill Your Vow</i> on a diplomatic mission (formidable or greater) and score a hit, also mark 2 ticks on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move to defuse, reason, or negotiate, add +1. If you roll a miss, you may try a different tact. Envision this new approach, reroll all dice, and add +2. If you roll a miss yet again, face a dire complication or blow to your reputation as you <i>Pay the Price</i>.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Make a Connection</i> or <i>Sojourn</i>, add +1. If you <i>Sojourn</i> and roll a strong hit with a match, you are shown great respect; take +momentum equal to your heart.</p>\n',
        marked: false,
      },
    ],
  },
  Empath: {
    type: 'Path',
    title: 'Empath',

    items: [
      {
        text: '<p>When you read the intent, emotions, or memories of a nearby being, roll +heart. On a strong hit, you glimpse a helpful aspect of their inner self. Envision what you learn, take +2 momentum, and add +1 if you use that insight while making a move to interact with them in this scene. On a weak hit, the visions are murky; take +1 momentum. On a miss, you reveal a troubling motive or secret; <i>Pay the Price</i>.</p>\n',
        marked: true,
      },
      {
        text: '<p>As above, and if you score a hit as you read them, you may subtly influence their attitude or actions, such as making a hostile being hestitate. Take another +1 momentum. If in a fight, mark progress.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Face Danger</i> to soothe a being&rsquo;s distress by creating an empathic bond, roll +spirit and take +1 momentum on a hit. If they are an ally, also give them +2 spirit on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  'Engine Upgrade': {
    type: 'Module',
    title: 'Engine Upgrade',

    items: [
      {
        text: '<p>Your vehicle&rsquo;s finely-tuned engines speed your travels. When you <i>Undertake an Expedition</i> (+edge) and roll a strong hit with 6 on your action die, take +2 momentum.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Enter the Fray</i>, choose one (before rolling).</p>\n\n<ul>\n<li>Maneuver: Add +1 and take +1 momentum on a strong hit.</li>\n<li>Boost: Take +2 momentum on a hit.</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you make a desperate move to pursue a foe, escape a threat, or get in range, you may push your engines to their limit. If you do (decide after rolling), reroll any dice and count a weak hit as a strong hit. Then, <i>Withstand Damage</i> (-2).</p>\n',
        marked: false,
      },
    ],
  },
  Exosuit: {
    type: 'Support Vehicle',
    title: 'Exosuit',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your lumbering rig houses one pilot, is sealed against hostile environments, and is armed with fixed or held weapons. When you make a forceful, damaging, or resistant move, you may (after rolling) replace the value of your action die with the rig&rsquo;s integrity; if you do, <i>Lose Momentum</i> (-1).</p>\n',
        marked: true,
      },
      {
        text: '<p>Your exosuit is equipped with thrusters. You can maneuver in zero-g, make thrust-assisted leaps, and drop to a surface from altitude. When you burn fuel to overcome a critical obstacle (decide after rolling), you may reroll any dice. If you do, <i>Sacrifice Resources</i> (-1).</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Withstand Damage</i>, you may reroll one challenge die.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 6,
      max: 6,
      min: 0,
    },
  },
  'Expanded Hold': {
    type: 'Module',
    title: 'Expanded Hold',

    items: [
      {
        text: '<p>Your vehicle carries up to 3 cargo. When you gain +supply, you may convert it to +cargo. When you make a move +supply, you may add +cargo. When you <i>Sacrifice Resources</i>, you may instead suffer -cargo for any portion of the cost.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you roll a miss or weak hit as you make a move to barter or negotiate, and you have at least 1 cargo, you may sweeten the pot. If you do, reroll all dice and add +cargo. Then, suffer -1 cargo.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move to outrun a threat and have at least 1 cargo, you may first lighten your load by dropping cargo. If you do, suffer -cargo by the amount dropped, add +that amount, and take +2 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 3,
      max: 3,
      min: 0,
    },
  },
  Explorer: {
    type: 'Path',
    title: 'Explorer',

    items: [
      {
        text: '<p>When you <i>Explore a Waypoint</i>, take +1 momentum on a hit. When you <i>Finish an Expedition</i> and score a hit, mark 1 extra tick on your discoveries legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you come across a wondrous sight or phenomenon, such as an extraordinary planet, majestic creature, or dazzling stellar object, choose one:</p>\n\n<ul>\n<li>Find inspiration: Take +1 momentum</li>\n<li>Soak it all in: <i>Hearten</i>; add +1, and take +1 momentum on a hit.</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> by studying a newfound place from a safe position, add +1 and take +1 momentum on a hit. On a strong hit with a match, take another +1 momentum and envision an unusual aspect of the site.</p>\n',
        marked: false,
      },
    ],
  },
  Fated: {
    type: 'Path',
    title: 'Fated',

    items: [
      {
        text: '<p>Once you fill a box on your background vow progress track, mark 1 tick on your quests legacy track. When you <i>Fulfill Your Vow</i> on the background vow, your fate is at hand. Envision your final sacrifice and take an automatic strong hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Face Death</i> or <i>Face Desolation</i> while your background vow is unfulfilled, it is not yet your time. Instead of rolling, you may take an automatic strong hit. If you do, this asset counts as an impact (and you no longer have this protection) until you next <i>Reach a Milestone</i> on the background vow.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make any progress move directly related to your background vow, and roll a 10 on either challenge die, you may reroll that die. On a strong hit, take +2 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  Firebrand: {
    type: 'Path',
    title: 'Firebrand',

    items: [
      {
        text: '<p>You wield fiery energy. When you rest and meditate to gather this energy, roll +spirit. On a strong hit, take up to +3 fire. On a weak hit, take +2. On a miss, take +2 fire but <i>Endure Harm</i> (-2). Your max fire is +5. When you make moves aided by this energy to attack or overcome obstacles, add +2 and suffer -1 fire.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Endure Harm</i> and roll a strong hit with a match, you may instead ignore the harm and take +fire equal to the amount of harm faced (+1, +2, or +3).</p>\n',
        marked: false,
      },
      {
        text: '<p>When you have at least +3 fire, you may <i>Gain Ground</i> or <i>Strike</i> by unleashing hell. If you do, take an automatic strong hit and mark progress. Then, set your fire to 0.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 5,
      max: 5,
      min: 0,
    },
  },
  Fugitive: {
    type: 'Path',
    title: 'Fugitive',

    items: [
      {
        text: '<p>You are hunted by a power or authority. When you make a move, you may rely on your resourcefulness to improve the result to a strong hit. If you do, mark a box above to represent hunters closing in on you. On the third mark, a notable foe or force has tracked you down. If you overcome them or escape, clear the boxes and mark 1 tick on your quests legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move by hiding, concealing your identity, or fleeing from a pursuer, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Fulfill Your Vow</i> (extreme or greater) by clearing your name or defeating the power or authority who marked you as a fugitive, gain this ability at no cost. You may then exchange this asset for another with the same number of marked abilities.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 3,
      max: 3,
      min: 0,
    },
  },
  Gearhead: {
    type: 'Path',
    title: 'Gearhead',

    items: [
      {
        text: '<p>When you make a move to craft, repair, repurpose, or modify equipment or technology, add +1 and take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Gather Information</i> by studying or disassembling a machine or device, reroll any dice. On a match, you reveal an unexpected function, capability, or danger; mark 1 tick on your discoveries legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>With sufficient time (a couple of hours or more), you may <i>Face Danger</i> to assemble or enhance a device for a powerful but limited role. On a hit, the device is ready for use. One time only, when you or an ally make a move aided by the device, take an automatic strong hit. If you are in a fight, also mark progress.</p>\n',
        marked: false,
      },
    ],
  },
  Glowcat: {
    type: 'Companion',
    title: 'Glowcat',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your glowcat companion perceives the inner emotions and intentions of people and creatures in its vicinity, and embodies those impressions through the colors and intensity of its luminescent fur. When you <i>Secure an Advantage</i> by studying the glowcat&rsquo;s reactions in a charged interaction, you may add +your companion&rsquo;s health.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Compel</i>, the glowcat&rsquo;s reactions will help guide your approach. If the value of your action die is less than the glowcat&rsquo;s health, you may reroll it.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Endure Stress</i> in the company of the glowcat, add +1. On a strong hit with a match, take +momentum equal to their health.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 3,
      max: 3,
      min: 0,
    },
  },
  Grappler: {
    type: 'Module',
    title: 'Grappler',

    items: [
      {
        text: '<p>Your grappler can disrupt systems and snare machines and vehicles with a magnetic tether. When you take a minute or so to ready the grappler, roll +integrity or +wits. On a strong hit, the grappler is charged and may be fired. On a weak hit, charging requires extra time or focus and you <i>Lose Momentum</i> (-1). On a miss, charging fails and you must <i>Withstand Damage</i> (-2). If you make a move to attack a foe or overcome an obstacle by firing the grappler, take an automatic strong hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>If you score a strong hit when readying the grappler, you may <i>Sacrifice Resources</i> (-1) to overcharge the module. When you fire an overcharged grappler, take +2 momentum; if in a fight, also mark progress.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Take Decisive Action</i> by firing the grappler, you may reroll one challenge die.</p>\n',
        marked: false,
      },
    ],
  },
  Gunner: {
    type: 'Path',
    title: 'Gunner',
    subtitle: 'If you wield a heavy ranged personal weapon...',

    items: [
      {
        text: '<p>When you <i>Strike</i>, choose one (before rolling).</p>\n\n<ul>\n<li>Pin them down: Add +1 and take +1 momentum on a hit.</li>\n<li>Make them hurt: Mark progress on a hit.</li>\n</ul>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Take Decisive Action</i> by emptying your gun (decide before rolling), you may <i>Sacrifice Resources</i> (-1) and reroll one challenge die. If the fight continues or you are caught up another fight, <i>Check Your Gear</i> to see if you have more ammo on-hand.</p>\n',
        marked: false,
      },
      {
        text: '<p>Give your favorite gun a name. When you <i>Clash</i> with it, add +1. When you <i>Enter the Fray</i> or <i>Endure Stress</i> while wielding it, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Gunslinger: {
    type: 'Path',
    title: 'Gunslinger',
    subtitle: 'If you wield a pistol...',

    items: [
      {
        text: '<p>When you <i>Enter the Fray</i> by facing off against your foe (+heart), or by preparing to act without tipping them off (+shadow), add +1 and take +1 momentum on a hit. On a strong hit with a match, you may immediately take a shot (without making a move) and mark progress twice.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Gain Ground</i> or <i>React Under Fire</i> by moving into cover, add +1. On a strong hit, this cover gives you leverage; add +1 when you make a move to attack or defend at range. If you then score a miss, the cover is lost or compromised.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Compel</i> or <i>Gain Ground</i> with the threat of violence by holding someone at gunpoint, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Haunted: {
    type: 'Path',
    title: 'Haunted',

    items: [
      {
        text: '<p>You are haunted by the spirit of someone whose death you caused or mourn (or both). When you make a move to call upon their insight, add +1. On a weak hit, also <i>Endure Stress</i> (-1). On a strong hit with a match, mark 1 tick on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Face Death</i> guided by the spirit, add +1. On a strong hit, envision what you learn from them or about them, and mark 2 ticks on your bonds legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>One time only, when you <i>Fulfill Your Vow</i>(extreme or greater) in service to the spirit, take this ability at no cost and choose one.</p>\n\n<ul>\n<li>Let them go: Mark 2 ticks on your bonds legacy track for each marked ability, and discard this asset.</li>\n<li>Bolster your link: When you use a HAUNTED asset ability, take +1 momentum on a hit.</li>\n</ul>\n',
        marked: false,
      },
    ],
  },
  Healer: {
    type: 'Path',
    title: 'Healer',

    items: [
      {
        text: '<p>When you give medical care to <i>Heal</i> yourself or another character, add +1. If you are treating someone other than yourself, take +1 spirit or +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Gather Information</i> by studying medical evidence or biological remains, add +1 and take +1 momentum on a hit. On a strong hit with a match, you also reveal an unexpected medical anomaly; mark 1 tick on your discoveries legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>Once every day or so, when you are in a safe place with plenty of time on your hands, you may <i>Sacrifice Resources</i> (-1) and provide basic medical care for yourself, companions, or allies without risk. If you do, automatically give +1 health to everyone whose health is greater than 0.</p>\n',
        marked: false,
      },
    ],
  },
  'Heavy Cannons': {
    type: 'Module',
    title: 'Heavy Cannons',

    items: [
      {
        text: '<p>When you aim your cannons and use them to <i>Strike</i>, choose one.</p>\n\n<ul>\n<li>Strafing run: Add +1 and take +1 momentum on a hit.</li>\n<li>Focus fire: Mark progress on a hit, but <i>Lose Momentum</i> (-1).</li>\n</ul>\n',
        marked: true,
      },
      {
        text: '<p>Once per fight, when you <i>Clash</i> by committing to an all-or-nothing exchange of fire, add +1, count a weak hit as a strong hit, and mark progress on a hit. On a miss, you must suffer a dire outcome.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Compel</i>, <i>Enter the Fray</i>, or <i>Gain Ground</i> by bringing your cannons to bear and sending a promise of violence to your foe over communication channels, add +1 and take +1 momentum on a hit. On a strong hit with a match, take another +1 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  Homesteader: {
    type: 'Deed',
    title: 'Homesteader',
    subtitle: 'Once you fill 4 boxes on your bonds legacy track...',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>You have chosen or established a community as your home. When you <i>Swear an Iron Vow</i> (formidable or greater) in service to your home, reroll any dice. On a hit, mark 1 tick on your bonds legacy track. When you <i>Fulfill Your Vow</i> and score a hit, also mark 2 ticks on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Sojourn</i> in your home, choose one.</p>\n\n<ul>\n<li>Don&rsquo;t linger: Take an automatic weak hit</li>\n<li>Stay a bit: Add +1 and take +1 momentum on a hit</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Set a Course</i> for home, you may reroll your action die if its value is less than your spirit.</p>\n',
        marked: false,
      },
    ],
  },
  Hoverbike: {
    type: 'Support Vehicle',
    title: 'Hoverbike',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your unarmed hoverbike provides speedy planetside ground transport, and is equipped to carry up to two people and their gear. When you <i>Underake an Expedition</i> (+edge), take +1 momentum on a hit. On a strong hit with a match, you also surge ahead or find a new path; mark progress.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you fire the bike&rsquo;s afterburner and make a move to perform a risky maneuver, you may add +integrity and take +2 momentum on a strong hit. If you do, count a weak hit as a miss.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move while maneuvering your bike and burn momentum to improve your result, roll your action die. On a 5 or 6, do not reset momentum.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 3,
      max: 3,
      min: 0,
    },
  },
  'Internal Refit': {
    type: 'Module',
    title: 'Internal Refit',

    items: [
      {
        text: '<p>You have customized the cabins, common spaces, and environment of the ship to your needs. When you <i>Undertake an Expedition</i> (dangerous or greater), reroll any dice for the first leg of your journey. On a hit, you and your allies may envision how you make yourself at home; if you do, take +2 momentum or +1 spirit.</p>\n',
        marked: true,
      },
      {
        text: '<p>Your vessel is stocked with reserves. When you <i>Sacrifice Resources</i> and your supply is reduced to 0, first roll +integrity instead of marking unprepared. On a strong hit, take +1 supply. Otherwise, mark unprepared.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Enter the Fray</i> to oppose an invader within your vessel, reroll any dice. On a strong hit, take +momentum equal to integrity. On a strong hit with a match, also mark progress.</p>\n',
        marked: false,
      },
    ],
  },
  Kinetic: {
    type: 'Path',
    title: 'Kinetic',

    items: [
      {
        text: '<p>You wield kinetic powers. By focusing, you may remotely push, pull, lift, or constrict objects and beings that are about your size or smaller. When you are in a risky situation and draw on your powers to make a move, add +2 and <i>Lose Momentum</i> (-2).</p>\n',
        marked: true,
      },
      {
        text: '<p>As above, but you may instead draw on your powers in a desperate effort to change the outcome of an action. If you do, add +2 (after you roll) and <i>Lose Momentum</i> (-3).</p>\n',
        marked: false,
      },
      {
        text: '<p>If you have at least +8 momentum, you may attempt great kinetic feats, such as manipulating large objects and creating destructive bursts of concussive force. To do so, first reset your momentum. Then, as you make a single move fueled by your powers, take an automatic strong hit. If you are in a fight, mark progress.</p>\n',
        marked: false,
      },
    ],
  },
  'Lore Hunter': {
    type: 'Path',
    title: 'Lore Hunter',

    items: [
      {
        text: '<p>When you <i>Swear an Iron Vow</i> (formidable or greater) to recover valuable knowledge or a powerful relic, reroll any dice. When you <i>Fulfill Your Vow</i> and score a hit, also mark 2 ticks on your discoveries legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move to conduct extended research or study, you may reroll your action die if its value is less than your wits. On a hit, take +1 momentum. On a match, you piece together a surprising or harrowing new theory; also mark 1 tick on your discoveries legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you recall esoteric knowledge to <i>Secure an Advantage</i> or <i>Gain Ground</i>, add +1. On a hit, envision the obscure but helpful fact, theory, or technique you put to use, and take +1 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  Loyalist: {
    type: 'Path',
    title: 'Loyalist',

    items: [
      {
        text: '<p>When you <i>Aid Your Ally</i>, add +1 and take +1 momentum on a hit. This is in addition to the benefits taken by your ally. On a strong hit with a match, envision how this moment marks a breakthrough or milestone in your relationship; both of you may mark 1 tick on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>You may burn momentum on behalf of an ally to improve their result on a move. If you do, your ally takes +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you stand with your ally as they make a progress move, envision how you support them. Then, roll one challenge die. On a 1-9, your ally may replace one of their challenge dice with yours. On a 10, envision how you inadvertently undermine their action; your ally must replace their lowest challenge die with yours.</p>\n',
        marked: false,
      },
    ],
  },
  Marked: {
    type: 'Deed',
    title: 'Marked',
    subtitle: 'Once you fill 5 boxes on your quests legacy track...',
    input: {
      label: 'Identifier',
      text: ' ',
    },
    items: [
      {
        text: '<p>Envision the title, sigil, uniform, or tattoo you bear in recognition of your achievements. When you <i>Compel</i> or <i>Make a Connection</i> among those who would know or recognize your reputation, add +1 and take +1 momentum on a hit. On a strong hit with a match, your notoriety grows; mark 2 ticks on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you risk your reputation to overcome failure, reroll any dice. If you score a miss, make a mark on this asset. When you have 5 such marks, discard this asset.</p>\n',
        marked: false,
      },
      {
        text: '<p>Once per fight, when you <i>Gain Ground</i> through threat or leadership, you may reroll any dice and mark progress on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Medbay: {
    type: 'Module',
    title: 'Medbay',

    items: [
      {
        text: '<p>When you use your medbay to <i>Heal</i> yourself or another patient, you may reroll your action die if its value is less than your vehicle&rsquo;s integrity.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you or an ally mark the permanently harmed impact and are brought to the medbay without delay (less than an hour or so), you have a shot at making things right. If you <i>Heal</i> and score a strong hit, clear the impact (in addition to the other benefits of the move). Then, envision the scar that now serves as a reminder of the incident.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Face Danger</i> by performing a risky medical procedure, or if you <i>Gather Information</i> through an autopsy or medical examination, reroll any dice and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Mercenary: {
    type: 'Path',
    title: 'Mercenary',

    items: [
      {
        text: '<p>When you agree to wage war or defend others from war in exchange for payment or promises, you may <i>Swear an Iron Vow</i> to see the mission done. If you do, reroll any dice. When you <i>Fulfill Your Vow</i>, make the legacy reward one rank higher (1 extra box if already epic).</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Make a Connection</i> by searching out or making contact with someone in need of your services, add +1 and take +1 momentum on a hit. On a strong hit with a match, this mission pits you against an unresolved aspect of your past or a hated foe; mark 2 ticks on your quests legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Check Your Gear</i> in the midst of a fight, or <i>Resupply</i> by looting the field of battle in the aftermath of a fight, add +2.</p>\n',
        marked: false,
      },
    ],
  },
  'Missile Array': {
    type: 'Module',
    title: 'Missile Array',

    items: [
      {
        text: '<p>Your missile array is armed with 5 ammo. When you <i>Strike</i> or <i>Clash</i> with a missile attack, suffer -1 ammo and mark progress on a hit. If you <i>Resupply</i> in a place where your missiles can be replenished, you may exchange any earned +supply for +ammo.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you have at least 1 ammo and <i>Gain Ground</i> by locking a missile on target, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you have at least 3 ammo and <i>Take Decisive Action</i> by unleashing all of your missiles, roll an action die before making the progress roll. If your action die is equal to or less than ammo, you may reroll each challenge die. Then, set ammo to 0.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 5,
      max: 5,
      min: 0,
    },
  },
  Naturalist: {
    type: 'Path',
    title: 'Naturalist',

    items: [
      {
        text: '<p>When you <i>Secure an Advantage</i> or <i>Gather Information</i> using your knowledge of lifeforms or planetside ecosystems, add +1 and take + 1 momentum on a hit. On a strong hit with a match, you also confirm an obscure theory or reveal a surprising aspect of the encounter; mark 1 tick on your discoveries legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move by taking a risky action to pacify, avoid, or outwit a creature (decide before rolling), you may reroll any dice, but must <i>Lose Momentum</i> (-2).</p>\n',
        marked: false,
      },
      {
        text: '<p>You are skilled at planetside survival. When you <i>Resupply</i> to scavenge resources in a life-bearing natural environment, take +1 supply on a hit. When you <i>Face Danger</i> against an environmental threat, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Navigator: {
    type: 'Path',
    title: 'Navigator',

    items: [
      {
        text: '<p>When you <i>Set a Course</i>, choose one.</p>\n\n<ul>\n<li>Follow the fastest path: Take +2 momentum on a hit.</li>\n<li>Follow the safest path: Add +1</li>\n</ul>\n\n<p>On a strong hit with a match, you charted a new path during the journey; mark 1 tick on your discoveries legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> by charting the way forward, <i>Face Danger</i> to find a path around a hazard, or <i>Gather Information</i> about a location by studying your charts, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>Once per expedition, when you or an ally <i>Undertake an Expedition</i> and score a weak hit or miss, you may ignore that result, plot an alternate path, and make it an automatic strong hit.</p>\n',
        marked: false,
      },
    ],
  },
  Oathbreaker: {
    type: 'Deed',
    title: 'Oathbreaker',
    subtitle: 'Once you [Forsake Your Vow](#Forsake-Your-Vow)...',

    items: [
      {
        text: '<p>This asset counts as an impact. One time only, when you <i>Swear an Iron Vow</i> (extreme or greater) to redeem yourself, give that vow a special mark. When you <i>Reach a Milestone</i> on the marked vow, take +2 momentum. If you <i>Forsake Your Vow</i> on the quest, discard this asset and retain the impact.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> or <i>Compel</i> by reaffirming your commitment to your marked vow, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Fulfill Your Vow</i> on the marked quest and score a hit, you find redemption and automatically gain this ability at no cost. You may then improve one of your stats by +1 and discard this asset. Once the asset is discarded, you may not take it again.</p>\n',
        marked: false,
      },
    ],
  },
  Outcast: {
    type: 'Path',
    title: 'Outcast',

    items: [
      {
        text: '<p>When you <i>Hearten</i> in isolation, you may attempt to find solace in fond memories or a hopeful wish. If you do (decide before rolling), reroll any dice but count a strong hit as a weak hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Sacrifice Resources</i> and your supply is reduced to 0, roll +wits. On a strong hit, you manage to scrape by and take +1 supply. On a weak hit, you may <i>Lose Momentum</i> (-1) in exchange for +1 supply. On a miss, your supply remains at 0 and you <i>Lose Momentum</i> (-1).</p>\n',
        marked: false,
      },
      {
        text: '<p>When you or an ally <i>Sojourn</i> and score a strong hit with a match, you may envision encountering someone who knows or understands you. If you Make a Connectionwith them, take an automatic strong hit and mark 1 tick on your bonds legacy track.</p>\n',
        marked: false,
      },
    ],
  },
  Overseer: {
    type: 'Module',
    title: 'Overseer',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your AI module keeps watch over the vehicle&rsquo;s systems and sensor data. When you <i>Secure an Advantage</i> or <i>Gain Ground</i> by talking through a situation with the overseer, you may roll +integrity. If you do, take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Withstand Damage</i> and roll on the miss table, the overseer will do what it can to help. Roll twice on the table and choose either result.</p>\n',
        marked: false,
      },
      {
        text: '<p>The overseer can pilot the vehicle independently. When you <i>Face Danger</i> by handing over control to the AI in an emergency, or to summon the vehicle remotely within a hazardous situation, you may roll +integrity. If you do, take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  'Protocol Bot': {
    type: 'Companion',
    title: 'Protocol Bot',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your protocol bot companion is programmed with knowledge of cultures, languages, and customs. When you are aided by the bot as you make a move in a formal social interaction, add +1. On a strong hit with a match, you learn something which builds understanding or empathy; also mark 1 tick on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you first visit or interact with a new community or culture, you may ask for the bot&rsquo;s insight. If you do, envision what you learn and take +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>If you make a move in a charged interaction and the value of your action die is less than the bot&rsquo;s health, you may reroll it as the bot interjects with their commentary or advice.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 3,
      max: 3,
      min: 0,
    },
  },
  'Reinforced Hull': {
    type: 'Module',
    title: 'Reinforced Hull',

    items: [
      {
        text: '<p>Your vehicle is clad in iron. When you <i>Withstand Damage</i>, add +1. On a strong hit, take +1 momentum.</p>\n',
        marked: true,
      },
      {
        text: '<p>Your plated hull is given a fierce and distinctive color or design. When you arrive at a place where your reputation is a factor, take +1 momentum. When you <i>Enter the Fray</i> against a foe who would know your reputation, take +momentum equal to your vehicle&rsquo;s integrity on a strong hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>React Under Fire</i> by letting your plated hull take the hit, add +1 and take +1 momentum on a hit. On a strong hit with a match, take another +1 momentum as you surge through the chaos and put yourself in perfect position. On a miss, <i>Pay the Price</i> by marking this component as broken.</p>\n',
        marked: false,
      },
    ],
  },
  'Research Lab': {
    type: 'Module',
    title: 'Research Lab',

    items: [
      {
        text: '<p>When you use your lab to <i>Secure an Advantage</i> or <i>Gather Information</i> through careful analysis or experimentation, add +1 and take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Face Danger</i> to isolate or secure a hazardous specimen, reroll any dice.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Swear an Iron Vow</i> to undertake a long-term research project (extreme or greater), reroll any dice. When you obtain crucial samples, equipment, or data, mark progress on the quest and take +2 momentum. When you devote extended time to the project in your lab, <i>Face Danger</i> and add +1. On a hit, mark progress. On a strong hit with a match, mark progress twice. When you <i>Fulfill Your Vow</i> and score a hit, also mark one box on your discoveries legacy track.</p>\n',
        marked: false,
      },
    ],
  },
  Revenant: {
    type: 'Deed',
    title: 'Revenant',
    subtitle: 'Once you [Face Death](#Face-Death)...',

    items: [
      {
        text: '<p>When you are at 0 health, and <i>Endure Harm</i> or <i>Face Death</i>, add +1. You may then reroll your action die if its value is less than your spirit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Take Decisive Action</i> by bringing death to a foe, you may burn momentum to zero out one (not both) of the challenge dice if your momentum is greater than the value of that die. If you do, <i>Endure Stress</i> (-2).</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Gather Information</i> by studying a place where death left its mark, you may roll +heart. If you do, take +1 momentum on a hit. On a strong hit with a match, you experience a detailed vision or insightful revelation of what occurred here; take +1 momentum more.</p>\n',
        marked: false,
      },
    ],
  },
  Rockhorn: {
    type: 'Companion',
    title: 'Rockhorn',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your rockhorn companion uses its resilient, stone-like hide and brute strength to overcome threats. When you make a move by sending the rockhorn to directly attack a foe or smash an obstacle, roll +its health.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make the <i>Companion Takes a Hit</i> move for the rockhorn, count a weak hit as a strong hit. On a strong hit with a match, its rapid healing makes it unstoppable; give it another +1 health or take +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>The rockhorn will come to your aid in your most vulnerable moments. When you <i>Endure Harm</i> or <i>Endure Stress</i> and roll a miss, you may reroll your action die if its value is less than the rockhorn&rsquo;s health.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 5,
      max: 5,
      min: 0,
    },
  },
  Rover: {
    type: 'Support Vehicle',
    title: 'Rover',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your unarmed rover provides protected planetside transport. When you <i>Undertake an Expedition</i> or <i>Set a Course</i>, add +1. When you <i>Finish an Expedition</i> in your rover, you may reroll one challenge die.</p>\n',
        marked: true,
      },
      {
        text: '<p>You may equip your rover with one module asset at no extra cost. When you <i>Withstand Damage</i>, the module can be broken or destroyed as with a command vehicle. If you reconfigure your rover, spend 1 experience, discard the module, and equip another with the same number of marked abilities.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Face Danger</i> or <i>React Under Fire</i> by taking a hit or crashing through an obstacle, you may roll +integrity. If you do, take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 5,
      max: 5,
      min: 0,
    },
  },
  Scavenger: {
    type: 'Path',
    title: 'Scavenger',

    items: [
      {
        text: '<p>When you <i>Gather Information</i> or <i>Resupply</i> by scavenging a wreck, ruin, or abandoned site, add +1 and take +1 momentum on a hit. On a strong hit with a match, you also find something of unique value, significance, or function; envision the nature of this discovery, take +2 momentum, and mark 2 ticks on your discoveries legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Face Danger</i> to cobble together an ad hoc tool, device, or weapon, envision what you intend to create. On a hit, you may add +1 when making a move aided by the item. If you roll a 1 on your action die while using the item, it is permanently broken, lost, or depleted.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Check Your Gear</i>, roll +wits or +supply (whichever is highest) and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Scoundrel: {
    type: 'Path',
    title: 'Scoundrel',

    items: [
      {
        text: '<p>When you make a move by lying, bluffing, stealing, or cheating, add +2. On a strong hit with a match, your deception creates an unexpected opportunity; take the value of your shadow as +momentum.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Make a Connection</i> to search out a new contact, you may roll +shadow. If you do, reroll any dice on a miss and envision how your reputation or underworld contacts lead you to a disreputable connection.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a quick escape or con your way out of a situation and burn momentum to gain a strong hit, take +1 momentum after you reset. If you envision how this momentary success leaves you fated for future trouble, mark 2 ticks on your quests legacy track.</p>\n',
        marked: false,
      },
    ],
  },
  Seer: {
    type: 'Path',
    title: 'Seer',

    items: [
      {
        text: '<p>When you envision experiencing a prophetic dream, you may <i>Ask the Oracle</i> for details using an interpretive oracle such as Action/Theme or Descriptor/Focus. If you record the answer, and later face a situation which gives truth to the vision, take an automatic strong hit (one time only) when making a move to act on your foresight. Then, clear the prophecy. Only one prophecy can be active at a time.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you focus or medidate to <i>Gather Information</i> about a place, being, or situation (in person or remotely), roll +spirit and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you or an ally roll a match as you <i>Sojourn</i> in a community or <i>Undertake an Expedition</i> within a site, you may envision gaining sudden and unbidden insight about the location. If you do, take +2 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  'Sensor Array': {
    type: 'Module',
    title: 'Sensor Array',

    items: [
      {
        text: '<p>Your advanced sensors scan the paths ahead to help spot dangers. When you <i>Undertake an Expedition</i> (+wits), and roll a 10 on only one challenge die, you may reroll that die.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> or <i>Gather Information</i> by scanning your vehicle&rsquo;s surroundings or analyzing a nearby object, choose one and take +1 momentum on a hit.</p>\n\n<ul>\n<li>Manual scan: Add +1</li>\n<li>Automated scan: Instead of rolling the action die, make it the value of your vehicle&rsquo;s integrity</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Enter the Fray</i> against an ambush, or <i>Face Danger</i> to detect a hidden threat, you may roll +integrity. If you do, reroll any dice and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  'Service Pod': {
    type: 'Support Vehicle',
    title: 'Service Pod',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your utility vehicle houses one pilot for short-range, low gravity operations. When you make a move using the pod&rsquo;s manipulator arms to perform a delicate or forceful task, add +1 and take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Face Danger</i>, <i>Gain Ground</i>, or <i>React Under Fire</i> by maneuvering your pod through a hazardous or obstructed area, choose an approach and roll +integrity.</p>\n\n<ul>\n<li>Careful: Add +2 and <i>Lose Momentum</i> (-1)</li>\n<li>Reckless: Take +1 momentum on a hit</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move while controlling the pod and push its capabilities to the limit, you may take an automatic strong hit. If you do, <i>Withstand Damage</i> (-2).</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Shade: {
    type: 'Path',
    title: 'Shade',

    items: [
      {
        text: '<p>Drawing on esoteric energies, you may instantly cloak your form in the shadowy veil of the void. When you are veiled and make a move to ambush, hide, or sneak, set the value of your action die as 5 instead of rolling that die. In darkness, make it 6. On a miss, in addition to any other cost, you are revealed and can&rsquo;t veil yourself until the current situation is resolved.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you expand your veil to immerse your surroundings in darkness, roll +shadow. On a strong hit, the darkness extends to all adjacent spaces. On a weak hit, only your immediate surroundings are made dark. On a miss, you fail and draw unwanted attention.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you intentionally drop your veil to reveal yourself for dramatic effect, foregoing its use in this situation, take +2 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  Shields: {
    type: 'Module',
    title: 'Shields',

    items: [
      {
        text: '<p>When you raise your shields, roll +your vehicle&rsquo;s integrity or +wits. On a strong hit, set your shields to 4. On a weak hit, make them 3. On a miss, make them 2 but <i>Lose Momentum</i> (-1). Then, if you <i>Withstand Damage</i>, ignore damage up to the value of your shields and suffer -1 shields. Raised shields last for a few minutes. If reduced to 0, they cannot be raised again for an hour or so.</p>\n',
        marked: true,
      },
      {
        text: '<p>You may <i>React Under Fire</i> by letting your shields take the blow. If you do, roll +shields and take +2 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Enter the Fray</i> and score a strong hit, you may raise your shields to 3 without rolling. If you do, take +1 momentum.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Shuttle: {
    type: 'Support Vehicle',
    title: 'Shuttle',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your unarmed shuttle provides short-range transport for several people and equipment through space or atmosphere. When you travel to a location (not your command vehicle), you and your allies may take +1 momentum when you arrive.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Face Danger</i> or <i>React Under Fire</i> to navigate through hazardous skies or around obstacles, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>You shuttle is sealed against high pressure environments, can travel underwater, and is more resistant to damage; when you <i>Withstand Damage</i>, add +1.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Sidekick: {
    type: 'Companion',
    title: 'Sidekick',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your sidekick has a helpful expertise. When you make a move outside of a fight directly aided by their expertise, you may reroll your action die if its value is less than your sidekick&rsquo;s health. If you then score a strong hit with a match, mark 1 tick on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Enter the Fray</i> with the support of your sidekick, take +2 momentum on a hit. When you <i>Clash</i> together, add +1.</p>\n',
        marked: false,
        input: {
          label: 'Expertise',
          text: ' ',
        },
      },
      {
        text: '<p>When your sidekick acts to get you out of a tough spot, you may <i>Face Danger</i> or <i>React Under Fire</i> and roll +their health (instead of your own stat). On a hit, take +1 momentum.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Skiff: {
    type: 'Support Vehicle',
    title: 'Skiff',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your unarmed flatbed hover-vehicle carries several people, gear, and cargo over land or water. When you <i>Undertake an Expedition</i> or <i>Set a Course</i>, you may rely on the skiff&rsquo;s simple reliability and roll +integrity. If you do, take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>Your skiff is armed with a turreted cannon. When you <i>Strike</i> or <i>Clash</i> by firing the cannon, roll +integrity and take +1 momentum on a hit. On a strong hit with a match, your shots cause extra destruction or create havoc; mark progress.</p>\n',
        marked: false,
      },
      {
        text: '<p>Your skiff is fully stocked. When you <i>Check Your Gear</i>, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Slayer: {
    type: 'Path',
    title: 'Slayer',

    items: [
      {
        text: '<p>When you make a move to investigate, track, or stalk a hostile creature, add +1 and take +1 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Swear an Iron Vow</i> to slay a hostile creature in service to a community, reroll any dice. When you <i>Fulfill Your Vow</i> and score a hit, also mark 2 ticks on your bonds legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Enter the Fray</i> against a hostile creature (dangerous or greater), take +2 momentum. If you choose to face the creature on its own terms, envision the crucial weapon, protection, or aid you set aside, and set the objective one rank higher. If you <i>Take Decisive Action</i> after making this sacrifice and score a strong hit, take a trophy of your victory and mark 2 ticks on your quests legacy track.</p>\n',
        marked: false,
      },
    ],
  },
  Sniper: {
    type: 'Path',
    title: 'Sniper',
    subtitle: 'If you wield a rifle...',

    items: [
      {
        text: '<p>When you <i>Face Danger</i> outside of a fight to preemptively take out a single minor foe from a distance, add +1. On a hit, they are out of action and no longer a threat. If other foes remain and you <i>Enter the Fray</i> against them, mark progress.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Strike</i> from a distance with time enough to line up your shot, you may roll +wits. If you do, mark progress on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> by studying a distant situation through the scope of your rifle, or <i>Gain Ground</i> by readying your shot and taking careful aim, you may sacrifice time in exchange for greater certainty. If you do (decide before rolling), <i>Lose Momentum</i> (-1, -2, or -3) and add that amount. Then, take +1 momentum on a strong hit.</p>\n',
        marked: false,
      },
    ],
  },
  'Snub Fighter': {
    type: 'Support Vehicle',
    title: 'Snub Fighter',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your snub fighter carries a single pilot for space or atmospheric flight and combat. When you <i>Enter the Fray</i>, you may roll +integrity; if you do, take +2 momentum on a hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Strike</i> or <i>Clash</i>, add +1. On a strong hit with a match, mark progress.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you personally defeat a notable foe in your snub fighter, envision the victory mark you make on the fuselage. Tally your victories in this box. For every five, mark 2 ticks on your quests legacy track.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Sprite: {
    type: 'Companion',
    title: 'Sprite',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your sprite companion alters its delicate, crystalline form to fly, swim, or scurry, and can covertly navigate even the harshest of environments. When you make a move by sending it to perform trickery (such as creating a distraction, sneaking into a protected location, or stealing an object) add +its health.</p>\n',
        marked: true,
      },
      {
        text: '<p>You are attuned to the resonance of the sprite&rsquo;s crystalline structure, and can communicate with it at a distance and perceive through its senses. When you <i>Secure an Advantage</i> by observing a situation from its perspective, or remotely <i>Gather Information</i>, add +its health.</p>\n',
        marked: false,
      },
      {
        text: '<p>With a moment&rsquo;s rest, the sprite can mend its form and return automatically to max health.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 2,
      max: 2,
      min: 0,
    },
  },
  Starship: {
    type: 'Command Vehicle',
    title: 'Starship',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your armed, multipurpose starship is suited for interstellar and atmospheric flight. It can comfortably transport several people, has space for cargo, and can carry and launch support vehicles. When you <i>Advance</i>, you may spend experience to equip this vehicle with module assets.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Finish an Expedition</i> (dangerous or greater) in your starship and score a hit, this journey strengthened your ties to your ship and any fellow travelers. You and your allies may mark 1 tick on your bonds legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Withstand Damage</i>, you may roll +heart. If you do, <i>Endure Stress</i> (-1) on a weak hit or miss.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 5,
      max: 5,
      min: 0,
    },
  },
  'Stealth Tech': {
    type: 'Module',
    title: 'Stealth Tech',

    items: [
      {
        text: '<p>When you make a move against a specific foe or threat to avoid detection, add +1. If you <i>Enter the Fray</i> by ambushing an unaware foe, add +1 and mark progress on a strong hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Undertake an Expedition</i> (+shadow), and roll a 1 on your action die, you may reroll it.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you are poised to <i>Strike</i> from hiding, you may roll +shadow. If you do, choose one (before rolling).</p>\n\n<ul>\n<li>Strike true: Reroll any dice.</li>\n<li>Strike hard: Mark progress on a hit.</li>\n</ul>\n\n<p>On a strong hit with a match, you also remain totally undetected; take +2 momentum and add +1 on your next <i>Strike</i>.</p>\n',
        marked: false,
      },
    ],
  },
  'Survey Bot': {
    type: 'Companion',
    title: 'Survey Bot',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your survey bot companion scans the path ahead. When you <i>Undertake an Expedition</i> (+wits) overland or within a site, add +1.</p>\n',
        marked: true,
      },
      {
        text: '<p>Once per expedition, when you <i>Secure an Advantage</i> by sending the bot to scout ahead, roll +its health. On a hit, also mark progress on the expedition. On a strong hit with a match, the bot uncovers an unexpected feature or location; envision what it reveals and mark one tick on your discoveries legacy track.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Explore a Waypoint</i> aided by the bot&rsquo;s sensors, or <i>Face Danger</i> to detect a threat, roll +its health and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 3,
      max: 3,
      min: 0,
    },
  },
  Symbiote: {
    type: 'Companion',
    title: 'Symbiote',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>You are physically bound to a being with +2 health. When you make aggressive moves while giving yourself to the symbiote&rsquo;s power, add +its health. If you face physical harm, choose either the <i>Endure Harm</i> or <i>Companion Takes a Hit</i> move. To restore the symbiote&rsquo;s health, you must <i>Endure Stress</i> and give the symbiote +health equal to the -spirit you face. If you make a move aided by the symbiote and roll a 1 on your action die, your fragile bond is broken for several hours.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move and heed the symbiote&rsquo;s guidance (decide after rolling), you may reroll any dice. Then, <i>Endure Stress</i> (-2).</p>\n',
        marked: false,
      },
      {
        text: '<p>The symbiote gains power and has +3 health.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 2,
      max: 2,
      min: 0,
    },
  },
  Tech: {
    type: 'Path',
    title: 'Tech',

    items: [
      {
        text: '<p>When you make a move to configure, optimize, hack, or disrupt an electronic system, add +1. On a weak hit, you can choose to press your luck. If you do, reroll all dice and add +2 (instead of +1).</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Withstand Damage</i> and score a miss, you may attempt to reroute power or reboot critical systems. If you do, first <i>Lose Momentum</i> (-2). Then, reroll all dice, add +wits instead of +integrity, and count a weak hit as a miss.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Face Danger</i> or <i>Secure an Advantage</i> by creating a computer program to perform a specific, complex function, add +2 and take +1 momentum on a hit. One time only, when you trigger the program to fulfill its purpose, reroll any dice.</p>\n',
        marked: false,
      },
    ],
  },
  Trader: {
    type: 'Path',
    title: 'Trader',

    items: [
      {
        text: '<p>When you <i>Sojourn</i> or <i>Compel</i>, you may roll +supply. If you do, <i>Sacrifice Resources</i> (-1).</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Make a Connection</i> with a merchant or supplier, add +1. When you <i>Resupply</i> by bartering with them, reroll your action die if its value is less than your supply. On a strong hit, take +1 momentum or +1 supply.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you or an ally <i>Sojourn</i> and roll a strong hit with a match, you have a chance to secure a unique item or valuable payload. Envision the nature of the opportunity and the obstacle you must overcome to aquire it. If you are successful, mark 2 ticks on your quests legacy track. One time only, you may use this acquisition to gain an automatic strong hit on any move where your resources are a factor.</p>\n',
        marked: false,
      },
    ],
  },
  'Utility Bot': {
    type: 'Companion',
    title: 'Utility Bot',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your utility bot companion has helpful tools at-hand. When you make a move by directing it to access a system, cut through an obstacle, analyze a mechanical issue, or assemble or disassemble a device, roll +its health and take +1 momentum on a hit. On a strong hit with a match, it reveals an unexpected advantage or insight; take another +1 momentum.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Repair</i> aided by the bot, add +1. On a miss, it reveals an alternative approach which will take extra time; you may reroll any dice, but first <i>Lose Momentum</i> (-2).</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Check Your Gear</i> to see if the bot has a specific tool or technique available, roll +its health and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  Vanguard: {
    type: 'Deed',
    title: 'Vanguard',
    subtitle: 'Once you fill 6 boxes on your discoveries legacy track...',

    items: [
      {
        text: '<p>When you seek safe haven in a remote environment, make a progress roll against your discoveries legacy track. On a strong hit, you find or establish a safe location and may add +2 whenever you make a recovery move there. If you roll a miss when making a recovery move, the place is no longer safe. On a weak hit, as above, but add +1 when you make a recovery move. On a miss, you are drawn into a bad situation and must <i>Pay the Price</i>.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move +wits and score a strong hit with a match, your hard-won experience lends insight; take +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Endure Stress</i>, you may roll +wits. If you do, take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  'Vehicle Bay': {
    type: 'Module',
    title: 'Vehicle Bay',

    items: [
      {
        text: '<p>You may purchase or upgrade a support vehicle for 1 less experience. When you <i>Repair</i> a battered support vehicle, spend 1 repair point (instead of 2).</p>\n',
        marked: true,
      },
      {
        text: '<p>When a support vehicle is destroyed, and you are able to retrieve its wreckage, you may <i>Ask the Oracle</i> using the yes/no table if something can be salvaged from the mess. Make it &lsquo;<sup>50</sup>&frasl;<sub>50</sub>&rsquo;. On a yes, spend 2 experience to restore the support vehicle asset with all previously marked abilities. Until you <i>Repair</i> and bring it back to full working order, the vehicle is battered with 0 integrity.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move to launch from or land on your command vehicle in a perilous situation or environment, reroll any dice and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Vestige: {
    type: 'Path',
    title: 'Vestige',
    input: {
      label: 'Last of',
      text: ' ',
    },
    items: [
      {
        text: '<p>You are all that remains of a people, culture, or tradition. When you <i>Face Death</i> or <i>Face Desolation</i>, memories or visions of your heritage give you the strength to carry on. Envision how this manifests, and reroll any dice. On a strong hit with a match, a surprising new aspect of your heritage is revealed; take +2 momentum and mark 2 ticks on your bonds legacy track.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> or <i>Compel</i> through a tale, performance, or ceremony, envision what you reveal of your legacy. Then, add +1 and take +2 momentum on a hit.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Hearten</i> by taking solace in the power of your legacy, add +1 and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Veteran: {
    type: 'Path',
    title: 'Veteran',

    items: [
      {
        text: '<p>When you are in a fight, increase your momentum reset by 1. Then, if you burn momentum to improve your result, add +1 on your next move.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Make a Connection</i>, add +1. If you roll a match, you have a history.</p>\n\n<ul>\n<li>On a strong hit with a match, you once fought beside them, and they owe you a favor. Mark 1 tick on your bonds legacy track, and <i>Develop Your Relationship</i> now.</li>\n<li>On a miss with a match, you once fought against them, and they hold a grudge.</li>\n</ul>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> or <i>Gain Ground</i> by recounting or recalling a hard-won lesson from your battlefield experiences, envision the memory and add +1. On a hit, take +1 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  Voidborn: {
    type: 'Path',
    title: 'Voidborn',

    items: [
      {
        text: '<p>You are most suited to life in the limitless void. When you are in space (or a spacebound vehicle or station), increase your momentum reset by 1. When you enter a planetside or high gravity environment, <i>Lose Momentum</i> (-1).</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Sojourn</i> or <i>Make a Connection</i> within a spacebound community, add +1. If you <i>Hearten</i> there and score a strong hit, take +1 spirit or +1 momentum.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move to perform an agile physical maneuver (such as leaping or evading) in a low gravity environment, add +1 and take +1 momentum on a hit. On a strong hit with a match, you build speed or put yourself in perfect position; take another +1 momentum.</p>\n',
        marked: false,
      },
    ],
  },
  Voidglider: {
    type: 'Companion',
    title: 'Voidglider',
    input: {
      label: 'Name',
      text: ' ',
    },
    items: [
      {
        text: '<p>Your voidglider companion cruises in your starship&rsquo;s energy wake and helps guide the way on spacebound expeditions. When you <i>Undertake an Expedition</i> and roll a strong hit, take +1 momentum.</p>\n',
        marked: true,
      },
      {
        text: '<p>The voidglider is harnessed and trained as a mount, and can be ridden for short-range spacebound transport. When you are riding the voidglider and make a move to detect or evade a threat by relying on its instincts, roll +its health.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you make a move by signaling the voidglider to distract or attack a spacebound foe, roll +its health and take +1 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
    track: {
      value: 4,
      max: 4,
      min: 0,
    },
  },
  'Weapon Master': {
    type: 'Path',
    title: 'Weapon Master',

    items: [
      {
        text: '<p>You are a walking armory, with a weapon for every occassion. When you <i>Enter the Fray</i> in personal combat, add +1 and take +1 momentum on a hit. Once per fight, when you <i>Gain Ground</i> by switching weapons or changing tactics, take an automatic strong hit.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you <i>Strike</i> using a personal weapon which has limited ammo or a single-use mode, add +1 and mark progress on a hit. Then, <i>Sacrifice Resources</i> (-1). If you score a strong hit on this attack and immediately <i>Take Decisive Action</i>, you may retain the value of one challenge die from your <i>Strike</i> action instead of rolling that die.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Secure an Advantage</i> by suiting up and gathering your gear for a perilous encounter or mission, you may roll +supply. If you do, take +2 momentum on a hit.</p>\n',
        marked: false,
      },
    ],
  },
  Workshop: {
    type: 'Module',
    title: 'Workshop',

    items: [
      {
        text: '<p>When you <i>Repair</i> in the field, add +1.</p>\n',
        marked: true,
      },
      {
        text: '<p>When you make a move in your workshop to craft, modify, deactivate, or disassemble a device or machine, you may reroll your action die if its value is less than your vehicle&rsquo;s integrity.</p>\n',
        marked: false,
      },
      {
        text: '<p>When you <i>Swear an Iron Vow</i> to undertake a long-term engineering project (extreme or greater), reroll any dice. When you obtain a crucial part or resource, mark progress on the quest and take +2 momentum. When you devote extended time to the project in your workshop, <i>Face Danger</i> and add +1. On a hit, mark progress. On a strong hit with a match, mark progress twice. When you <i>Fulfill Your Vow</i> and score a hit, mark one extra box on your quests legacy track.</p>\n',
        marked: false,
      },
    ],
  },
};
