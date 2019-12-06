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

  print() {
    return this.cells.join(',')
  }

  toWord() {
    return this.cells.map(c => c.value).join('')
  }
}
module.exports.Path = Path

class Finder {
  constructor(puzzle, { x, y }) {
    this.cells = puzzle.cells
    this.x = x
    this.y = y
  }

  candidatesFor(word) {
    const chars = Array.from(word)
    const starts = this.cells.filter(c => c.value === word[0])
    return starts.map(start =>
      new Path(chars.map((c,i) =>
        this.cellAt(start.x + i*this.x, start.y + i*this.y)
      )))
  }

  cellAt(x,y) {
    return this.cells.find(c => c.x === x && c.y === y)
  }
}
module.exports.Finder = Finder

module.exports.Puzzle = class Puzzle {

  static findAll(input) {
    const [ head, ...body] = input.split('\n')
    const words = head.split(',')
    const puzzle = new Puzzle(body.join('\n'))

    return words.map(word => {
      const path = puzzle.find(word)
      return `${word}: ${path.print()}`
    }).join('\n')
  }

  constructor(input) {
    this.cells = input.split('\n')
      .flatMap((line, y) => line.split(',')
        .map((char, x) => new Cell(char, x, y)))
  }

  candidatesFor(word) {
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
    return directions.flatMap(d => new Finder(this, d).candidatesFor(word))
  }

  find(word) {
    return this.candidatesFor(word).find(path => path.toWord() === word)
  }

}