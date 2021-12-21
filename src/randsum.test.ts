import { randsum } from '.'
import { RandsumFirstArg } from './types'
import { digestArgsIntoParameters } from './digestArgsIntoParameters'

const randsumCoreTests = (firstArg: RandsumFirstArg, detailed?: boolean) => {
  const comparitorOptions = digestArgsIntoParameters(firstArg)
  if (detailed) {
    const result = randsum(firstArg, detailed)

    test('result.rollTotals returns an array of results as rolls', () => {
      expect(result.rollTotals.length).toEqual(comparitorOptions.rolls)

      result.rollTotals.forEach(result => {
        expect(Number.isInteger(result)).toBe(true)
      })
    })

    test('result.sides returns the number of sides of the dice rolled', () => {
      expect(result.sides).toEqual(comparitorOptions.sides)
    })

    test('result.rolls returns the number of dice rolled', () => {
      expect(result.rolls).toEqual(comparitorOptions.rolls || 1)
    })
  } else {
    const result = randsum(firstArg)

    test('returns a number as total', () => {
      expect(Number.isInteger(result)).toBe(true)
    })
  }
}

describe('Randsum', () => {
  describe('with a modifier object', () => {
    randsumCoreTests({ sides: 3, drop: { highest: 1 } })
  })
  describe('with a modifier function', () => {
    randsumCoreTests({ sides: 3, accessor: () => 4 })
  })
  describe('with basic dice notation', () => {
    randsumCoreTests('2d20')
  })
})
