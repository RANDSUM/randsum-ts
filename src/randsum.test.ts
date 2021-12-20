import { randsum } from '.'
import { RollOptions } from './types'

const randsumCoreTests = ({
  sides = 6,
  rollModifier = {},
}: { sides?: number; rollModifier?: RollOptions } = {}) => {
  const result = randsum(sides, rollModifier)

  test('returns a number as total', () => {
    expect(Number.isInteger(result)).toBe(true)
  })

  if (rollModifier.full) {
    test('result.rolls returns an array of results as rolls', () => {
      expect(result.rolls.length).toEqual(rollModifier.rolls)

      result.rolls.forEach(result => {
        expect(Number.isInteger(result)).toBe(true)
      })
    })

    test('result.rolls returns an array of results as rolls', () => {
      expect(result.rolls.length).toEqual(rollModifier.rolls)

      result.rolls.forEach(result => {
        expect(Number.isInteger(result)).toBe(true)
      })
    })

    test('result.rollParams returns data related to the roll', () => {
      expect(result.rollParams).toEqual({
        sides,
        rolls: rollModifier.rolls || 1,
        rollModifier
      })
    })
  }
}

describe('Randsum', () => {
  describe('with a modifier object', () => {
    randsumCoreTests({ sides: 3, rollModifier: { drop: { highest: true } } })
  })
  describe('with a modifier function', () => {
    randsumCoreTests({ sides: 3, rollModifier: { accessor: () => 4 }})
  })
  describe('without a modifier', () => {
    randsumCoreTests({ sides: 3 })
  })
})
