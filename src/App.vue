<template>
  <div class="app">
    <QuizPicker
      v-if="!activeQuiz"
      :simpleMode="simpleMode"
      @start="onStart"
    />
    <component
      v-else
      :is="activeQuiz.component"
      v-bind="activeQuiz.options"
      @back="activeQuiz = null"
    />

    <footer v-if="!activeQuiz" class="app-footer">
      <button class="footer-mode-toggle" @click="simpleMode = !simpleMode">
        {{ simpleMode ? '⚙ Erweiterte Einstellungen' : '✕ Einfache Ansicht' }}
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { quizzes } from './quizzes.js'
import QuizPicker from './components/QuizPicker.vue'

const activeQuiz = ref(null)
const simpleMode = ref(true)

function onStart({ quizKey, options }) {
  const quiz = quizzes[quizKey]
  if (!quiz) return
  activeQuiz.value = { component: quiz.component, options }
}
</script>
