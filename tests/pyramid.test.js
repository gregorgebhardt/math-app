import { describe, it, expect } from 'vitest'
import { generatePyramid } from '../src/utils/pyramid.js'

describe('generatePyramid', () => {
  it('returns a 2D array with the correct number of rows', () => {
    const pyramid = generatePyramid(3)
    expect(pyramid.length).toBe(3)
  })

  it('bottom row has n cells', () => {
    const pyramid = generatePyramid(4)
    expect(pyramid[3].length).toBe(4)
  })

  it('each row has one fewer cell than the row below', () => {
    const pyramid = generatePyramid(5)
    for (let r = 0; r < 4; r++) {
      expect(pyramid[r].length).toBe(pyramid[r + 1].length - 1)
    }
  })

  it('top cell equals sum of two cells below it', () => {
    const pyramid = generatePyramid(2)
    expect(pyramid[0][0]).toBe(pyramid[1][0] + pyramid[1][1])
  })

  it('every cell above bottom row equals sum of two below', () => {
    const pyramid = generatePyramid(6)
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < pyramid[r].length; c++) {
        expect(pyramid[r][c]).toBe(pyramid[r + 1][c] + pyramid[r + 1][c + 1])
      }
    }
  })

  it('bottom row values are between 1 and 9', () => {
    for (let i = 0; i < 20; i++) {
      const pyramid = generatePyramid(4)
      const bottom = pyramid[pyramid.length - 1]
      bottom.forEach(v => {
        expect(v).toBeGreaterThanOrEqual(1)
        expect(v).toBeLessThanOrEqual(9)
      })
    }
  })
})
