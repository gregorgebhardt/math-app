export function generatePyramid(rows, maxVal = 9) {
  const pyramid = Array.from({ length: rows }, (_, r) => new Array(r + 1).fill(0))

  const bottom = pyramid[rows - 1]
  for (let c = 0; c < bottom.length; c++) {
    bottom[c] = Math.floor(Math.random() * maxVal) + 1
  }

  for (let r = rows - 2; r >= 0; r--) {
    for (let c = 0; c < pyramid[r].length; c++) {
      pyramid[r][c] = pyramid[r + 1][c] + pyramid[r + 1][c + 1]
    }
  }

  return pyramid
}
