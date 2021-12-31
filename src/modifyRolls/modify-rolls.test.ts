import { NewRollParameters } from '../types'
import { modifyRolls } from './modify-rolls'

const mockRandomizer = (): number => 200

describe('modifyRolls', () => {
  const rolls = [1, 2, 3, 4]
  const baseParameters: NewRollParameters = { sides: 6, quantity: rolls.length }

  describe('when given roll totals with no modifiers', () => {
    test('it returns the sum total of the quantity and the roll totals', () => {
      expect(modifyRolls(rolls, baseParameters, mockRandomizer)).toEqual([10, [1, 2, 3, 4]])
    })
  })

  describe('when given roll totals with a "unique" modifier', () => {
    const duplicateRollTotals = [1, 1, 2, 3]
    const uniqueParameters: NewRollParameters = {
      sides: 4,
      quantity: duplicateRollTotals.length,
      rollModifiers: [{ unique: true }],
    }

    test('it re-quantity non-unique modifiers', () => {
      expect(modifyRolls(duplicateRollTotals, uniqueParameters, mockRandomizer)).toEqual([206, [1, 200, 2, 3]])
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueParameters: NewRollParameters = {
        ...uniqueParameters,
        rollModifiers: [{ unique: { notUnique: [1] } }],
      }

      test('it disregards any numbers in that array and makes the rest unique', () => {
        expect(modifyRolls(duplicateRollTotals, notUniqueParameters, mockRandomizer)).toEqual([7, [1, 1, 2, 3]])
      })
    })

    describe('and the # of quantity is greater than the sides of the die', () => {
      const overflowRollTotals = [1, 1, 1, 2, 3, 4, 3, 3]
      const overflowParameters: NewRollParameters = { ...uniqueParameters, quantity: overflowRollTotals.length }

      test('it throws an error', () => {
        expect(() => modifyRolls(overflowRollTotals, overflowParameters, mockRandomizer)).toThrow(
          'You cannot have unique rolls when there are more rolls than sides of die.',
        )
      })
    })
  })

  describe('when given roll totals with a "drop" modifier', () => {
    const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dropParameters: NewRollParameters = {
      sides: 10,
      quantity: longerRollTotals.length,
      rollModifiers: [
        {
          drop: {
            highest: 1,
            lowest: 2,
            greaterThan: 8,
            lessThan: 2,
            exact: [5],
          },
        },
      ],
    }

    test('it returns the total without the provided values', () => {
      expect(modifyRolls(longerRollTotals, dropParameters, mockRandomizer)).toEqual([17, [4, 6, 7]])
    })
  })

  describe('when given roll totals with a "replace" modifier', () => {
    describe('that is a single replace modifiers', () => {
      const dropParameters: NewRollParameters = {
        ...baseParameters,
        rollModifiers: [{ replace: { from: 1, to: 2 } }],
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(modifyRolls(rolls, dropParameters, mockRandomizer)).toEqual([11, [2, 2, 3, 4]])
      })
    })

    describe('that is an array of replace modifiers', () => {
      const dropParameters: NewRollParameters = {
        ...baseParameters,
        rollModifiers: [
          {
            replace: [
              { from: 1, to: 2 },
              { from: { greaterThan: 3 }, to: 6 },
            ],
          },
        ],
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(modifyRolls(rolls, dropParameters, mockRandomizer)).toEqual([13, [2, 2, 3, 6]])
      })
    })
  })

  describe('when given roll totals with an "explode" modifier', () => {
    const explodeRollTotals = [1, 2, 3, 6]
    const explodeParameters: NewRollParameters = { ...baseParameters, rollModifiers: [{ explode: true }] }

    test('it returns the total with all values matching the queries rerolled', () => {
      expect(modifyRolls(explodeRollTotals, explodeParameters, mockRandomizer)).toEqual([212, [1, 2, 3, 6, 200]])
    })
  })

  describe('when given roll totals with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      const rerollParameters: NewRollParameters = { ...baseParameters, rollModifiers: [{ reroll: { greaterThan: 3 } }] }

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        expect(modifyRolls(rolls, rerollParameters, mockRandomizer)).toEqual([206, [1, 2, 3, 200]])
      })
    })

    describe('that is a single reroll modifier', () => {
      const rerollParameters: NewRollParameters = {
        ...baseParameters,
        rollModifiers: [{ reroll: { greaterThan: 3, exact: 2, maxReroll: 2 } }],
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(modifyRolls(rolls, rerollParameters, mockRandomizer)).toEqual([404, [1, 200, 3, 200]])
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const rerollParameters: NewRollParameters = {
        ...baseParameters,
        rollModifiers: [{ reroll: [{ lessThan: 2, maxReroll: 2 }, { exact: [3] }] }],
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(modifyRolls(rolls, rerollParameters, mockRandomizer)).toEqual([406, [200, 2, 200, 4]])
      })
    })
  })

  describe('when given roll totals with a "cap" modifier', () => {
    const dropParameters: NewRollParameters = {
      ...baseParameters,
      rollModifiers: [{ cap: { greaterThan: 3, lessThan: 2 } }],
    }

    test('it returns the total with all values greaterThan greaterThan and lessThan lessThan replaced with their respective comparitor and the roll totals', () => {
      expect(modifyRolls(rolls, dropParameters, mockRandomizer)).toEqual([10, [2, 2, 3, 3]])
    })
  })

  describe('when given roll totals with a "plus" modifier', () => {
    const dropParameters: NewRollParameters = { ...baseParameters, totalModifiers: [{ plus: 2 }] }

    test('it returns the total plus the "plus" modifier, and the roll totals', () => {
      expect(modifyRolls(rolls, dropParameters, mockRandomizer)).toEqual([12, [1, 2, 3, 4]])
    })
  })

  describe('when given roll totals with a "minus" modifier', () => {
    const dropParameters: NewRollParameters = { ...baseParameters, totalModifiers: [{ minus: 2 }] }

    test('it returns the total minust the "minus" modifier, and the roll totals', () => {
      expect(modifyRolls(rolls, dropParameters, mockRandomizer)).toEqual([8, [1, 2, 3, 4]])
    })
  })
})
