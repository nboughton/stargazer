import { ISFTable } from 'src/components/models';

export const Move: { [index: string]: ISFTable } = {
  'Almost Certain': {
    items: [
      {
        match: [1, 90],
        data: 'Yes',
      },
      {
        match: [91, 100],
        data: 'No',
      },
    ],
  },
  Likely: {
    items: [
      {
        match: [1, 75],
        data: 'Yes',
      },
      {
        match: [76, 100],
        data: 'No',
      },
    ],
  },
  '50/50': {
    items: [
      {
        match: [1, 50],
        data: 'Yes',
      },
      {
        match: [51, 100],
        data: 'No',
      },
    ],
  },
  Unlikely: {
    items: [
      {
        match: [1, 25],
        data: 'Yes',
      },
      {
        match: [26, 100],
        data: 'No',
      },
    ],
  },
  'Small Chance': {
    items: [
      {
        match: [1, 10],
        data: 'Yes',
      },
      {
        match: [11, 100],
        data: 'No',
      },
    ],
  },
  'Begin a Session': {
    items: [
      {
        match: [1, 10],
        data: 'Flashback reveals an aspect of your background or nature',
      },
      {
        match: [11, 20],
        data: 'Flashback reveals an aspect of another character, place, or faction',
      },
      {
        match: [21, 30],
        data: 'Influential character or faction is introduced or given new detail',
      },
      {
        match: [31, 40],
        data: 'Seemingly unrelated situations are shown to be connected',
      },
      {
        match: [41, 50],
        data: 'External factors create new danger, urgency, or importance for a quest',
      },
      {
        match: [51, 60],
        data: 'Important character is put in danger or suffers a misadventure',
      },
      {
        match: [61, 70],
        data: 'Key location is made unsafe or becomes mired in conflict',
      },
      {
        match: [71, 80],
        data: 'Defeated enemy or threat makes a surprising return',
      },
      {
        match: [81, 90],
        data: 'Unexpected peril lies ahead or lurks just out of view',
      },
      {
        match: [91, 100],
        data: 'Unforeseen aid is on the way or within reach',
      },
    ],
  },
  'Confront Chaos': {
    items: [
      {
        match: [1, 4],
        data: 'Baneful weapon of mass destruction',
      },
      {
        match: [5, 9],
        data: 'Cataclysmic environmental effects',
      },
      {
        match: [10, 12],
        data: 'Dead given unnatural life',
      },
      {
        match: [13, 17],
        data: 'Destructive lifeform of monstrous proportion',
      },
      {
        match: [18, 20],
        data: 'Dread hallucinations or illusions',
      },
      {
        match: [21, 24],
        data: 'Harbingers of an imminent invasion',
      },
      {
        match: [25, 27],
        data: 'Horde of insatiable hunger or fury',
      },
      {
        match: [28, 32],
        data: 'Horrific lifeforms of inscrutable purpose',
      },
      {
        match: [33, 36],
        data: 'Impostors in human form',
      },
      {
        match: [37, 41],
        data: 'Machines made enemy',
      },
      {
        match: [42, 45],
        data: 'Malignant contagion or parasite',
      },
      {
        match: [46, 50],
        data: 'Messenger or signal with a dire warning',
      },
      {
        match: [51, 53],
        data: 'Passage to a grim alternate reality',
      },
      {
        match: [54, 58],
        data: 'People corrupted by chaos',
      },
      {
        match: [59, 63],
        data: 'Powerful distortions of time or space',
      },
      {
        match: [64, 68],
        data: 'Signs of an impending catastrophe',
      },
      {
        match: [69, 72],
        data: 'Site of a baffling disappearance',
      },
      {
        match: [73, 77],
        data: 'Site of a horrible disaster',
      },
      {
        match: [78, 82],
        data: 'Site of terrible carnage',
      },
      {
        match: [83, 87],
        data: 'Technology nullified or made unstable',
      },
      {
        match: [88, 92],
        data: 'Technology warped for dark purpose',
      },
      {
        match: [93, 96],
        data: 'Vault of dread technology or power',
      },
      {
        match: [97, 100],
        data: 'Worshipers of great and malevolent powers',
      },
    ],
  },
  'Endure Harm': {
    items: [
      {
        match: [1, 10],
        data: 'You suffer mortal harm. Face Death.',
      },
      {
        match: [11, 20],
        data: 'You are dying. Within an hour or two, you must Heal and raise your health above 0, or Face Death.',
      },
      {
        match: [21, 35],
        data: 'You are unconscious and out of action. If left alone, you come back to your senses in an hour or two. If you are vulnerable to ongoing harm, Face Death.',
      },
      {
        match: [36, 50],
        data: 'You are reeling and fighting to stay conscious. If you engage in any vigorous activity before taking a breather for a few minutes, roll on this table again (before resolving the other move).',
      },
      {
        match: [51, 100],
        data: 'You are still standing.',
      },
    ],
  },
  'Endure Stress': {
    items: [
      {
        match: [1, 10],
        data: 'You are overwhelmed. Face Desolation.',
      },
      {
        match: [11, 25],
        data: 'You give up. Forsake Your Vow.',
      },
      {
        match: [26, 50],
        data: 'You give in to fear or compulsion, and act against your better instincts.',
      },
      {
        match: [51, 100],
        data: 'You persevere.',
      },
    ],
  },
  'Make a Discovery': {
    items: [
      {
        match: [1, 4],
        data: 'Advanced technology waiting to be harnessed or salvaged',
      },
      {
        match: [5, 8],
        data: 'Ancient archive or message',
      },
      {
        match: [9, 10],
        data: 'Artificial consciousness evolved to a higher state',
      },
      {
        match: [11, 12],
        data: 'Clues to a crucial resource or uncharted domain',
      },
      {
        match: [13, 14],
        data: 'Envoy from another time or reality',
      },
      {
        match: [15, 22],
        data: 'Extraordinary natural phenomenon',
      },
      {
        match: [23, 24],
        data: 'First contact with intelligent life',
      },
      {
        match: [25, 26],
        data: 'Gateway to another time or alternate reality',
      },
      {
        match: [27, 28],
        data: 'Key to unlocking a language or method of communication',
      },
      {
        match: [29, 34],
        data: 'Lost or hidden people',
      },
      {
        match: [35, 42],
        data: 'Majestic or unusual lifeforms',
      },
      {
        match: [43, 46],
        data: 'Marvel of ancient engineering',
      },
      {
        match: [47, 50],
        data: 'Miraculously preserved artifact or specimen',
      },
      {
        match: [51, 56],
        data: 'Monumental architecture or artistry of an ancient civilization',
      },
      {
        match: [57, 62],
        data: 'Mysterious device or artifact of potential value',
      },
      {
        match: [63, 66],
        data: 'New understanding of an enduring mystery',
      },
      {
        match: [67, 68],
        data: 'Pathway or means of travel to a distant location',
      },
      {
        match: [69, 70],
        data: 'Person or lifeform with phenomenal abilities',
      },
      {
        match: [71, 78],
        data: 'Place of awe-inspiring beauty',
      },
      {
        match: [79, 86],
        data: 'Rare and valuable resource',
      },
      {
        match: [87, 88],
        data: 'Safeguarded or idyllic location',
      },
      {
        match: [89, 90],
        data: 'Visions or prophesies of the future',
      },
      {
        match: [91, 100],
        data: 'Roll twice',
      },
    ],
  },
  'Pay the Price': {
    items: [
      {
        match: [1, 2],
        data: 'A trusted individual or community acts against you',
      },
      {
        match: [3, 4],
        data: 'An individual or community you care about is exposed to danger',
      },
      {
        match: [5, 7],
        data: 'You encounter signs of a looming threat',
      },
      {
        match: [8, 10],
        data: 'You create an opportunity for an enemy',
      },
      {
        match: [11, 14],
        data: 'You face a tough choice',
      },
      {
        match: [15, 18],
        data: 'You face the consequences of an earlier choice',
      },
      {
        match: [19, 22],
        data: 'A surprising development complicates your quest',
      },
      {
        match: [23, 26],
        data: 'You are separated from something or someone',
      },
      {
        match: [27, 32],
        data: 'Your action causes collateral damage or has an unintended effect',
      },
      {
        match: [33, 38],
        data: 'Something of value is lost or destroyed',
      },
      {
        match: [39, 44],
        data: 'The environment or terrain introduces a new hazard',
      },
      {
        match: [45, 50],
        data: 'A new enemy is revealed',
      },
      {
        match: [51, 56],
        data: 'A friend, companion, or ally is in harm’s way (or you are, if alone)',
      },
      {
        match: [57, 62],
        data: 'Your equipment or vehicle malfunctions',
      },
      {
        match: [63, 68],
        data: 'Your vehicle suffers damage',
      },
      {
        match: [69, 74],
        data: 'You waste resources',
      },
      {
        match: [75, 81],
        data: 'You are harmed',
      },
      {
        match: [82, 88],
        data: 'You are stressed',
      },
      {
        match: [89, 95],
        data: 'You are delayed or put at a disadvantage',
      },
      {
        match: [96, 100],
        data: 'Roll twice',
      },
    ],
  },
  'Take Decisive Action': {
    items: [
      {
        match: [1, 40],
        data: 'It’s worse than you thought: You or an ally make a suffer move (-2)',
      },
      {
        match: [41, 52],
        data: 'The victory is short-lived: A new peril or foe is revealed',
      },
      {
        match: [53, 64],
        data: 'You face collateral damage: Something is lost, damaged, or broken',
      },
      {
        match: [65, 76],
        data: 'Others pay the price: Someone else suffers the cost',
      },
      {
        match: [77, 88],
        data: 'Others won’t forget: You are marked for vengeance',
      },
      {
        match: [89, 100],
        data: 'It gets complicated: The true nature of a foe or objective is revealed',
      },
    ],
  },
  'Withstand Damage': {
    items: [
      {
        match: [1, 10],
        data: 'Immediate catastrophic destruction. All aboard must Endure Harm or [Face Death], as appropriate.',
      },
      {
        match: [11, 25],
        data: 'Destruction is imminent and unavoidable. If you do not have the means or intention to get clear, Endure Harm or Face Death as appropriate.',
      },
      {
        match: [26, 40],
        data: 'Destruction is imminent, but can be averted if you Repair your vehicle and raise its integrity above 0. If you fail, see 11-25.',
      },
      {
        match: [41, 55],
        data: 'You cannot Repair this vehicle until you Resupply and obtain a crucial replacement part. If you roll this result again prior to that, see 11-25.',
      },
      {
        match: [56, 70],
        data: 'The vehicle is crippled or out of your control. To get it back in action, you must Repair and raise its integrity above 0.',
      },
      {
        match: [71, 85],
        data: 'It’s a rough ride. All aboard suffer must make the Endure Harm], [Endure Stress], or [Companion Takes a Hit move, suffering a serious (-2) cost.',
      },
      {
        match: [86, 95],
        data: 'You’ve lost fuel, energy, or cargo. Sacrifice Resources (-2).',
      },
      {
        match: [96, 100],
        data: 'Against all odds, the vehicle holds together.',
      },
    ],
  },
};
