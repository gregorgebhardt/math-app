import PyramidQuiz from './components/quizzes/PyramidQuiz.vue'
import SubtractionQuiz from './components/quizzes/SubtractionQuiz.vue'
import IconPyramid from './components/icons/IconPyramid.vue'
import IconSubtraction from './components/icons/IconSubtraction.vue'

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
