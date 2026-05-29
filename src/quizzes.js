import PyramidQuiz from './components/quizzes/PyramidQuiz.vue'
import SubtractionQuiz from './components/quizzes/SubtractionQuiz.vue'
import IconPyramid from './components/icons/IconPyramid.vue'
import IconSubtraction from './components/icons/IconSubtraction.vue'

export const quizzes = {
  pyramid: {
    label: 'Additionspyramide',
    icon: IconPyramid,
    description: 'Fülle die Pyramide aus — jeder Stein ist die Summe der zwei Steine darunter.',
    component: PyramidQuiz,
    defaultOptions: { rows: 3 }
  },
  subtraction: {
    label: 'Subtraktionsaufgaben',
    icon: IconSubtraction,
    description: 'Finde die fehlende Zahl in jeder Subtraktionsaufgabe.',
    component: SubtractionQuiz,
    defaultOptions: { count: 5, maxVal: 20, resultOnly: true }
  }
}
