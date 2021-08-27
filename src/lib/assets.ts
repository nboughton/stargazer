import { IAsset } from 'src/components/models'
import { v4 as uuid } from 'uuid'

export const NewAsset = (): IAsset => {
  return {
    id: uuid(),
    title: 'Custom Asset',
    type: 'Custom',
    items: [
      {
        text: 'Asset item text 1',
        marked: false
      },
      {
        text: 'Asset item text 2',
        marked: false
      },
      {
        text: 'Asset item text 3',
        marked: false
      }
    ]
  }
}

export const Assets: { [index: string]: IAsset } = {
  Alchemist: {
    type: 'Path',
    title: 'Alchemist',
    items: [
      {
        text: 'When you create an elixir, choose an effect: Deftness (edge), audacity (heart), vigor (iron), slyness (shadow), or clarity (wits). Then, suffer -1 supply and roll +wits. On a strong hit, you create a single dose. The character who consumes the elixir must <i>Face Danger</i> +iron and score a hit, after which they add +1 when making moves with the related stat until their health, spirit, or momentum fall below +1. On a weak hit, as above, but suffer an additional -1 supply to create it.',
        marked: true
      },
      {
        text: 'As above, and you may choose two effects for a single dose, or create two doses of the same effect.',
        marked: false
      },
      {
        text: 'When you prepare an elixir, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  'Animal Kin': {
    type: 'Path',
    title: 'Animal Kin',
    items: [
      {
        text: 'When you make a move to pacify, calm, control, aid, or fend off an animal (or an animal or beast companion), add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'You may add or upgrade an animal or beast companion asset for 1 fewer experience. Once you mark all their abilities, you may <i>Forge a Bond</i> with them and take an automatic strong hit. When you do, mark a bond twice and take 1 experience.',
        marked: false
      },
      {
        text: 'Once per fight, when you leverage your animal or beast companion to make a move, reroll any dice. On a hit, take +1 momentum.',
        marked: false
      }
    ]
  },
  Archer: {
    type: 'Combat Talent',
    title: 'Archer',
    subtitle: 'If you wield a bow...',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> by taking a moment to aim, choose your approach and add +1.<br />  * Trust your instincts: Roll +wits, and take +2 momentum on a strong hit.<br />  * Line up your shot: Roll +edge, and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'Once per fight, when you <i>Strike</i> or <i>Clash</i>, you may take extra shots and suffer -1 supply (decide before rolling). When you do, reroll any dice. On a hit, inflict +2 harm and take +1 momentum.',
        marked: false
      },
      {
        text: 'When you <i>Resupply</i> by hunting, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Augur: {
    type: 'Ritual',
    title: 'Augur',
    items: [
      {
        text: 'When you summon a flock of crows and ask a single question, roll +wits. On a strong hit, you interpret their calls as a helpful omen. Envision the response (<i>Ask the Oracle</i> if unsure) and take +2 momentum. On a weak hit, the crows ignore your question and offer a clue to an unrelated problem or opportunity in this area. Envision what you learn (<i>Ask the Oracle</i> if unsure), and take +1 momentum.',
        marked: true
      },
      {
        text: 'As above, and the crows will also help guide you on the proper path. On a hit, add +1 on the next segment when you <i>Undertake a Journey</i>.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Awakening: {
    type: 'Ritual',
    title: 'Awakening',
    items: [
      {
        text: 'When you create a simulacrum, roll +heart. On a strong hit, your creation is given unnatural life. If it aids you as you make a move to assault or overcome an obstacle through strength, add +2. It has 3 health and suffers harm as appropriate, but is not a companion and may not be healed. At 0 health, it is dead. On a weak hit, as above, but if you roll a 1 on your action die when aided by your creation, you must <i>Face Danger</i> +heart to keep it from turning on you (as a formidable foe).',
        marked: true
      },
      {
        text: 'Your simulacrum has 6 health.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 3,
      min: 0
    }
  },
  'Banner-Sworn': {
    type: 'Path',
    title: 'Banner-Sworn',
    subtitle: 'Once you mark a bond with a leader or faction...',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Swear an Iron Vow</i> to serve your leader or faction on a mission, you may reroll any dice. When you <i>Fulfill Your Vow</i> and mark experience, take +1 experience.',
        marked: true
      },
      {
        text: 'When you <i>Sojourn</i> or <i>Make Camp</i> in the company of your banner-kin, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Enter the Fray</i> bearing your banner, add +1 and take +1 momentum on a hit. When you burn momentum while carrying your banner in combat, take +1 momentum after you reset.',
        marked: false
      }
    ]
  },
  'Battle-Scarred': {
    type: 'Path',
    title: 'Battle-Scarred',
    subtitle: 'Once you become maimed...',
    items: [
      {
        text: 'You focus your energies: Reduce your edge or iron by 1 and add +2 to wits or heart, or +1 to each (to a maximum of +4).',
        marked: false
      },
      {
        text: 'You overcome your limitations: Reduce your maximum health by 1. Maimed no longer counts as a debility, and does not reduce your maximum momentum or reset value. When you <i>Endure Stress</i> +heart, take +1 momentum on a strong hit.',
        marked: false
      },
      {
        text: 'You have stared down death before: When you are at 0 health and <i>Endure Harm</i>, you may roll +wits or +heart (instead of +health or +iron). If you do, take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Berserker: {
    type: 'Combat Talent',
    title: 'Berserker',
    subtitle: 'If you are clad only in animal pelts...',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> or <i>Compel</i> by embodying your wild nature, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Strike</i> or <i>Clash</i> by unleashing your rage (decide before rolling), inflict +1 harm on a hit. Then, choose one.<br />  * Push yourself: <i>Endure Harm</i> (1 harm).<br />  * Lose yourself: <i>Endure Stress</i> (1 stress).',
        marked: false
      },
      {
        text: 'When you <i>Endure Harm</i> in a fight, and your health is above 0, you may let the pain inflame your wildness (decide before rolling). If you then score a strong hit and choose to embrace the pain, take +momentum equal to your remaining health. A weak hit counts as a miss.',
        marked: false
      }
    ]
  },
  Bind: {
    type: 'Ritual',
    title: 'Bind',
    items: [
      {
        text: 'When you wear an animal pelt and dance in moonlight, roll +wits. On a strong hit, you or an ally may wear the pelt and add +1 when making moves with the related stat (wolf-edge; bear-iron; deer-heart; fox-shadow; boar-wits). If the wearer rolls a 1 on their action die while making a move using the pelt, the magic is spent. On a weak hit, as above, but the wilds call as you dance; <i>Endure Stress</i> (2 stress).',
        marked: true
      },
      {
        text: 'As above, and you may instead perform this ritual wearing the pelt of a beast. If you do, name the related stat and add +2 (instead of +1).',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  'Blade-Bound': {
    type: 'Path',
    title: 'Blade-Bound',
    subtitle: 'Once you mark a bond with a kin-blade, a sentient weapon imbued with the spirit of your ancestor...',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Enter the Fray</i> or <i>Draw the Circle</i> while wielding your kin-blade, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Gather Information</i> by listening to the whispers of your kin- blade, add +1 and take +2 momentum on a hit. Then, <i>Endure Stress</i> (2 stress).',
        marked: false
      },
      {
        text: 'When you <i>Strike</i> with your kin-blade to inflict savage harm (decide before rolling), add +1 and inflict +2 harm on a hit. Then, <i>Endure Stress</i> (2 stress).',
        marked: false
      }
    ]
  },
  Bonded: {
    type: 'Path',
    title: 'Bonded',
    items: [
      {
        text: 'When you make a move which gives you an add for sharing a bond, add +1 more.',
        marked: true
      },
      {
        text: 'When you completely fill a box on your bonds progress track, envision what your relationships have taught you. Then, take 1 experience and +2 momentum.',
        marked: false
      },
      {
        text: 'When you make a move in a crucial moment and score a miss, you may cling to thoughts of your bond-kin for courage or encouragement. If you do, reroll any dice. On another miss, in addition to the outcome of the move, you must mark shaken or corrupted. If both debilities are already marked, <i>Face Desolation</i>.',
        marked: false
      }
    ]
  },
  Brawler: {
    type: 'Combat Talent',
    title: 'Brawler',
    subtitle: 'If you are unarmed or fighting with a non-deadly weapon...',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> +iron by engaging in close-quarters brawling (such as punching, tripping, or grappling), add +1. If you score a hit, you may also inflict 1 harm.',
        marked: true
      },
      {
        text: 'When you use an unarmed attack or simple weapon to <i>Strike</i> with deadly intent, add +2 and inflict 2 harm on a hit (instead of 1). On a weak hit or miss, suffer -1 momentum (in addition to any other outcome of the move).',
        marked: false
      },
      {
        text: 'When you <i>Face Danger</i> or <i>Clash</i> against a brawling attack, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  'Cave Lion': {
    type: 'Companion',
    title: 'Cave Lion',
    subtitle: 'Your cat takes down its prey.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When your cat chases down big game, you may <i>Resupply</i> with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit.',
        marked: false
      },
      {
        text: 'When you <i>Enter the Fray</i> or <i>Strike</i> by sending your cat to attack, roll +edge. On a hit, take +2 momentum.',
        marked: false
      },
      {
        text: 'When you <i>Make Camp</i>, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 4,
      min: 0
    }
  },
  Commander: {
    type: 'Path',
    title: 'Commander',
    items: [
      {
        text: 'You lead a warband with +4 strength. Roll +strength when you command your warband to <i>Face Danger</i>, <i>Secure an Advantage</i>, <i>Compel</i>, or <i>Battle</i>. When you face the negative outcome of any move, you may suffer -1 strength as the cost. When you <i>Make Camp</i> or <i>Sojourn</i> and score a hit, take +1 strength. While at 0 strength, this asset counts as a debility.',
        marked: true
      },
      {
        text: 'You may dispatch scouts from your warband to <i>Gather Information</i> or <i>Resupply</i>; if you do, roll +strength.',
        marked: false
      },
      {
        text: 'Once you <i>Forge a Bond</i> with your warband, take +1 momentum on a hit when you leverage a warband ability.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 4,
      min: 0
    }
  },
  Communion: {
    type: 'Ritual',
    title: 'Communion',
    items: [
      {
        text: 'When you surround the remains of a recently deceased intelligent creature with lit candles, and summon its spirit, roll +heart. Add +1 if you share a bond. On a strong hit, the spirit appears and you may converse for a few minutes. Make moves as appropriate (add +1). On a weak hit, as above, but the spirit also delivers troubling news unrelated to your purpose. Envision what it tells you (<i>Ask the Oracle</i> if unsure) and <i>Endure Stress</i> (1 stress).',
        marked: true
      },
      {
        text: 'As above, and you may also commune with the long-dead.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Cutthroat: {
    type: 'Combat Talent',
    title: 'Cutthroat',
    subtitle: 'If you wield a dagger or knife...',
    items: [
      {
        text: 'When you are in position to <i>Strike</i> at an unsuspecting foe, choose one (before rolling).<br />  * Add +2 and take +1 momentum on a hit.<br />  * Inflict +2 harm on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Compel</i> someone at the point of your blade, or when you rely on your blade to <i>Face Danger</i>, add +1.',
        marked: false
      },
      {
        text: 'Once per fight, when you <i>Secure an Advantage</i> +shadow by performing a feint or misdirection, reroll any dice and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Dancer: {
    type: 'Path',
    title: 'Dancer',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> +edge by dancing for an audience, add +1 and take +2 momentum on a hit. On a strong hit, also add +2 (one time only) if you make a move to interact with someone in the audience.',
        marked: true
      },
      {
        text: 'When you <i>Face Danger</i> +edge in a fight by nimbly avoiding your foe’s attacks, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you or an ally make a progress move and score a hit, you may perform a dance to commemorate the event. If you do, roll +edge. On a strong hit, you and each of your allies take +2 momentum and +1 spirit. On a weak hit, you take +1 momentum or +1 spirit, but your allies are unmoved.',
        marked: false
      }
    ]
  },
  Devotant: {
    type: 'Path',
    title: 'Devotant',
    input: {
      label: "God's Name",
      text: ''
    },
    items: [
      {
        text: 'When you say your daily prayers, you may <i>Secure an Advantage</i> by asking your god to grant a blessing. If you do, roll +your god’s stat. On a hit, take +2 momentum.',
        marked: true
      },
      {
        text: 'When you <i>Swear an Iron Vow</i> to serve your god on a divine quest, you may roll +your god’s stat and reroll any dice. When you <i>Fulfill Your Vow</i> and mark experience, take +1 experience.',
        marked: false
      },
      {
        text: 'When you <i>Sojourn</i> by sharing the word of your god, you may roll +your god’s stat. If you do, take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Divination: {
    type: 'Ritual',
    title: 'Divination',
    items: [
      {
        text: 'When you take a drop of blood from a willing subject (not yourself) and cast the rune-carved stones, roll +heart. On a strong hit, you may read the runes to gain insight about the subject and people close to them, including information you and the subject have no knowledge of. If you use the reading to <i>Gather Information</i>, <i>Compel</i>, or <i>Forge a Bond</i>, add +1. On a weak hit, as above, but the runes reveal their secrets only with extra time and focus; suffer -2 momentum.',
        marked: true
      },
      {
        text: 'As above, and your divination can also reveal information about the subject’s future.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Duelist: {
    type: 'Combat Talent',
    title: 'Duelist',
    subtitle: 'If you wield a bladed weapon in each hand...',
    items: [
      {
        text: 'When you <i>Strike</i> or <i>Clash</i>, you may add +2. If you do (decide before rolling), inflict +1 harm on a strong hit and count a weak hit as a miss.',
        marked: true
      },
      {
        text: 'Once per fight, when you <i>Secure an Advantage</i> +edge by making a bold display of your combat prowess, you may reroll any dice.',
        marked: false
      },
      {
        text: 'When you <i>Draw the Circle</i>, choose one (before rolling).<br />  * Add+2.<br />  * Take+2 momentum on a hit.',
        marked: false
      }
    ]
  },
  Empowered: {
    type: 'Path',
    title: 'Empowered',
    input: {
      label: 'Title/Lineage',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Sojourn</i> and score a weak hit or miss, you may claim the rights of hospitality warranted by your title or lineage. If you do, roll all dice again and add +1. On a miss, you are refused, and your presumption causes significant new trouble.',
        marked: true
      },
      {
        text: 'When you exert your title or lineage to <i>Compel</i>, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you forgo your title or lineage and <i>Forge a Bond</i> as an equal, or when you <i>Swear an Iron Vow</i> to serve someone of a lower station, add +1 and take +1 momentum or +1 spirit on a hit.',
        marked: false
      }
    ]
  },
  Fated: {
    type: 'Path',
    title: 'Fated',
    items: [
      {
        text: 'When you <i>Face Death</i> or <i>Face Desolation</i> while your epic background vow is unfulfilled, it is not yet your time. Instead of rolling, you may take an automatic strong hit. If you do, this asset counts as a debility (and you no longer have this protection) until you next <i>Reach a Milestone</i> on the background vow.',
        marked: true
      },
      {
        text: 'When you <i>Reach a Milestone</i> on your background vow, take +2 momentum or +1 spirit.',
        marked: false
      },
      {
        text: 'For every two boxes filled on your background vow progress track, take 1 experience. When you <i>Fulfill Your Vow</i>, your fate is at hand. Envision your final sacrifice and reroll any dice.',
        marked: false
      }
    ]
  },
  Fletcher: {
    type: 'Combat Talent',
    title: 'Fletcher',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> by crafting arrows of fine quality, add +1. Then, take +1 supply or +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Resupply</i> by recovering or gathering arrows after a battle, add +2.',
        marked: false
      },
      {
        text: 'When you craft a single arrow designated for a specific foe, envision the process and materials, and roll +wits. On a strong hit, take both. On a weak hit, choose one.<br />  * Seeker: When a shooter uses the arrow to <i>Strike</i> or <i>Clash</i> against this foe, reroll any dice (one time only).<br />  * Ravager: When a shooter uses the arrow to inflict harm against this foe, inflict +1d6 harm (one time only).',
        marked: false
      }
    ]
  },
  'Fortune Hunter': {
    type: 'Path',
    title: 'Fortune Hunter',
    items: [
      {
        text: 'When you <i>Swear an Iron Vow</i> to someone under the promise of payment, add +1 and give the quest a special mark. When you successfully <i>Fulfill Your Vow</i> to them, take +wealth equal to the rank of the quest. If you leverage wealth when making a move where resources are a factor, add +wealth and suffer -1 wealth.',
        marked: true
      },
      {
        text: 'When in a community or trading, you may suffer -1 wealth and take +2 supply.',
        marked: false
      },
      {
        text: 'When you <i>Resupply</i> by scavenging or looting, and score a strong hit with a match, you may envision finding an object of value. If you do, take +1 supply (instead of +2) and +1 wealth.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 5,
      min: 0
    }
  },
  'Giant Spider': {
    type: 'Companion',
    title: 'Giant Spider',
    subtitle: 'Your spider uncovers secrets.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> by sending your spider to scout a place, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'You may <i>Face Danger</i> +shadow by sending your spider to secretly study someone. On a hit, the spider returns to reveal the target’s deepest fears through a reflection in its glassy eyes. Use this to <i>Gather Information</i> and reroll any dice.',
        marked: false
      },
      {
        text: 'When your spider sets a trap, add +1 as you <i>Enter the Fray</i> +shadow. On a strong hit, also inflict 2 harm.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 4,
      min: 0
    }
  },
  Hawk: {
    type: 'Companion',
    title: 'Hawk',
    subtitle: 'Your hawk can aid you while it is aloft.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Undertake a Journey</i>, or when you <i>Resupply</i> by hunting for small game, add +1.',
        marked: false
      },
      {
        text: 'When you <i>Secure an Advantage</i> +edge using your hawk to harass and distract your foes, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Face Danger</i> +wits to detect an approaching threat, or when you <i>Enter the Fray</i> +wits against an ambush, add +2.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 3,
      min: 0
    }
  },
  Herbalist: {
    type: 'Path',
    title: 'Herbalist',
    items: [
      {
        text: 'When you attempt to <i>Heal</i> using herbal remedies, and you have at least +1 supply, choose one (decide before rolling).<br />  * Add +2.<br />  * On a hit, take or give an additional +1 health.',
        marked: true
      },
      {
        text: 'When you <i>Heal</i> a companion, ally, or other character, and score a hit, take +1 spirit or +1 momentum.',
        marked: false
      },
      {
        text: 'When you <i>Make Camp</i> and choose the option to partake, you can create a restorative meal. If you do, you and your companions take +1 health. Any allies who choose to partake also take +1 health, and do not suffer -supply.',
        marked: false
      }
    ]
  },
  Honorbound: {
    type: 'Path',
    title: 'Honorbound',
    items: [
      {
        text: 'When you <i>Turn the Tide</i>, envision how your vows give you strength in this moment. Then, when you make your move, add +2 (instead of +1) and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Secure an Advantage</i> or <i>Compel</i> by telling a hard truth, add +1 and take +1 momentum on a hit. On a weak hit or miss, envision how this truth complicates your current situation.',
        marked: false
      },
      {
        text: 'When you <i>Fulfill Your Vow</i> and score a miss, you may reroll one challenge die. If you score a miss again, reduce your maximum spirit by 1. You may recover this lost spirit when you next <i>Fulfill Your Vow</i> and score a strong hit.',
        marked: false
      }
    ]
  },
  Horse: {
    type: 'Companion',
    title: 'Horse',
    subtitle: 'You and your horse ride as one.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Face Danger</i> +edge using your horse’s speed and grace, or when you <i>Undertake a Journey</i>, add +1.',
        marked: false
      },
      {
        text: 'When you <i>Enter the Fray</i> or <i>Secure an Advantage</i> +heart by charging into combat, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Strike</i> or <i>Clash</i> at close range while mounted, add +1 and inflict +1 harm on a hit.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 5,
      min: 0
    }
  },
  Hound: {
    type: 'Companion',
    title: 'Hound',
    subtitle: 'Your hound is your steadfast companion.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Gather Information</i> using your hound’s keen senses to track your quarry or investigate a scene, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Strike</i> or <i>Clash</i> alongside your hound and score a hit, inflict +1 harm or take +1 momentum.',
        marked: false
      },
      {
        text: 'When you <i>Endure Stress</i> in the company of your hound, add +1.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 4,
      min: 0
    }
  },
  Improviser: {
    type: 'Path',
    title: 'Improviser',
    items: [
      {
        text: 'When you <i>Check your Gear</i>, you may roll +wits (instead of +supply). If you do, envision how you make do with a clever solution, and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Secure an Advantage</i> or <i>Face Danger</i> by cobbling together an ad hoc tool or apparatus, add +1 and take +1 momentum on a hit. After rolling, you may also suffer -1 supply and add +1 more.',
        marked: false
      },
      {
        text: 'When you throw caution to the wind and make an impulsive move in a risky situation, you may add +2. If you do, take +1 momentum on a strong hit, but count a weak hit as a miss.',
        marked: false
      }
    ]
  },
  Infiltrator: {
    type: 'Path',
    title: 'Infiltrator',
    items: [
      {
        text: 'When you make a move to breach, traverse, or hide within an area held by an enemy, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Gather Information</i> within an enemy area to discover their positions, plans, or methods, or when you <i>Secure an Advantage</i> within that area through observation, you may roll +shadow (instead of +wits). If you do, take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Resupply</i> within an enemy area by scavenging or looting, you may roll +shadow (instead of +wits). If you do, take +1 momentum or +1 supply on a hit.',
        marked: false
      }
    ]
  },
  Invoke: {
    type: 'Ritual',
    title: 'Invoke',
    items: [
      {
        text: 'When you consume the mystical essence of your surroundings, roll +wits. On a strong hit, add the value of your action die to your essence track (max 6). You may then <i>Secure an Advantage</i> or <i>Face Danger</i> +essence to create minor mystical effects or illusions. If you do, suffer -1 essence and take +1 momentum on a hit. On a weak hit, as above, but capturing these energies is harrowing; <i>Endure Stress</i> (2 stress).',
        marked: true
      },
      {
        text: 'You may <i>Compel</i> +essence (and suffer -1 essence) through a show of power.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 essence on a hit.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 6,
      min: 0
    }
  },
  Ironclad: {
    type: 'Combat Talent',
    title: 'Ironclad',
    subtitle: 'If you wear armor...',
    items: [
      {
        text: 'When you equip or adjust your armor, choose one.<br />  * Lightly armored: When you <i>Endure Harm</i> in a fight, add +1 and take +1 momentum on a hit.<br />  * Geared for war: Mark encumbered. When you <i>Endure Harm</i> in a fight, add +2 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Clash</i> while you are geared for war, add +1.',
        marked: false
      },
      {
        text: 'When you <i>Compel</i> in a situation where strength of arms is a factor, add +2.',
        marked: false
      }
    ]
  },
  Keen: {
    type: 'Ritual',
    title: 'Keen',
    items: [
      {
        text: 'When you hold a weapon and sing a keen for those it has killed, roll +heart. On a strong hit, the wielder inflicts +1 harm when they <i>Strike</i> or <i>Clash</i>. If they roll a 1 on their action die when making a move to inflict harm, the magic is spent. On a weak hit, as above, but the voices of those who were slain join in your song; <i>Endure Stress</i> (2 stress).',
        marked: true
      },
      {
        text: 'As above, and the wielder may also (one time only) add +1 and take +2 momentum on a hit when they <i>Draw the Circle</i>, <i>Enter the Fray</i>, or <i>Battle</i>.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Kindred: {
    type: 'Companion',
    title: 'Kindred',
    subtitle: 'Your friend stands by you.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you make a move outside of combat aided by your companion’s expertise, add +1.',
        marked: false,
        input: {
          label: 'Expertise',
          text: ''
        }
      },
      {
        text: 'When you <i>Clash</i> or <i>Battle</i> alongside your companion, or when you <i>Face Danger</i> against an attack by standing together, add +1.',
        marked: false
      },
      {
        text: 'Once you mark a bond with your companion, add +1 when you <i>Face Desolation</i> in their presence.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 4,
      min: 0
    }
  },
  Leech: {
    type: 'Ritual',
    title: 'Leech',
    items: [
      {
        text: 'When you mark your hands or weapon with an intricate blood rune, roll +iron. On a strong hit, the rune thirsts for fresh blood. One time only, when you make a move to inflict harm, reroll any dice and inflict +2 harm on a hit. Then, for each point of harm inflicted, take +1 and allocate it as +health or +momentum. On a weak hit, as above, but this asset counts as a debility until the rune’s thirst is quenched.',
        marked: true
      },
      {
        text: 'As above, and you may also touch an ally or companion and let them take any remaining points as +health or +momentum.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Lightbearer: {
    type: 'Ritual',
    title: 'Lightbearer',
    items: [
      {
        text: 'When you focus on a source of light and capture its essence, roll +wits. On a strong hit, set your light track to +6. On a weak hit, make it +3. Then, when you make a move to overcome or navigate darkness, you may add +2 and suffer -1 light.',
        marked: true
      },
      {
        text: 'You may use your light to <i>Strike</i> or <i>Clash</i> against a dark-dwelling foe. Choose the amount of light to unleash, and roll +light (instead of +iron or +edge). Suffer -light equal to that amount. On a hit, your harm is 1+your unleashed light.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 6,
      min: 0
    }
  },
  'Long-Arm': {
    type: 'Combat Talent',
    title: 'Long-Arm',
    subtitle: 'If you wield a staff...',
    items: [
      {
        text: 'In your hands, a humble staff is a deadly weapon (2 harm). When you instead use it as a simple weapon (1 harm), you may <i>Strike</i> or <i>Clash</i> +edge (instead of iron). If you do, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Secure an Advantage</i> +edge using your staff to disarm, trip, shove, or stun your foe, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Undertake a Journey</i> and score a strong hit, or if you accompany an ally who scores a strong hit on that move, your staff provides support and comfort in your travels; take +1 momentum.',
        marked: false
      }
    ]
  },
  Lorekeeper: {
    type: 'Path',
    title: 'Lorekeeper',
    items: [
      {
        text: 'You are the bearer of a mystical archive. When you <i>Secure an Advantage</i> or <i>Gather Information</i> using lore recalled from your studies, add +1. If you have a few hours to search the archive, add +2. On a hit, envision the obscure but helpful knowledge you put to use (<i>Ask the Oracle</i> if unsure), and take +1 momentum.',
        marked: true
      },
      {
        text: 'When you learn of a site or object holding lost knowledge, and <i>Swear an Iron Vow</i> to recover it for the archive, reroll any dice. When you <i>Fulfill Your Vow</i> and mark experience, take +1 experience.',
        marked: false
      },
      {
        text: 'One time only, you may browse the archive’s forbidden depths. If you do, raise your wits by 1 and roll an action die. On 1-3, you must also mark corrupted or <i>Face Desolation</i> (ignoring momentum).',
        marked: false
      }
    ]
  },
  Loyalist: {
    type: 'Path',
    title: 'Loyalist',
    items: [
      {
        text: 'When you <i>Aid Your Ally</i>, add +1 and take +1 momentum on a hit. This is in addition to the benefits taken by your ally.',
        marked: true
      },
      {
        text: 'When an ally makes the <i>Endure Stress</i> move in your company, they add +1 and you take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you stand with your ally as they make a progress move, envision how you support them. Then, roll one challenge die. On a 1-9, your ally may replace one of their challenge dice with yours. On a 10, envision how you inadvertently undermine their action; your ally must replace their lowest challenge die with yours.',
        marked: false
      }
    ]
  },
  Mammoth: {
    type: 'Companion',
    title: 'Mammoth',
    subtitle: 'Your mammoth walks a resolute path.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When your mammoth travels with you as you <i>Undertake a Journey</i>, you may add +2 but suffer -1 momentum (decide before rolling).',
        marked: false
      },
      {
        text: 'When you make a move which requires you to roll +supply, you may instead roll +your mammoth’s health.',
        marked: false
      },
      {
        text: 'When you <i>Strike</i> or <i>Clash</i> by riding your mammoth against a pack of foes, add +1 and inflict +1 harm on a hit.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 5,
      min: 0
    }
  },
  Masked: {
    type: 'Path',
    title: 'Masked',
    subtitle: 'Once you mark a bond with elves, and are gifted a mask of precious elderwood...',
    items: [
      {
        text: 'Choose your mask’s material.<br />  * Thunderwood: Edge / Health<br />  * Bloodwood: Iron / Health<br />  * Ghostwood: Shadow / Spirit<br />  * Whisperwood: Wits / Spirit<br />When you wear the mask and make a move which uses its stat, add +1. If you roll a 1 on your action die, suffer -1 to the associated track (in addition to any other outcome of the move).',
        marked: false,
        input: {
          label: 'Material',
          text: ''
        }
      },
      {
        text: 'As above, and you may instead add +2 and suffer -2 (decide before rolling).',
        marked: false
      },
      {
        text: 'When you <i>Face Death</i> or <i>Face Desolation</i> while wearing the mask, you may roll +its stat (instead of +heart).',
        marked: false
      }
    ]
  },
  Oathbreaker: {
    type: 'Path',
    title: 'Oathbreaker',
    subtitle: 'Once you <i>Forsake Your Vow</i>...',
    items: [
      {
        text: 'This asset counts as a debility. One time only, when you <i>Swear an Iron Vow</i> to redeem yourself (extreme or greater), give that vow a special mark. When you <i>Reach a Milestone</i> on the marked vow, take +2 momentum.',
        marked: true
      },
      {
        text: 'When you <i>Secure an Advantage</i> or <i>Compel</i> by reaffirming your commitment to your marked vow, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Fulfill Your Vow</i> on your marked quest and score a hit, you find redemption and automatically activate this ability at no cost. You may then improve one of your stats by +1 and discard this asset.',
        marked: false
      }
    ]
  },
  Outcast: {
    type: 'Path',
    title: 'Outcast',
    items: [
      {
        text: 'When your supply is reduced to 0, suffer any remaining -supply as -momentum. Then, roll +wits. On a strong hit, you manage to scrape by and take +1 supply. On a weak hit, you may suffer -2 momentum in exchange for +1 supply. On a miss, you are <i>Out of Supply</i>.',
        marked: true
      },
      {
        text: 'When you <i>Sojourn</i>, you may reroll any dice. If you do (decide before your first roll), your needs are few, but your isolation sets you apart from others. A strong hit counts as a weak hit.',
        marked: false
      },
      {
        text: 'When you <i>Reach Your Destination</i> and score a strong hit, you recall or recognize something helpful about this place. Envision what it is, and take +2 momentum.',
        marked: false
      }
    ]
  },
  Owl: {
    type: 'Companion',
    title: 'Owl',
    subtitle: 'Your owl soars through the darkness.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'If you <i>Resupply</i> at night by sending your owl to hunt, take +2 momentum on a hit. When you <i>Enter the Fray</i> +wits against an ambush in darkness, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you leverage your owl’s secret knowledge to perform a ritual, add +1 or take +1 momentum on a hit (decide before rolling).',
        marked: false
      },
      {
        text: 'When you <i>Face Death</i>, take your owl’s health as +momentum before you roll.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 3,
      min: 0
    }
  },
  Pretender: {
    type: 'Path',
    title: 'Pretender',
    items: [
      {
        text: 'When you establish a false identity, roll +shadow. On a strong hit, you may add +2 when you make moves using this identity to deceive or influence others. If you roll a 1 on your action die when using your false identity, someone doubts you. Make appropriate moves to reassure them or prevent them from revealing the truth. On a weak hit, as above, but add +1 (instead of +2).',
        marked: true
      },
      {
        text: 'As above, and you may roll +shadow (instead of +heart) when you <i>Sojourn</i> under your false identity. If you do, take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Secure an Advantage</i> by revealing your true identity in a dramatic moment, reroll any dice.',
        marked: false
      }
    ]
  },
  Raven: {
    type: 'Companion',
    title: 'Raven',
    subtitle: 'Your raven heeds your call.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> or <i>Face Danger</i> +shadow using your raven to perform trickery (such as creating a distraction or stealing a small object) add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Face Death</i>, add +2 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When your raven carries messages for you, you may <i>Secure an Advantage</i>, <i>Gather Information</i>, or <i>Compel</i> from a distance.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 2,
      min: 0
    }
  },
  Revenant: {
    type: 'Path',
    title: 'Revenant',
    subtitle: 'Once you <i>Face Death</i> and return to the world of the living...',
    items: [
      {
        text: 'When you are at 0 health, and <i>Endure Harm</i> or <i>Face Death</i>, add +1. If you then burn momentum to improve your result, envision what bond or vow binds you to this world, and take +2 momentum after you reset.',
        marked: true
      },
      {
        text: 'When you make a move to investigate, oppose, or interact with a horror, spirit, or other undead being, add +1.',
        marked: false
      },
      {
        text: 'When you bring death to your foe to <i>End the Fight</i>, you may burn momentum to cancel one (not both) of the challenge dice if your momentum is greater than the value of that die. If you do, <i>Endure Stress</i> (2 stress).',
        marked: false
      }
    ]
  },
  Rider: {
    type: 'Path',
    title: 'Rider',
    subtitle: 'If you are with your horse companion...',
    items: [
      {
        text: 'When you <i>Heal</i> your horse, or when you <i>Face Danger</i> to calm or encourage it, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Undertake a Journey</i>, you may push your horse harder and add +1 (after rolling). If you do, make the <i>Companion Endure Harm</i> move (1 harm).',
        marked: false
      },
      {
        text: 'When you <i>Secure an Advantage</i> +wits by sizing up a perilous situation from the saddle, you are one with your horse’s instincts. Add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Ritualist: {
    type: 'Path',
    title: 'Ritualist',
    subtitle: 'Once you <i>Fulfill Your Vow</i> (formidable or greater) in service to an elder mystic, and <i>Forge a Bond</i> to train with them...',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> to ready yourself for a ritual, envision how you prepare. Then, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you perform a ritual, you may suffer -1 supply and add +1 (decide before rolling).',
        marked: false
      },
      {
        text: 'When you tattoo the essence of a new ritual onto your skin, envision the mark you create. You may then purchase and upgrade that ritual asset for 1 fewer experience.',
        marked: false
      }
    ]
  },
  Scry: {
    type: 'Ritual',
    title: 'Scry',
    items: [
      {
        text: 'When you look into flames to study a remote person or location, roll +shadow. You or someone with you must have knowledge of the target. On a strong hit, you may <i>Gather Information</i> through observation using +shadow or +wits. On a weak hit, as above, but the flames are hungry; choose one to sacrifice.<br />  * Your blood: <i>Endure Harm</i> (2 harm).<br />  * Something precious: <i>Endure Stress</i> (2 stress).<br />  * Provisions: Suffer -2 supply.',
        marked: true
      },
      {
        text: 'As above, and you may instead study a past event.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  'Shadow-Kin': {
    type: 'Path',
    title: 'Shadow-Kin',
    subtitle: 'Once you become corrupted...',
    items: [
      {
        text: 'You harden your heart: Reduce your heart stat by 1 and add up to +2 to shadow (to a maximum of +4).',
        marked: false
      },
      {
        text: 'You are attuned to the realms of shadow: When you perform a ritual, add +1.',
        marked: false
      },
      {
        text: 'You know the sly ways of death: When you <i>Face Death</i>, you may roll +shadow (instead of +heart). On a weak hit, if you choose to undertake a deathbound quest, you may roll +shadow (instead of +heart) and reroll any dice as you <i>Swear an Iron Vow</i>. When you <i>Fulfill Your Vow</i> on that quest and and mark experience, take +2 experience.',
        marked: false
      }
    ]
  },
  'Shadow-Walk': {
    type: 'Ritual',
    title: 'Shadow-Walk',
    items: [
      {
        text: 'When you cloak yourself with the gossamer veil of the shadow realms, roll +shadow. On a strong hit, take +1 momentum. Then, reroll any dice (one time only) when you make a move by ambushing, hiding, or sneaking. On a weak hit, as above, but the shadows try to lead you astray. You must first <i>Face Danger</i> to find your way.',
        marked: true
      },
      {
        text: 'As above, and you may also travel along the hidden paths of the shadow realms to <i>Undertake a Journey</i> using +shadow (instead of +wits). If you do, <i>Endure Stress</i> (1 stress) and mark progress twice on a strong hit.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  'Shield-Bearer': {
    type: 'Combat Talent',
    title: 'Shield-Bearer',
    subtitle: 'If you wield a shield...',
    items: [
      {
        text: 'When you <i>Face Danger</i> using your shield as cover, add +1. When you <i>Clash</i> in close quarters, take +1 momentum on a strong hit.',
        marked: true
      },
      {
        text: 'When you paint your shield with a meaningful symbol, envision what you create. Then, if you <i>Endure Stress</i> as you face off against a fearsome foe, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When forced to <i>Endure Harm</i> in a fight, you may instead sacrifice your shield and ignore all harm. If you do, the shield is destroyed. Once per fight, you also take initiative when you sacrifice your shield to avoid harm.',
        marked: false
      }
    ]
  },
  Sighted: {
    type: 'Path',
    title: 'Sighted',
    items: [
      {
        text: 'When you <i>Face Danger</i> or <i>Gather Information</i> to identify or detect mystic forces, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Compel</i>, <i>Forge a Bond</i>, or <i>Test Your Bond</i> with a fellow mystic or mystical being, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Secure an Advantage</i> by studying someone or something in a charged situation, add +1 and take +1 momentum on a hit. When you also pierce the veil to explore deeper truths (decide before rolling), you may reroll any dice. If you do, count a weak hit as a miss.',
        marked: false
      }
    ]
  },
  Skirmisher: {
    type: 'Combat Talent',
    title: 'Skirmisher',
    subtitle: 'If you wield a spear...',
    items: [
      {
        text: 'When you <i>Face Danger</i> by holding a foe at bay using your spear’s reach, roll +iron or +edge. If you score a hit, you may...<br />  * Iron: <i>Strike</i> (if you have initiative) or <i>Clash</i> now, and add +1.<br />  * Edge: Take+1 momentum.',
        marked: true
      },
      {
        text: 'When you <i>Strike</i> in close combat, you may attempt to drive your spear home (decide before rolling). If you do, add +1 and inflict +2 harm on a hit. If you score a hit and the fight continues, <i>Face Danger</i> +iron to recover your spear.',
        marked: false
      },
      {
        text: 'When you <i>Secure an Advantage</i> by bracing your spear against a charging foe, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Slayer: {
    type: 'Path',
    title: 'Slayer',
    items: [
      {
        text: 'When you <i>Gather Information</i> by tracking a beast or horror, or when you <i>Secure an Advantage</i> by readying yourself for a fight against them, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Swear an Iron Vow</i> to slay a beast or horror, you may reroll any dice. When you <i>Fulfill Your Vow</i> and mark experience, take +1 experience.',
        marked: false
      },
      {
        text: 'When you slay a beast or horror (at least formidable), you may take a trophy and choose one.<br />  * Power a ritual: When you or an ally make a ritual move, reroll any dice (one time only).<br />  * Prove your worth: When you <i>Sojourn</i>, reroll any dice (one time only).',
        marked: false
      }
    ]
  },
  Slinger: {
    type: 'Combat Talent',
    title: 'Slinger',
    subtitle: 'If you wield a sling...',
    items: [
      {
        text: 'When launched from a sling, a simple stone inflicts deadly harm (2 harm). When you <i>Enter the Fray</i> by barraging your foe with sling-bullets, inflict harm on a strong hit.',
        marked: true
      },
      {
        text: 'When you <i>Strike</i> by launching stones at an advancing foe, you may choose one (before rolling).<br />  * Hold them back: Retain initiative on a weak hit, but inflict only 1 harm.<br />  * Hit them hard: Inflict +1 harm on a hit, but suffer -1 momentum.',
        marked: false
      },
      {
        text: 'When you <i>Secure an Advantage</i> by preparing stones of a special quality or material, add +1. Then, take +1 momentum or +1 supply on a hit.',
        marked: false
      }
    ]
  },
  'Spirit-Bound': {
    type: 'Path',
    title: 'Spirit-Bound',
    items: [
      {
        text: 'You are haunted by someone whose death you caused through your actions or failures. When you consult with their spirit to <i>Secure an Advantage</i> or <i>Gather Information</i>, add +1 and take +2 momentum on a hit. On a weak hit, also <i>Endure Stress</i> (1 stress).',
        marked: true
      },
      {
        text: 'When you <i>Face Death</i> guided by the spirit, add +1. On a strong hit, envision what you learn and take 1 experience.',
        marked: false
      },
      {
        text: 'One time only, when you successfully <i>Fulfill Your Vow</i> (formidable or greater) in service to the spirit, choose one.<br />  * Let them go: Take 2 experience for each marked ability and discard this asset.<br />  * Deepen your connection: Add +1 more when you leverage this asset.',
        marked: false
      }
    ]
  },
  Storyweaver: {
    type: 'Path',
    title: 'Storyweaver',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i>, <i>Compel</i>, or <i>Forge a Bond</i> by sharing an inspiring or enlightening song, poem, or tale, envision the story you tell. Then, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Make Camp</i> and choose the option to relax, you may share a story with your allies or compose a new story if alone. If you do, envision the story you tell and take +1 spirit or +1 momentum. Any allies who choose to relax in your company may also take +1 spirit or +1 momentum.',
        marked: false
      },
      {
        text: 'When you <i>Sojourn</i> within a community with which you share a bond, add +2 (instead of +1).',
        marked: false
      }
    ]
  },
  Sunderer: {
    type: 'Combat Talent',
    title: 'Sunderer',
    subtitle: 'If you wield an axe...',
    items: [
      {
        text: 'When you <i>Strike</i> or <i>Clash</i> in close quarters, you may suffer -1 momentum and inflict +1 harm on a hit (decide before rolling).',
        marked: true
      },
      {
        text: 'When you have your axe in hand, and use the promise of violence to <i>Compel</i> or <i>Secure an Advantage</i>, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you make a tribute to a fallen foe (formidable or greater) by carving a rune in the haft of your axe, roll +heart. On a strong hit, inflict +1d6 harm (one time only) when you <i>Strike</i> or <i>Clash</i>. On a weak hit, as above, but this death weighs on you; <i>Endure Stress</i> (2 stress).',
        marked: false
      }
    ]
  },
  Sway: {
    type: 'Ritual',
    title: 'Sway',
    items: [
      {
        text: 'When you speak a person’s name three times to the wind, roll +wits. On a strong hit, the wind whispers of this person’s need. Envision what you hear (<i>Ask the Oracle</i> if unsure). If you use this information or fulfill this need when you <i>Compel</i> them, you may reroll any dice (one time only). On a weak hit, as above, but this person’s need creates a troubling dilemma or complication; <i>Endure Stress</i> (1 stress).',
        marked: true
      },
      {
        text: 'As above, and if you score a strong hit when you <i>Compel</i>, you may also reroll any dice (one time only) when you <i>Gather Information</i> from this person.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Swordmaster: {
    type: 'Combat Talent',
    title: 'Swordmaster',
    subtitle: 'If you wield a sword...',
    items: [
      {
        text: 'When you <i>Strike</i> or <i>Clash</i> and burn momentum to improve your result, inflict +2 harm. If the fight continues, add +1 on your next move.',
        marked: true
      },
      {
        text: 'When you <i>Clash</i> and score a strong hit, add +1 if you immediately follow with a <i>Strike</i>.',
        marked: false
      },
      {
        text: 'When you <i>Swear an Iron Vow</i> by kneeling and grasping your sword’s blade, add +1 and take +1 momentum on a hit. If you let the edge draw blood from your hands, <i>Endure Harm</i> (1 harm) in exchange for an additional +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Talisman: {
    type: 'Ritual',
    title: 'Talisman',
    items: [
      {
        text: 'When you fashion a charm, envision it and name the specific person or creature it protects against. Then roll +wits. On a strong hit, when the wearer opposes the target through a move, add +2. If a 1 is rolled on the action die while making a move using the charm, the magic is spent. On a weak hit, as above, but the wearer adds +1 when making a move (instead of +2).',
        marked: true
      },
      {
        text: 'As above, and you may instead fashion a charm which aids the wearer against all supernatural threats, such as mystic rituals or horrors.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Tether: {
    type: 'Ritual',
    title: 'Tether',
    items: [
      {
        text: 'When you commune with the spirits of a place, roll +heart. If you share a bond with someone there, add +1. On a strong hit, you are tethered. When you <i>Undertake a Journey</i> to return, you may roll +spirit or +heart (instead of +wits), and take +1 momentum on a hit. When you <i>Reach Your Destination</i>, take +2 momentum on a strong hit. The tether is lost if you perform this ritual elsewhere, or when you <i>Face Desolation</i>. On a weak hit, as above, but the spirits reveal a disturbing aspect of the place; <i>Endure Stress</i> (2 stress).',
        marked: true
      },
      {
        text: 'As above, and you may also reroll any dice when you <i>Sojourn</i> in the tethered place.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  'Thunder-Bringer': {
    type: 'Combat Talent',
    title: 'Thunder-Bringer',
    subtitle: 'If you wield a mighty hammer...',
    items: [
      {
        text: 'When you <i>Face Danger</i>, <i>Secure an Advantage</i>, or <i>Compel</i> by hitting or breaking an inanimate object, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Strike</i> a foe to knock them back, stun them, or put them off balance, inflict 1 harm (instead of 2) and take +2 momentum on a hit. On a strong hit, you also create an opening and add +1 on your next move.',
        marked: false
      },
      {
        text: 'When you <i>Turn the Tide</i>, you may <i>Strike</i> with all the fury and power you can muster. If you do (decide before rolling), you may reroll any dice and inflict +2 harm on a strong hit, but count a weak hit as a miss.',
        marked: false
      }
    ]
  },
  Totem: {
    type: 'Ritual',
    title: 'Totem',
    items: [
      {
        text: 'When you hold a totem of your animal or beast companion and focus on it, roll +heart. On a strong hit, you are bound together. Add +1 and take +1 momentum on a hit when you use a companion ability. If you roll a 1 on your action die when using a companion ability, the magic is spent. On a weak hit, as above, but creating this connection is unsettling; <i>Endure Stress</i> (1 stress).',
        marked: true
      },
      {
        text: 'As above, and you may also perceive the world through your companion’s senses while you make moves aided by them (even when you are apart).',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Trickster: {
    type: 'Path',
    title: 'Trickster',
    items: [
      {
        text: 'When you <i>Face Danger</i>, <i>Secure an Advantage</i>, or <i>Compel</i> by lying, bluffing, stealing, or cheating, add +1.',
        marked: true
      },
      {
        text: 'When you <i>Gather Information</i> by investigating a devious scheme, you may roll +shadow (instead of +wits). If you do, take +2 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Forge a Bond</i> for a relationship founded on a lie, choose one.<br />  * Keep your secret: Roll +shadow (instead of +heart).<br />  * Reveal the truth: Roll +heart. On a strong hit, mark a bond twice and take 1 experience. A weak hit counts as a miss.',
        marked: false
      }
    ]
  },
  Veteran: {
    type: 'Path',
    title: 'Veteran',
    items: [
      {
        text: 'When you burn momentum to improve your result in combat, envision how your hard-won fighting experience gives you the upper hand. Then, take +1 momentum after you reset, and add +1 when you make your next move. Once per fight, you also take initaitive when burning momentum to improve a miss to a weak hit.',
        marked: true
      },
      {
        text: 'When you <i>Swear an Iron Vow</i> to someone who fought beside you, or <i>Forge a Bond</i> with them, add +2 and take +2 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Resupply</i> by looting the dead on a field of battle, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Visage: {
    type: 'Ritual',
    title: 'Visage',
    items: [
      {
        text: 'When you paint yourself in blood and ash, roll +wits. On a strong hit, you may add +2 and take +1 momentum on a hit when you <i>Secure an Advantage</i> or <i>Compel</i> using fear or intimidation. If you roll a 1 on your action die when making a move aided by your visage, the magic is spent. On a weak hit, as above, but the blood must be your own; <i>Endure Harm</i> (2 harm).',
        marked: true
      },
      {
        text: 'As above, and you may also add +1 when you <i>Strike</i>, <i>Clash</i>, or <i>Battle</i>.',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Ward: {
    type: 'Ritual',
    title: 'Ward',
    items: [
      {
        text: 'When you walk a wide circle, sprinkling the ground with salt, roll +wits. On a strong hit, choose two. On a weak hit, choose one.<br />  * When a foe first crosses the boundary, take +1 momentum.<br />  * When you first inflict harm against a foe within the boundary, inflict +1 harm.<br />  * Your ward is ‘likely’ (<i>Ask the Oracle</i>) to trap a foe within the boundary.',
        marked: true
      },
      {
        text: 'As above, and improve the effect of your ward (+2 momentum, +2 harm, and ‘almost certain’).',
        marked: false
      },
      {
        text: 'When you perform this ritual, add +1 and take +1 momentum on a hit.',
        marked: false
      }
    ]
  },
  Waterborn: {
    type: 'Path',
    title: 'Waterborn',
    items: [
      {
        text: 'When you <i>Face Danger</i>, <i>Gather Information</i>, or <i>Secure an Advantage</i> related to your knowledge of watercraft, water travel, or aquatic environments or creatures, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you <i>Undertake a Journey</i> by boat or ship, add +1. On a strong hit, also choose one.<br />  * The wind is at your back: Mark progress twice.<br />  * Find safe anchor: <i>Make Camp</i> now and reroll any dice.<br />  * Reap the bounty: <i>Resupply</i> now and reroll any dice.',
        marked: false
      },
      {
        text: 'When you <i>Enter the Fray</i> aboard a boat or ship, reroll any dice.',
        marked: false
      }
    ]
  },
  Wayfinder: {
    type: 'Path',
    title: 'Wayfinder',
    items: [
      {
        text: 'When you <i>Undertake a Journey</i>, take +1 momentum on a strong hit. If you burn momentum to improve your result, also take +1 momentum after you reset.',
        marked: true
      },
      {
        text: 'When you <i>Secure an Advantage</i> or <i>Gather Information</i> by carefully surveying the landscape or scouting ahead, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Swear an Iron Vow</i> to safely guide someone on a perilous journey, you may reroll any dice. When you <i>Fulfill Your Vow</i> and mark experience, take +1 experience.',
        marked: false
      }
    ]
  },
  Weaponmaster: {
    type: 'Path',
    title: 'Weaponmaster',
    subtitle: 'Once you <i>Fulfill Your Vow</i> (formidable or greater) in service to a seasoned warrior, and <i>Forge a Bond</i> to train with them...',
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> by sizing up your foe in a fight, or in a charged situation which may lead to a fight, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'When you study or train in a new weapon or technique, you may obtain and upgrade that combat talent for 1 fewer experience.',
        marked: false
      },
      {
        text: 'When you <i>Turn the Tide</i> with a sudden change of weapon or technique, and your next move is a <i>Strike</i>, add +1 and inflict +2 harm on a strong hit.',
        marked: false
      }
    ]
  },
  Wildblood: {
    type: 'Path',
    title: 'Wildblood',
    items: [
      {
        text: 'When you <i>Face Danger</i>, <i>Secure an Advantage</i>, or <i>Gather Information</i> using your knowledge of tracking, woodcraft, or woodland creatures, add +1.',
        marked: true
      },
      {
        text: 'When you <i>Face Danger</i> or <i>Secure an Advantage</i> by hiding or sneaking in the woodlands, add +1 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Make Camp</i> in the woodlands, you may roll +wits (instead of +supply). If you do, you and your allies each choose 1 more option on a hit.',
        marked: false
      }
    ]
  },
  Wright: {
    type: 'Path',
    title: 'Wright',
    input: {
      label: 'Specialty',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Secure an Advantage</i> by crafting a useful item using your specialty, or when you <i>Face Danger</i> to create or repair an item in a perilous situation, add +1 and take +1 momentum on a hit.',
        marked: true
      },
      {
        text: 'As above, and you may suffer -1 supply (after rolling) to add an additional +1.',
        marked: false
      },
      {
        text: 'When you give the item you create as a gift to commemorate an important event or relationship, you may (one time only) reroll any dice when you <i>Compel</i>, <i>Forge a Bond</i>, or <i>Test Your Bond</i>.',
        marked: false
      }
    ]
  },
  'Young Wyvern': {
    type: 'Companion',
    title: 'Young Wyvern',
    subtitle: 'Your wyvern won’t devour you. For now.',
    input: {
      label: 'Name',
      text: ''
    },
    items: [
      {
        text: 'When you <i>Undertake a Journey</i> and score a hit, you may suffer -1 supply in exchange for +2 momentum.',
        marked: false
      },
      {
        text: 'When you make the <i>Companion Endure Harm</i> move for your wyvern, add +2 and take +1 momentum on a hit.',
        marked: false
      },
      {
        text: 'When you <i>Strike</i> by commanding your wyvern to attack, roll +heart. Your wyvern inflicts 3 harm on a hit.',
        marked: false
      }
    ],
    track: {
      value: 0,
      max: 5,
      min: 0
    }
  }
}
