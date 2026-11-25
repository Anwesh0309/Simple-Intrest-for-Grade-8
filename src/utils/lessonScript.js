/* =========================================================================
   LESSON SCRIPT — Single source of truth for every spoken line.
   ---------------------------------------------------------------------------
   • UI components DISPLAY these exact strings.
   • src/utils/narration.js wraps them in styled segments for playback.
   • scripts/generate_audio.js reads ALL_PHRASES to pre-generate the MP3s.
   ========================================================================= */
import { PRACTICE_QUESTIONS } from '../mathData.js';

export const WONDER = {
  paragraph:
    "Leo has $1000 to save. Bank A offers 5 percent simple interest per year for 4 years. Bank B offers only 4 percent, but for 5 years. Leo thinks the higher rate must always win!",
  question:
    "Which bank will pay Leo more interest? Can a lower rate ever earn just as much?"
};

export const STORY = [
  {
    body: "When you save money in a bank, the bank pays you extra money called interest. The money you put in is the principal. The principal plus the interest is called the amount.",
    style: 'statement'
  },
  {
    body: "With simple interest, you earn interest only on the principal, never on the interest itself. So you earn exactly the same interest every year. $800 at 5 percent earns $40 every single year.",
    style: 'emphasis'
  },
  {
    body: "The simple interest formula is I equals P times R times T, divided by 100. P is the principal, R is the rate percent per year, and T is the time in years. $800 at 5 percent for 3 years earns 800 times 5 times 3 over 100, which is $120.",
    style: 'statement'
  },
  {
    body: "To find the amount at the end, add the interest to the principal. A equals P plus I. So $800 plus $120 of interest gives an amount of $920.",
    style: 'statement'
  },
  {
    body: "The time must always be in years! If the time is given in months, divide by 12. 6 months is 0.5 years, and 18 months is 1.5 years.",
    style: 'thinking'
  },
  {
    body: "You can rearrange the formula to find any missing value. R equals I times 100 divided by P times T. T equals I times 100 divided by P times R. And P equals I times 100 divided by R times T.",
    style: 'emphasis'
  },
  {
    body: "Leo's mystery is solved! Bank A pays 1000 times 5 times 4 over 100, which is $200. Bank B pays 1000 times 4 times 5 over 100, which is also $200. The higher rate does not always win, because time matters too!",
    style: 'encouragement'
  },
  {
    body: "Brilliant! You can now calculate simple interest and amounts, convert months to years and find a missing principal, rate or time. Step into the lab to grow savings, plan loans and crack interest puzzles!",
    style: 'celebration'
  }
];

export const SIMULATE = {
  1: "Watch the savings grow! Add one year at a time and see the same interest block appear every year. Stop when you reach the target amount.",
  2: "You are the savings planner! Choose a rate and a time that earn exactly the interest the customer wants.",
  3: "Be an interest detective! Use the formula backwards to find the missing principal, rate or time."
};

export const SIMULATE_GUIDANCE = {
  1: [
    {
      desc: "Leo saves $800 at 5% simple interest per year. Add years one at a time until his savings reach $1000.",
      hint: "5% of $800 = $40 every year. $1000 minus $800 = $200 of interest. $200 divided by $40 = 5 years."
    },
    {
      desc: "Mia saves $1500 at 4% simple interest per year. How many years until she has $1800 for a new laptop?",
      hint: "4% of $1500 = $60 a year. She needs $300 of interest. $300 divided by $60 = 5 years."
    },
    {
      desc: "The class puts $2000 in an account paying 3.5% simple interest per year. Grow it until the amount reaches $2280.",
      hint: "3.5% of $2000 = $70 a year. $280 divided by $70 = 4 years."
    }
  ],
  2: [
    {
      desc: "Leo has $2000. Choose a rate and a time so that he earns exactly $300 of simple interest. There is more than one answer!",
      hint: "2000 times R times T divided by 100 = 300, so R times T = 15. Try 5% for 3 years, or 3% for 5 years!"
    },
    {
      desc: "Mia has $1200 and wants exactly $180 of interest within 24 months. Choose a rate and a time in months.",
      hint: "1200 times R times T divided by 100 = 180, so R times T in years = 15. With 2 years, R must be 7.5%."
    },
    {
      desc: "Grandpa invests $5000 and wants the amount to reach $5600. The bank pays at most 4% per year. Find a plan that works.",
      hint: "Interest needed = $600. 5000 times R times T divided by 100 = 600, so R times T = 12. At 4%, T = 3 years."
    }
  ],
  3: [
    {
      desc: "Bank A: $1000 at 5% for 4 years. Bank B: $1000 at 4% for 5 years. Which one pays more interest?",
      hint: "Use I = P times R times T divided by 100 for each bank."
    },
    {
      desc: "Mia borrows $2400 for 3 years and pays $432 of simple interest. What rate was she charged?",
      hint: "$432 divided by 3 = $144 a year. 144 divided by 2400 times 100 = 6%."
    },
    {
      desc: "Ava's savings earned $90 simple interest in 18 months at 4% per year. How much did she put in?",
      hint: "18 divided by 12 = 1.5 years. P = I times 100 divided by R times T."
    }
  ]
};

export const REFLECT = {
  question:
    "Why can a lower interest rate sometimes earn as much as a higher one? Explain it to Robo using the simple interest formula and your own example!"
};

export const FEEDBACK = {
  splitDone: "Awesome! You reached the target amount!",
  buildDone: "Great plan! That earns exactly the right interest!",
  reverseDone: "Brilliant! You found the missing value!",
  tryAgain: "Not quite. Try again!",
  practiceCorrect: "Correct! Excellent work with simple interest!",
  practiceWrong: "Not quite!",
  lessonDone: "Outstanding reflection! Lesson complete!"
};

// Compile ALL_PHRASES
export const ALL_PHRASES = [
  { text: WONDER.paragraph, style: 'statement' },
  { text: WONDER.question, style: 'question' },
  ...STORY.map(s => ({ text: s.body, style: s.style })),
  { text: SIMULATE[1], style: 'instruction' },
  { text: SIMULATE[2], style: 'instruction' },
  { text: SIMULATE[3], style: 'question' },
  // Station guidance & hints
  ...[1, 2, 3].flatMap(st => SIMULATE_GUIDANCE[st].flatMap(g => [
    { text: g.desc, style: 'instruction' },
    { text: g.hint, style: 'thinking' }
  ])),
  // 100 Questions & 100 Hints
  ...PRACTICE_QUESTIONS.flatMap(q => [
    { text: q.prompt, style: 'question' },
    { text: q.hint, style: 'thinking' }
  ]),
  { text: REFLECT.question, style: 'thinking' },
  { text: FEEDBACK.splitDone, style: 'celebration' },
  { text: FEEDBACK.buildDone, style: 'celebration' },
  { text: FEEDBACK.reverseDone, style: 'celebration' },
  { text: FEEDBACK.tryAgain, style: 'encouragement' },
  { text: FEEDBACK.practiceCorrect, style: 'celebration' },
  { text: FEEDBACK.practiceWrong, style: 'encouragement' },
  { text: FEEDBACK.lessonDone, style: 'celebration' }
];
