import { describe, expect, test } from 'bun:test'
import { CustomD } from '~src/CustomD'
import { D } from '~src/D'
import { NumericalD } from '~src/NumericalD'

describe(D, () => {
  describe('Creating a Numberical Die', () => {
    const sides = 6
    const die = D(sides)

    test('returns a NumericalD instance', () => {
      expect(die).toBeInstanceOf(NumericalD)
    })

    test('NumericalD.sides returns the number given as sides', () => {
      expect(die.sides).toEqual(sides)
    })

    test('Numerical.faces returns the number given as sides', () => {
      expect(die.faces).toEqual([1, 2, 3, 4, 5, 6])
    })

    describe(NumericalD.prototype.roll, () => {
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

    describe(NumericalD.prototype.rollSpread, () => {
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
    const die = D(sides)

    test('returns a CustomD instance', () => {
      expect(die).toBeInstanceOf(CustomD)
    })

    test('CustomD.sides returns the number of sides given in the contructor', () => {
      expect(die.sides).toEqual(sides.length)
    })

    test('CustomD.faces returns the sides given in the contructor', () => {
      expect(die.faces).toEqual(sides)
    })

    describe(CustomD.prototype.roll, () => {
      describe('with no argument', () => {
        test('.returns a number included in the constructor', () => {
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

    describe(CustomD.prototype.rollSpread, () => {
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
