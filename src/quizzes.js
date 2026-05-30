import PyramidQuiz from './components/quizzes/PyramidQuiz.vue'
import SubtractionQuiz from './components/quizzes/SubtractionQuiz.vue'
import AdditionQuiz from './components/quizzes/AdditionQuiz.vue'
import ClockQuiz from './components/quizzes/ClockQuiz.vue'
import IconPyramid from './components/icons/IconPyramid.vue'
import IconSubtraction from './components/icons/IconSubtraction.vue'
import IconAddition from './components/icons/IconAddition.vue'
import IconClock from './components/icons/IconClock.vue'

export const hardnessLevels = [
  { label: 'Leicht',   emoji: '🌱' },
  { label: 'Einfach',  emoji: '⭐' },
  { label: 'Mittel',   emoji: '🔥' },
  { label: 'Schwer',   emoji: '💪' },
  { label: 'Profi',    emoji: '🏆' },
]

export const quizzes = {
  pyramid: {
    label: 'Additionspyramide',
    icon: IconPyramid,
    description: 'Fülle die Pyramide aus — jeder Stein ist die Summe der zwei Steine darunter.',
    component: PyramidQuiz,
    defaultOptions: { rows: 3 },
    hardnessPresets: [
      { rows: 2, maxVal: 5,  prefill: true  },
      { rows: 3, maxVal: 10, prefill: true  },
      { rows: 3, maxVal: 20, prefill: true  },
      { rows: 4, maxVal: 20, prefill: false },
      { rows: 5, maxVal: 50, prefill: false },
    ]
  },
  clock: {
    label: 'Uhrzeiten',
    icon: IconClock,
    description: 'Lies die Uhrzeit ab und tippe sie ein.',
    component: ClockQuiz,
    defaultOptions: { count: 5, step: 30, showMinute: true, twentyFourHour: false, amPmHint: true, showNumbers: true },
    hardnessPresets: [
      { count: 3, step: 60, showMinute: false, twentyFourHour: false, amPmHint: false, showNumbers: true  },
      { count: 4, step: 60, showMinute: false, twentyFourHour: true,  amPmHint: false, showNumbers: true  },
      { count: 5, step: 30, showMinute: true,  twentyFourHour: false, amPmHint: true,  showNumbers: true  },
      { count: 5, step: 15, showMinute: true,  twentyFourHour: false, amPmHint: true,  showNumbers: false },
      { count: 6, step: 5,  showMinute: true,  twentyFourHour: false, amPmHint: true,  showNumbers: false },
    ]
  },
  addition: {
    label: 'Additionsaufgaben',
    icon: IconAddition,
    description: 'Finde die fehlende Zahl in jeder Additionsaufgabe.',
    component: AdditionQuiz,
    defaultOptions: { count: 5, maxVal: 20, resultOnly: true },
    hardnessPresets: [
      { count: 3, maxVal: 10,  resultOnly: true  },
      { count: 5, maxVal: 10,  resultOnly: true  },
      { count: 5, maxVal: 20,  resultOnly: true  },
      { count: 5, maxVal: 20,  resultOnly: false },
      { count: 8, maxVal: 100, resultOnly: false },
    ]
  },
  subtraction: {
    label: 'Subtraktionsaufgaben',
    icon: IconSubtraction,
    description: 'Finde die fehlende Zahl in jeder Subtraktionsaufgabe.',
    component: SubtractionQuiz,
    defaultOptions: { count: 5, maxVal: 20, resultOnly: true },
    hardnessPresets: [
      { count: 3, maxVal: 10,  resultOnly: true  },
      { count: 5, maxVal: 10,  resultOnly: true  },
      { count: 5, maxVal: 20,  resultOnly: true  },
      { count: 5, maxVal: 20,  resultOnly: false },
      { count: 8, maxVal: 100, resultOnly: false },
    ]
  }
}
