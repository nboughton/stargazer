import { ECoreCombo, ELocTheme, ILocThemeOracle } from 'src/components/models';

export const LocationTheme: ILocThemeOracle = {
  type: {
    items: [
      {
        match: [1, 15],
        data: ELocTheme.Chaotic,
      },
      {
        match: [16, 30],
        data: ELocTheme.Fortified,
      },
      {
        match: [31, 45],
        data: ELocTheme.Haunted,
      },
      {
        match: [46, 60],
        data: ELocTheme.Infested,
      },
      {
        match: [61, 70],
        data: ELocTheme.Inhabited,
      },
      {
        match: [71, 85],
        data: ELocTheme.Ruined,
      },
      {
        match: [86, 100],
        data: ELocTheme.Sacred,
      },
    ],
  },

  [ELocTheme.Chaotic]: {
    feature: {
      items: [
        {
          match: [1, 8],
          data: 'Alterations in the flow of time',
        },
        {
          match: [9, 16],
          data: 'Chaotic portal, focus, or conduit',
        },
        {
          match: [17, 24],
          data: 'Corrupted or warped architecture or terrain',
        },
        {
          match: [25, 32],
          data: 'Corrupted or warped environment or ecosystem',
        },
        {
          match: [33, 40],
          data: 'Corrupted or warped technology',
        },
        {
          match: [41, 48],
          data: 'Cryptic device harnesses or powers chaos',
        },
        {
          match: [49, 56],
          data: 'Distortions of gravity or physics',
        },
        {
          match: [57, 64],
          data: 'Energy field or barrier',
        },
        {
          match: [65, 72],
          data: 'Glimpses of alternate realities',
        },
        {
          match: [73, 80],
          data: 'Lifeforms mutated or altered by chaos',
        },
        {
          match: [81, 88],
          data: 'Lifeforms spawned from chaos',
        },
        {
          match: [89, 96],
          data: 'Visions of your past or future',
        },
        {
          match: [97, 100],
          data: ECoreCombo.DescFoc,
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 9],
          data: 'Chaos makes its mark upon you',
        },
        {
          match: [10, 18],
          data: 'Chaos spreads or intensifies',
        },
        {
          match: [19, 27],
          data: 'Chaos tempts or lures you',
        },
        {
          match: [28, 36],
          data: 'Chaotic energies block the path or assail you',
        },
        {
          match: [37, 45],
          data: 'Disorienting changes in time or location',
        },
        {
          match: [46, 54],
          data: 'Dreadful scene of those who fell prey to chaos',
        },
        {
          match: [55, 63],
          data: 'Equipment is made unstable or dangerous',
        },
        {
          match: [64, 72],
          data: 'Foes harness or wield chaos',
        },
        {
          match: [73, 81],
          data: 'Hazardous environmental changes',
        },
        {
          match: [82, 90],
          data: 'Lifeforms made hostile by chaos',
        },
        {
          match: [91, 98],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [99, 100],
          data: 'Roll twice',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 20],
          data: 'Chaos ebbs or withdraws for a time',
        },
        {
          match: [21, 40],
          data: 'Chaos empowers you with strange but useful abilities',
        },
        {
          match: [41, 60],
          data: 'Chaos manifests as comforting or inspiring visions',
        },
        {
          match: [61, 80],
          data: 'Chaotic changes hamper your foes',
        },
        {
          match: [81, 100],
          data: 'Insight into the source or nature of the chaos',
        },
      ],
    },
  },
  [ELocTheme.Fortified]: {
    feature: {
      items: [
        {
          match: [1, 8],
          data: 'Captives or prisoners',
        },
        {
          match: [9, 16],
          data: 'Control area or terminal',
        },
        {
          match: [17, 24],
          data: 'Empty or inactive area',
        },
        {
          match: [25, 32],
          data: 'Enemy forces assembled for an event',
        },
        {
          match: [33, 40],
          data: 'Enemy forces off-duty or at leisure',
        },
        {
          match: [41, 48],
          data: 'Enemy forces on guard',
        },
        {
          match: [49, 56],
          data: 'Enemy forces on patrol',
        },
        {
          match: [57, 64],
          data: 'Enemy forces transporting supplies or equipment',
        },
        {
          match: [65, 72],
          data: 'Enemy leader makes an inspection',
        },
        {
          match: [73, 80],
          data: 'Prototype technology or equipment',
        },
        {
          match: [81, 88],
          data: 'Robotic assistant or watchful AI',
        },
        {
          match: [89, 96],
          data: 'Support personnel at work',
        },
        {
          match: [97, 100],
          data: ECoreCombo.DescFoc,
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 9],
          data: 'Alarm is triggered',
        },
        {
          match: [10, 18],
          data: 'Automated security or weapons target you',
        },
        {
          match: [19, 27],
          data: 'Checkpoint or path with restricted access',
        },
        {
          match: [28, 36],
          data: 'Enemies converge on this area',
        },
        {
          match: [37, 45],
          data: 'Enemies reveal new capabilities or technology',
        },
        {
          match: [46, 54],
          data: 'Enemies trick you or lure you into a trap',
        },
        {
          match: [55, 63],
          data: 'Powerful enemy appears',
        },
        {
          match: [64, 72],
          data: 'Problematic alliance or affiliations is revealed',
        },
        {
          match: [73, 81],
          data: 'Revealed schemes of an enemy leader create new urgency',
        },
        {
          match: [82, 90],
          data: 'Your plan is undone by an unexpected complication',
        },
        {
          match: [91, 98],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [99, 100],
          data: 'Roll twice',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 20],
          data: 'Insight into the plans or methods of the enemy force',
        },
        {
          match: [21, 40],
          data: 'Opening to get the drop on an enemy',
        },
        {
          match: [41, 60],
          data: 'Opening to outmaneuver or escape enemies',
        },
        {
          match: [61, 80],
          data: 'Potential collaborator or informant reveals themselves',
        },
        {
          match: [81, 100],
          data: 'Access to useful equipment or weapons',
        },
      ],
    },
  },
  [ELocTheme.Haunted]: {
    feature: {
      items: [
        {
          match: [1, 8],
          data: 'Disembodied voices',
        },
        {
          match: [9, 16],
          data: 'Eerie cold',
        },
        {
          match: [17, 24],
          data: 'Foreboding omen or message',
        },
        {
          match: [25, 32],
          data: 'Ghostly visions of this place in another time',
        },
        {
          match: [33, 40],
          data: 'Glimpses of shadowy movement',
        },
        {
          match: [41, 48],
          data: 'Objects move of their own accord',
        },
        {
          match: [49, 56],
          data: 'Sensation of being watched',
        },
        {
          match: [57, 64],
          data: 'Signs of death or violence',
        },
        {
          match: [65, 72],
          data: 'Spectral sounds',
        },
        {
          match: [73, 80],
          data: 'Twisted or altered architecture or terrain',
        },
        {
          match: [81, 88],
          data: 'Unnatural blight, decay, or ruin',
        },
        {
          match: [89, 96],
          data: 'Unnatural mists or darkness',
        },
        {
          match: [97, 100],
          data: ECoreCombo.DescFoc,
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 9],
          data: 'Assailed by an angry or vengeful being',
        },
        {
          match: [10, 18],
          data: 'Beguiling illusions tempt you to linger or stay',
        },
        {
          match: [19, 27],
          data: 'Besieged by frightening sensations',
        },
        {
          match: [28, 36],
          data: 'Equipment is plagued by unexplainable malfunctions',
        },
        {
          match: [37, 45],
          data: 'Plunged into disorienting darkness or illusionary surroundings',
        },
        {
          match: [46, 54],
          data: 'Spectral manifestations of your fears',
        },
        {
          match: [55, 63],
          data: 'Spirits or undead reveal surprising abilities or motivations',
        },
        {
          match: [64, 72],
          data: 'Sudden, shocking reveal of a ghostly manifestation or undead form',
        },
        {
          match: [73, 81],
          data: 'Trickery leads you into danger',
        },
        {
          match: [82, 90],
          data: 'Visions reveal a horrifying aspect of this place',
        },
        {
          match: [91, 98],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [99, 100],
          data: 'Roll twice',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 20],
          data: 'Encounter with a benign spirit or being',
        },
        {
          match: [21, 40],
          data: 'Helpful vision of past events',
        },
        {
          match: [41, 60],
          data: 'Message or clue leads offers insight into the nature of this haunting',
        },
        {
          match: [61, 80],
          data: 'Secret area or path is revealed',
        },
        {
          match: [81, 100],
          data: 'Useful or interesting artifact or device',
        },
      ],
    },
  },
  [ELocTheme.Infested]: {
    feature: {
      items: [
        {
          match: [1, 8],
          data: 'Corpse of an unfortunate victim',
        },
        {
          match: [9, 16],
          data: 'Eggs, cocoons, or nest',
        },
        {
          match: [17, 24],
          data: 'Environment corrupted by the infestation',
        },
        {
          match: [25, 32],
          data: 'Evidence of a lurking creature',
        },
        {
          match: [33, 40],
          data: 'Evidence of an ill-fated victim',
        },
        {
          match: [41, 48],
          data: 'Hoarded food',
        },
        {
          match: [49, 56],
          data: 'Indistinct movement or sounds',
        },
        {
          match: [57, 64],
          data: 'Lair of lesser creatures',
        },
        {
          match: [65, 72],
          data: 'Ravaged supplies or equipment',
        },
        {
          match: [73, 80],
          data: 'Remains of a creature or remnants of a previous form',
        },
        {
          match: [81, 88],
          data: 'Territorial markings',
        },
        {
          match: [89, 96],
          data: 'Trail or evidence of a creature&rsquo;s passage',
        },
        {
          match: [97, 100],
          data: ECoreCombo.DescFoc,
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 9],
          data: 'Creatures attack without warning',
        },
        {
          match: [10, 18],
          data: 'Creatures guided or controlled by a greater threat',
        },
        {
          match: [19, 27],
          data: 'Creatures reveal new aspects or abilities',
        },
        {
          match: [28, 36],
          data: 'Creatures reveal surprising cleverness',
        },
        {
          match: [37, 45],
          data: 'Creatures take or destroy something important',
        },
        {
          match: [46, 54],
          data: 'Discovery of a live but threatened victim',
        },
        {
          match: [55, 63],
          data: 'Hazardous architecture or terrain',
        },
        {
          match: [64, 72],
          data: 'Lured or driven into a trap or dead-end',
        },
        {
          match: [73, 81],
          data: 'Powerful or dominant creature reveals itself',
        },
        {
          match: [82, 90],
          data: 'Toxic or sickening environment',
        },
        {
          match: [91, 98],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [99, 100],
          data: 'Roll twice',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 20],
          data: 'Clue to the nature or vulnerabilities of these creatures',
        },
        {
          match: [21, 40],
          data: 'Creatures turn on each other',
        },
        {
          match: [41, 60],
          data: 'Early warning of an attack or ambush',
        },
        {
          match: [61, 80],
          data: 'External event provides a helpful distraction',
        },
        {
          match: [81, 100],
          data: 'Helpful resource or equipment',
        },
      ],
    },
  },
  [ELocTheme.Inhabited]: {
    feature: {
      items: [
        {
          match: [1, 8],
          data: 'Conspicuous patrols or surveillance',
        },
        {
          match: [9, 16],
          data: 'Crews at work',
        },
        {
          match: [17, 24],
          data: 'Display or monument honors a notable cultural event',
        },
        {
          match: [25, 32],
          data: 'Emergency teams responding to an incident or crisis',
        },
        {
          match: [33, 40],
          data: 'Families gathering or children playing',
        },
        {
          match: [41, 48],
          data: 'Festival, celebration, or observance',
        },
        {
          match: [49, 56],
          data: 'Fight breaks out',
        },
        {
          match: [57, 64],
          data: 'Notable figure stands out from the crowd',
        },
        {
          match: [65, 72],
          data: 'Protest or strike',
        },
        {
          match: [73, 80],
          data: 'Unrepaired damage',
        },
        {
          match: [81, 88],
          data: 'Unusually empty or quiet area',
        },
        {
          match: [89, 96],
          data: 'Vendor or merchant hawking their wares',
        },
        {
          match: [97, 100],
          data: ECoreCombo.DescFoc,
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 9],
          data: 'Announcement or notification brings harrowing news',
        },
        {
          match: [10, 18],
          data: 'Arrival of a foe or rival',
        },
        {
          match: [19, 27],
          data: 'Blockade or security cordon cuts off needed access',
        },
        {
          match: [28, 36],
          data: 'Caught in the crossfire of a dispute',
        },
        {
          match: [37, 45],
          data: 'Disturbing evidence of exploitive conditions',
        },
        {
          match: [46, 54],
          data: 'Lured into danger',
        },
        {
          match: [55, 63],
          data: 'Signs of disease, infestation, or toxic environment',
        },
        {
          match: [64, 72],
          data: 'Signs of unrest or rebellion',
        },
        {
          match: [73, 81],
          data: 'Signs that you are being watched or followed',
        },
        {
          match: [82, 90],
          data: 'Unwanted attention from authority or enemies',
        },
        {
          match: [91, 98],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [99, 100],
          data: 'Roll twice',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 20],
          data: 'Intriguing offer from an unexpected source',
        },
        {
          match: [21, 40],
          data: 'Lively festival or gathering place provides a chance to socialize',
        },
        {
          match: [41, 60],
          data: 'Local gossip proves interesting or helpful',
        },
        {
          match: [61, 80],
          data: 'Needed item, resource, or buyer is available',
        },
        {
          match: [81, 100],
          data: 'Old friend or connection resurfaces',
        },
      ],
    },
  },
  [ELocTheme.Ruined]: {
    feature: {
      items: [
        {
          match: [1, 8],
          data: 'Collapsed or broken structures or terrain',
        },
        {
          match: [9, 16],
          data: 'Device or artifact with residual power or function',
        },
        {
          match: [17, 24],
          data: 'Focal point or nexus of the destruction',
        },
        {
          match: [25, 32],
          data: 'Graves or corpses',
        },
        {
          match: [33, 40],
          data: 'Innermost or hidden spaces laid bare by the destruction',
        },
        {
          match: [41, 48],
          data: 'Message or recording from before the fall',
        },
        {
          match: [49, 56],
          data: 'Overgrown or entombed spaces',
        },
        {
          match: [57, 64],
          data: 'Rubble-strewn paths',
        },
        {
          match: [65, 72],
          data: 'Sad memento of a lost life',
        },
        {
          match: [73, 80],
          data: 'Sights or sounds of structural instability',
        },
        {
          match: [81, 88],
          data: 'Signs of looting or scavenging',
        },
        {
          match: [89, 96],
          data: 'Survivors or guardians dwell among the ruins',
        },
        {
          match: [97, 100],
          data: ECoreCombo.DescFoc,
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 9],
          data: 'Dreadful atmosphere of loss and destruction weighs upon you',
        },
        {
          match: [10, 18],
          data: 'Evidence of a horrible fate for others who passed this way',
        },
        {
          match: [19, 27],
          data: 'Hazardous atmosphere or environment',
        },
        {
          match: [28, 36],
          data: 'Hostile creature has staked out their territory',
        },
        {
          match: [37, 45],
          data: 'Imminent collapse or destruction',
        },
        {
          match: [46, 54],
          data: 'Lured into a trap or targeted by automated defenses',
        },
        {
          match: [55, 63],
          data: 'Source of the destruction persists or returns anew',
        },
        {
          match: [64, 72],
          data: 'Unearthed secrets best left buried',
        },
        {
          match: [73, 81],
          data: 'Unstable or broken path',
        },
        {
          match: [82, 90],
          data: 'Volatile device or artifact',
        },
        {
          match: [91, 98],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [99, 100],
          data: 'Roll twice',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 20],
          data: 'Access to an untouched or preserved area',
        },
        {
          match: [21, 40],
          data: 'Insight into what brought this place to ruin',
        },
        {
          match: [41, 60],
          data: 'Interesting or useful device or artifact',
        },
        {
          match: [61, 80],
          data: 'Salvageable equipment or resources',
        },
        {
          match: [81, 100],
          data: 'Shortcut or passage through the destruction',
        },
      ],
    },
  },
  [ELocTheme.Sacred]: {
    feature: {
      items: [
        {
          match: [1, 8],
          data: 'Adherents performing worship or enacting rituals',
        },
        {
          match: [9, 16],
          data: 'Altar or temple',
        },
        {
          match: [17, 24],
          data: 'Dwellings for the faithful',
        },
        {
          match: [25, 32],
          data: 'Enigmatic symbols',
        },
        {
          match: [33, 40],
          data: 'Graves or remains of glorified disciples',
        },
        {
          match: [41, 48],
          data: 'Holy text or archives',
        },
        {
          match: [49, 56],
          data: 'Offerings or atonements',
        },
        {
          match: [57, 64],
          data: 'Pilgrims arriving to pay homage',
        },
        {
          match: [65, 72],
          data: 'Protected reliquary of an artifact or token',
        },
        {
          match: [73, 80],
          data: 'Religious art or idols',
        },
        {
          match: [81, 88],
          data: 'Subtle manifestations of mystical power or visions',
        },
        {
          match: [89, 96],
          data: 'Tokens or motifs representing the faith&rsquo;s domain',
        },
        {
          match: [97, 100],
          data: ECoreCombo.DescFoc,
        },
      ],
    },
    peril: {
      items: [
        {
          match: [1, 9],
          data: 'An aspect of the faith beguiles you or lures you into danger',
        },
        {
          match: [10, 18],
          data: 'Dreadful aspects or powers of the faith are revealed',
        },
        {
          match: [19, 27],
          data: 'Embodiment of a god or power is given corrupted form or purpose',
        },
        {
          match: [28, 36],
          data: 'Guardians seek martyrdom in defense of this place',
        },
        {
          match: [37, 45],
          data: 'Leaders corrupt or exploit their followers to oppose you',
        },
        {
          match: [46, 54],
          data: 'Prophecies portend a dire threat',
        },
        {
          match: [55, 63],
          data: 'Protective ward or enigmatic puzzle blocks the way',
        },
        {
          match: [64, 72],
          data: 'Religious artifact evokes unnerving power',
        },
        {
          match: [73, 81],
          data: 'Unnatural corruption or decay fouls the environment',
        },
        {
          match: [82, 90],
          data: 'Zealots enact a ceremony to unlock forbidden powers',
        },
        {
          match: [91, 98],
          data: ECoreCombo.ActTheme,
        },
        {
          match: [99, 100],
          data: 'Roll twice',
        },
      ],
    },
    opportunity: {
      items: [
        {
          match: [1, 20],
          data: 'Access to a hidden or sealed area',
        },
        {
          match: [21, 40],
          data: 'Encounter with a helpful adherent or heretic',
        },
        {
          match: [41, 60],
          data: 'Insight into the nature or history of the faith',
        },
        {
          match: [61, 80],
          data: 'Insight into the schemes or methods of religious zealots',
        },
        {
          match: [81, 100],
          data: 'Interesting or valuable artifact or device',
        },
      ],
    },
  },
};
