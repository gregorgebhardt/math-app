<template>
  <div class="clock-quiz">
    <div class="quiz-header">
      <IconClock :size="36" class="quiz-header-icon" />
      <h2 class="quiz-header-title">Uhrzeiten</h2>
    </div>

    <div class="sub-problems-wrapper" :class="{ 'sub-problems-wrapper--solved': isSolved }">
      <svg class="sub-crown" viewBox="0 0 80 42" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="26" width="80" height="16" rx="4"/>
        <polygon points="0,42 0,10 10,26 20,0 30,26 40,0 50,26 60,0 70,26 80,10 80,42"/>
        <circle cx="20" cy="0" r="4" fill="white" opacity="0.9"/>
        <circle cx="40" cy="0" r="4" fill="white" opacity="0.9"/>
        <circle cx="60" cy="0" r="4" fill="white" opacity="0.9"/>
      </svg>

      <div class="clock-problems">
        <div
          v-for="(problem, i) in problems"
          :key="i"
          class="clock-problem"
          :class="{ 'clock-problem--solved': isCorrect(i) }"
        >
          <!-- Analog clock face -->
          <svg viewBox="0 0 100 100" class="clock-face">
            <circle cx="50" cy="50" r="47" fill="white" stroke="#e8dfc8" stroke-width="3"/>
            <template v-if="props.showNumbers">
              <text
                v-for="n in 12" :key="n"
                :x="50 + 38 * Math.sin(n * Math.PI / 6)"
                :y="54 - 38 * Math.cos(n * Math.PI / 6)"
                text-anchor="middle" font-size="11" font-weight="700"
                font-family="Nunito, sans-serif" fill="#2d2416"
              >{{ n }}</text>
            </template>
            <template v-else>
              <line
                v-for="n in 12" :key="n"
                :x1="50 + 44 * Math.sin(n * Math.PI / 6)"
                :y1="50 - 44 * Math.cos(n * Math.PI / 6)"
                :x2="50 + (n % 3 === 0 ? 33 : 38) * Math.sin(n * Math.PI / 6)"
                :y2="50 - (n % 3 === 0 ? 33 : 38) * Math.cos(n * Math.PI / 6)"
                stroke="#2d2416" :stroke-width="n % 3 === 0 ? 3 : 1.5" stroke-linecap="round"
              />
            </template>
            <line x1="50" y1="50" x2="50" y2="24"
                  stroke="#2d2416" stroke-width="5.5" stroke-linecap="round"
                  :transform="`rotate(${(problem.hour % 12) * 30 + problem.minute * 0.5}, 50, 50)`"/>
            <line x1="50" y1="50" x2="50" y2="13"
                  stroke="#555" stroke-width="3" stroke-linecap="round"
                  :transform="`rotate(${problem.minute * 6}, 50, 50)`"/>
            <circle cx="50" cy="50" r="4" fill="#2d2416"/>
          </svg>

          <!-- Context label (Mittel+): tells student Vormittag or Nachmittag so they write 24h -->
          <div
            v-if="props.amPmHint"
            class="clock-ampm-badge"
            :class="problem.isAfternoon ? 'clock-ampm-badge--nm' : 'clock-ampm-badge--vm'"
          >{{ problem.isAfternoon ? 'Nachmittag' : 'Vormittag' }}</div>

          <!-- Simple row: Leicht (hour + Uhr) or Mittel/Schwer/Profi (hour : minute) -->
          <div v-if="!props.twentyFourHour" class="clock-input-row">
            <span v-if="isCorrect(i)" class="clock-answer">{{ props.amPmHint ? problem.hour24 : problem.hour }}</span>
            <input
              v-else
              :ref="el => { if (el) hourRefs[i] = el }"
              type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
              :value="userHours[i]"
              @input="onHourInput(i, $event)"
              @keypress="allowOnlyDigits"
            />
            <template v-if="props.showMinute">
              <span class="clock-sep">:</span>
              <span v-if="isCorrect(i)" class="clock-answer">{{ String(problem.minute).padStart(2, '0') }}</span>
              <input
                v-else
                :ref="el => { if (el) minuteRefs[i] = el }"
                type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
                :value="userMinutes[i]"
                placeholder="00"
                @input="onMinuteInput(i, $event)"
                @keypress="allowOnlyDigits"
              />
            </template>
            <span v-else class="clock-uhr">Uhr</span>
          </div>

          <!-- 24h grid (Einfach): Vormittag/Nachmittag, Uhr or minute spanning both rows -->
          <div v-else class="clock-24h-grid">
            <span class="cgrid-vm-label clock-24h-label clock-24h-label--vm">Vormittag:</span>

            <div class="cgrid-h12">
              <span v-if="isCorrect(i)" class="clock-answer">{{ problem.hour }}</span>
              <input
                v-else
                :ref="el => { if (el) hourRefs[i] = el }"
                type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
                :value="userHours[i]"
                @input="onHourInput(i, $event)"
                @keypress="allowOnlyDigits"
              />
            </div>

            <!-- spans both rows, vertically centred -->
            <div class="cgrid-minute">
              <template v-if="props.showMinute">
                <span class="clock-sep">:</span>
                <span v-if="isCorrect(i)" class="clock-answer">{{ String(problem.minute).padStart(2, '0') }}</span>
                <input
                  v-else
                  :ref="el => { if (el) minuteRefs[i] = el }"
                  type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
                  :value="userMinutes[i]"
                  placeholder="00"
                  @input="onMinuteInput(i, $event)"
                  @keypress="allowOnlyDigits"
                />
              </template>
              <span v-else class="clock-uhr">Uhr</span>
            </div>

            <span class="cgrid-nm-label clock-24h-label clock-24h-label--nm">Nachmittag:</span>

            <div class="cgrid-h24">
              <span v-if="isCorrect(i)" class="clock-answer">{{ problem.hour24 }}</span>
              <input
                v-else
                :ref="el => { if (el) hourRefs24h[i] = el }"
                type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
                :value="user24hHours[i]"
                @input="on24hHourInput(i, $event)"
                @keypress="allowOnlyDigits"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isSolved" class="success" style="text-align:center">
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
import IconClock from '../icons/IconClock.vue'
import { minuteMatches, clockIsCorrect } from '../../utils/clock.js'

