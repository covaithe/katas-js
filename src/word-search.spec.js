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

  const toWord = (path) => path.toWord()

  describe('Puzzle', () => {
    it('should find its cells', () => {
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

    it('should find candidates in all directions', () => {
      const puzzle = new Puzzle(dedent(`
        1,2,3
        4,c,5
        6,7,8
      `))
      expect(puzzle.candidatesFor('cx').map(toWord)).toEqual([
        'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'
      ])
    })

    it('should not include candidates that fall off the edge', () => {
      const puzzle = new Puzzle('a,b')
      expect(puzzle.candidatesFor('ab').map(toWord)).toEqual(['ab'])
    })

    it('should find candidates from all matching starts', () => {
      const puzzle = new Puzzle(dedent(`
        a,1
        x,x
        a,2
      `))
      expect(puzzle.candidatesFor('ax').map(toWord)).toContain('a1', 'a2')
    })

    it('should find candidates of the right length', () => {
      const puzzle = new Puzzle('a,b,c,d')
      expect(puzzle.candidatesFor('abc').map(toWord)).toEqual(['abc'])
    })

    it('find should return the the location of the first matching candidate', () => {
      const puzzle = new Puzzle(dedent(`
        a,1
        b,x
        a,2
      `))
      expect(puzzle.find('ax')).toEqual('(0,0),(1,1)')
    })
  })

})
