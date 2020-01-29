require('lodash.product')
const _ = require('lodash')

const createPuzzle = input =>
  input.split('\n')
    .flatMap((line, y) => line.split(',')
      .map((value, x) => createCell(value, x, y)))

const createCell = (value, x, y) => ({value, x, y})

const coordsOf = cell => `(${cell.x},${cell.y})`

const createCandidate = cells => {
  cells = cells.filter(Boolean)
  return {
    word: cells.map(c => c.value).join(''),
    path: cells.map(coordsOf).join(',')
  }
}

const directions = [
  { x: -1, y: -1 },
  { x:  0, y: -1 },
  { x:  1, y: -1 },
  { x: -1, y:  0 },
  { x:  1, y:  0 },
  { x: -1, y:  1 },
  { x:  0, y:  1 },
  { x:  1, y:  1 },
]

const candidatesFor = (puzzle, word) => {
  const starts = puzzle.filter(cell => cell.value === word[0])
  const chars = Array.from(word)
  const look = ([start, direction]) => {
    const cells = chars.map((char,i) => {
      const x = start.x + i * direction.x
      const y = start.y + i * direction.y
      return puzzle.find(c => c.x === x && c.y === y)
    })
    return createCandidate(cells)
  }

  return _.product(starts, directions).map(look)
}

const find = (puzzle, word) =>
  candidatesFor(puzzle, word).find(candidate => candidate.word === word)

const parse = input => {
  const [ first, ...rest ] = input.split('\n')
  const words = first.split(',')
  const body = rest.join('\n')
  return [ words, createPuzzle(body) ]
}

const solve = input => {
  const [ words, puzzle ] = parse(input)

  return words.map(word => {
    return `${word}: ${find(puzzle, word).path}`
  }).join('\n')
}

module.exports = {
  createPuzzle,
  candidatesFor,
  find,
  solve,
}