const props = defineProps({
  count:           { type: Number,  default: 5 },
  step:            { type: Number,  default: 30 },
  twentyFourHour:  { type: Boolean, default: false },
  showNumbers:     { type: Boolean, default: true },
  showMinute:      { type: Boolean, default: true },
  amPmHint:        { type: Boolean, default: true },
})

defineEmits(['back'])

const problems     = ref([])
const userHours    = ref([])
const userMinutes  = ref([])
const user24hHours = ref([])

const hourRefs    = ref([])
const minuteRefs  = ref([])
const hourRefs24h = ref([])

function generateProblem() {
  const stepsPerHour = 60 / props.step
  const minute = props.showMinute
    ? Math.floor(Math.random() * stepsPerHour) * props.step % 60
    : 0

  if (!props.twentyFourHour) {
    if (props.amPmHint) {
      const isAfternoon = Math.random() < 0.5
      const hour = Math.floor(Math.random() * 11) + 1   // 1-11: avoids midnight and noon
      const hour24 = isAfternoon ? hour + 12 : hour
      return { hour, minute, isAfternoon, hour24 }
    }
    return { hour: Math.floor(Math.random() * 12) + 1, minute }
  }

  // 24h mode (Einfach): always PM, 1-11 so hour ≠ hour24 (skip noon where both = 12)
  const hour = Math.floor(Math.random() * 11) + 1
  const hour24 = hour + 12   // 13-23
  return { hour, minute, hour24 }
}

function initRound() {
  hourRefs.value    = []
  minuteRefs.value  = []
  hourRefs24h.value = []
  const used = new Set()
  problems.value = Array.from({ length: props.count }, () => {
    let p, key, attempts = 0
    do { p = generateProblem(); key = `${p.hour}:${p.minute}`; attempts++ }
    while (used.has(key) && attempts < 100)
    used.add(key)
    return p
  })
  userHours.value    = problems.value.map(() => '')
  userMinutes.value  = problems.value.map(() => '')
  user24hHours.value = problems.value.map(() => '')
  nextTick(() => hourRefs.value[0]?.focus())
}

function newRound() { initRound() }

function isCorrect(i) {
  return clockIsCorrect({
    userHour:      userHours.value[i],
    userMinute:    userMinutes.value[i],
    userHour24:    user24hHours.value[i],
    problem:       problems.value[i],
    showMinute:    props.showMinute,
    twentyFourHour: props.twentyFourHour,
    amPmHint:      props.amPmHint,
  })
}

function onHourInput(i, event) {
  const raw = event.target.value.replace(/\D/g, '')
  userHours.value[i] = raw
  const p = problems.value[i]
  if (raw !== '' && Number(raw) === (props.amPmHint ? p.hour24 : p.hour)) {
    if (props.showMinute) {
      nextTick(() => minuteRefs.value[i]?.focus())
    } else if (props.twentyFourHour) {
      nextTick(() => hourRefs24h.value[i]?.focus())
    } else {
      nextTick(() => focusNext(i))
    }
  }
}

function onMinuteInput(i, event) {
  const raw = event.target.value.replace(/\D/g, '')
  userMinutes.value[i] = raw
  if (!minuteMatches(raw, problems.value[i].minute)) return
  if (props.twentyFourHour) {
    nextTick(() => hourRefs24h.value[i]?.focus())
  } else if (isCorrect(i)) {
    nextTick(() => focusNext(i))
  }
}

function on24hHourInput(i, event) {
  const raw = event.target.value.replace(/\D/g, '')
  user24hHours.value[i] = raw
  if (isCorrect(i)) nextTick(() => focusNext(i))
}

function allowOnlyDigits(event) {
  if (!/\d/.test(event.key)) event.preventDefault()
}

function focusNext(i) {
  for (let j = i + 1; j < problems.value.length; j++) {
    if (!isCorrect(j)) {
      hourRefs.value[j]?.focus()
      return
    }
  }
}

const isSolved = computed(() =>
  problems.value.length > 0 && problems.value.every((_, i) => isCorrect(i))
)

initRound()
</script>
