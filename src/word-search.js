
const createPuzzle = input =>
  input.split("\n")
    .flatMap((line, y) => line.split(",")
      .map((value, x) => ({ value, x, y}) ))

const createCandidate = cells => {
  return {
    word: cells.map(c => c.value).join(''),
    path: cells.map(c => `(${c.x},${c.y})`).join(',')
  }
}

const candidatesFor = (puzzle, word) => {
  const starts = puzzle.filter(cell => cell.value === word[0])
  const chars = Array.from(word)

  const look = start => {
    const cells = chars.map((c,i) => {
      const x = start.x + i
      const y = start.y
      return puzzle.find(c => c.x === x && c.y === y)
    })
    return createCandidate(cells)
  }

  return starts.map(look)
}

const find = () => {}

const solve = input => {}

module.exports = {
  createPuzzle,
  candidatesFor,
  find,
  solve,
}