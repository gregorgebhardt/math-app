# Math App — Design Spec
Date: 2026-05-29

## Overview

A client-side Vue 3 + Vite web application for primary school children who are slightly ahead of their class. The app presents math puzzles in a focused, clean interface with minimal distraction. All UI text is in **German**. The first puzzle type is the **Additionspyramide** (adding pyramid). The architecture is extensible so additional quiz types can be added with minimal effort.

---

## Goals

- Engaging math practice for primary school kids (ages ~7–10) ahead of the curve
- Clean, uncluttered UI with only subtle playful touches (e.g. success animation)
- German language throughout
- Extensible: adding a new quiz type should require only a new component + one registry entry
- No backend, no persistence, runs fully in-browser

---

## Tech Stack

- **Vue 3** (Composition API)
- **Vite** (build tool / dev server)
- No router, no state management library — plain reactive state in components

---

## Architecture

### Quiz Registry (`src/quizzes.js`)

A plain JS object mapping quiz keys to their Vue component and metadata:

```js
import PyramidQuiz from './components/quizzes/PyramidQuiz.vue'

export const quizzes = {
  pyramid: {
    label: 'Additionspyramide',
    component: PyramidQuiz,
    options: {
      // size: number of rows (2–6), selected in QuizPicker
    }
  }
}
```

Adding a new quiz = create a component in `src/components/quizzes/` and add one entry here.

### App Shell (`App.vue`)

Two states:
1. **Picker** — shows `QuizPicker.vue` to select quiz type and options
2. **Active quiz** — renders the chosen quiz component with its options as props

No router needed; state is an in-memory `ref` (selected quiz key + options).

---

## File Structure

```
math-app/
├── index.html
├── vite.config.js
├── package.json
├── justfile
└── src/
    ├── main.js
    ├── App.vue
    ├── quizzes.js
    ├── components/
    │   ├── QuizPicker.vue
    │   └── quizzes/
    │       └── PyramidQuiz.vue
    └── style.css
```

---

## Components

### `QuizPicker.vue`

- Displays the available quiz types from the registry as cards/buttons
- For the pyramid: shows a size selector (2–6 rows) with a clear label ("Wie viele Reihen?")
- "Starten" button emits `start` event with `{ quizKey, options }`
- German labels throughout

### `PyramidQuiz.vue`

Props:
- `rows: number` — pyramid height (2–6)

Behaviour:
- Generates a random bottom row of `rows` integers in the range **1–9**
- Pre-computes all correct values upward
- Renders the pyramid as a grid of brick cells
- Bottom row values are displayed (read-only)
- All other cells are `<input>` fields
- Live validation: input cell turns **green** when the entered value matches the correct answer; no red/error state to avoid frustration
- When all inputs are correct: displays "🎉 Gut gemacht!" success message
- "Neue Aufgabe" button generates a fresh pyramid at the same row count
- "Zurück" button returns to the quiz picker

---

## Pyramid Logic

Given `n` rows:

1. Bottom row: `n` random integers
2. Row above: each cell = left-neighbor + right-neighbor from the row below
3. Repeat upward until the single top cell

Example (3 rows):
```
      [15]
    [7]  [8]
  [3] [4] [4]
```

All values pre-computed at puzzle generation time. The child fills in every cell except the bottom row.

---

## UX & Visual Design

- **Style**: clean, minimal, white/light background, generous spacing
- **Font**: system sans-serif or a friendly open-source font (e.g. Nunito)
- **Colors**:
  - Neutral brick: light grey/beige border, white fill
  - Correct input: soft green background
  - Success message: subtle animation (fade-in or gentle bounce)
- **No red error states** — wrong answers simply stay unstyled
- **Inputs**: large enough for comfortable finger/stylus tap on tablet; numeric keyboard hint (`inputmode="numeric"`)
- All text in **German**: "Neue Aufgabe", "Gut gemacht!", "Zurück", "Starten", "Wie viele Reihen?", "Additionspyramide"

---

## Edge Cases

- Inputs accept only digits; non-numeric characters are silently ignored
- Pyramid is always pre-solved — no unsolvable states possible
- Min 2 rows (1 input cell), max 6 rows (numbers stay reasonably sized)
- No persistence — refresh resets to quiz picker, which is acceptable

---

## Justfile

A `justfile` at the project root with these recipes:

```
dev    # vite dev server
build  # vite build (outputs to dist/)
preview # serve the built dist/ locally
```

---

## Out of Scope (for now)

- User accounts / progress tracking
- Timer or scoring
- Multiple quiz types (architecture ready, implementation deferred)
- Subtraction / multiplication pyramid variants
