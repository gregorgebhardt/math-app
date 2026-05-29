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
        <h2>{{ quiz.label }}</h2>
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

function start() {
  if (!selectedKey.value) return
  emit('start', {
    quizKey: selectedKey.value,
    options: selectedKey.value === 'pyramid' ? { rows: selectedRows.value } : {}
  })
}
</script>
