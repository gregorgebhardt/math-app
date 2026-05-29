# Subtraction Quiz — Blank Mode Toggle

**Date:** 2026-05-30

## Summary

Add a toggle to the subtraction quiz that controls which position in the equation can be blank. Default is results-only ("Ergebnis"); the other mode allows any position to be blank ("Beliebig").

## Feature Description

A new option appears in the subtraction quiz card in `QuizPicker.vue`, labelled **"Fehlende Zahl"**, with two buttons:

- **Ergebnis** (default) — the answer position (`c` in `a − b = ?`) is always the blank
- **Beliebig** — any of the three positions (`a`, `b`, or `c`) may be blank, chosen at random per problem (current behavior)

## Data Flow

1. `QuizPicker.vue` holds a `resultOnly` ref (default `true`).
2. On "Starten", `resultOnly` is emitted alongside `count` and `maxVal` in the options object.
3. `App.vue` passes options as props to `SubtractionQuiz.vue` unchanged (no modification needed here).
4. `SubtractionQuiz.vue` receives `resultOnly: Boolean` (default `true`) and uses it in `generateProblem`.

## Changes

### `src/quizzes.js`
Add `resultOnly: true` to subtraction `defaultOptions`.

### `src/components/QuizPicker.vue`
- Add `const resultOnly = ref(true)`.
- Add toggle UI under subtraction options, after the range selector, reusing `.toggle-btn` / `.toggle-btn--active` / `.toggle-row` / `.toggle-hint` classes.
- Include `resultOnly: resultOnly.value` in the emitted options for the subtraction branch.

### `src/components/quizzes/SubtractionQuiz.vue`
- Add prop `resultOnly: { type: Boolean, default: true }`.
- In `generateProblem`: when `resultOnly` is `true`, set `blankPos = 'answer'`; otherwise keep `['left', 'right', 'answer'][Math.floor(Math.random() * 3)]`.

## Styling

No new CSS required. Toggle reuses existing classes from `src/style.css`.
