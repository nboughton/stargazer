import { ISFTable } from 'src/components/models';

export const Move: { [index: string]: ISFTable } = {
  'Confront Chaos': {
    items: [
      {
        match: [1, 4],
        data: '<p>Baneful weapon of mass destruction</p>\n',
      },
      {
        match: [5, 9],
        data: '<p>Cataclysmic environmental effects</p>\n',
      },
      {
        match: [10, 12],
        data: '<p>Dead given unnatural life</p>\n',
      },
      {
        match: [13, 17],
        data: '<p>Destructive lifeform of monstrous proportion</p>\n',
      },
      {
        match: [18, 20],
        data: '<p>Dread hallucinations or illusions</p>\n',
      },
      {
        match: [21, 24],
        data: '<p>Harbingers of an imminent invasion</p>\n',
      },
      {
        match: [25, 27],
        data: '<p>Horde of insatiable hunger or fury</p>\n',
      },
      {
        match: [28, 32],
        data: '<p>Horrific lifeforms of inscrutable purpose</p>\n',
      },
      {
        match: [33, 36],
        data: '<p>Impostors in human form</p>\n',
      },
      {
        match: [37, 41],
        data: '<p>Machines made enemy</p>\n',
      },
      {
        match: [42, 45],
        data: '<p>Malignant contagion or parasite</p>\n',
      },
      {
        match: [46, 50],
        data: '<p>Messenger or signal with a dire warning</p>\n',
      },
      {
        match: [51, 53],
        data: '<p>Passage to a grim alternate reality</p>\n',
      },
      {
        match: [54, 58],
        data: '<p>People corrupted by chaos</p>\n',
      },
      {
        match: [59, 63],
        data: '<p>Powerful distortions of time or space</p>\n',
      },
      {
        match: [64, 68],
        data: '<p>Signs of an impending catastrophe</p>\n',
      },
      {
        match: [69, 72],
        data: '<p>Site of a baffling disappearance</p>\n',
      },
      {
        match: [73, 77],
        data: '<p>Site of a horrible disaster</p>\n',
      },
      {
        match: [78, 82],
        data: '<p>Site of terrible carnage</p>\n',
      },
      {
        match: [83, 87],
        data: '<p>Technology nullified or made unstable</p>\n',
      },
      {
        match: [88, 92],
        data: '<p>Technology warped for dark purpose</p>\n',
      },
      {
        match: [93, 96],
        data: '<p>Vault of dread technology or power</p>\n',
      },
      {
        match: [97, 100],
        data: '<p>Worshipers of great and malevolent powers</p>\n',
      },
    ],
  },
  'Endure Harm': {
    items: [
      {
        match: [1, 10],
        data: '<p>You suffer mortal harm. <strong>Face Death</strong>.</p>\n',
      },
      {
        match: [11, 20],
        data: '<p>You are dying. Within an hour or two, you must <strong>Heal</strong> and raise your health above 0, or <strong>Face Death</strong>.</p>\n',
      },
      {
        match: [21, 35],
        data: '<p>You are unconscious and out of action. If left alone, you come back to your senses in an hour or two. If you are vulnerable to ongoing harm, <strong>Face Death</strong>.</p>\n',
      },
      {
        match: [36, 50],
        data: '<p>You are reeling and fighting to stay conscious. If you engage in any vigorous activity before taking a breather for a few minutes, roll on this table again (before resolving the other move).</p>\n',
      },
      {
        match: [51, 100],
        data: '<p>You are still standing.</p>\n',
      },
    ],
  },
  'Endure Stress': {
    items: [
      {
        match: [1, 10],
        data: '<p>You are overwhelmed. <strong>Face Desolation</strong>.</p>\n',
      },
      {
        match: [11, 25],
        data: '<p>You give up. <strong>Forsake Your Vow</strong>.</p>\n',
      },
      {
        match: [26, 50],
        data: '<p>You give in to fear or compulsion, and act against your better instincts.</p>\n',
      },
      {
        match: [51, 100],
        data: '<p>You persevere.</p>\n',
      },
    ],
  },
  'Make a Discovery': {
    items: [
      {
        match: [1, 4],
        data: '<p>Advanced technology waiting to be harnessed or salvaged</p>\n',
      },
      {
        match: [5, 8],
        data: '<p>Ancient archive or message</p>\n',
      },
      {
        match: [9, 10],
        data: '<p>Artificial consciousness evolved to a higher state</p>\n',
      },
      {
        match: [11, 12],
        data: '<p>Clues to a crucial resource or uncharted domain</p>\n',
      },
      {
        match: [13, 14],
        data: '<p>Envoy from another time or reality</p>\n',
      },
      {
        match: [15, 22],
        data: '<p>Extraordinary natural phenomenon</p>\n',
      },
      {
        match: [23, 24],
        data: '<p>First contact with intelligent life</p>\n',
      },
      {
        match: [25, 26],
        data: '<p>Gateway to another time or alternate reality</p>\n',
      },
      {
        match: [27, 28],
        data: '<p>Key to unlocking a language or method of communication</p>\n',
      },
      {
        match: [29, 34],
        data: '<p>Lost or hidden people</p>\n',
      },
      {
        match: [35, 42],
        data: '<p>Majestic or unusual lifeforms</p>\n',
      },
      {
        match: [43, 46],
        data: '<p>Marvel of ancient engineering</p>\n',
      },
      {
        match: [47, 50],
        data: '<p>Miraculously preserved artifact or specimen</p>\n',
      },
      {
        match: [51, 56],
        data: '<p>Monumental architecture or artistry of an ancient civilization</p>\n',
      },
      {
        match: [57, 62],
        data: '<p>Mysterious device or artifact of potential value</p>\n',
      },
      {
        match: [63, 66],
        data: '<p>New understanding of an enduring mystery</p>\n',
      },
      {
        match: [67, 68],
        data: '<p>Pathway or means of travel to a distant location</p>\n',
      },
      {
        match: [69, 70],
        data: '<p>Person or lifeform with phenomenal abilities</p>\n',
      },
      {
        match: [71, 78],
        data: '<p>Place of awe-inspiring beauty</p>\n',
      },
      {
        match: [79, 86],
        data: '<p>Rare and valuable resource</p>\n',
      },
      {
        match: [87, 88],
        data: '<p>Safeguarded or idyllic location</p>\n',
      },
      {
        match: [89, 90],
        data: '<p>Visions or prophesies of the future</p>\n',
      },
      {
        match: [91, 100],
        data: '<p>[Roll twice]</p>\n',
      },
    ],
  },
  'Pay the Price': {
    items: [
      {
        match: [1, 2],
        data: '<p>A trusted individual or community acts against you</p>\n',
      },
      {
        match: [3, 4],
        data: '<p>An individual or community you care about is exposed to danger</p>\n',
      },
      {
        match: [5, 7],
        data: '<p>You encounter signs of a looming threat</p>\n',
      },
      {
        match: [8, 10],
        data: '<p>You create an opportunity for an enemy</p>\n',
      },
      {
        match: [11, 14],
        data: '<p>You face a tough choice</p>\n',
      },
      {
        match: [15, 18],
        data: '<p>You face the consequences of an earlier choice</p>\n',
      },
      {
        match: [19, 22],
        data: '<p>A surprising development complicates your quest</p>\n',
      },
      {
        match: [23, 26],
        data: '<p>You are separated from something or someone</p>\n',
      },
      {
        match: [27, 32],
        data: '<p>Your action causes collateral damage or has an unintended effect</p>\n',
      },
      {
        match: [33, 38],
        data: '<p>Something of value is lost or destroyed</p>\n',
      },
      {
        match: [39, 44],
        data: '<p>The environment or terrain introduces a new hazard</p>\n',
      },
      {
        match: [45, 50],
        data: '<p>A new enemy is revealed</p>\n',
      },
      {
        match: [51, 56],
        data: '<p>A friend, companion, or ally is in harm’s way (or you are, if alone)</p>\n',
      },
      {
        match: [57, 62],
        data: '<p>Your equipment or vehicle malfunctions</p>\n',
      },
      {
        match: [63, 68],
        data: '<p>Your vehicle suffers damage</p>\n',
      },
      {
        match: [69, 74],
        data: '<p>You waste resources</p>\n',
      },
      {
        match: [75, 81],
        data: '<p>You are harmed</p>\n',
      },
      {
        match: [82, 88],
        data: '<p>You are stressed</p>\n',
      },
      {
        match: [89, 95],
        data: '<p>You are delayed or put at a disadvantage</p>\n',
      },
      {
        match: [96, 100],
        data: '<p>[Roll twice]</p>\n',
      },
    ],
  },
  'Take Decisive Action': {
    items: [
      {
        match: [1, 40],
        data: '<p>It’s worse than you thought: You or an ally make a suffer move (-2)</p>\n',
      },
      {
        match: [41, 52],
        data: '<p>The victory is short-lived: A new peril or foe is revealed</p>\n',
      },
      {
        match: [53, 64],
        data: '<p>You face collateral damage: Something is lost, damaged, or broken</p>\n',
      },
      {
        match: [65, 76],
        data: '<p>Others pay the price: Someone else suffers the cost</p>\n',
      },
      {
        match: [77, 88],
        data: '<p>Others won’t forget: You are marked for vengeance</p>\n',
      },
      {
        match: [89, 100],
        data: '<p>It gets complicated: The true nature of a foe or objective is revealed</p>\n',
      },
    ],
  },
  'Withstand Damage': {
    items: [
      {
        match: [1, 10],
        data: '<p>Immediate catastrophic destruction. All aboard must <strong>Endure Harm</strong> or <strong>Face Death</strong>, as appropriate.</p>\n',
      },
      {
        match: [11, 25],
        data: '<p>Destruction is imminent and unavoidable. If you do not have the means or intention to get clear, <strong>Endure Harm</strong> or <strong>Face Death</strong> as appropriate.</p>\n',
      },
      {
        match: [26, 40],
        data: '<p>Destruction is imminent, but can be averted if you <strong>Repair</strong> your vehicle and raise its integrity above 0. If you fail, see 11-25.</p>\n',
      },
      {
        match: [41, 55],
        data: '<p>You cannot <strong>Repair</strong> this vehicle until you <strong>Resupply</strong> and obtain a crucial replacement part. If you roll this result again prior to that, see 11-25.</p>\n',
      },
      {
        match: [56, 70],
        data: '<p>The vehicle is crippled or out of your control. To get it back in action, you must <strong>Repair</strong> and raise its integrity above 0.</p>\n',
      },
      {
        match: [71, 85],
        data: '<p>It’s a rough ride. All aboard suffer must make the <strong>Endure Harm</strong>, <strong>Endure Stress</strong>, or <strong>Companion Takes a Hit</strong> move, suffering a serious (-2) cost.</p>\n',
      },
      {
        match: [86, 95],
        data: '<p>You’ve lost fuel, energy, or cargo. <strong>Sacrifice Resources</strong> (-2).</p>\n',
      },
      {
        match: [96, 100],
        data: '<p>Against all odds, the vehicle holds together.</p>\n',
      },
    ],
  },
};
