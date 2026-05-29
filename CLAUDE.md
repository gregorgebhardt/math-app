# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run test       # run tests (vitest)
npm run preview    # preview production build
```

Or use `just dev`, `just build`, `just test`, `just preview` via the justfile.

To run a single test file: `npx vitest run tests/pyramid.test.js`

## Architecture

A Vue 3 + Vite PWA — German-language math exercises for primary school children. No router; navigation is a single boolean (`activeQuiz` ref in `App.vue`).

**Quiz registry pattern** (`src/quizzes.js`): each quiz type is registered here with its label, icon, description, component, and `defaultOptions`. `QuizPicker.vue` renders cards from this registry, and `App.vue` mounts the selected component dynamically. To add a new quiz type: create the component in `src/components/quizzes/`, add an icon in `src/components/icons/`, register both in `src/quizzes.js`, and add the option UI to `QuizPicker.vue`.

**Quiz components** receive their options as props (e.g. `rows`, `maxVal`, `prefill` for pyramid; `count`, `maxVal` for subtraction) and emit a single `back` event to return to the picker.

**Styling**: all CSS lives in `src/style.css` as global styles — no scoped CSS. This is intentional so that shared classes (`brick`, `btn`, `quiz-header`, etc.) work across quiz components without duplication.

**Pure logic** lives in `src/utils/` (currently `pyramid.js`). Tests in `tests/` cover these utilities with Vitest running in `node` environment (no DOM).

## Key design notes

- UI is mobile-first and touch-optimised (`touch-action: manipulation`, fluid brick sizing via CSS `clamp`).
- Brick sizes in the pyramid use a CSS custom property `--pyramid-cols` set inline from `props.rows` to compute fluid widths.
- Correct answers auto-advance focus (`focusNext`) in both quiz types.
- The crown SVG on the top pyramid brick and on the subtraction wrapper turns gold (`#f59f00`) when the puzzle is fully solved.
