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
      </div>
    </div>

    <div v-if="selectedKey" class="quiz-options">
      <template v-if="selectedKey === 'pyramid'">
        <label class="option-label">
          Wie viele Reihen?
          <div class="row-selector">
            <button
              v-for="n in [2, 3, 4, 5, 6]"
              :key="n"
              class="row-btn"
              :class="{ 'row-btn--active': selectedRows === n }"
              @click="selectedRows = n"
            >{{ n }}</button>
          </div>
        </label>

        <label class="option-label">
          Zahlenbereich (untere Reihe)?
          <div class="range-selector">
            <button
              v-for="opt in rangeOptions"
              :key="opt.value"
              class="range-btn"
              :class="{ 'range-btn--active': selectedMaxVal === opt.value }"
              @click="selectedMaxVal = opt.value"
            >{{ opt.label }}</button>
          </div>
        </label>
      </template>
    </div>

    <button
      v-if="selectedKey"
      class="btn btn--primary btn--large"
      @click="start"
    >
      Starten
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { quizzes } from '../quizzes.js'

const emit = defineEmits(['start'])

const selectedKey = ref(null)
const selectedRows = ref(3)
const selectedMaxVal = ref(20)

const rangeOptions = [
  { label: '1–20', value: 20 },
  { label: '1–50', value: 50 },
  { label: '1–100', value: 100 }
]

function start() {
  if (!selectedKey.value) return
  emit('start', {
    quizKey: selectedKey.value,
    options: selectedKey.value === 'pyramid'
      ? { rows: selectedRows.value, maxVal: selectedMaxVal.value }
      : {}
  })
}
</script>
