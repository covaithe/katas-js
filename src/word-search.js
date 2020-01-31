
const createPuzzle = input =>
  input.split('\n')
    .flatMap((line, y) => line.split(",")
      .map((char, x) => ({ value: char, x, y }) ))

const toValue = cell => cell.value
const toCoords = cell => `(${cell.x},${cell.y})`

const createCandidate = cells => ({
  word: cells.map(toValue).join(''),
  path: cells.map(toCoords).join(',')
})

const directions = [
  { x: -1, y: -1 },
  { x:  0, y: -1 },
  { x:  1, y: -1 },
  { x: -1, y:  0 },
  { x:  1, y:  0 },
]


const candidatesFor = (puzzle, word) => {
  const starts = puzzle.filter(cell => cell.value === word[0])
  const cellAt = (x,y) => puzzle.find(c => c.x === x && c.y === y)
  const chars = Array.from(word)

  const look = (start, direction) => {
    const cells = chars.map((char,i) => cellAt(
      start.x + i*direction.x,
      start.y + i*direction.y
    ))
    return createCandidate(cells)
  }


  return starts.flatMap(start => directions.map(direction => look(start, direction)))
  // return starts.map(look)
}

const find = () => {}

const solve = input => {}

module.exports = {
  createPuzzle,
  candidatesFor,
  find,
  solve,
}