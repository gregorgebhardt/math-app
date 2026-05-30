<template>
  <div class="quiz-picker" @click="selectedKey = null">
    <h1 class="app-title">Mathe Übungen</h1>
    <p class="app-subtitle">Wähle eine Aufgabe:</p>

    <div class="quiz-cards">
      <div
        v-for="(quiz, key) in quizzes"
        :key="key"
        class="quiz-card"
        :class="{ 'quiz-card--selected': selectedKey === key }"
        @click.stop="selectedKey = key"
      >
        <div class="quiz-card-icon">
          <component :is="quiz.icon" :size="52" />
        </div>
        <h2 class="quiz-card-title">{{ quiz.label }}</h2>
        <p class="quiz-card-desc">{{ quiz.description }}</p>

        <div v-if="selectedKey === key" class="quiz-card-options" @click.stop>

          <!-- Simple mode: hardness slider -->
          <template v-if="props.simpleMode">
            <div class="hardness-picker">
              <div class="hardness-label">
                <span class="hardness-emoji">{{ hardnessLevels[hardness[key] - 1].emoji }}</span>
                <span class="hardness-name">{{ hardnessLevels[hardness[key] - 1].label }}</span>
              </div>
              <div class="hardness-track-wrap">
                <input
                  type="range"
                  min="1"
                  max="5"
                  :value="hardness[key]"
                  class="hardness-slider"
                  @input="setHardness(key, Number($event.target.value))"
                  @click.stop
                />
                </div>
            </div>
          </template>

          <!-- Advanced mode: per-quiz controls -->
          <template v-else>

            <!-- Clock options -->
            <template v-if="key === 'clock'">
              <label class="option-label">
                Wie viele Uhrzeiten?
                <div class="row-selector">
                  <button
                    v-for="n in [3, 4, 5, 6]"
                    :key="n"
                    class="row-btn"
                    :class="{ 'row-btn--active': selectedClockCount === n }"
                    @click.stop="selectedClockCount = n"
                  >{{ n }}</button>
                </div>
              </label>
              <label class="option-label">
                Genauigkeit?
                <div class="range-selector">
                  <button
                    v-for="opt in stepOptions"
                    :key="opt.value"
                    class="range-btn"
                    :class="{ 'range-btn--active': selectedStep === opt.value }"
                    @click.stop="selectedStep = opt.value"
                  >{{ opt.label }}</button>
                </div>
              </label>
              <label class="option-label">
                Zeitformat?
                <div class="toggle-row">
                  <button
                    class="toggle-btn toggle-btn--wide"
                    :class="{ 'toggle-btn--active': !clockTwentyFourHour }"
                    @click.stop="clockTwentyFourHour = false"
                  >12h</button>
                  <button
                    class="toggle-btn toggle-btn--wide"
                    :class="{ 'toggle-btn--active': clockTwentyFourHour }"
                    @click.stop="clockTwentyFourHour = true"
                  >24h</button>
                </div>
              </label>
              <label class="option-label">
                Ziffern?
                <div class="toggle-row">
                  <button
                    class="toggle-btn toggle-btn--wide"
                    :class="{ 'toggle-btn--active': clockShowNumbers }"
                    @click.stop="clockShowNumbers = true"
                  >Zahlen</button>
                  <button
                    class="toggle-btn toggle-btn--wide"
                    :class="{ 'toggle-btn--active': !clockShowNumbers }"
                    @click.stop="clockShowNumbers = false"
                  >Striche</button>
                </div>
              </label>
            </template>

            <!-- Pyramid options -->
            <template v-else-if="key === 'pyramid'">
              <label class="option-label">
                Wie viele Reihen?
                <div class="row-selector">
                  <button
                    v-for="n in [2, 3, 4, 5, 6]"
                    :key="n"
                    class="row-btn"
                    :class="{ 'row-btn--active': selectedRows === n }"
                    @click.stop="selectedRows = n"
                  >{{ n }}</button>
                </div>
              </label>

              <label class="option-label">
                Zahlenbereich (untere Reihe)?
                <div class="range-selector">
                  <button
                    v-for="opt in pyramidRangeOptions"
                    :key="opt.value"
                    class="range-btn"
                    :class="{ 'range-btn--active': selectedPyramidMaxVal === opt.value }"
                    @click.stop="selectedPyramidMaxVal = opt.value"
                  >{{ opt.label }}</button>
                </div>
              </label>

              <label class="option-label">
                Hilfe-Steine?
                <div class="toggle-row">
                  <button
                    class="toggle-btn"
                    :class="{ 'toggle-btn--active': prefillEnabled }"
                    @click.stop="prefillEnabled = !prefillEnabled"
                  >
                    {{ prefillEnabled ? 'An' : 'Aus' }}
                  </button>
                  <span class="toggle-hint">Einige Felder werden vorausgefüllt</span>
                </div>
              </label>
            </template>

            <!-- Addition / Subtraction options (identical controls) -->
            <template v-else-if="key === 'addition' || key === 'subtraction'">
              <label class="option-label">
                Wie viele Aufgaben?
                <div class="row-selector">
                  <button
                    v-for="n in [3, 5, 8, 10]"
                    :key="n"
                    class="row-btn"
                    :class="{ 'row-btn--active': selectedCount === n }"
                    @click.stop="selectedCount = n"
                  >{{ n }}</button>
                </div>
              </label>

              <label class="option-label">
                Zahlenbereich?
                <div class="range-selector">
                  <button
                    v-for="opt in subRangeOptions"
                    :key="opt.value"
                    class="range-btn"
                    :class="{ 'range-btn--active': selectedSubMaxVal === opt.value }"
                    @click.stop="selectedSubMaxVal = opt.value"
                  >{{ opt.label }}</button>
                </div>
              </label>

              <label class="option-label">
                Fehlende Zahl?
                <div class="toggle-row">
                  <button
                    class="toggle-btn toggle-btn--wide"
                    :class="{ 'toggle-btn--active': resultOnly }"
                    @click.stop="resultOnly = true"
                  >
                    Ergebnis
                  </button>
                  <button
                    class="toggle-btn toggle-btn--wide"
                    :class="{ 'toggle-btn--active': !resultOnly }"
                    @click.stop="resultOnly = false"
                  >
                    Beliebig
                  </button>
                </div>
              </label>
            </template>

          </template>

          <button class="btn btn--primary btn--large" @click.stop="start">
            Starten
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { quizzes, hardnessLevels } from '../quizzes.js'

