import { IOracle } from 'src/components/models'

export const Move: { [index: string]: IOracle } = {
  'Advance a Threat': {
    name: 'Advance a Threat',
    d: 100,
    table: [
      {
        match: [
          1,
          30
        ],
        text: 'The threat readies its next step, or a new danger looms. If you are in a position to prevent this development, you may attempt to do so. If you succeed, Reach a Milestone. Otherwise, mark menace.'
      },
      {
        match: [
          31,
          70
        ],
        text: 'The threat works subtly to advance toward its goal, or the danger escalates. Mark menace.'
      },
      {
        match: [
          71,
          100
        ],
        text: 'The threat makes a dramatic and immediate move, or a major event reveals new complications. Mark menace twice.'
      }
    ]
  },
  'Delve the Depths - Edge': {
    name: 'Delve the Depths - Edge',
    d: 100,
    table: [
      {
        match: [
          1,
          45
        ],
        text: 'Mark progress and Reveal a Danger.'
      },
      {
        match: [
          46,
          65
        ],
        text: 'Mark progress.'
      },
      {
        match: [
          66,
          75
        ],
        text: 'Choose one: Mark progress or Find an Opportunity.'
      },
      {
        match: [
          76,
          80
        ],
        text: 'Take both: Mark progress and Find an Opportunity.'
      },
      {
        match: [
          81,
          100
        ],
        text: 'Mark progress twice and Reveal a Danger.'
      }
    ]
  },
  'Delve the Depths - Shadow': {
    name: 'Delve the Depths - Shadow',
    d: 100,
    table: [
      {
        match: [
          1,
          30
        ],
        text: 'Mark progress and Reveal a Danger.'
      },
      {
        match: [
          31,
          65
        ],
        text: 'Mark progress.'
      },
      {
        match: [
          66,
          90
        ],
        text: 'Choose one: Mark progress or Find an Opportunity.'
      },
      {
        match: [
          91,
          99
        ],
        text: 'Take both: Mark progress and Find an Opportunity.'
      },
      {
        match: [
          100
        ],
        text: 'Mark progress twice and Reveal a Danger.'
      }
    ]
  },
  'Delve the Depths - Wits': {
    name: 'Delve the Depths - Wits',
    d: 100,
    table: [
      {
        match: [
          1,
          40
        ],
        text: 'Mark progress and Reveal a Danger.'
      },
      {
        match: [
          41,
          55
        ],
        text: 'Mark progress.'
      },
      {
        match: [
          56,
          80
        ],
        text: 'Choose one: Mark progress or Find an Opportunity.'
      },
      {
        match: [
          81,
          99
        ],
        text: 'Take both: Mark progress and Find an Opportunity.'
      },
      {
        match: [
          100
        ],
        text: 'Mark progress twice and Reveal a Danger.'
      }
    ]
  },
  'Endure Harm': {
    name: 'Endure Harm',
    d: 100,
    table: [
      {
        match: [
          1,
          10
        ],
        text: 'The harm is mortal. *Face Death*.'
      },
      {
        match: [
          11,
          20
        ],
        text: 'You are dying. You need to *Heal* within an hour or two, or *Face Death*.'
      },
      {
        match: [
          21,
          35
        ],
        text: 'You are unconscious and out of action. If left alone, you come back to your senses in an hour or two. If you are vulnerable to a foe not inclined to show mercy, *Face Death*.'
      },
      {
        match: [
          36,
          50
        ],
        text: 'You are reeling and fighting to stay conscious. If you engage in any vigorous activity (such as running or fighting) before taking a breather for a few minutes, roll on this table again (before resolving the other move).'
      },
      {
        match: [
          51,
          100
        ],
        text: 'You are battered but still standing.'
      }
    ]
  },
  'Endure Stress': {
    name: 'Endure Stress',
    d: 100,
    table: [
      {
        match: [
          1,
          10
        ],
        text: 'You are overwhelmed. *Face Desolation*.'
      },
      {
        match: [
          11,
          25
        ],
        text: 'You give up. *Forsake Your Vow* (if possible, one relevant to your current crisis).'
      },
      {
        match: [
          26,
          50
        ],
        text: 'You give in to a fear or compulsion, and act against your better instincts.'
      },
      {
        match: [
          51,
          100
        ],
        text: 'You persevere.'
      }
    ]
  },
  'Find an Opportunity': {
    name: 'Find an Opportunity',
    d: 100,
    table: [
      {
        match: [
          1,
          25
        ],
        text: 'The terrain favors you, or you find a hidden path.'
      },
      {
        match: [
          26,
          45
        ],
        text: 'An aspect of the history or nature of this place is revealed.'
      },
      {
        match: [
          46,
          57
        ],
        text: 'You locate a secure area.'
      },
      {
        match: [
          58,
          68
        ],
        text: 'A clue offers insight or direction.'
      },
      {
        match: [
          69,
          78
        ],
        text: 'You get the drop on a denizen.'
      },
      {
        match: [
          79,
          86
        ],
        text: 'This area provides an opportunity to scavenge, forage, or hunt.'
      },
      {
        match: [
          87,
          90
        ],
        text: 'You locate an interesting or helpful object.'
      },
      {
        match: [
          91,
          94
        ],
        text: 'You are alerted to a potential threat.'
      },
      {
        match: [
          95,
          98
        ],
        text: 'You encounter a denizen who might support you.'
      },
      {
        match: [
          99,
          100
        ],
        text: 'You encounter a denizen in need of help.'
      }
    ]
  },
  'Pay the Price': {
    name: 'Pay the Price',
    d: 100,
    table: [
      {
        match: [
          1,
          2
        ],
        text: 'Roll again and apply that result but make it worse. If you roll this result yet again, think of something dreadful that changes the course of your quest (Ask the IOracle if unsure) and make it happen.'
      },
      {
        match: [
          3,
          5
        ],
        text: 'A person or community you trusted loses faith in you, or acts against you.'
      },
      {
        match: [
          6,
          9
        ],
        text: 'A person or community you care about is exposed to danger.'
      },
      {
        match: [
          10,
          16
        ],
        text: 'You are separated from something or someone.'
      },
      {
        match: [
          17,
          23
        ],
        text: 'Your action has an unintended effect.'
      },
      {
        match: [
          24,
          32
        ],
        text: 'Something of value is lost or destroyed.'
      },
      {
        match: [
          33,
          41
        ],
        text: 'The current situation worsens.'
      },
      {
        match: [
          42,
          50
        ],
        text: 'A new danger or foe is revealed.'
      },
      {
        match: [
          51,
          59
        ],
        text: 'It causes a delay or puts you at a disadvantage.'
      },
      {
        match: [
          60,
          68
        ],
        text: 'It is harmful.'
      },
      {
        match: [
          69,
          77
        ],
        text: 'It is stressful.'
      },
      {
        match: [
          78,
          85
        ],
        text: 'A surprising development complicates your quest.'
      },
      {
        match: [
          86,
          90
        ],
        text: 'It wastes resources.'
      },
      {
        match: [
          91,
          94
        ],
        text: 'It forces you to act against your best intentions.'
      },
      {
        match: [
          95,
          98
        ],
        text: 'A friend, companion, or ally is put in harm’s way (or you are, if alone).'
      },
      {
        match: [
          99,
          100
        ],
        text: 'Roll twice more on this table. Both results occur. If they are the same result, make it worse.'
      }
    ]
  },
  'Reveal a Danger': {
    name: 'Reveal a Danger',
    d: 100,
    table: [
      {
        match: [
          1,
          30
        ],
        text: 'Check the theme card.'
      },
      {
        match: [
          31,
          45
        ],
        text: 'Check the domain card.'
      },
      {
        match: [
          46,
          57
        ],
        text: 'You encounter a hostile denizen.'
      },
      {
        match: [
          58,
          68
        ],
        text: 'You face an environmental or architectural hazard.'
      },
      {
        match: [
          69,
          76
        ],
        text: 'A discovery undermines or complicates your quest.'
      },
      {
        match: [
          77,
          79
        ],
        text: 'You confront a harrowing situation or sensation.'
      },
      {
        match: [
          80,
          82
        ],
        text: 'You face the consequences of an earlier choice or approach.'
      },
      {
        match: [
          83,
          85
        ],
        text: 'Your way is blocked or trapped.'
      },
      {
        match: [
          86,
          88
        ],
        text: 'A resource is diminished, broken, or lost.'
      },
      {
        match: [
          89,
          91
        ],
        text: 'You face a perplexing mystery or tough choice.'
      },
      {
        match: [
          92,
          94
        ],
        text: 'You lose your way or are delayed.'
      },
      {
        match: [
          95,
          100
        ],
        text: 'Roll twice more on this table. Both results occur. If they are the same result, make it worse.'
      }
    ]
  },
  'Reveal a Danger Alternate': {
    name: 'Reveal a Danger Alternate',
    d: 100,
    table: [
      {
        match: [
          1,
          22
        ],
        text: 'You encounter a hostile denizen.'
      },
      {
        match: [
          23,
          42
        ],
        text: 'You face an environmental or architectural hazard.'
      },
      {
        match: [
          43,
          58
        ],
        text: 'A discovery undermines or complicates your quest.'
      },
      {
        match: [
          59,
          64
        ],
        text: 'You confront a harrowing situation or sensation.'
      },
      {
        match: [
          65,
          70
        ],
        text: 'You face the consequences of an earlier choice or approach.'
      },
      {
        match: [
          71,
          76
        ],
        text: 'The path is blocked or trapped.'
      },
      {
        match: [
          77,
          82
        ],
        text: 'A resource is diminished, broken, or lost.'
      },
      {
        match: [
          83,
          88
        ],
        text: 'You face a perplexing mystery or tough choice.'
      },
      {
        match: [
          89,
          94
        ],
        text: 'You lose your way or are delayed.'
      },
      {
        match: [
          95,
          100
        ],
        text: 'Roll twice more on this table. Both results occur. If they are the same result, make it worse.'
      }
    ]
  }
}
