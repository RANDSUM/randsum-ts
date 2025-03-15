import { describe, expect, test } from 'bun:test'
import { D } from '~src/D'

describe('D', () => {
  describe('Creating a Numberical Die', () => {
    const sides = 6
    const die = new D(sides)

    test('.sides returns the number given as sides', () => {
      expect(die.sides).toEqual(sides)
    })

    test('.faces returns the number given as sides', () => {
      expect(die.faces).toEqual([1, 2, 3, 4, 5, 6])
    })

    describe('.roll()', () => {
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
  })

  describe('Creating a Die with Custom Sides', () => {
    const sides = ['+', '+', '-', '-']
    const die = new D(sides)

    test('.sides returns the number of sides given in the contructor', () => {
      expect(die.sides).toEqual(sides.length)
    })

    test('.faces returns the sides given in the contructor', () => {
      expect(die.faces).toEqual(sides)
    })

    describe('.rollSpread()', () => {
      describe('with no argument', () => {
        test('.returns a number included in the constructor', () => {
          expect(sides).toContain(die.roll())
        })
      })

      describe('with a numerical argument', () => {
        test('.returns a number that is a conceivable result of multiple die rolls', () => {
          expect([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).toContain(die.roll(2))
        })
      })
    })
  })
})
