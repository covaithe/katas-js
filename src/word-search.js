class Cell {
  constructor(value, x, y) {
    this.value = value
    this.x = x
    this.y = y
  }

  toString() {
    return `(${this.x},${this.y})`
  }

}
module.exports.Cell = Cell

class Path {
  constructor(cells) {
    this.cells = cells.filter(Boolean)
  }

  toWord() {
    return this.cells.map(c => c.value).join('')
  }

  lengthMatches(word) {
    return word.length === this.cells.length
  }

  print() {
    return this.cells.join(',')
  }
}

const directions = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
]

module.exports.Puzzle = class Puzzle {

  static findAll(input) {
    const [ header, ...lines ] = input.split('\n')
    const words = header.split(',')
    const body = lines.join('\n')
    const puzzle = new Puzzle(body)

    return words.map(word => {
      return `${word}: ${puzzle.find(word)}`
    }).join('\n')
  }

  constructor(input) {
    this.cells = input.split('\n')
      .flatMap((line, y) => line.split(',')
        .map((char, x) => new Cell(char, x, y)))
  }

  candidatesFor(word) {
    const starts  = this.cells.filter(c => c.value === word[0] )
    const chars = Array.from(word)
    return starts.flatMap(start =>
      directions.map(d => this.directionCandidate(start, d, chars))
    ).filter(path => path.lengthMatches(word))
  }

  directionCandidate(start, direction, chars) {
    return new Path(chars.map((c, i) => {
      const x = start.x + i * direction.x
      const y = start.y + i * direction.y
      return this.cellAt(x, y)
    }))
  }

  cellAt(x,y) {
    return this.cells.find(
      c => c.x === x
        && c.y === y)
  }

  find(word) {
    const path = this.candidatesFor(word).find(path => path.toWord() === word)
    return path.print()
  }

}
