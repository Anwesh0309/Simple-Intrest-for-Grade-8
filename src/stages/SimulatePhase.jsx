import React, { useState, useEffect } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { narrate, stopNarration } from '../utils/audio.js';
import { simulateStationIntro, simulateGuidanceNarration, simulateHintNarration, feedbackNarration } from '../utils/narration.js';
import { GrowthBars, FormulaCard, BankCards, money, C_P, C_I } from '../components/InterestDiagram.jsx';

/* =========================================================================
   SIMULATION STATIONS — Simple Interest (Grade 8)
   Station 1 · Savings Tower    → SEE the same interest added every year
   Station 2 · Savings Planner  → TRY it: choose R and T to hit a target
   Station 3 · Interest Detective → APPLY: find a missing P, R or T
   ========================================================================= */

const parseVal = str => {
  const s = String(str ?? '').replace(/[$,%\s]/g, '');
  return s === '' ? NaN : Number(s);
};
const near = (str, want, tol = 0.006) => { const v = parseVal(str); return Number.isFinite(v) && Math.abs(v - want) <= tol; };
const r2 = v => Math.round(v * 100) / 100;

/* ------------------------------------------------------------------------
   STATION DATA
   ------------------------------------------------------------------------ */
const STATION_ACTIVITIES = {
  1: [
    {
      id: 1,
      title: "Activity 1: Leo's Piggy Bank Goal",
      desc: "Leo saves $800 at 5% simple interest per year. Add years one at a time until his savings reach $1000.",
      icon: "🐷",
      P: 800, R: 5, target: 1000,
      fields: [['yearly', 'Interest each year ($)', 40], ['years', 'Years needed', 5], ['total', 'Total interest ($)', 200]],
      hint: "5% of $800 = $40 every year. $1000 − $800 = $200 of interest. $200 ÷ $40 = 5 years."
    },
    {
      id: 2,
      title: "Activity 2: Mia's Laptop Fund",
      desc: "Mia saves $1500 at 4% simple interest per year. How many years until she has $1800 for a new laptop?",
      icon: "💻",
      P: 1500, R: 4, target: 1800,
      fields: [['yearly', 'Interest each year ($)', 60], ['years', 'Years needed', 5], ['total', 'Total interest ($)', 300]],
      hint: "4% of $1500 = $60 a year. She needs $300 of interest. $300 ÷ $60 = 5 years."
    },
    {
      id: 3,
      title: "Activity 3: Class Trip Fund",
      desc: "The class puts $2000 in an account paying 3.5% simple interest per year. Grow it until the amount reaches $2280.",
      icon: "🚌",
      P: 2000, R: 3.5, target: 2280,
      fields: [['yearly', 'Interest each year ($)', 70], ['years', 'Years needed', 4], ['total', 'Total interest ($)', 280]],
      hint: "3.5% of $2000 = $70 a year. $280 ÷ $70 = 4 years."
    }
  ],
  2: [
    {
      id: 1,
      title: "Activity 1: Earn $300",
      desc: "Leo has $2000. Choose a rate and a time so that he earns exactly $300 of simple interest. There is more than one answer!",
      icon: "🎯",
      P: 2000, targetI: 300, monthsMode: false,
      rule: null,
      hint: "2000 × R × T ÷ 100 = 300, so R × T = 15. Try 5% for 3 years, or 3% for 5 years!"
    },
    {
      id: 2,
      title: "Activity 2: Quick Saver",
      desc: "Mia has $1200 and wants exactly $180 of interest within 24 months. Choose a rate and a time in MONTHS.",
      icon: "⏱️",
      P: 1200, targetI: 180, monthsMode: true,
      rule: { text: 'Time is 24 months or less', test: (R, Ty) => Ty <= 2 },
      hint: "1200 × R × T ÷ 100 = 180, so R × T(years) = 15. With 2 years, R must be 7.5%."
    },
    {
      id: 3,
      title: "Activity 3: Low-Rate Bank",
      desc: "Grandpa invests $5000 and wants the amount to reach $5600. The bank pays at most 4% per year. Find a plan that works.",
      icon: "👴",
      P: 5000, targetI: 600, monthsMode: false,
      rule: { text: 'Rate is 4% or less', test: R => R <= 4 },
      hint: "Interest needed = $600. 5000 × R × T ÷ 100 = 600, so R × T = 12. At 4%, T = 3 years."
    }
  ],
  3: [
    {
      id: 1,
      title: "Activity 1: Leo's Two Banks",
      desc: "Bank A: $1000 at 5% for 4 years. Bank B: $1000 at 4% for 5 years. Which one pays more interest?",
      icon: "🏦",
      kind: 'banks',
      fields: [['a', 'Interest from Bank A ($)', 200], ['b', 'Interest from Bank B ($)', 200]],
      choice: { q: 'Which pays more?', options: ['Bank A', 'Bank B', 'Same'], answer: 'Same' },
      done: "🎉 1000 × 5 × 4 ÷ 100 = 1000 × 4 × 5 ÷ 100 = $200. Same interest — time matters as much as rate!",
      hint: "Use I = P × R × T ÷ 100 for each bank."
    },
    {
      id: 2,
      title: "Activity 2: Find the Rate",
      desc: "Mia borrows $2400 for 3 years and pays $432 of simple interest. What rate was she charged?",
      icon: "📈",
      kind: 'formula',
      slots: { I: '$432', P: '$2400', R: null, T: '3' },
      unknown: 'R',
      fields: [['yearly', 'Interest per year ($)', 144], ['R', 'Rate (% per year)', 6], ['A', 'Total to repay ($)', 2832]],
      done: "🎉 R = 432 × 100 ÷ (2400 × 3) = 6% per year. She repays $2832.",
      hint: "$432 ÷ 3 = $144 a year. 144 ÷ 2400 × 100 = 6%."
    },
    {
      id: 3,
      title: "Activity 3: Find the Principal",
      desc: "Ava's savings earned $90 simple interest in 18 months at 4% per year. How much did she put in?",
      icon: "🔍",
      kind: 'formula',
      slots: { I: '$90', P: null, R: '4', T: null },
      unknown: 'P',
      fields: [['T', 'Time in years', 1.5], ['P', 'Principal ($)', 1500], ['A', 'Amount at the end ($)', 1590]],
      done: "🎉 18 months = 1.5 years. P = 90 × 100 ÷ (4 × 1.5) = $1500, so she ends with $1590.",
      hint: "18 ÷ 12 = 1.5 years. P = I × 100 ÷ (R × T)."
    }
  ]
};

