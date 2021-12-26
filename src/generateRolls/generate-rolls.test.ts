import { RollParameters, RollTotals } from 'types'

import { generateRolls } from './generate-rolls'

const mockRandomizer = () => 200
describe('generateRolls', () => {
  const rollTotals: RollTotals = [1, 2, 3, 4]
  const baseParameters: RollParameters = { sides: 6, rolls: rollTotals.length }

  describe('when given roll totals with no modifiers', () => {
    test('it returns the sum total of the rolls and the roll totals', () => {
      expect(generateRolls(rollTotals, baseParameters, mockRandomizer)).toEqual([10, [1, 2, 3, 4]])
    })
  })

  describe('when given roll totals with a "unique" modifier', () => {
    const duplicateRollTotals: RollTotals = [1, 1, 2, 3]
    const uniqueParameters: RollParameters = { sides: 4, rolls: duplicateRollTotals.length, unique: true }

    test('it re-rolls non-unique modifiers', () => {
      expect(generateRolls(duplicateRollTotals, uniqueParameters, mockRandomizer)).toEqual([206, [1, 200, 2, 3]])
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueParameters: RollParameters = { ...uniqueParameters, unique: { notUnique: [1] } }

      test('it disregards any numbers in that array and makes the rest unique', () => {
        expect(generateRolls(duplicateRollTotals, notUniqueParameters, mockRandomizer)).toEqual([7, [1, 1, 2, 3]])
      })
    })

    describe('and the # of rolls is greater than the sides of the die', () => {
      const overflowRollTotals: RollTotals = [1, 1, 1, 2, 3, 4, 3, 3]
      const overflowParameters: RollParameters = { ...uniqueParameters, rolls: overflowRollTotals.length }

      test('it throws an error', () => {
        expect(() => generateRolls(overflowRollTotals, overflowParameters, mockRandomizer)).toThrow(
          'You cannot have unique rolls when there are more rolls than sides of die.',
        )
      })
    })
  })

  describe('when given roll totals with a "drop" modifier', () => {
    const longerRollTotals: RollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dropParameters: RollParameters = {
      sides: 10,
      rolls: longerRollTotals.length,
      drop: {
        highest: 1,
        lowest: 2,
        greaterThan: 8,
        lessThan: 2,
        exact: [5],
      },
    }

    test('it returns the total without the provided values', () => {
      expect(generateRolls(longerRollTotals, dropParameters, mockRandomizer)).toEqual([17, [4, 6, 7]])
    })
  })

  describe('when given roll totals with a "replace" modifier', () => {
    describe('that is a single replace modifiers', () => {
      const dropParameters: RollParameters = {
        ...baseParameters,
        replace: { from: 1, to: 2 },
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(generateRolls(rollTotals, dropParameters, mockRandomizer)).toEqual([11, [2, 2, 3, 4]])
      })
    })

    describe('that is an array of replace modifiers', () => {
      const dropParameters: RollParameters = {
        ...baseParameters,
        replace: [
          { from: 1, to: 2 },
          { from: { above: 3 }, to: 6 },
        ],
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(generateRolls(rollTotals, dropParameters, mockRandomizer)).toEqual([13, [2, 2, 3, 6]])
      })
    })
  })

  describe('when given roll totals with an "explode" modifier', () => {
    const explodeRollTotals: RollTotals = [1, 2, 3, 6]
    const explodeParameters: RollParameters = { ...baseParameters, explode: true }

    test('it returns the total with all values matching the queries rerolled', () => {
      expect(generateRolls(explodeRollTotals, explodeParameters, mockRandomizer)).toEqual([212, [1, 2, 3, 6, 200]])
    })
  })

  describe('when given roll totals with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      const rerollParameters: RollParameters = { ...baseParameters, reroll: { above: 3 } }

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        expect(generateRolls(rollTotals, rerollParameters, mockRandomizer)).toEqual([206, [1, 2, 3, 200]])
      })
    })

    describe('that is a single reroll modifier', () => {
      const rerollParameters: RollParameters = { ...baseParameters, reroll: { above: 3, on: 2, maxReroll: 2 } }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(generateRolls(rollTotals, rerollParameters, mockRandomizer)).toEqual([404, [1, 200, 3, 200]])
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const rerollParameters: RollParameters = {
        ...baseParameters,
        reroll: [{ below: 2, maxReroll: 2 }, { on: [3] }],
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(generateRolls(rollTotals, rerollParameters, mockRandomizer)).toEqual([406, [200, 2, 200, 4]])
      })
    })
  })

  describe('when given roll totals with a "cap" modifier', () => {
    const dropParameters: RollParameters = { ...baseParameters, cap: { above: 3, below: 2 } }

    test('it returns the total with all values above above and below below replaced with their respective comparitor and the roll totals', () => {
      expect(generateRolls(rollTotals, dropParameters, mockRandomizer)).toEqual([10, [2, 2, 3, 3]])
    })
  })

  describe('when given roll totals with a "plus" modifier', () => {
    const dropParameters: RollParameters = { ...baseParameters, plus: 2 }

    test('it returns the total plus the "plus" modifier, and the roll totals', () => {
      expect(generateRolls(rollTotals, dropParameters, mockRandomizer)).toEqual([12, [1, 2, 3, 4]])
    })
  })

  describe('when given roll totals with a "minus" modifier', () => {
    const dropParameters: RollParameters = { ...baseParameters, minus: 2 }

    test('it returns the total minust the "minus" modifier, and the roll totals', () => {
      expect(generateRolls(rollTotals, dropParameters, mockRandomizer)).toEqual([8, [1, 2, 3, 4]])
    })
  })
})
