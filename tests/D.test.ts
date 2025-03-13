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

    test('.roll() returns a number included in the constructor', () => {
      expect([1, 2, 3, 4, 5, 6]).toContain(die.roll())
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

    test('.roll() returns a string included in the constructor', () => {
      expect(sides).toContain(die.roll())
    })
  })
})
