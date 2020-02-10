
const createPuzzle = input =>
  input.split("\n")
    .flatMap((line, y) => line.split(",")
      .map((value, x) => ({ value, x, y}) ))

const candidatesFor = () => {}

const find = () => {}

const solve = input => {}

module.exports = {
  createPuzzle,
  candidatesFor,
  find,
  solve,
}