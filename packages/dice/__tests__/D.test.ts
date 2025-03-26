import { describe, expect, test } from 'bun:test'
import { D } from '../src/D'

describe(D, () => {
  describe('Creating a Numerical Die', () => {
    const sides = 6
    const die = new D(sides)

    test('returns a D instance', () => {
      expect(die).toBeInstanceOf(D)
      expect(die.type).toEqual('numerical')
    })

    test('D.sides returns the number given as sides', () => {
      expect(die.sides).toEqual(sides)
    })

    test('D.faces returns the number given as sides', () => {
      expect(die.faces).toEqual([1, 2, 3, 4, 5, 6])
    })

    describe(D.prototype.roll, () => {
      describe('with no argument', () => {
        test('.returns a number included in the constructor', () => {
          expect([1, 2, 3, 4, 5, 6]).toContain(die.roll())
        })
      })

      describe('with a numerical argument', () => {
        test('.returns a number that is a conceivable result of multiple die rolls', () => {
          expect([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).toContain(die.roll(2))
        })
      })
    })

    describe(D.prototype.rollSpread, () => {
      describe('with no argument', () => {
        test('.returns a number included in the constructor', () => {
          expect([1, 2, 3, 4, 5, 6]).toContain(die.rollSpread()[0])
        })
      })

      describe('with a numerical argument', () => {
        test('.returns a number that is a conceivable result of multiple die rolls', () => {
          expect([1, 2, 3, 4, 5, 6]).toContain(die.rollSpread(2)[0])
          expect([1, 2, 3, 4, 5, 6]).toContain(die.rollSpread(2)[1])
        })
      })
    })
  })

  describe('Creating a Die with Custom Sides', () => {
    const sides = ['+', '+', '-', '-']
    const die = new D(sides)

    test('returns a D instance', () => {
      expect(die).toBeInstanceOf(D)
      expect(die.type).toEqual('custom')
    })

    test('D.sides returns the number of sides given in the constructor', () => {
      expect(die.sides).toEqual(sides.length)
    })

    test('D.faces returns the sides given in the constructor', () => {
      expect(die.faces).toEqual(sides)
    })

    describe(D.prototype.roll, () => {
      describe('with no argument', () => {
        test('.returns a value included in the constructor', () => {
          expect(sides).toContain(die.roll())
        })
      })

      describe('with a numerical argument', () => {
        test('.returns a result that is a conceivable result of multiple die rolls', () => {
          const result = die.roll(2)
          const resultArr = result.split(', ')

          expect(sides).toContain(resultArr[0])
          expect(sides).toContain(resultArr[1])
        })
      })
    })

    describe(D.prototype.rollSpread, () => {
      describe('with no argument', () => {
        test('.returns an array of values in the constructor', () => {
          expect(sides).toContain(die.rollSpread()[0])
        })
      })

      describe('with a numerical argument', () => {
        test('.returns an array of values found in the constructor', () => {
          expect(sides).toContain(die.rollSpread(2)[0])
          expect(sides).toContain(die.rollSpread(2)[1])
        })
      })
    })
  })
})
