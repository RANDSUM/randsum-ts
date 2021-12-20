import { randsum } from '.'
import { RollOptions, RollResult } from './types'

const randsumCoreTests = ({ sides = 6, rollModifier = {} }: { sides?: number; rollModifier?: RollOptions } = {}) => {
  if (rollModifier.full) {
    const result = randsum(sides, rollModifier) as RollResult

    test('result.rollTotals returns an array of results as rolls', () => {
      expect(result.rollTotals.length).toEqual(rollModifier.rolls)

      result.rollTotals.forEach((result) => {
        expect(Number.isInteger(result)).toBe(true)
      })
    })

    test('result.rollParams returns data related to the roll', () => {
      expect(result.rollParams).toEqual({
        sides,
        rolls: rollModifier.rolls || 1,
        rollModifier,
      })
    })
  } else {
    const result = randsum(sides, rollModifier) as number

    test('returns a number as total', () => {
      expect(Number.isInteger(result)).toBe(true)
    })
  }
}

describe('Randsum', () => {
  describe('with a modifier object', () => {
    randsumCoreTests({ sides: 3, rollModifier: { drop: { highest: true } } })
  })
  describe('with a modifier function', () => {
    randsumCoreTests({ sides: 3, rollModifier: { accessor: () => 4 } })
  })
  describe('without a modifier', () => {
    randsumCoreTests({ sides: 3 })
  })
})