export function SimulatePhase({ muted, onNext }) {
  const [station, setStation] = useState(1);
  const [actIdx, setActIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Station 1
  const [years, setYears] = useState(0);
  const [ans1, setAns1] = useState({});
  const [ok1, setOk1] = useState({});

  // Station 2
  const [rate, setRate] = useState(1);
  const [time, setTime] = useState(1);
  const [ans2, setAns2] = useState({});
  const [ok2, setOk2] = useState({});

  // Station 3
  const [ans3, setAns3] = useState({});
  const [ok3, setOk3] = useState({});
  const [pick3, setPick3] = useState(null);

  const currentActivity = STATION_ACTIVITIES[station][actIdx];
  const say = list => narrate(list, !muted);

  useEffect(() => {
    const a = STATION_ACTIVITIES[station][actIdx];
    stopNarration();
    setShowHint(false);
    setFeedback(null);
    setYears(0);
    setAns1({});
    setOk1({});
    setRate(1);
    setTime(a.monthsMode ? 6 : 1);
    setAns2({});
    setOk2({});
    setAns3({});
    setOk3({});
    setPick3(null);
    say(simulateGuidanceNarration(station, actIdx));
    return () => stopNarration();
  }, [station, actIdx, muted]);

  const toggleHint = () => {
    setShowHint(h => {
      const next = !h;
      stopNarration();
      if (next) {
        say(simulateHintNarration(station, actIdx));
      }
      return next;
    });
  };

  /* ---------- Station 1: Savings Tower ---------- */
  const s1 = station === 1 ? currentActivity : null;
  const yearly1 = s1 ? (s1.P * s1.R) / 100 : 0;
  const amount1 = s1 ? s1.P + yearly1 * years : 0;
  const reached = s1 ? Math.abs(amount1 - s1.target) < 0.005 : false;
  const step = d => { setYears(y => Math.max(0, Math.min(10, y + d))); setFeedback(null); };
  const check1 = () => {
    const ok = {};
    s1.fields.forEach(([k, , v]) => { ok[k] = near(ans1[k], v); });
    setOk1(ok);
    stopNarration();
    if (reached && Object.values(ok).every(Boolean)) {
      setFeedback({ success: true, text: `🎉 ${money(s1.P)} + ${years} × ${money(yearly1)} = ${money(s1.target)}. Same interest every year!` });
      say(feedbackNarration.splitDone());
    } else {
      setFeedback({ success: false, text: !reached ? (amount1 > s1.target ? 'You went past the target — remove a year.' : 'Not at the target yet — add more years.') : 'Target reached! Now check the red boxes.' });
      say(feedbackNarration.tryAgain());
    }
  };

  /* ---------- Station 2: Savings Planner ---------- */
  const s2 = station === 2 ? currentActivity : null;
  const tYears = s2 ? (s2.monthsMode ? time / 12 : time) : 1;
  const interest2 = s2 ? r2((s2.P * rate * tYears) / 100) : 0;
  const hitI = s2 ? Math.abs(interest2 - s2.targetI) < 0.005 : false;
  const ruleOk = s2 && s2.rule ? s2.rule.test(rate, tYears) : true;
  const fields2 = s2 ? [['yearly', 'Interest per year ($)', (s2.P * rate) / 100], ['A', 'Amount at the end ($)', s2.P + s2.targetI]] : [];
  const check2 = () => {
    const ok = {};
    fields2.forEach(([k, , v]) => { ok[k] = near(ans2[k], v); });
    setOk2(ok);
    stopNarration();
    if (hitI && ruleOk && Object.values(ok).every(Boolean)) {
      setFeedback({ success: true, text: `🎉 ${money(s2.P)} × ${rate}% × ${+tYears.toFixed(2)} yr ÷ 100 = ${money(s2.targetI)}. Great plan!` });
      say(feedbackNarration.buildDone());
    } else {
      setFeedback({ success: false, text: !hitI ? `This plan earns ${money(interest2)}. Adjust the rate or time to get ${money(s2.targetI)}.` : !ruleOk ? `Right interest, but break the rule: ${s2.rule.text.toLowerCase()}.` : 'Plan works! Now check the red boxes.' });
      say(feedbackNarration.tryAgain());
    }
  };

  /* ---------- Station 3: Interest Detective ---------- */
  const s3 = station === 3 ? currentActivity : null;
  const val3 = k => s3.fields.find(f => f[0] === k)[2];
  const slots3 = s3 && s3.kind === 'formula' ? Object.fromEntries(Object.entries(s3.slots).map(([k, v]) => [k, v ?? (ok3[k] ? (k === 'P' ? money(val3(k)) : String(val3(k))) : null)])) : {};
  const check3 = () => {
    const ok = {};
    s3.fields.forEach(([k, , v]) => { ok[k] = near(ans3[k], v); });
    setOk3(ok);
    const choiceOk = !s3.choice || pick3 === s3.choice.answer;
    stopNarration();
    if (Object.values(ok).every(Boolean) && choiceOk) {
      setFeedback({ success: true, text: s3.done });
      say(feedbackNarration.reverseDone());
    } else {
      setFeedback({ success: false, text: !Object.values(ok).every(Boolean) ? 'Check the red boxes. Rearrange I = P × R × T ÷ 100.' : `Now answer: ${s3.choice.q}` });
      say(feedbackNarration.tryAgain());
    }
  };

  /* ---------- Navigation ---------- */
  const nextActivity = () => {
    stopNarration();
    if (actIdx < 2) {
      setActIdx(i => i + 1);
    } else if (station < 3) {
      setStation(s => s + 1);
      setActIdx(0);
    } else {
      onNext();
    }
  };

  const prevActivity = () => {
    stopNarration();
    if (actIdx > 0) {
      setActIdx(i => i - 1);
    } else if (station > 1) {
      setStation(s => s - 1);
      setActIdx(2);
    }
  };

  const STATIONS = [
    { n: 1, icon: '📊', name: 'Station 1: Savings Tower', sub: 'Grow year by year' },
    { n: 2, icon: '🎛️', name: 'Station 2: Savings Planner', sub: 'Choose rate & time' },
    { n: 3, icon: '🕵️', name: 'Station 3: Interest Detective', sub: 'Find P, R or T' }
  ];

  const inputCls = ok =>
    `bg-[#14082c] border-2 rounded-xl px-3 py-2 text-white font-display font-900 text-base text-center outline-none w-24 shadow-inner ${
      ok === true ? 'border-emerald-400' : ok === false ? 'border-rose-400' : 'border-cyan-400/70 focus:border-amber-400'
    }`;

  const hintBtn = (
    <button
      onClick={toggleHint}
      className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 font-display font-900 text-xs px-3 py-2 rounded-xl transition cursor-pointer"
    >
      💡 Hint
    </button>
  );

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <BgSymbols />

      {/* Main Simulation Stations Glass Card Container */}
      <div className="w-full max-w-6xl max-h-[94vh] bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto overflow-hidden">
        {/* Cyan Accent Bar */}
        <div className="w-24 h-2 bg-cyan-400 rounded-full mb-2.5 shadow-[0_0_18px_rgba(56,189,248,0.85)] shrink-0" />

        {/* Card Header Title */}
        <h2 className="font-display font-900 text-2xl sm:text-3xl text-white flex items-center gap-3 mb-3.5 shrink-0">
          <span className="text-3xl sm:text-4xl">🧪</span>
          <span>Simulation Stations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 w-full items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Left Column: Station Sidebar Tabs */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3 shrink-0">
            <div className="flex flex-col gap-3.5">
              {STATIONS.map(s => (
                <button
                  key={s.n}
                  onClick={() => {
                    setStation(s.n);
                    setActIdx(0);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                    station === s.n
                      ? 'border-cyan-400 bg-[#1e2852] text-white shadow-[0_0_22px_rgba(56,189,248,0.4)] scale-[1.02]'
                      : 'border-purple-500/25 bg-[#13082b]/80 text-slate-300 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                      station === s.n ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white'
                    }`}>
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-display font-900 text-base sm:text-lg leading-tight">{s.name}</p>
                      <p className="text-xs font-extrabold text-slate-300 mt-0.5">{s.sub}</p>
                    </div>
                  </div>
                  <span className="text-base">🔓</span>
                </button>
              ))}
            </div>

            {/* Bottom Left CTA Button */}
            <button
              onClick={onNext}
              className="btn-gold font-display font-900 text-base sm:text-lg py-4 px-6 shadow-[0_0_25px_rgba(250,204,21,0.65)] hover:scale-105 transition mt-2 w-full flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Go to Practice Phase!</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Column: Interactive Simulation Box */}
          <div className="md:col-span-8 bg-[#13092e]/95 border-2 border-purple-400/35 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-inner flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col flex-1 min-h-0 justify-between">
              {/* Header Row */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3 shrink-0 gap-3">
                <h3 className="font-display font-900 text-xl sm:text-2xl text-cyan-300 flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{currentActivity.icon}</span>
                  <span>{currentActivity.title}</span>
                </h3>
                <span className="font-display font-900 text-xs sm:text-sm text-slate-200 bg-white/10 px-4 py-1 rounded-full border border-white/15 shrink-0">
                  Activity {actIdx + 1} of 3
                </span>
              </div>

              {/* Activity Description */}
              <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-extrabold mb-3 shrink-0">
                {currentActivity.desc}
              </p>

              {/* ===================== STATION 1: SAVINGS TOWER ===================== */}
              {station === 1 && (
                <div className="flex gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0">
                  <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-2 overflow-y-auto">
                    <div className="flex items-center justify-between shrink-0 gap-2 flex-wrap">
                      <span className="bg-[#14082c] rounded-full px-3 py-1 border border-white/10 text-xs font-900 text-sky-200">{s1.icon} P = {money(s1.P)} · R = {s1.R}%</span>
                      <span className={`rounded-full px-3 py-1 border text-xs font-900 ${reached ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200' : 'bg-[#14082c] border-amber-400/50 text-amber-300'}`}>Year {years}: {money(amount1)}</span>
                    </div>
                    <svg viewBox="0 0 360 200" className="w-full flex-1 min-h-[120px]">
                      <GrowthBars P={s1.P} yearly={yearly1} years={years} maxYears={6} target={s1.target} />
                    </svg>
                    <div className="flex items-center justify-center gap-2 shrink-0">
                      <button onClick={() => step(-1)} className="h-9 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-900 cursor-pointer">− 1 year</button>
                      <button onClick={() => step(1)} className="h-9 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 border-2 border-amber-200 text-slate-950 text-sm font-900 cursor-pointer">+ 1 year 📅</button>
                      <span className="flex items-center gap-1 text-[11px] font-900 text-slate-300"><span className="w-3 h-3 rounded-sm" style={{ background: C_P }} /> principal <span className="w-3 h-3 rounded-sm ml-2" style={{ background: C_I }} /> interest</span>
                    </div>
                  </div>

                  <div className="w-60 sm:w-64 shrink-0 flex flex-col gap-1 min-h-0 overflow-y-auto">
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">① Reach the target</p>
                    <div className={`rounded-xl px-3 py-1.5 border-2 text-xs font-900 ${reached ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-200' : 'bg-rose-950/40 border-rose-400/40 text-rose-200'}`}>{reached ? '✔' : '✗'} Amount = {money(s1.target)}</div>
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">② Read the tower</p>
                    {s1.fields.map(([k, lab]) => (
                      <div key={k} className="bg-[#14082c] rounded-xl px-2 py-1 border-2 border-amber-400/40 flex items-center gap-2">
                        <span className="text-xs font-900 text-amber-300 flex-1 leading-tight">{lab}</span>
                        <input type="number" value={ans1[k] ?? ''} onChange={e => setAns1(a => ({ ...a, [k]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && check1()} className={inputCls(ok1[k]) + ' !w-20 !py-0.5'} />
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <button onClick={check1} className="btn-gold flex-1 text-sm font-900 px-3 py-2">Check ✨</button>
                      {hintBtn}
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== STATION 2: SAVINGS PLANNER ===================== */}
              {station === 2 && (
                <div className="flex gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0">
                  <div className="flex-1 min-w-0 min-h-0 flex flex-col gap-2 overflow-y-auto">
                    <div className="flex items-center justify-between shrink-0 gap-2 flex-wrap">
                      <span className="bg-[#14082c] rounded-full px-3 py-1 border border-white/10 text-xs font-900 text-sky-200">{s2.icon} Principal: {money(s2.P)}</span>
                      <span className="bg-[#14082c] rounded-full px-3 py-1 border border-amber-400/50 text-xs font-900 text-amber-300">Target interest: {money(s2.targetI)}</span>
                    </div>
                    <svg viewBox="0 30 360 110" className="w-full flex-1 min-h-[70px] max-h-[45%]">
                      <FormulaCard slots={{ I: money(interest2), P: money(s2.P), R: `${rate}`, T: `${+tYears.toFixed(2)}` }} ok={{ I: hitI }} y={40} />
                    </svg>
                    {[['Rate (% per year)', rate, setRate, 0.5, 10, 0.5, `${rate}%`], [s2.monthsMode ? 'Time (months)' : 'Time (years)', time, setTime, s2.monthsMode ? 6 : 1, s2.monthsMode ? 60 : 10, s2.monthsMode ? 6 : 1, s2.monthsMode ? `${time} mo` : `${time} yr`]].map(([lab, v, set, mn, mx, st, show]) => (
                      <div key={lab} className="bg-[#14082c] rounded-xl px-3 py-1 border border-white/10 flex items-center gap-2 shrink-0">
                        <span className="text-xs font-900 text-slate-300 w-28">{lab}</span>
                        <button onClick={() => { set(x => Math.max(mn, +(x - st).toFixed(2))); setFeedback(null); }} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-900 cursor-pointer">−</button>
                        <input type="range" min={mn} max={mx} step={st} value={v} onChange={e => { set(Number(e.target.value)); setFeedback(null); }} className="flex-1 accent-amber-400" />
                        <button onClick={() => { set(x => Math.min(mx, +(x + st).toFixed(2))); setFeedback(null); }} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-900 cursor-pointer">+</button>
                        <span className="w-14 text-right text-sm font-900 text-amber-300">{show}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-60 sm:w-64 shrink-0 flex flex-col gap-1 min-h-0 overflow-y-auto">
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">① Build a plan</p>
                    <div className={`rounded-xl px-3 py-1.5 border-2 text-xs font-900 ${hitI ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-200' : 'bg-rose-950/40 border-rose-400/40 text-rose-200'}`}>{hitI ? '✔' : '✗'} Interest = {money(s2.targetI)}</div>
                    {s2.rule && <div className={`rounded-xl px-3 py-1.5 border-2 text-xs font-900 ${ruleOk ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-200' : 'bg-rose-950/40 border-rose-400/40 text-rose-200'}`}>{ruleOk ? '✔' : '✗'} {s2.rule.text}</div>}
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">② Check your plan</p>
                    {fields2.map(([k, lab]) => (
                      <div key={k} className="bg-[#14082c] rounded-xl px-2 py-1 border-2 border-amber-400/40 flex items-center gap-2">
                        <span className="text-xs font-900 text-amber-300 flex-1 leading-tight">{lab}</span>
                        <input type="number" value={ans2[k] ?? ''} onChange={e => setAns2(a => ({ ...a, [k]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && check2()} className={inputCls(ok2[k]) + ' !w-20 !py-0.5'} />
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <button onClick={check2} className="btn-gold flex-1 text-sm font-900 px-3 py-2">Check ✨</button>
                      {hintBtn}
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== STATION 3: INTEREST DETECTIVE ===================== */}
              {station === 3 && (
                <div className="flex gap-4 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0">
                  <div className="flex-1 min-w-0 min-h-0 flex flex-col items-center justify-center">
                    {s3.kind === 'banks' ? (
                      <svg viewBox="10 10 344 170" className="w-full max-h-full">
                        <BankCards banks={[
                          { name: 'Bank A', P: '$1000', R: '5%', T: '4 yrs', I: ok3.a ? '$200' : '?', ok: ok3.a },
                          { name: 'Bank B', P: '$1000', R: '4%', T: '5 yrs', I: ok3.b ? '$200' : '?', ok: ok3.b }
                        ]} y={18} />
                      </svg>
                    ) : (
                      <svg viewBox="0 20 360 130" className="w-full max-h-full">
                        <FormulaCard slots={slots3} ok={{ [s3.unknown]: ok3[s3.unknown], T: ok3.T }} y={40} />
                      </svg>
                    )}
                  </div>

                  <div className="w-60 sm:w-64 shrink-0 flex flex-col gap-1 min-h-0 overflow-y-auto">
                    <p className="text-xs font-900 text-cyan-300 uppercase tracking-wider">Crack the case</p>
                    {s3.fields.map(([k, lab]) => (
                      <div key={k} className="bg-[#14082c] rounded-xl px-2 py-1 border-2 border-amber-400/40 flex items-center gap-2">
                        <span className="text-xs font-900 text-amber-200 flex-1 leading-tight">{lab}</span>
                        <input type="number" value={ans3[k] ?? ''} onChange={e => setAns3(a => ({ ...a, [k]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && check3()} className={inputCls(ok3[k]) + ' !w-20 !py-0.5'} />
                      </div>
                    ))}
                    {s3.choice && (
                      <div className="flex gap-1 items-center flex-wrap">
                        <span className="text-[11px] font-900 text-cyan-200 w-full">{s3.choice.q}</span>
                        {s3.choice.options.map(o => (
                          <button key={o} onClick={() => { setPick3(o); setFeedback(null); }} className={`flex-1 px-2 py-1 rounded-lg border-2 text-[11px] font-900 cursor-pointer ${pick3 === o ? 'bg-amber-400 text-slate-950 border-amber-200' : 'bg-white/5 text-white border-white/20'}`}>{o}</button>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button onClick={check3} className="btn-gold flex-1 text-sm font-900 px-3 py-2">Check ✨</button>
                      {hintBtn}
                    </div>
                  </div>
                </div>
              )}

              {/* Hint + feedback strip */}
              {showHint && (
                <div className="p-2.5 mt-2 bg-amber-950/90 border border-amber-400/50 text-amber-200 rounded-xl text-xs sm:text-sm font-bold w-full text-center fade-in-up shrink-0">
                  💡 {currentActivity.hint}
                </div>
              )}
              {feedback && (
                <div className={`p-2.5 mt-2 rounded-2xl text-sm font-900 w-full text-center shadow-xl shrink-0 fade-in-up ${
                  feedback.success ? 'bg-emerald-950/90 text-emerald-300 border-2 border-emerald-400/60' : 'bg-rose-950/90 text-rose-300 border-2 border-rose-400/60'
                }`}>
                  {feedback.text}
                </div>
              )}
            </div>

            {/* Bottom Activity Step Buttons */}
            <div className="flex items-center justify-between border-t border-white/15 pt-3 mt-3 shrink-0">
              <button
                onClick={prevActivity}
                disabled={station === 1 && actIdx === 0}
                className="bg-[#1c0d3a]/90 hover:bg-[#2c1859] border-2 border-white/25 text-white font-display font-900 text-sm sm:text-base px-6 py-2.5 rounded-full cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
              >
                ← Previous Activity
              </button>

              <button
                onClick={nextActivity}
                className="btn-gold text-sm sm:text-base font-900 px-8 py-2.5 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <span>{station === 3 && actIdx === 2 ? 'Go to Practice Phase' : 'Next Activity'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
