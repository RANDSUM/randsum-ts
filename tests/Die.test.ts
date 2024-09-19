import { describe, expect, test } from 'bun:test'

import {
  CustomSidesDie,
  D100,
  D12,
  D20,
  D4,
  D6,
  D8,
  D10,
  FairCoin,
  StandardDie,
  TwoHeadedCoin,
  dieFactory
} from '~src/Die'

describe('SingleDie', () => {
  describe('StandardDie', () => {
    const sides = 6
    const die = new StandardDie(sides)

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

  describe('CustomSidesDie', () => {
    const sides = ['+', '+', '-', '-']
    const die = new CustomSidesDie(sides)

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

describe('dieFactory', () => {
  describe('when given a number', () => {
    const sides = 6
    const die = dieFactory(sides)

    test('returns a StandardDie', () => {
      expect(die).toBeInstanceOf(StandardDie)
      expect(die.sides).toEqual(sides)
      expect(die.faces).toEqual([1, 2, 3, 4, 5, 6])
      expect([1, 2, 3, 4, 5, 6]).toContain(die.roll())
    })
  })

  describe('when given an array of strings', () => {
    const sides = ['+', '+', '-', '-']
    const die = dieFactory(sides)

    test('returns a CustomSidesDie', () => {
      expect(die).toBeInstanceOf(CustomSidesDie)
      expect(die.sides).toEqual(sides.length)
      expect(die.faces).toEqual(sides)
      expect(sides).toContain(die.roll())
    })
  })
})

describe('Exports', () => {
  test('It features all standard exports', () => {
    expect(StandardDie).toBeDefined()
    expect(CustomSidesDie).toBeDefined()
    expect(FairCoin).toBeDefined()
    expect(TwoHeadedCoin).toBeDefined()
    expect(D4).toBeDefined()
    expect(D6).toBeDefined()
    expect(D8).toBeDefined()
    expect(D10).toBeDefined()
    expect(D12).toBeDefined()
    expect(D20).toBeDefined()
    expect(D100).toBeDefined()
  })
})
