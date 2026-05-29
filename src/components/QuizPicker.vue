<template>
  <div class="quiz-picker">
    <h1 class="app-title">Mathe Übungen</h1>
    <p class="app-subtitle">Wähle eine Aufgabe:</p>

    <div class="quiz-cards">
      <div
        v-for="(quiz, key) in quizzes"
        :key="key"
        class="quiz-card"
        :class="{ 'quiz-card--selected': selectedKey === key }"
        @click="selectedKey = key"
      >
        <div class="quiz-card-header">
          <span v-if="quiz.logo" class="quiz-card-logo">{{ quiz.logo }}</span>
          <h2>{{ quiz.label }}</h2>
        </div>
        <p>{{ quiz.description }}</p>

        <div v-if="selectedKey === key" class="quiz-card-options" @click.stop>

          <!-- Pyramid options -->
          <template v-if="key === 'pyramid'">
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

          <!-- Subtraction options -->
          <template v-else-if="key === 'subtraction'">
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
import { ref } from 'vue'
import { quizzes } from '../quizzes.js'

const emit = defineEmits(['start'])

const selectedKey = ref(null)

// Pyramid options
const selectedRows = ref(3)
const selectedPyramidMaxVal = ref(10)
const prefillEnabled = ref(false)

const pyramidRangeOptions = [
  { label: '1–10', value: 10 },
  { label: '1–20', value: 20 },
  { label: '1–50', value: 50 },
  { label: '1–100', value: 100 }
]

// Subtraction options
const selectedCount = ref(5)
const selectedSubMaxVal = ref(20)

const subRangeOptions = [
  { label: '1–10', value: 10 },
  { label: '1–20', value: 20 },
  { label: '1–50', value: 50 },
  { label: '1–100', value: 100 }
]

function start() {
  if (!selectedKey.value) return
  let options = {}
  if (selectedKey.value === 'pyramid') {
    options = { rows: selectedRows.value, maxVal: selectedPyramidMaxVal.value, prefill: prefillEnabled.value }
  } else if (selectedKey.value === 'subtraction') {
    options = { count: selectedCount.value, maxVal: selectedSubMaxVal.value }
  }
  emit('start', { quizKey: selectedKey.value, options })
}
</script>
