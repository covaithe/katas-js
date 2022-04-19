import { Game } from "./bowling"

it("scores 0 when there are no rolls", () => {
  const game = new Game()
  expect(game.score).toEqual(0)
})

it("scores a single roll", () => {
  const game = new Game()
  game.roll(8)
  expect(game.score).toEqual(8)
})

it("scores many rolls", () => {
  const game = new Game()
  ;[1, 2, 3, 4, 3, 4].forEach((n) => game.roll(n))
  expect(game.score).toEqual(1 + 2 + 3 + 4 + 3 + 4)
})

it("counts the next roll twice after a spare", () => {
  const game = new Game()
  game.roll(3)
  game.roll(7)
  game.roll(8)
  expect(game.score).toEqual(18 + 8)
})

it("double counts the next roll after a spare only one time", () => {
  const game = new Game()
  game.roll(3)
  game.roll(7)
  game.roll(8)
  game.roll(1)
  expect(game.score).toEqual(18 + 8 + 1)
})

it("handles multiple spares", () => {
  const game = new Game()
  game.roll(3)
  game.roll(7)
  game.roll(8)
  game.roll(2)
  game.roll(5)
  game.roll(4)
  expect(game.score).toEqual(10 + 8 + 10 + 5 + 9)
})

it("double counts the next two rolls after a strike", () => {
  const game = new Game()
  game.roll(10)
  game.roll(1)
  game.roll(2)

  expect(game.score).toEqual(10 + 1 + 2 + 1 + 2)
})

it("handles two strikes in a row", () => {
  const game = new Game()
  game.roll(10)
  game.roll(10)
  game.roll(1)
  game.roll(2)

  expect(game.score).toEqual(21 + 13 + 3)
})

it("scores 300 for a perfect game", () => {
  const game = new Game()
  for (let i = 0; i < 12; i++) {
    game.roll(10)
  }
  expect(game.score).toEqual(300)
})

it("handles a gutterball spare", () => {
  const game = new Game()
  game.roll(0)
  game.roll(10)
  game.roll(2)
  game.roll(3)

  expect(game.score).toEqual(17)
})
