import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 100 Questions Data
const PRACTICE_QUESTIONS = [
  // --- World 0: Piggy Bank Park (Q1-Q10) ---
  {
    id: 1, worldIndex: 0,
    prompt: "Leo saves $500 at 4% simple interest per year. How much interest is earned each year?",
    options: ["$20", "$25", "$200", "$520"],
    correctIndex: 0, correctValue: "$20",
    hint: "Calculate 4% of $500: multiply 500 by 4, then divide by 100.",
    explanation: "4% of $500 = 0.04 × 500 = $20 each year.",
    diagramData: { type: "growth", P: 500, yearly: 20, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 2, worldIndex: 0,
    prompt: "Emma deposits $800 at 5% simple interest per year. How much interest is earned each year?",
    options: ["$40", "$45", "$80", "$840"],
    correctIndex: 0, correctValue: "$40",
    hint: "Calculate 5% of $800: multiply 800 by 5, then divide by 100.",
    explanation: "5% of $800 = 0.05 × 800 = $40 each year.",
    diagramData: { type: "growth", P: 800, yearly: 40, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 3, worldIndex: 0,
    prompt: "Alex invests $1000 at 3% simple interest per year. How much interest is earned each year?",
    options: ["$30", "$33", "$300", "$1030"],
    correctIndex: 0, correctValue: "$30",
    hint: "Calculate 3% of $1000: multiply 1000 by 3, then divide by 100.",
    explanation: "3% of $1000 = 0.03 × 1000 = $30 each year.",
    diagramData: { type: "growth", P: 1000, yearly: 30, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 4, worldIndex: 0,
    prompt: "Sophia saves $1200 at 2.5% simple interest per year. How much interest is earned each year?",
    options: ["$30", "$25", "$300", "$1230"],
    correctIndex: 0, correctValue: "$30",
    hint: "Calculate 2.5% of $1200: multiply 1200 by 2.5, then divide by 100.",
    explanation: "2.5% of $1200 = 0.025 × 1200 = $30 each year.",
    diagramData: { type: "growth", P: 1200, yearly: 30, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 5, worldIndex: 0,
    prompt: "Jack deposits $1500 at 6% simple interest per year. How much interest is earned each year?",
    options: ["$90", "$60", "$150", "$900"],
    correctIndex: 0, correctValue: "$90",
    hint: "Calculate 6% of $1500: multiply 1500 by 6, then divide by 100.",
    explanation: "6% of $1500 = 0.06 × 1500 = $90 each year.",
    diagramData: { type: "growth", P: 1500, yearly: 90, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 6, worldIndex: 0,
    prompt: "Maya saves $2000 at 4% simple interest per year. How much interest is earned each year?",
    options: ["$80", "$40", "$800", "$2080"],
    correctIndex: 0, correctValue: "$80",
    hint: "Calculate 4% of $2000: multiply 2000 by 4, then divide by 100.",
    explanation: "4% of $2000 = 0.04 × 2000 = $80 each year.",
    diagramData: { type: "growth", P: 2000, yearly: 80, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 7, worldIndex: 0,
    prompt: "Lucas deposits $2400 at 5% simple interest per year. How much interest is earned each year?",
    options: ["$120", "$100", "$240", "$1200"],
    correctIndex: 0, correctValue: "$120",
    hint: "Calculate 5% of $2400: multiply 2400 by 5, then divide by 100.",
    explanation: "5% of $2400 = 0.05 × 2400 = $120 each year.",
    diagramData: { type: "growth", P: 2400, yearly: 120, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 8, worldIndex: 0,
    prompt: "Chloe saves $3000 at 3.5% simple interest per year. How much interest is earned each year?",
    options: ["$105", "$95", "$150", "$1050"],
    correctIndex: 0, correctValue: "$105",
    hint: "Calculate 3.5% of $3000: multiply 3000 by 3.5, then divide by 100.",
    explanation: "3.5% of $3000 = 0.035 × 3000 = $105 each year.",
    diagramData: { type: "growth", P: 3000, yearly: 105, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 9, worldIndex: 0,
    prompt: "Ethan deposits $4000 at 2% simple interest per year. How much interest is earned each year?",
    options: ["$80", "$40", "$800", "$4080"],
    correctIndex: 0, correctValue: "$80",
    hint: "Calculate 2% of $4000: multiply 4000 by 2, then divide by 100.",
    explanation: "2% of $4000 = 0.02 × 4000 = $80 each year.",
    diagramData: { type: "growth", P: 4000, yearly: 80, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },
  {
    id: 10, worldIndex: 0,
    prompt: "Harper saves $5000 at 7% simple interest per year. How much interest is earned each year?",
    options: ["$350", "$300", "$700", "$3500"],
    correctIndex: 0, correctValue: "$350",
    hint: "Calculate 7% of $5000: multiply 5000 by 7, then divide by 100.",
    explanation: "7% of $5000 = 0.07 × 5000 = $350 each year.",
    diagramData: { type: "growth", P: 500, yearly: 350, years: 3 },
    rule: "✦ YEARLY INTEREST = R% OF P"
  },

  // --- World 1: Yearly Yard (Q11-Q20) ---
  {
    id: 11, worldIndex: 1,
    prompt: "Liam deposits $400 at 5% simple interest per year for 2 years. How much interest is earned?",
    options: ["$40", "$20", "$440", "$80"],
    correctIndex: 0, correctValue: "$40",
    hint: "Use I = P × R × T ÷ 100: multiply 400 by 5 by 2, then divide by 100.",
    explanation: "I = 400 × 5 × 2 ÷ 100 = $40.",
    diagramData: { type: "formula", slots: { I: null, P: "$400", R: "5", T: "2" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 12, worldIndex: 1,
    prompt: "Ava saves $600 at 4% simple interest per year for 3 years. How much interest is earned?",
    options: ["$72", "$24", "$720", "$672"],
    correctIndex: 0, correctValue: "$72",
    hint: "Use I = P × R × T ÷ 100: multiply 600 by 4 by 3, then divide by 100.",
    explanation: "I = 600 × 4 × 3 ÷ 100 = $72.",
    diagramData: { type: "formula", slots: { I: null, P: "$600", R: "4", T: "3" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 13, worldIndex: 1,
    prompt: "Noah invests $800 at 5% simple interest per year for 4 years. How much interest is earned?",
    options: ["$160", "$40", "$180", "$960"],
    correctIndex: 0, correctValue: "$160",
    hint: "Use I = P × R × T ÷ 100: multiply 800 by 5 by 4, then divide by 100.",
    explanation: "I = 800 × 5 × 4 ÷ 100 = $160.",
    diagramData: { type: "formula", slots: { I: null, P: "$800", R: "5", T: "4" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 14, worldIndex: 1,
    prompt: "Mason deposits $1000 at 6% simple interest per year for 3 years. How much interest is earned?",
    options: ["$180", "$60", "$1800", "$1180"],
    correctIndex: 0, correctValue: "$180",
    hint: "Use I = P × R × T ÷ 100: multiply 1000 by 6 by 3, then divide by 100.",
    explanation: "I = 1000 × 6 × 3 ÷ 100 = $180.",
    diagramData: { type: "formula", slots: { I: null, P: "$1000", R: "6", T: "3" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 15, worldIndex: 1,
    prompt: "Ella saves $1200 at 3% simple interest per year for 5 years. How much interest is earned?",
    options: ["$180", "$36", "$150", "$1380"],
    correctIndex: 0, correctValue: "$180",
    hint: "Use I = P × R × T ÷ 100: multiply 1200 by 3 by 5, then divide by 100.",
    explanation: "I = 1200 × 3 × 5 ÷ 100 = $180.",
    diagramData: { type: "formula", slots: { I: null, P: "$1200", R: "3", T: "5" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 16, worldIndex: 1,
    prompt: "James deposits $1500 at 4% simple interest per year for 2 years. How much interest is earned?",
    options: ["$120", "$60", "$150", "$1620"],
    correctIndex: 0, correctValue: "$120",
    hint: "Use I = P × R × T ÷ 100: multiply 1500 by 4 by 2, then divide by 100.",
    explanation: "I = 1500 × 4 × 2 ÷ 100 = $120.",
    diagramData: { type: "formula", slots: { I: null, P: "$1500", R: "4", T: "2" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 17, worldIndex: 1,
    prompt: "Mia invests $2000 at 5% simple interest per year for 3 years. How much interest is earned?",
    options: ["$300", "$100", "$250", "$2300"],
    correctIndex: 0, correctValue: "$300",
    hint: "Use I = P × R × T ÷ 100: multiply 2000 by 5 by 3, then divide by 100.",
    explanation: "I = 2000 × 5 × 3 ÷ 100 = $300.",
    diagramData: { type: "formula", slots: { I: null, P: "$2000", R: "5", T: "3" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 18, worldIndex: 1,
    prompt: "Logan saves $2500 at 6% simple interest per year for 2 years. How much interest is earned?",
    options: ["$300", "$150", "$250", "$2800"],
    correctIndex: 0, correctValue: "$300",
    hint: "Use I = P × R × T ÷ 100: multiply 2500 by 6 by 2, then divide by 100.",
    explanation: "I = 2500 × 6 × 2 ÷ 100 = $300.",
    diagramData: { type: "formula", slots: { I: null, P: "$2500", R: "6", T: "2" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 19, worldIndex: 1,
    prompt: "Charlotte deposits $3000 at 4% simple interest per year for 4 years. How much interest is earned?",
    options: ["$480", "$120", "$400", "$3480"],
    correctIndex: 0, correctValue: "$480",
    hint: "Use I = P × R × T ÷ 100: multiply 3000 by 4 by 4, then divide by 100.",
    explanation: "I = 3000 × 4 × 4 ÷ 100 = $480.",
    diagramData: { type: "formula", slots: { I: null, P: "$3000", R: "4", T: "4" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 20, worldIndex: 1,
    prompt: "Oliver invests $5000 at 3% simple interest per year for 5 years. How much interest is earned?",
    options: ["$750", "$150", "$500", "$5750"],
    correctIndex: 0, correctValue: "$750",
    hint: "Use I = P × R × T ÷ 100: multiply 5000 by 3 by 5, then divide by 100.",
    explanation: "I = 5000 × 3 × 5 ÷ 100 = $750.",
    diagramData: { type: "formula", slots: { I: null, P: "$5000", R: "3", T: "5" } },
    rule: "✦ I = P × R × T ÷ 100"
  },

  // --- World 2: Formula Falls (Q21-Q30) ---
  {
    id: 21, worldIndex: 2,
    prompt: "Leo invests $800 at 7.5% simple interest per year for 2 years. How much interest is earned?",
    options: ["$120", "$60", "$140", "$920"],
    correctIndex: 0, correctValue: "$120",
    hint: "Multiply 800 by 7.5 by 2, then divide by 100.",
    explanation: "I = 800 × 7.5 × 2 ÷ 100 = $120.",
    diagramData: { type: "formula", slots: { I: null, P: "$800", R: "7.5", T: "2" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 22, worldIndex: 2,
    prompt: "Emma deposits $1200 at 4.5% simple interest per year for 4 years. How much interest is earned?",
    options: ["$216", "$54", "$240", "$1416"],
    correctIndex: 0, correctValue: "$216",
    hint: "Multiply 1200 by 4.5 by 4, then divide by 100.",
    explanation: "I = 1200 × 4.5 × 4 ÷ 100 = $216.",
    diagramData: { type: "formula", slots: { I: null, P: "$1200", R: "4.5", T: "4" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 23, worldIndex: 2,
    prompt: "Alex saves $1600 at 2.5% simple interest per year for 6 years. How much interest is earned?",
    options: ["$240", "$40", "$260", "$1840"],
    correctIndex: 0, correctValue: "$240",
    hint: "Multiply 1600 by 2.5 by 6, then divide by 100.",
    explanation: "I = 1600 × 2.5 × 6 ÷ 100 = $240.",
    diagramData: { type: "formula", slots: { I: null, P: "$1600", R: "2.5", T: "6" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 24, worldIndex: 2,
    prompt: "Sophia deposits $2000 at 8% simple interest per year for 5 years. How much interest is earned?",
    options: ["$800", "$160", "$600", "$2800"],
    correctIndex: 0, correctValue: "$800",
    hint: "Multiply 2000 by 8 by 5, then divide by 100.",
    explanation: "I = 2000 × 8 × 5 ÷ 100 = $800.",
    diagramData: { type: "formula", slots: { I: null, P: "$2000", R: "8", T: "5" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 25, worldIndex: 2,
    prompt: "Jack invests $2400 at 3.5% simple interest per year for 4 years. How much interest is earned?",
    options: ["$336", "$84", "$350", "$2736"],
    correctIndex: 0, correctValue: "$336",
    hint: "Multiply 2400 by 3.5 by 4, then divide by 100.",
    explanation: "I = 2400 × 3.5 × 4 ÷ 100 = $336.",
    diagramData: { type: "formula", slots: { I: null, P: "$2400", R: "3.5", T: "4" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 26, worldIndex: 2,
    prompt: "Maya deposits $3200 at 5% simple interest per year for 3 years. How much interest is earned?",
    options: ["$480", "$160", "$450", "$3680"],
    correctIndex: 0, correctValue: "$480",
    hint: "Multiply 3200 by 5 by 3, then divide by 100.",
    explanation: "I = 3200 × 5 × 3 ÷ 100 = $480.",
    diagramData: { type: "formula", slots: { I: null, P: "$3200", R: "5", T: "3" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 27, worldIndex: 2,
    prompt: "Lucas saves $4000 at 6.5% simple interest per year for 2 years. How much interest is earned?",
    options: ["$520", "$260", "$500", "$4520"],
    correctIndex: 0, correctValue: "$520",
    hint: "Multiply 4000 by 6.5 by 2, then divide by 100.",
    explanation: "I = 4000 × 6.5 × 2 ÷ 100 = $520.",
    diagramData: { type: "formula", slots: { I: null, P: "$4000", R: "6.5", T: "2" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 28, worldIndex: 2,
    prompt: "Chloe deposits $4500 at 4% simple interest per year for 5 years. How much interest is earned?",
    options: ["$900", "$180", "$800", "$5400"],
    correctIndex: 0, correctValue: "$900",
    hint: "Multiply 4500 by 4 by 5, then divide by 100.",
    explanation: "I = 4500 × 4 × 5 ÷ 100 = $900.",
    diagramData: { type: "formula", slots: { I: null, P: "$4500", R: "4", T: "5" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 29, worldIndex: 2,
    prompt: "Ethan invests $6000 at 7% simple interest per year for 3 years. How much interest is earned?",
    options: ["$1260", "$420", "$1200", "$7260"],
    correctIndex: 0, correctValue: "$1260",
    hint: "Multiply 6000 by 7 by 3, then divide by 100.",
    explanation: "I = 6000 × 7 × 3 ÷ 100 = $1260.",
    diagramData: { type: "formula", slots: { I: null, P: "$6000", R: "7", T: "3" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 30, worldIndex: 2,
    prompt: "Harper deposits $8000 at 5.5% simple interest per year for 4 years. How much interest is earned?",
    options: ["$1760", "$440", "$1600", "$9760"],
    correctIndex: 0, correctValue: "$1760",
    hint: "Multiply 8000 by 5.5 by 4, then divide by 100.",
    explanation: "I = 8000 × 5.5 × 4 ÷ 100 = $1760.",
    diagramData: { type: "formula", slots: { I: null, P: "$8000", R: "5.5", T: "4" } },
    rule: "✦ I = P × R × T ÷ 100"
  },

  // --- World 3: Amount Avenue (Q31-Q40) ---
  {
    id: 31, worldIndex: 3,
    prompt: "Liam saves $500 at 6% simple interest per year. What is the total amount after 2 years?",
    options: ["$560", "$60", "$530", "$600"],
    correctIndex: 0, correctValue: "$560",
    hint: "Find interest first: 500 × 6 × 2 ÷ 100 = $60. Then add to principal: 500 + 60.",
    explanation: "I = $60. Total amount A = $500 + $60 = $560.",
    diagramData: { type: "growth", P: 500, yearly: 30, years: 2 },
    rule: "✦ A = P + I"
  },
  {
    id: 32, worldIndex: 3,
    prompt: "Ava deposits $800 at 5% simple interest per year. What is the total amount after 3 years?",
    options: ["$920", "$120", "$840", "$960"],
    correctIndex: 0, correctValue: "$920",
    hint: "Interest is 800 × 5 × 3 ÷ 100 = $120. Total amount is 800 + 120.",
    explanation: "I = $120. Total amount A = $800 + $120 = $920.",
    diagramData: { type: "growth", P: 800, yearly: 40, years: 3 },
    rule: "✦ A = P + I"
  },
  {
    id: 33, worldIndex: 3,
    prompt: "Noah invests $1000 at 4% simple interest per year. What is the total amount after 5 years?",
    options: ["$1200", "$200", "$1040", "$1400"],
    correctIndex: 0, correctValue: "$1200",
    hint: "Interest is 1000 × 4 × 5 ÷ 100 = $200. Total amount is 1000 + 200.",
    explanation: "I = $200. Total amount A = $1000 + $200 = $1200.",
    diagramData: { type: "growth", P: 1000, yearly: 40, years: 5 },
    rule: "✦ A = P + I"
  },
  {
    id: 34, worldIndex: 3,
    prompt: "Mason deposits $1200 at 7% simple interest per year. What is the total amount after 3 years?",
    options: ["$1452", "$252", "$1284", "$1500"],
    correctIndex: 0, correctValue: "$1452",
    hint: "Interest is 1200 × 7 × 3 ÷ 100 = $252. Total amount is 1200 + 252.",
    explanation: "I = $252. Total amount A = $1200 + $252 = $1452.",
    diagramData: { type: "growth", P: 1200, yearly: 84, years: 3 },
    rule: "✦ A = P + I"
  },
  {
    id: 35, worldIndex: 3,
    prompt: "Ella saves $1500 at 4% simple interest per year. What is the total amount after 4 years?",
    options: ["$1740", "$240", "$1560", "$1800"],
    correctIndex: 0, correctValue: "$1740",
    hint: "Interest is 1500 × 4 × 4 ÷ 100 = $240. Total amount is 1500 + 240.",
    explanation: "I = $240. Total amount A = $1500 + $240 = $1740.",
    diagramData: { type: "growth", P: 1500, yearly: 60, years: 4 },
    rule: "✦ A = P + I"
  },
  {
    id: 36, worldIndex: 3,
    prompt: "James deposits $2000 at 6% simple interest per year. What is the total amount after 2 years?",
    options: ["$2240", "$240", "$2120", "$2400"],
    correctIndex: 0, correctValue: "$2240",
    hint: "Interest is 2000 × 6 × 2 ÷ 100 = $240. Total amount is 2000 + 240.",
    explanation: "I = $240. Total amount A = $2000 + $240 = $2240.",
    diagramData: { type: "growth", P: 2000, yearly: 120, years: 2 },
    rule: "✦ A = P + I"
  },
  {
    id: 37, worldIndex: 3,
    prompt: "Mia borrows $2500 at 5% simple interest per year. How much must be repaid in total after 3 years?",
    options: ["$2875", "$375", "$2625", "$3000"],
    correctIndex: 0, correctValue: "$2875",
    hint: "Interest to repay is 2500 × 5 × 3 ÷ 100 = $375. Add to principal: 2500 + 375.",
    explanation: "Interest = $375. Repayment = $2500 + $375 = $2875.",
    diagramData: { type: "formula", slots: { I: "$375", P: "$2500", R: "5", T: "3" } },
    rule: "✦ A = P + I"
  },
  {
    id: 38, worldIndex: 3,
    prompt: "Logan borrows $3000 at 8% simple interest per year. How much must be repaid in total after 2 years?",
    options: ["$3480", "$480", "$3240", "$3600"],
    correctIndex: 0, correctValue: "$3480",
    hint: "Interest to repay is 3000 × 8 × 2 ÷ 100 = $480. Add to principal: 3000 + 480.",
    explanation: "Interest = $480. Repayment = $3000 + $480 = $3480.",
    diagramData: { type: "formula", slots: { I: "$480", P: "$3000", R: "8", T: "2" } },
    rule: "✦ A = P + I"
  },
  {
    id: 39, worldIndex: 3,
    prompt: "Charlotte deposits $4000 at 4.5% simple interest per year. What is the total amount after 4 years?",
    options: ["$4720", "$720", "$4180", "$5000"],
    correctIndex: 0, correctValue: "$4720",
    hint: "Interest is 4000 × 4.5 × 4 ÷ 100 = $720. Total amount is 4000 + 720.",
    explanation: "I = $720. Total amount A = $4000 + $720 = $4720.",
    diagramData: { type: "growth", P: 4000, yearly: 180, years: 4 },
    rule: "✦ A = P + I"
  },
  {
    id: 40, worldIndex: 3,
    prompt: "Oliver saves $5000 at 3% simple interest per year. What is the total amount after 6 years?",
    options: ["$5900", "$900", "$5150", "$6000"],
    correctIndex: 0, correctValue: "$5900",
    hint: "Interest is 5000 × 3 × 6 ÷ 100 = $900. Total amount is 5000 + 900.",
    explanation: "I = $900. Total amount A = $5000 + $900 = $5900.",
    diagramData: { type: "growth", P: 5000, yearly: 150, years: 6 },
    rule: "✦ A = P + I"
  },

  // --- World 4: Month Meadow (Q41-Q50) ---
  {
    id: 41, worldIndex: 4,
    prompt: "Leo saves $600 at 5% simple interest per year for 6 months. How much interest is earned?",
    options: ["$15", "$30", "$150", "$615"],
    correctIndex: 0, correctValue: "$15",
    hint: "6 months is 0.5 years (6 ÷ 12). Then calculate 600 × 5 × 0.5 ÷ 100.",
    explanation: "6 months = 0.5 yr. I = 600 × 5 × 0.5 ÷ 100 = $15.",
    diagramData: { type: "formula", slots: { I: null, P: "$600", R: "5", T: "0.5" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 42, worldIndex: 4,
    prompt: "Emma deposits $800 at 6% simple interest per year for 3 months. How much interest is earned?",
    options: ["$12", "$24", "$48", "$812"],
    correctIndex: 0, correctValue: "$12",
    hint: "3 months is 0.25 years (3 ÷ 12). Then calculate 800 × 6 × 0.25 ÷ 100.",
    explanation: "3 months = 0.25 yr. I = 800 × 6 × 0.25 ÷ 100 = $12.",
    diagramData: { type: "formula", slots: { I: null, P: "$800", R: "6", T: "0.25" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 43, worldIndex: 4,
    prompt: "Alex invests $1000 at 4% simple interest per year for 9 months. How much interest is earned?",
    options: ["$30", "$40", "$90", "$1030"],
    correctIndex: 0, correctValue: "$30",
    hint: "9 months is 0.75 years (9 ÷ 12). Then calculate 1000 × 4 × 0.75 ÷ 100.",
    explanation: "9 months = 0.75 yr. I = 1000 × 4 × 0.75 ÷ 100 = $30.",
    diagramData: { type: "formula", slots: { I: null, P: "$1000", R: "4", T: "0.75" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 44, worldIndex: 4,
    prompt: "Sophia saves $1200 at 5% simple interest per year for 18 months. How much interest is earned?",
    options: ["$90", "$60", "$180", "$1290"],
    correctIndex: 0, correctValue: "$90",
    hint: "18 months is 1.5 years (18 ÷ 12). Then calculate 1200 × 5 × 1.5 ÷ 100.",
    explanation: "18 months = 1.5 yr. I = 1200 × 5 × 1.5 ÷ 100 = $90.",
    diagramData: { type: "formula", slots: { I: null, P: "$1200", R: "5", T: "1.5" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 45, worldIndex: 4,
    prompt: "Jack deposits $1600 at 6% simple interest per year for 24 months. How much interest is earned?",
    options: ["$192", "$96", "$240", "$1792"],
    correctIndex: 0, correctValue: "$192",
    hint: "24 months is 2 years (24 ÷ 12). Then calculate 1600 × 6 × 2 ÷ 100.",
    explanation: "24 months = 2 yr. I = 1600 × 6 × 2 ÷ 100 = $192.",
    diagramData: { type: "formula", slots: { I: null, P: "$1600", R: "6", T: "2" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 46, worldIndex: 4,
    prompt: "Maya saves $2000 at 3% simple interest per year for 30 months. How much interest is earned?",
    options: ["$150", "$60", "$180", "$2150"],
    correctIndex: 0, correctValue: "$150",
    hint: "30 months is 2.5 years (30 ÷ 12). Then calculate 2000 × 3 × 2.5 ÷ 100.",
    explanation: "30 months = 2.5 yr. I = 2000 × 3 × 2.5 ÷ 100 = $150.",
    diagramData: { type: "formula", slots: { I: null, P: "$2000", R: "3", T: "2.5" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 47, worldIndex: 4,
    prompt: "Lucas deposits $2400 at 4% simple interest per year for 6 months. How much interest is earned?",
    options: ["$48", "$96", "$24", "$2448"],
    correctIndex: 0, correctValue: "$48",
    hint: "6 months is 0.5 years (6 ÷ 12). Then calculate 2400 × 4 × 0.5 ÷ 100.",
    explanation: "6 months = 0.5 yr. I = 2400 × 4 × 0.5 ÷ 100 = $48.",
    diagramData: { type: "formula", slots: { I: null, P: "$2400", R: "4", T: "0.5" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 48, worldIndex: 4,
    prompt: "Chloe invests $3000 at 5% simple interest per year for 18 months. How much interest is earned?",
    options: ["$225", "$150", "$300", "$3225"],
    correctIndex: 0, correctValue: "$225",
    hint: "18 months is 1.5 years (18 ÷ 12). Then calculate 3000 × 5 × 1.5 ÷ 100.",
    explanation: "18 months = 1.5 yr. I = 3000 × 5 × 1.5 ÷ 100 = $225.",
    diagramData: { type: "formula", slots: { I: null, P: "$3000", R: "5", T: "1.5" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 49, worldIndex: 4,
    prompt: "Ethan deposits $3600 at 4.5% simple interest per year for 8 months. How much interest is earned?",
    options: ["$108", "$162", "$54", "$3708"],
    correctIndex: 0, correctValue: "$108",
    hint: "8 months is 8/12 = 2/3 of a year. Calculate 3600 × 4.5 × (2/3) ÷ 100.",
    explanation: "8 months = 2/3 yr. I = 3600 × 4.5 × (2/3) ÷ 100 = $108.",
    diagramData: { type: "formula", slots: { I: null, P: "$3600", R: "4.5", T: "8/12" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },
  {
    id: 50, worldIndex: 4,
    prompt: "Harper saves $4800 at 5% simple interest per year for 42 months. How much interest is earned?",
    options: ["$840", "$240", "$720", "$5640"],
    correctIndex: 0, correctValue: "$840",
    hint: "42 months is 3.5 years (42 ÷ 12). Calculate 4800 × 5 × 3.5 ÷ 100.",
    explanation: "42 months = 3.5 yr. I = 4800 × 5 × 3.5 ÷ 100 = $840.",
    diagramData: { type: "formula", slots: { I: null, P: "$4800", R: "5", T: "3.5" } },
    rule: "✦ MONTHS ÷ 12 = YEARS"
  },

  // --- World 5: Rate Ridge (Q51-Q60) ---
  {
    id: 51, worldIndex: 5,
    prompt: "$500 earns $30 simple interest in 1 year. What is the rate per year?",
    options: ["6%", "5%", "3%", "8%"],
    correctIndex: 0, correctValue: "6%",
    hint: "Rearrange the formula: R = 100 × I ÷ (P × T). Calculate 100 × 30 ÷ 500.",
    explanation: "R = 30 × 100 ÷ (500 × 1) = 6% per year.",
    diagramData: { type: "formula", slots: { I: "$30", P: "$500", R: null, T: "1" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 52, worldIndex: 5,
    prompt: "$800 earns $80 simple interest in 2 years. What is the rate per year?",
    options: ["5%", "10%", "4%", "6%"],
    correctIndex: 0, correctValue: "5%",
    hint: "R = 100 × I ÷ (P × T). Divide 80 by 2 to get $40 a year, then 40 ÷ 800.",
    explanation: "R = 80 × 100 ÷ (800 × 2) = 5% per year.",
    diagramData: { type: "formula", slots: { I: "$80", P: "$800", R: null, T: "2" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 53, worldIndex: 5,
    prompt: "$1000 earns $120 simple interest in 3 years. What is the rate per year?",
    options: ["4%", "12%", "3%", "6%"],
    correctIndex: 0, correctValue: "4%",
    hint: "Interest per year is $120 ÷ 3 = $40. Rate = 40 ÷ 1000 × 100.",
    explanation: "R = 120 × 100 ÷ (1000 × 3) = 4% per year.",
    diagramData: { type: "formula", slots: { I: "$120", P: "$1000", R: null, T: "3" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 54, worldIndex: 5,
    prompt: "$1200 earns $180 simple interest in 3 years. What is the rate per year?",
    options: ["5%", "6%", "4%", "7%"],
    correctIndex: 0, correctValue: "5%",
    hint: "Interest per year is $180 ÷ 3 = $60. Rate = 60 ÷ 1200 × 100.",
    explanation: "R = 180 × 100 ÷ (1200 × 3) = 5% per year.",
    diagramData: { type: "formula", slots: { I: "$180", P: "$1200", R: null, T: "3" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 55, worldIndex: 5,
    prompt: "$1500 earns $120 simple interest in 2 years. What is the rate per year?",
    options: ["4%", "8%", "5%", "6%"],
    correctIndex: 0, correctValue: "4%",
    hint: "Interest per year is $120 ÷ 2 = $60. Rate = 60 ÷ 1500 × 100.",
    explanation: "R = 120 × 100 ÷ (1500 × 2) = 4% per year.",
    diagramData: { type: "formula", slots: { I: "$120", P: "$1500", R: null, T: "2" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 56, worldIndex: 5,
    prompt: "$2000 earns $300 simple interest in 3 years. What is the rate per year?",
    options: ["5%", "15%", "6%", "4%"],
    correctIndex: 0, correctValue: "5%",
    hint: "Interest per year is $300 ÷ 3 = $100. Rate = 100 ÷ 2000 × 100.",
    explanation: "R = 300 × 100 ÷ (2000 × 3) = 5% per year.",
    diagramData: { type: "formula", slots: { I: "$300", P: "$2000", R: null, T: "3" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 57, worldIndex: 5,
    prompt: "$2400 earns $432 simple interest in 3 years. What is the rate per year?",
    options: ["6%", "5%", "7%", "8%"],
    correctIndex: 0, correctValue: "6%",
    hint: "Interest per year is $432 ÷ 3 = $144. Rate = 144 ÷ 2400 × 100.",
    explanation: "R = 432 × 100 ÷ (2400 × 3) = 6% per year.",
    diagramData: { type: "formula", slots: { I: "$432", P: "$2400", R: null, T: "3" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 58, worldIndex: 5,
    prompt: "$3000 earns $450 simple interest in 2.5 years. What is the rate per year?",
    options: ["6%", "5%", "7.5%", "4%"],
    correctIndex: 0, correctValue: "6%",
    hint: "Calculate 100 × 450 ÷ (3000 × 2.5).",
    explanation: "R = 450 × 100 ÷ (3000 × 2.5) = 6% per year.",
    diagramData: { type: "formula", slots: { I: "$450", P: "$3000", R: null, T: "2.5" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 59, worldIndex: 5,
    prompt: "$4000 earns $640 simple interest in 2 years. What is the rate per year?",
    options: ["8%", "16%", "4%", "6%"],
    correctIndex: 0, correctValue: "8%",
    hint: "Interest per year is $640 ÷ 2 = $320. Rate = 320 ÷ 4000 × 100.",
    explanation: "R = 640 × 100 ÷ (4000 × 2) = 8% per year.",
    diagramData: { type: "formula", slots: { I: "$640", P: "$4000", R: null, T: "2" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },
  {
    id: 60, worldIndex: 5,
    prompt: "$5000 earns $750 simple interest in 3 years. What is the rate per year?",
    options: ["5%", "15%", "6%", "4%"],
    correctIndex: 0, correctValue: "5%",
    hint: "Interest per year is $750 ÷ 3 = $250. Rate = 250 ÷ 5000 × 100.",
    explanation: "R = 750 × 100 ÷ (5000 × 3) = 5% per year.",
    diagramData: { type: "formula", slots: { I: "$750", P: "$5000", R: null, T: "3" } },
    rule: "✦ R = 100I ÷ (P × T)"
  },

  // --- World 6: Time Tunnel (Q61-Q70) ---
  {
    id: 61, worldIndex: 6,
    prompt: "How many years does it take $500 to earn $50 simple interest at 5% per year?",
    options: ["2 years", "1 year", "3 years", "4 years"],
    correctIndex: 0, correctValue: "2 years",
    hint: "Rearrange the formula: T = 100 × I ÷ (P × R). Calculate 100 × 50 ÷ (500 × 5).",
    explanation: "T = 50 × 100 ÷ (500 × 5) = 2 years.",
    diagramData: { type: "formula", slots: { I: "$50", P: "$500", R: "5", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 62, worldIndex: 6,
    prompt: "How many years does it take $800 to earn $120 simple interest at 5% per year?",
    options: ["3 years", "2 years", "4 years", "5 years"],
    correctIndex: 0, correctValue: "3 years",
    hint: "Yearly interest is 5% of $800 = $40. Divide total interest $120 by $40.",
    explanation: "Yearly interest = $40. T = $120 ÷ $40 = 3 years.",
    diagramData: { type: "formula", slots: { I: "$120", P: "$800", R: "5", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 63, worldIndex: 6,
    prompt: "How many years does it take $1000 to earn $160 simple interest at 4% per year?",
    options: ["4 years", "3 years", "5 years", "2 years"],
    correctIndex: 0, correctValue: "4 years",
    hint: "Yearly interest is 4% of $1000 = $40. T = $160 ÷ $40.",
    explanation: "Yearly interest = $40. T = $160 ÷ $40 = 4 years.",
    diagramData: { type: "formula", slots: { I: "$160", P: "$1000", R: "4", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 64, worldIndex: 6,
    prompt: "How many years does it take $1200 to earn $216 simple interest at 6% per year?",
    options: ["3 years", "2 years", "4 years", "5 years"],
    correctIndex: 0, correctValue: "3 years",
    hint: "Yearly interest is 6% of $1200 = $72. T = $216 ÷ $72.",
    explanation: "Yearly interest = $72. T = $216 ÷ $72 = 3 years.",
    diagramData: { type: "formula", slots: { I: "$216", P: "$1200", R: "6", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 65, worldIndex: 6,
    prompt: "How many years does it take $1500 to earn $225 simple interest at 5% per year?",
    options: ["3 years", "2 years", "4 years", "5 years"],
    correctIndex: 0, correctValue: "3 years",
    hint: "Yearly interest is 5% of $1500 = $75. T = $225 ÷ $75.",
    explanation: "Yearly interest = $75. T = $225 ÷ $75 = 3 years.",
    diagramData: { type: "formula", slots: { I: "$225", P: "$1500", R: "5", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 66, worldIndex: 6,
    prompt: "How many years does it take $2000 to earn $320 simple interest at 4% per year?",
    options: ["4 years", "3 years", "5 years", "6 years"],
    correctIndex: 0, correctValue: "4 years",
    hint: "Yearly interest is 4% of $2000 = $80. T = $320 ÷ $80.",
    explanation: "Yearly interest = $80. T = $320 ÷ $80 = 4 years.",
    diagramData: { type: "formula", slots: { I: "$320", P: "$2000", R: "4", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 67, worldIndex: 6,
    prompt: "How many years does it take $2500 to earn $450 simple interest at 6% per year?",
    options: ["3 years", "2 years", "4 years", "5 years"],
    correctIndex: 0, correctValue: "3 years",
    hint: "Yearly interest is 6% of $2500 = $150. T = $450 ÷ $150.",
    explanation: "Yearly interest = $150. T = $450 ÷ $150 = 3 years.",
    diagramData: { type: "formula", slots: { I: "$450", P: "$2500", R: "6", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 68, worldIndex: 6,
    prompt: "How many years does it take $3000 to earn $600 simple interest at 5% per year?",
    options: ["4 years", "3 years", "5 years", "6 years"],
    correctIndex: 0, correctValue: "4 years",
    hint: "Yearly interest is 5% of $3000 = $150. T = $600 ÷ $150.",
    explanation: "Yearly interest = $150. T = $600 ÷ $150 = 4 years.",
    diagramData: { type: "formula", slots: { I: "$600", P: "$3000", R: "5", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 69, worldIndex: 6,
    prompt: "How many years does it take $4000 to earn $720 simple interest at 3% per year?",
    options: ["6 years", "5 years", "7 years", "4 years"],
    correctIndex: 0, correctValue: "6 years",
    hint: "Yearly interest is 3% of $4000 = $120. T = $720 ÷ $120.",
    explanation: "Yearly interest = $120. T = $720 ÷ $120 = 6 years.",
    diagramData: { type: "formula", slots: { I: "$720", P: "$4000", R: "3", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 70, worldIndex: 6,
    prompt: "How many years does it take $5000 to earn $1000 simple interest at 4% per year?",
    options: ["5 years", "4 years", "6 years", "3 years"],
    correctIndex: 0, correctValue: "5 years",
    hint: "Yearly interest is 4% of $5000 = $200. T = $1000 ÷ $200.",
    explanation: "Yearly interest = $200. T = $1000 ÷ $200 = 5 years.",
    diagramData: { type: "formula", slots: { I: "$1000", P: "$5000", R: "4", T: null } },
    rule: "✦ T = 100I ÷ (P × R)"
  },

  // --- World 7: Principal Peak (Q71-Q80) ---
  {
    id: 71, worldIndex: 7,
    prompt: "An account pays 5% simple interest per year. After 2 years it has earned $60. What was the principal?",
    options: ["$600", "$500", "$700", "$1200"],
    correctIndex: 0, correctValue: "$600",
    hint: "Rearrange the formula: P = 100 × I ÷ (R × T). Calculate 100 × 60 ÷ (5 × 2).",
    explanation: "P = 60 × 100 ÷ (5 × 2) = $600.",
    diagramData: { type: "formula", slots: { I: "$60", P: null, R: "5", T: "2" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 72, worldIndex: 7,
    prompt: "An account pays 4% simple interest per year. After 3 years it has earned $96. What was the principal?",
    options: ["$800", "$600", "$900", "$1000"],
    correctIndex: 0, correctValue: "$800",
    hint: "P = 100 × I ÷ (R × T). Calculate 100 × 96 ÷ (4 × 3).",
    explanation: "P = 96 × 100 ÷ (4 × 3) = $800.",
    diagramData: { type: "formula", slots: { I: "$96", P: null, R: "4", T: "3" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 73, worldIndex: 7,
    prompt: "An account pays 6% simple interest per year. After 2 years it has earned $144. What was the principal?",
    options: ["$1200", "$1000", "$1400", "$800"],
    correctIndex: 0, correctValue: "$1200",
    hint: "P = 100 × I ÷ (R × T). Calculate 100 × 144 ÷ (6 × 2).",
    explanation: "P = 144 × 100 ÷ (6 × 2) = $1200.",
    diagramData: { type: "formula", slots: { I: "$144", P: null, R: "6", T: "2" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 74, worldIndex: 7,
    prompt: "An account pays 5% simple interest per year. After 4 years it has earned $200. What was the principal?",
    options: ["$1000", "$800", "$1200", "$1500"],
    correctIndex: 0, correctValue: "$1000",
    hint: "P = 100 × I ÷ (R × T). Calculate 100 × 200 ÷ (5 × 4).",
    explanation: "P = 200 × 100 ÷ (5 × 4) = $1000.",
    diagramData: { type: "formula", slots: { I: "$200", P: null, R: "5", T: "4" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 75, worldIndex: 7,
    prompt: "An account pays 3% simple interest per year. After 5 years it has earned $225. What was the principal?",
    options: ["$1500", "$1200", "$1800", "$2000"],
    correctIndex: 0, correctValue: "$1500",
    hint: "P = 100 × I ÷ (R × T). Calculate 100 × 225 ÷ (3 × 5).",
    explanation: "P = 225 × 100 ÷ (3 × 5) = $1500.",
    diagramData: { type: "formula", slots: { I: "$225", P: null, R: "3", T: "5" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 76, worldIndex: 7,
    prompt: "An account pays 4% simple interest per year. After 2 years it has earned $160. What was the principal?",
    options: ["$2000", "$1600", "$2400", "$1800"],
    correctIndex: 0, correctValue: "$2000",
    hint: "P = 100 × I ÷ (R × T). Calculate 100 × 160 ÷ (4 × 2).",
    explanation: "P = 160 × 100 ÷ (4 × 2) = $2000.",
    diagramData: { type: "formula", slots: { I: "$160", P: null, R: "4", T: "2" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 77, worldIndex: 7,
    prompt: "An account pays 5% simple interest per year. After 3 years it has earned $300. What was the principal?",
    options: ["$2000", "$1500", "$2500", "$3000"],
    correctIndex: 0, correctValue: "$2000",
    hint: "P = 100 × I ÷ (R × T). Calculate 100 × 300 ÷ (5 × 3).",
    explanation: "P = 300 × 100 ÷ (5 × 3) = $2000.",
    diagramData: { type: "formula", slots: { I: "$300", P: null, R: "5", T: "3" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 78, worldIndex: 7,
    prompt: "An account pays 6% simple interest per year. After 4 years it has earned $720. What was the principal?",
    options: ["$3000", "$2500", "$3500", "$4000"],
    correctIndex: 0, correctValue: "$3000",
    hint: "P = 100 × I ÷ (R × T). Calculate 100 × 720 ÷ (6 × 4).",
    explanation: "P = 720 × 100 ÷ (6 × 4) = $3000.",
    diagramData: { type: "formula", slots: { I: "$720", P: null, R: "6", T: "4" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 79, worldIndex: 7,
    prompt: "After 2 years at 5% simple interest per year, Leo's savings have grown to $1100. How much did Leo put in?",
    options: ["$1000", "$900", "$950", "$1050"],
    correctIndex: 0, correctValue: "$1000",
    hint: "In 2 years at 5%, interest is 10% of P. So Amount = 1.10 × P. Divide $1100 by 1.10.",
    explanation: "A = P × (1 + 0.10) = 1.10 × P. P = $1100 ÷ 1.10 = $1000.",
    diagramData: { type: "formula", slots: { I: "?", P: null, R: "5", T: "2" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 80, worldIndex: 7,
    prompt: "After 3 years at 4% simple interest per year, Mia's savings have grown to $1680. How much did Mia put in?",
    options: ["$1500", "$1400", "$1600", "$1450"],
    correctIndex: 0, correctValue: "$1500",
    hint: "In 3 years at 4%, total interest is 12% of P. Amount = 1.12 × P. Divide $1680 by 1.12.",
    explanation: "A = P × (1 + 0.12) = 1.12 × P. P = $1680 ÷ 1.12 = $1500.",
    diagramData: { type: "formula", slots: { I: "?", P: null, R: "4", T: "3" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },

  // --- World 8: Bank Battle Bay (Q81-Q90) ---
  {
    id: 81, worldIndex: 8,
    prompt: "Leo has $1000. Bank A pays 5% simple interest for 4 years. Bank B pays 4% for 5 years. Which pays more interest?",
    options: ["They pay the same", "Bank A, by $20", "Bank B, by $20", "Bank A, by $10"],
    correctIndex: 0, correctValue: "They pay the same",
    hint: "Calculate each: Bank A = 1000 × 5 × 4 ÷ 100. Bank B = 1000 × 4 × 5 ÷ 100.",
    explanation: "Bank A pays $200. Bank B pays $200. Both pay the exact same amount.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$1000", R: "5%", T: "4 yrs", I: "$200" }, { name: "Bank B", P: "$1000", R: "4%", T: "5 yrs", I: "$200" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 82, worldIndex: 8,
    prompt: "Emma has $1200. Bank A pays 6% simple interest for 2 years. Bank B pays 4% for 3 years. Which pays more interest?",
    options: ["They pay the same", "Bank A, by $12", "Bank B, by $12", "Bank A, by $24"],
    correctIndex: 0, correctValue: "They pay the same",
    hint: "Work out Bank A: 1200 × 6 × 2 ÷ 100 = $144. Bank B: 1200 × 4 × 3 ÷ 100 = $144.",
    explanation: "Bank A pays $144. Bank B pays $144. They pay the same.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$1200", R: "6%", T: "2 yrs", I: "$144" }, { name: "Bank B", P: "$1200", R: "4%", T: "3 yrs", I: "$144" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 83, worldIndex: 8,
    prompt: "Alex has $800. Bank A pays 5% simple interest for 3 years. Bank B pays 4% for 4 years. Which pays more interest?",
    options: ["Bank B, by $8", "Bank A, by $8", "They pay the same", "Bank B, by $16"],
    correctIndex: 0, correctValue: "Bank B, by $8",
    hint: "Bank A pays 800 × 5 × 3 ÷ 100 = $120. Bank B pays 800 × 4 × 4 ÷ 100 = $128.",
    explanation: "Bank A = $120, Bank B = $128. Bank B pays $8 more.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$800", R: "5%", T: "3 yrs", I: "$120" }, { name: "Bank B", P: "$800", R: "4%", T: "4 yrs", I: "$128" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 84, worldIndex: 8,
    prompt: "Sophia has $1500. Bank A pays 4% simple interest for 5 years. Bank B pays 5% for 4 years. Which pays more interest?",
    options: ["They pay the same", "Bank A, by $15", "Bank B, by $15", "Bank A, by $30"],
    correctIndex: 0, correctValue: "They pay the same",
    hint: "Bank A: 1500 × 4 × 5 ÷ 100 = $300. Bank B: 1500 × 5 × 4 ÷ 100 = $300.",
    explanation: "Both banks pay $300. They pay the same.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$1500", R: "4%", T: "5 yrs", I: "$300" }, { name: "Bank B", P: "$1500", R: "5%", T: "4 yrs", I: "$300" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 85, worldIndex: 8,
    prompt: "Jack has $2000. Bank A pays 6% simple interest for 3 years. Bank B pays 5% for 4 years. Which pays more interest?",
    options: ["Bank B, by $40", "Bank A, by $40", "They pay the same", "Bank B, by $20"],
    correctIndex: 0, correctValue: "Bank B, by $40",
    hint: "Bank A: 2000 × 6 × 3 ÷ 100 = $360. Bank B: 2000 × 5 × 4 ÷ 100 = $400.",
    explanation: "Bank A = $360, Bank B = $400. Bank B pays $40 more.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$2000", R: "6%", T: "3 yrs", I: "$360" }, { name: "Bank B", P: "$2000", R: "5%", T: "4 yrs", I: "$400" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 86, worldIndex: 8,
    prompt: "Maya has $2400. Bank A pays 3% simple interest for 4 years. Bank B pays 4% for 3 years. Which pays more interest?",
    options: ["They pay the same", "Bank A, by $24", "Bank B, by $24", "Bank A, by $48"],
    correctIndex: 0, correctValue: "They pay the same",
    hint: "Bank A: 2400 × 3 × 4 ÷ 100 = $288. Bank B: 2400 × 4 × 3 ÷ 100 = $288.",
    explanation: "Both pay $288. They pay the same.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$2400", R: "3%", T: "4 yrs", I: "$288" }, { name: "Bank B", P: "$2400", R: "4%", T: "3 yrs", I: "$288" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 87, worldIndex: 8,
    prompt: "Lucas has $1000. Bank A pays 7% simple interest for 2 years. Bank B pays 5% for 3 years. Which pays more interest?",
    options: ["Bank B, by $10", "Bank A, by $10", "They pay the same", "Bank B, by $20"],
    correctIndex: 0, correctValue: "Bank B, by $10",
    hint: "Bank A pays 1000 × 7 × 2 ÷ 100 = $140. Bank B pays 1000 × 5 × 3 ÷ 100 = $150.",
    explanation: "Bank A = $140, Bank B = $150. Bank B pays $10 more.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$1000", R: "7%", T: "2 yrs", I: "$140" }, { name: "Bank B", P: "$1000", R: "5%", T: "3 yrs", I: "$150" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 88, worldIndex: 8,
    prompt: "Chloe has $3000. Bank A pays 4% simple interest for 3 years. Bank B pays 3.5% for 4 years. Which pays more interest?",
    options: ["Bank B, by $60", "Bank A, by $60", "They pay the same", "Bank B, by $30"],
    correctIndex: 0, correctValue: "Bank B, by $60",
    hint: "Bank A pays 3000 × 4 × 3 ÷ 100 = $360. Bank B pays 3000 × 3.5 × 4 ÷ 100 = $420.",
    explanation: "Bank A = $360, Bank B = $420. Bank B pays $60 more.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$3000", R: "4%", T: "3 yrs", I: "$360" }, { name: "Bank B", P: "$3000", R: "3.5%", T: "4 yrs", I: "$420" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 89, worldIndex: 8,
    prompt: "Ethan has $4000. Bank A pays 5% simple interest for 2 years. Bank B pays 4% for 3 years. Which pays more interest?",
    options: ["Bank B, by $80", "Bank A, by $80", "They pay the same", "Bank B, by $40"],
    correctIndex: 0, correctValue: "Bank B, by $80",
    hint: "Bank A: 4000 × 5 × 2 ÷ 100 = $400. Bank B: 4000 × 4 × 3 ÷ 100 = $480.",
    explanation: "Bank A = $400, Bank B = $480. Bank B pays $80 more.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$4000", R: "5%", T: "2 yrs", I: "$400" }, { name: "Bank B", P: "$4000", R: "4%", T: "3 yrs", I: "$480" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },
  {
    id: 90, worldIndex: 8,
    prompt: "Harper has $5000. Bank A pays 6% simple interest for 2 years. Bank B pays 3% for 4 years. Which pays more interest?",
    options: ["They pay the same", "Bank A, by $50", "Bank B, by $50", "Bank A, by $100"],
    correctIndex: 0, correctValue: "They pay the same",
    hint: "Bank A: 5000 × 6 × 2 ÷ 100 = $600. Bank B: 5000 × 3 × 4 ÷ 100 = $600.",
    explanation: "Both pay $600. They pay the same.",
    diagramData: { type: "banks", banks: [{ name: "Bank A", P: "$5000", R: "6%", T: "2 yrs", I: "$600" }, { name: "Bank B", P: "$5000", R: "3%", T: "4 yrs", I: "$600" }] },
    rule: "✦ WORK OUT EACH INTEREST"
  },

  // --- World 9: Interest Champion (Q91-Q100) ---
  {
    id: 91, worldIndex: 9,
    prompt: "At 5% simple interest per year, how many years does it take for any savings to double?",
    options: ["20 years", "10 years", "25 years", "15 years"],
    correctIndex: 0, correctValue: "20 years",
    hint: "To double your money, interest must equal 100% of the principal: R × T = 100. Divide 100 by 5.",
    explanation: "R × T = 100, so T = 100 ÷ 5 = 20 years.",
    diagramData: { type: "growth", P: 100, yearly: 5, years: 10 },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 92, worldIndex: 9,
    prompt: "At 4% simple interest per year, how many years does it take for any savings to double?",
    options: ["25 years", "20 years", "30 years", "15 years"],
    correctIndex: 0, correctValue: "25 years",
    hint: "Use the doubling rule: R × T = 100. Divide 100 by 4.",
    explanation: "T = 100 ÷ 4 = 25 years.",
    diagramData: { type: "growth", P: 100, yearly: 4, years: 10 },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 93, worldIndex: 9,
    prompt: "At 10% simple interest per year, how many years does it take for any savings to double?",
    options: ["10 years", "5 years", "15 years", "20 years"],
    correctIndex: 0, correctValue: "10 years",
    hint: "Use the doubling rule: R × T = 100. Divide 100 by 10.",
    explanation: "T = 100 ÷ 10 = 10 years.",
    diagramData: { type: "growth", P: 100, yearly: 10, years: 10 },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 94, worldIndex: 9,
    prompt: "At 2% simple interest per year, how many years does it take for any savings to double?",
    options: ["50 years", "40 years", "25 years", "100 years"],
    correctIndex: 0, correctValue: "50 years",
    hint: "Use the doubling rule: R × T = 100. Divide 100 by 2.",
    explanation: "T = 100 ÷ 2 = 50 years.",
    diagramData: { type: "growth", P: 100, yearly: 2, years: 10 },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 95, worldIndex: 9,
    prompt: "At 8% simple interest per year, how many years does it take for any savings to double?",
    options: ["12.5 years", "12 years", "15 years", "10 years"],
    correctIndex: 0, correctValue: "12.5 years",
    hint: "Use the doubling rule: R × T = 100. Divide 100 by 8.",
    explanation: "T = 100 ÷ 8 = 12.5 years.",
    diagramData: { type: "growth", P: 100, yearly: 8, years: 10 },
    rule: "✦ T = 100I ÷ (P × R)"
  },
  {
    id: 96, worldIndex: 9,
    prompt: "Noah borrows $3000 at 6% simple interest per year. What is the total repayment after 4 years?",
    options: ["$3720", "$720", "$3600", "$3840"],
    correctIndex: 0, correctValue: "$3720",
    hint: "Interest is 3000 × 6 × 4 ÷ 100 = $720. Add to loan principal: 3000 + 720.",
    explanation: "Interest = $720. Repayment = $3000 + $720 = $3720.",
    diagramData: { type: "formula", slots: { I: "$720", P: "$3000", R: "6", T: "4" } },
    rule: "✦ A = P + I"
  },
  {
    id: 97, worldIndex: 9,
    prompt: "Ava borrows $5000 at 5% simple interest per year for 18 months. How much must be repaid in total?",
    options: ["$5375", "$375", "$5250", "$5500"],
    correctIndex: 0, correctValue: "$5375",
    hint: "18 months = 1.5 years. Interest is 5000 × 5 × 1.5 ÷ 100 = $375. Repay 5000 + 375.",
    explanation: "18 mo = 1.5 yr. I = $375. Total = $5000 + $375 = $5375.",
    diagramData: { type: "formula", slots: { I: "$375", P: "$5000", R: "5", T: "1.5" } },
    rule: "✦ A = P + I"
  },
  {
    id: 98, worldIndex: 9,
    prompt: "After 5 years at 4% simple interest per year, Mason's account has $2400. What was the initial deposit?",
    options: ["$2000", "$1800", "$2100", "$1900"],
    correctIndex: 0, correctValue: "$2000",
    hint: "In 5 years at 4%, interest is 20%. Total is 1.20 × P. Divide $2400 by 1.20.",
    explanation: "A = 1.20 × P = $2400. P = $2400 ÷ 1.20 = $2000.",
    diagramData: { type: "formula", slots: { I: "?", P: null, R: "4", T: "5" } },
    rule: "✦ P = 100I ÷ (R × T)"
  },
  {
    id: 99, worldIndex: 9,
    prompt: "Ella invests $2000 at 4.5% simple interest per year for 2 years, then adds $500 more for year 3 at 4%. What is her total interest?",
    options: ["$280", "$180", "$250", "$300"],
    correctIndex: 0, correctValue: "$280",
    hint: "First 2 years: 2000 × 4.5 × 2 ÷ 100 = $180. Year 3 on $2500: 2500 × 4 × 1 ÷ 100 = $100. Total = 180 + 100.",
    explanation: "First 2 yrs: $180. Year 3: $100. Total interest = $180 + $100 = $280.",
    diagramData: { type: "formula", slots: { I: "$280", P: "$2000+", R: "4.5%", T: "3 yrs" } },
    rule: "✦ I = P × R × T ÷ 100"
  },
  {
    id: 100, worldIndex: 9,
    prompt: "James wants to earn $600 interest in 3 years with $4000. What annual simple interest rate does he need?",
    options: ["5%", "4%", "6%", "4.5%"],
    correctIndex: 0, correctValue: "5%",
    hint: "Rearrange formula: R = 100 × I ÷ (P × T). Calculate 100 × 600 ÷ (4000 × 3).",
    explanation: "R = 600 × 100 ÷ (4000 × 3) = 5% per year.",
    diagramData: { type: "formula", slots: { I: "$600", P: "$4000", R: null, T: "3" } },
    rule: "✦ R = 100I ÷ (P × T)"
  }
];

// Write updated src/mathData.js
const mathDataContent = `/* =========================================================================
   MATH DATA & PRACTICE QUESTIONS (GRADE 8 SIMPLE INTEREST)
   10 Themed Worlds, each with 10 curriculum-aligned questions with hints.
   100 Questions total (Q1–Q100).
   ========================================================================= */

export const PRACTICE_WORLDS = [
  { id: 0, name: "Piggy Bank Park", icon: "🐷", range: "Q1–10", difficulty: 1 },
  { id: 1, name: "Yearly Yard", icon: "📅", range: "Q11–20", difficulty: 1 },
  { id: 2, name: "Formula Falls", icon: "🧮", range: "Q21–30", difficulty: 2 },
  { id: 3, name: "Amount Avenue", icon: "💰", range: "Q31–40", difficulty: 2 },
  { id: 4, name: "Month Meadow", icon: "🗓️", range: "Q41–50", difficulty: 2 },
  { id: 5, name: "Rate Ridge", icon: "📈", range: "Q51–60", difficulty: 3 },
  { id: 6, name: "Time Tunnel", icon: "⏳", range: "Q61–70", difficulty: 3 },
  { id: 7, name: "Principal Peak", icon: "🏔️", range: "Q71–80", difficulty: 3 },
  { id: 8, name: "Bank Battle Bay", icon: "🏦", range: "Q81–90", difficulty: 4 },
  { id: 9, name: "Interest Champion", icon: "🏆", range: "Q91–100", difficulty: 4 }
];

export const PRACTICE_QUESTIONS = ${JSON.stringify(PRACTICE_QUESTIONS, null, 2)};

export function getPracticeQuestion(worldIndex = 0, qIndex = 0) {
  const targetId = worldIndex * 10 + qIndex + 1;
  const found = PRACTICE_QUESTIONS.find(q => q.id === targetId);
  return found || PRACTICE_QUESTIONS[0];
}

export function makeQuestion(worldIndex = 0, qIndex = 0) {
  return getPracticeQuestion(worldIndex, qIndex);
}
`;

fs.writeFileSync(path.join(ROOT, 'src', 'mathData.js'), mathDataContent);
console.log('✔ src/mathData.js written with 100 questions.');

// Now write updated src/utils/lessonScript.js
const lessonScriptContent = `/* =========================================================================
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
`;

fs.writeFileSync(path.join(ROOT, 'src', 'utils', 'lessonScript.js'), lessonScriptContent);
console.log('✔ src/utils/lessonScript.js written with ALL_PHRASES.');
