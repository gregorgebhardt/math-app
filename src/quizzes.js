import PyramidQuiz from './components/quizzes/PyramidQuiz.vue'

export const quizzes = {
  pyramid: {
    label: 'Additionspyramide',
    description: 'Fülle die Pyramide aus — jeder Stein ist die Summe der zwei Steine darunter.',
    component: PyramidQuiz,
    defaultOptions: { rows: 3 }
  }
}