const props = defineProps({
  simpleMode: { type: Boolean, default: true }
})

const emit = defineEmits(['start'])

const STORAGE_KEY = 'math-app-settings'

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}

const saved = loadSettings()

const selectedKey = ref(null)

// Per-quiz hardness levels (slider position stored independently per quiz)
const hardness = ref({
  clock:       saved.hardness?.clock       ?? 2,
  pyramid:     saved.hardness?.pyramid     ?? 2,
  addition:    saved.hardness?.addition    ?? 2,
  subtraction: saved.hardness?.subtraction ?? 2,
})

// Pyramid options
const selectedRows = ref(saved.selectedRows ?? 3)
const selectedPyramidMaxVal = ref(saved.selectedPyramidMaxVal ?? 10)
const prefillEnabled = ref(saved.prefillEnabled ?? false)

const pyramidRangeOptions = [
  { label: '1–10', value: 10 },
  { label: '1–20', value: 20 },
  { label: '1–50', value: 50 },
  { label: '1–100', value: 100 }
]

// Clock options
const selectedClockCount  = ref(saved.selectedClockCount  ?? 5)
const selectedStep        = ref(saved.selectedStep        ?? 60)
const clockTwentyFourHour = ref(saved.clockTwentyFourHour ?? true)
const clockShowNumbers    = ref(saved.clockShowNumbers    ?? true)

const stepOptions = [
  { label: 'Stunden',  value: 60 },
  { label: 'Halbe',    value: 30 },
  { label: 'Viertel',  value: 15 },
  { label: '5 Min',    value: 5  },
]

// Subtraction / Addition options
const selectedCount = ref(saved.selectedCount ?? 5)
const selectedSubMaxVal = ref(saved.selectedSubMaxVal ?? 20)
const resultOnly = ref(saved.resultOnly ?? true)

const subRangeOptions = [
  { label: '1–10', value: 10 },
  { label: '1–20', value: 20 },
  { label: '1–50', value: 50 },
  { label: '1–100', value: 100 }
]

// Slider move: sync only the relevant quiz's advanced settings
function setHardness(key, level) {
  hardness.value[key] = level
  if (key === 'pyramid') {
    const p = quizzes.pyramid.hardnessPresets[level - 1]
    selectedRows.value = p.rows
    selectedPyramidMaxVal.value = p.maxVal
    prefillEnabled.value = p.prefill
  } else if (key === 'clock') {
    const c = quizzes.clock.hardnessPresets[level - 1]
    selectedClockCount.value  = c.count
    selectedStep.value        = c.step
    clockTwentyFourHour.value = c.twentyFourHour
    clockShowNumbers.value    = c.showNumbers
  } else if (key === 'addition' || key === 'subtraction') {
    const s = quizzes[key].hardnessPresets[level - 1]
    selectedCount.value = s.count
    selectedSubMaxVal.value = s.maxVal
    resultOnly.value = s.resultOnly
  }
}

// Persist all settings on any change
watch(
  [hardness, selectedClockCount, selectedStep, clockTwentyFourHour, clockShowNumbers,
   selectedRows, selectedPyramidMaxVal, prefillEnabled, selectedCount, selectedSubMaxVal, resultOnly],
  () => localStorage.setItem(STORAGE_KEY, JSON.stringify({
    hardness: hardness.value,
    selectedClockCount: selectedClockCount.value,
    selectedStep: selectedStep.value,
    clockTwentyFourHour: clockTwentyFourHour.value,
    clockShowNumbers: clockShowNumbers.value,
    selectedRows: selectedRows.value,
    selectedPyramidMaxVal: selectedPyramidMaxVal.value,
    prefillEnabled: prefillEnabled.value,
    selectedCount: selectedCount.value,
    selectedSubMaxVal: selectedSubMaxVal.value,
    resultOnly: resultOnly.value,
  })),
  { deep: true }
)

// start() always reads from advanced refs (slider syncs them)
function start() {
  if (!selectedKey.value) return
  let options = {}
  if (selectedKey.value === 'pyramid') {
    options = { rows: selectedRows.value, maxVal: selectedPyramidMaxVal.value, prefill: prefillEnabled.value }
  } else if (selectedKey.value === 'clock') {
    options = { count: selectedClockCount.value, step: selectedStep.value, twentyFourHour: clockTwentyFourHour.value, showNumbers: clockShowNumbers.value }
  } else if (selectedKey.value === 'addition' || selectedKey.value === 'subtraction') {
    options = { count: selectedCount.value, maxVal: selectedSubMaxVal.value, resultOnly: resultOnly.value }
  }
  emit('start', { quizKey: selectedKey.value, options })
}
</script>
