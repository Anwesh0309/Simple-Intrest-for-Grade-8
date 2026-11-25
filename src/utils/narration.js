/* =========================================================================
   NARRATION SCRIPTS — maps each lesson phase to its spoken segments.
   Only paragraph text and questions are narrated — NEVER titles.
   Every string comes from lessonScript.js, the same source the UI displays.
   ========================================================================= */
import { say, ask, think, instruct, cheer, encourage } from './audio.js';
import { WONDER, STORY, SIMULATE, SIMULATE_GUIDANCE, REFLECT, FEEDBACK } from './lessonScript.js';

export function wonderNarration() {
  return [say(WONDER.paragraph), ask(WONDER.question)];
}

export function getStoryNarration(slideIndex) {
  const slide = STORY[slideIndex];
  return slide ? [{ text: slide.body, style: slide.style }] : [];
}

export function simulateStationIntro(station) {
  if (station === 3) return [ask(SIMULATE[3])];
  return [instruct(SIMULATE[station])];
}

export function simulateGuidanceNarration(station, actIdx) {
  const st = SIMULATE_GUIDANCE[station];
  const act = st && st[actIdx];
  return act ? [instruct(act.desc)] : [];
}

export function simulateHintNarration(station, actIdx) {
  const st = SIMULATE_GUIDANCE[station];
  const act = st && st[actIdx];
  return act ? [think(act.hint)] : [];
}

export function practiceQuestionNarration(prompt) {
  return [ask(prompt)];
}

export function practiceHintNarration(hint) {
  return [think(hint)];
}

export function reflectQuestionNarration() {
  return [think(REFLECT.question)];
}

export const feedbackNarration = {
  splitDone: () => [cheer(FEEDBACK.splitDone)],
  buildDone: () => [cheer(FEEDBACK.buildDone)],
  reverseDone: () => [cheer(FEEDBACK.reverseDone)],
  tryAgain: () => [encourage(FEEDBACK.tryAgain)],
  practiceCorrect: () => [cheer(FEEDBACK.practiceCorrect)],
  practiceWrong: () => [encourage(FEEDBACK.practiceWrong)],
  lessonDone: () => [cheer(FEEDBACK.lessonDone)]
};
