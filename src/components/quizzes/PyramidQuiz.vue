<template>
  <div class="pyramid-quiz">
    <div class="quiz-header">
      <IconPyramid :size="36" class="quiz-header-icon" />
      <h2 class="quiz-header-title">Additionspyramide</h2>
    </div>

    <div class="pyramid" :style="`--pyramid-cols: ${props.rows}`">
      <div
        v-for="(row, rowIndex) in pyramid"
        :key="rowIndex"
        class="pyramid-row"
      >
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="brick"
          :class="brickClass(rowIndex, colIndex, cell)"
        >
          <!-- Crown decoration on the top brick -->
          <svg
            v-if="rowIndex === 0"
            class="brick-crown"
            viewBox="0 0 60 30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0" y="18" width="60" height="12" rx="3"/>
            <polygon points="0,30 0,0 8,22 15,0 23,22 30,0 38,22 45,0 53,22 60,0 60,30"/>
            <circle cx="15" cy="0" r="2.5" fill="white" opacity="0.9"/>
            <circle cx="30" cy="0" r="2.5" fill="white" opacity="0.9"/>
            <circle cx="45" cy="0" r="2.5" fill="white" opacity="0.9"/>
          </svg>

          <span v-if="isGiven(rowIndex, colIndex)">{{ cell }}</span>
          <input
            v-else
            :ref="el => setInputRef(el, rowIndex, colIndex)"
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            :maxlength="maxDigits"
            :value="userInputs[rowIndex][colIndex]"
            @input="onInput(rowIndex, colIndex, $event)"
            @keypress="allowOnlyDigits"
          />
        </div>
      </div>
    </div>

    <div v-if="isSolved" class="success">
      🎉 Gut gemacht!
    </div>

    <div class="actions">
      <button class="btn btn--primary" @click="newPuzzle">Neue Aufgabe</button>
      <button class="btn btn--secondary" @click="$emit('back')">Zurück</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { generatePyramid } from '../../utils/pyramid.js'
import IconPyramid from '../icons/IconPyramid.vue'

const props = defineProps({
  rows: {
    type: Number,
    default: 3,
    validator: v => v >= 2 && v <= 6
  },
  maxVal: {
    type: Number,
    default: 10
  },
  prefill: {
    type: Boolean,
    default: true
  }
})

defineEmits(['back'])

const pyramid = ref([])
const userInputs = ref([])
const prefilled = ref([])   // Set of "rowIndex,colIndex" strings that are pre-revealed

// 2D array of input DOM elements, indexed [rowIndex][colIndex]
const inputRefs = ref([])

function setInputRef(el, rowIndex, colIndex) {
  if (!inputRefs.value[rowIndex]) inputRefs.value[rowIndex] = []
  inputRefs.value[rowIndex][colIndex] = el
}

// Roughly 1 in 4 upper cells are pre-filled (excluding top cell and bottom row)
function choosePrefilled(pyr) {
  const set = new Set()
  const n = pyr.length
  // Always show bottom row (given). Optionally pre-fill some middle cells.
  if (n <= 2) return set
  for (let r = 0; r < n - 1; r++) {
    for (let c = 0; c < pyr[r].length; c++) {
      if (Math.random() < 0.25) set.add(`${r},${c}`)
    }
  }
  return set
}

function initPuzzle() {
  inputRefs.value = []
  pyramid.value = generatePyramid(props.rows, props.maxVal)
  prefilled.value = props.prefill ? choosePrefilled(pyramid.value) : new Set()
  userInputs.value = pyramid.value.map(row => row.map(() => ''))
}

function newPuzzle() {
  initPuzzle()
}

function isGiven(rowIndex, colIndex) {
  return rowIndex === pyramid.value.length - 1 || prefilled.value.has(`${rowIndex},${colIndex}`)
}

function brickClass(rowIndex, colIndex, cell) {
  const isTop = rowIndex === 0
  if (isGiven(rowIndex, colIndex)) return isTop ? 'brick--given brick--crown' : 'brick--given'
  const correct = userInputs.value[rowIndex]?.[colIndex] === cell
  if (isTop) return correct ? 'brick--crown brick--crown-solved' : 'brick--crown'
  return correct ? 'brick--correct' : ''
}

function onInput(rowIndex, colIndex, event) {
  const raw = event.target.value.replace(/\D/g, '')
  const val = raw === '' ? '' : parseInt(raw, 10)
  userInputs.value[rowIndex][colIndex] = val

  if (val === pyramid.value[rowIndex][colIndex]) {
    nextTick(() => focusNext(rowIndex, colIndex))
  }
}

function allowOnlyDigits(event) {
  if (!/\d/.test(event.key)) event.preventDefault()
}

// Advance cursor: left-to-right within a row, then up to next row
function focusNext(rowIndex, colIndex) {
  const n = pyramid.value.length
  let r = rowIndex
  let c = colIndex

  while (true) {
    c++
    if (c >= pyramid.value[r].length) {
      r--
      c = 0
      if (r < 0) return // top reached, done
    }
    if (!isGiven(r, c) && userInputs.value[r][c] !== pyramid.value[r][c]) {
      inputRefs.value[r]?.[c]?.focus()
      return
    }
  }
}

// Max possible cell value for maxlength calculation
const maxDigits = computed(() => {
  const maxTop = props.maxVal * Math.pow(2, props.rows - 1)
  return String(Math.ceil(maxTop)).length
})

const isSolved = computed(() => {
  return pyramid.value.every((row, r) => {
    if (r === pyramid.value.length - 1) return true
    return row.every((cell, c) => {
      return isGiven(r, c) || userInputs.value[r][c] === cell
    })
  })
})

initPuzzle()

// Styles for this component live in src/style.css (global, by design —
// shared brick/button classes are reused across quiz types).
</script>
