
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
  return starts.map(start => {
    const cells = [
      start,
      puzzle.find(c => c.x === start.x+1 && c.y === start.y)
    ]
    return createCandidate(cells)
  })
}

const find = () => {}

const solve = input => {}

module.exports = {
  createPuzzle,
  candidatesFor,
  find,
  solve,
}