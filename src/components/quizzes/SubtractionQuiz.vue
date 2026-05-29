<template>
  <div class="subtraction-quiz">
    <div class="quiz-header">
      <span class="quiz-header-logo">➖</span>
      <h2 class="quiz-header-title">Subtraktionsaufgaben</h2>
    </div>

    <div class="sub-problems">
      <div
        v-for="(problem, i) in problems"
        :key="i"
        class="sub-problem"
        :class="{ 'sub-problem--solved': isCorrect(i) }"
      >
        <span class="sub-term">{{ problem.displayLeft }}</span>
        <span class="sub-op">−</span>
        <span class="sub-term">{{ problem.displayRight }}</span>
        <span class="sub-op">=</span>
        <div class="sub-answer">
          <span v-if="isCorrect(i)" class="sub-given">{{ problem.answer }}</span>
          <input
            v-else
            :ref="el => { if (el) inputRefs[i] = el }"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="3"
            :value="userInputs[i]"
            @input="onInput(i, $event)"
            @keypress="allowOnlyDigits"
          />
        </div>
      </div>
    </div>

    <div v-if="isSolved" class="success">
      🎉 Gut gemacht!
    </div>

    <div class="actions">
      <button class="btn btn--primary" @click="newRound">Neue Aufgaben</button>
      <button class="btn btn--secondary" @click="$emit('back')">Zurück</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  count: { type: Number, default: 5 },
  maxVal: { type: Number, default: 20 }
})

defineEmits(['back'])

const problems = ref([])
const userInputs = ref([])
const inputRefs = ref([])

// Each problem: a − b = c, with one of a, b, c replaced by a blank.
// blankPos: 'left' (? − b = c), 'right' (a − ? = c), 'answer' (a − b = ?)
function generateProblem() {
  const a = Math.floor(Math.random() * (props.maxVal - 1)) + 2  // 2..maxVal
  const b = Math.floor(Math.random() * (a - 1)) + 1             // 1..a-1
  const c = a - b

  const blankPos = ['left', 'right', 'answer'][Math.floor(Math.random() * 3)]
  return {
    a, b, c,
    blankPos,
    answer: blankPos === 'left' ? a : blankPos === 'right' ? b : c,
    displayLeft:  blankPos === 'left'  ? null : a,
    displayRight: blankPos === 'right' ? null : b,
  }
}

function initRound() {
  inputRefs.value = []
  problems.value = Array.from({ length: props.count }, generateProblem)
  userInputs.value = problems.value.map(() => '')
  nextTick(() => inputRefs.value[0]?.focus())
}

function newRound() {
  initRound()
}

function isCorrect(i) {
  return userInputs.value[i] !== '' && Number(userInputs.value[i]) === problems.value[i].answer
}

function onInput(i, event) {
  const raw = event.target.value.replace(/\D/g, '')
  userInputs.value[i] = raw
  if (raw !== '' && Number(raw) === problems.value[i].answer) {
    nextTick(() => focusNext(i))
  }
}

function allowOnlyDigits(event) {
  if (!/\d/.test(event.key)) event.preventDefault()
}

function focusNext(i) {
  for (let j = i + 1; j < problems.value.length; j++) {
    if (!isCorrect(j)) {
      inputRefs.value[j]?.focus()
      return
    }
  }
}

const isSolved = computed(() => problems.value.every((_, i) => isCorrect(i)))

initRound()
</script>
