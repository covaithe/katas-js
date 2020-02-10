
const createPuzzle = input =>
  input.split("\n")
    .flatMap((line, y) => line.split(",")
      .map((value, x) => ({ value, x, y}) ))

const createCandidate = cells => {
  cells = cells.filter(Boolean)
  return {
    word: cells.map(c => c.value).join(''),
    path: cells.map(c => `(${c.x},${c.y})`).join(',')
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

  const look = direction => start => {
    const cells = chars.map((c,i) => {
      const x = start.x + i*direction.x
      const y = start.y + i*direction.y
      return puzzle.find(c => c.x === x && c.y === y)
    })
    return createCandidate(cells)
  }


  return directions.flatMap(direction => starts.map(look(direction)))
}

const find = (puzzle, word) =>
  candidatesFor(puzzle, word).find(c => c.word === word)

const parse = input => {
  const [ head, ...body ] = input.split('\n')
  const words = head.split(',')
  const puzzle = createPuzzle(body.join('\n'))
  return [ words, puzzle ]
}

const _ = require('lodash')

const solve = _.flow(parse, ([words, puzzle]) => words.map(word => `${word}: ${find(puzzle, word).path}`).join('\n'))

module.exports = {
  createPuzzle,
  candidatesFor,
  find,
  parse,
  solve,
}