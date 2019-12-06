const dedent = require('dedent-js')
const { Puzzle, Cell } = require('./word-search')

describe('word search', () => {

  it('should find all the words in the sample puzzle', () => {
    const input = dedent(`
      BONES,KHAN,KIRK,SCOTTY,SPOCK,SULU,UHURA
      U,M,K,H,U,L,K,I,N,V,J,O,C,W,E
      L,L,S,H,K,Z,Z,W,Z,C,G,J,U,Y,G
      H,S,U,P,J,P,R,J,D,H,S,B,X,T,G
      B,R,J,S,O,E,Q,E,T,I,K,K,G,L,E
      A,Y,O,A,G,C,I,R,D,Q,H,R,T,C,D
      S,C,O,T,T,Y,K,Z,R,E,P,P,X,P,F
      B,L,Q,S,L,N,E,E,E,V,U,L,F,M,Z
      O,K,R,I,K,A,M,M,R,M,F,B,A,P,P
      N,U,I,I,Y,H,Q,M,E,M,Q,R,Y,F,S
      E,Y,Z,Y,G,K,Q,J,P,C,Q,W,Y,A,K
      S,J,F,Z,M,Q,I,B,D,B,E,M,K,W,D
      T,G,L,B,H,C,B,E,C,H,T,O,Y,I,K
      O,J,Y,E,U,L,N,C,C,L,Y,B,Z,U,H
      W,Z,M,I,S,U,K,U,R,B,I,D,U,X,S
      K,Y,L,B,Q,Q,P,M,D,F,C,K,E,A,B`)

    const expectedOutput = dedent(`
      BONES: (0,6),(0,7),(0,8),(0,9),(0,10)
      KHAN: (5,9),(5,8),(5,7),(5,6)
      KIRK: (4,7),(3,7),(2,7),(1,7)
      SCOTTY: (0,5),(1,5),(2,5),(3,5),(4,5),(5,5)
      SPOCK: (2,1),(3,2),(4,3),(5,4),(6,5)
      SULU: (3,3),(2,2),(1,1),(0,0)
      UHURA: (4,0),(3,1),(2,2),(1,3),(0,4)`)

    expect(Puzzle.findAll(input)).toEqual(expectedOutput)
  })

  const word = path => path.toWord()

  describe('Puzzle', () => {
    it('should parse cells', () => {
      const puzzle = new Puzzle(dedent(`
        a,b
        c,d
      `))
      expect(puzzle.cells).toEqual([
        new Cell('a', 0, 0),
        new Cell('b', 1, 0),
        new Cell('c', 0, 1),
        new Cell('d', 1, 1),
      ])
    })

    const puzzle = new Puzzle(dedent(`
      1,2,3
      4,c,5
      6,7,8
    `))

    it('should find candidates in all directions', () => {
      expect(puzzle.candidatesFor('cx').map(word)).toEqual([
        'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'
      ])
    })

    it('should find the first matching candidate', () => {
      expect(puzzle.find('47')).toEqual(new Path([
        new Cell('4', 0, 1),
        new Cell('7', 1, 2),
      ]))
    })
  })

  describe('Cell', () => {
    it('should know how to toString itself', () => {
      expect(new Cell('a', 1, 2).toString()).toEqual('(1,2)')
    })
  })

  const { Path } = require('./word-search')
  describe('Path', () => {
    it('should print all its cells as strings', () => {
      const path = new Path([new Cell('a', 1,2), new Cell('b', 3, 4)])
      expect(path.print()).toEqual('(1,2),(3,4)')
    })

    it('should be able to convert itself back to a word', () => {
      const path = new Path([new Cell('a', 1,2), new Cell('b', 3, 4)])
      expect(path.toWord()).toEqual('ab')
    })
  })

  const { Finder } = require('./word-search')
  describe('Finder', () => {
    const puzzle = new Puzzle(dedent(`
      a,b,c,d
      1,2,3,4
    `))

    it('should produce candidates in the given direction: east', () => {
      const finder = new Finder(puzzle, {x: 1, y: 0})
      expect(finder.candidatesFor('ab').map(word)).toEqual(['ab'])
    })

    it('should produce candidates in the given direction: south', () => {
      const finder = new Finder(puzzle, {x: 0, y: 1})
      expect(finder.candidatesFor('cd').map(word)).toEqual(['c3'])
    })

    it('should handle the edge of the board', () => {
      const finder = new Finder(puzzle, {x: 0, y: 1})
      expect(finder.candidatesFor('4d').map(word)).toEqual(['4'])
    })

    it('should handle multiple starts', () => {
      const puzzle = new Puzzle(dedent(`
        a,a,a
        1,2,3
      `))
      const finder = new Finder(puzzle, {x: 0, y: 1})
      expect(finder.candidatesFor('ab').map(word)).toEqual(['a1', 'a2', 'a3'])
    })

    it('should make candidates the right length', () => {
      const puzzle = new Puzzle('a,b,c,d')
      const finder = new Finder(puzzle, {x: 1, y: 0})
      expect(finder.candidatesFor('abc').map(word)).toEqual(['abc'])
    })
  })
})

