<template>
  <div class="app">
    <QuizPicker v-if="!activeQuiz" @start="onStart" />
    <component
      v-else
      :is="activeQuiz.component"
      v-bind="activeQuiz.options"
      @back="activeQuiz = null"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { quizzes } from './quizzes.js'
import QuizPicker from './components/QuizPicker.vue'

const activeQuiz = ref(null)

function onStart({ quizKey, options }) {
  const quiz = quizzes[quizKey]
  if (!quiz) return
  activeQuiz.value = { component: quiz.component, options }
}
</script>
