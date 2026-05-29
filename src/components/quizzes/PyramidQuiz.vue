<template>
  <div class="pyramid-quiz">
    <div class="pyramid">
      <div
        v-for="(row, rowIndex) in pyramid"
        :key="rowIndex"
        class="pyramid-row"
      >
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="brick"
          :class="{
            'brick--given': rowIndex === pyramid.length - 1,
            'brick--correct': rowIndex !== pyramid.length - 1 && userInputs[rowIndex][colIndex] === cell
          }"
        >
          <span v-if="rowIndex === pyramid.length - 1">{{ cell }}</span>
          <input
            v-else
            type="text"
            inputmode="numeric"
            maxlength="4"
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
import { ref, computed } from 'vue'
import { generatePyramid } from '../../utils/pyramid.js'

const props = defineProps({
  rows: {
    type: Number,
    default: 3
  }
})

defineEmits(['back'])

const pyramid = ref([])
const userInputs = ref([])

function initPuzzle() {
  pyramid.value = generatePyramid(props.rows)
  userInputs.value = pyramid.value.map((row, r) =>
    r === pyramid.value.length - 1 ? row.map(() => '') : row.map(() => '')
  )
}

function newPuzzle() {
  initPuzzle()
}

function onInput(rowIndex, colIndex, event) {
  const raw = event.target.value.replace(/\D/g, '')
  userInputs.value[rowIndex][colIndex] = raw === '' ? '' : parseInt(raw, 10)
}

function allowOnlyDigits(event) {
  if (!/\d/.test(event.key)) event.preventDefault()
}

const isSolved = computed(() => {
  return pyramid.value.every((row, r) => {
    if (r === pyramid.value.length - 1) return true
    return row.every((cell, c) => userInputs.value[r][c] === cell)
  })
})

initPuzzle()
</script>
