import { generateRolls } from 'generateRolls'

describe('generateRolls', () => {
  const rollTotals = [1, 2, 3, 4]
  const baseModifier = { sides: 6, rolls: rollTotals.length }
  const mockRandomizer = () => 200

  describe('when given roll totals with no modifiers', () => {
    test('it returns the sum total of the rolls and the roll totals', () => {
      expect(generateRolls(rollTotals, baseModifier, mockRandomizer)).toEqual([10, [1, 2, 3, 4]])
    })
  })

  describe('when given roll totals with a "unique" modifier', () => {
    const duplicateRollTotals = [1, 1, 2, 3]
    const uniqueModifier = { sides: 4, rolls: duplicateRollTotals.length, unique: true }

    test('it re-rolls non-unique modifiers', () => {
      expect(generateRolls(duplicateRollTotals, uniqueModifier, mockRandomizer)).toEqual([206, [1, 200, 2, 3]])
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueModifier = { ...uniqueModifier, unique: { notUnique: [1] } }

      test('it disregards any numbers in that array and makes the rest unique', () => {
        expect(generateRolls(duplicateRollTotals, notUniqueModifier, mockRandomizer)).toEqual([7, [1, 1, 2, 3]])
      })
    })

    describe('and the # of rolls is greater than the sides of the die', () => {
      const overflowRollTotals = [1, 1, 1, 2, 3, 4, 3, 3]
      const overflowModifier = { ...uniqueModifier, rolls: overflowRollTotals.length }

      test('it throws an error', () => {
        expect(() => generateRolls(overflowRollTotals, overflowModifier, mockRandomizer)).toThrow(
          'You cannot have unique rolls when there are more rolls than sides of die.',
        )
      })
    })
  })

  describe('when given roll totals with a "drop" modifier', () => {
    const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dropModifier = {
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
      expect(generateRolls(longerRollTotals, dropModifier, mockRandomizer)).toEqual([17, [4, 6, 7]])
    })
  })

  describe('when given roll totals with a "replace" modifier', () => {
    describe('that is a single replace modifiers', () => {
      const dropModifier = {
        ...baseModifier,
        replace: { from: 1, to: 2 },
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(generateRolls(rollTotals, dropModifier, mockRandomizer)).toEqual([11, [2, 2, 3, 4]])
      })
    })

    describe('that is an array of replace modifiers', () => {
      const dropModifier = {
        ...baseModifier,
        replace: [
          { from: 1, to: 2 },
          { from: { above: 3 }, to: 6 },
        ],
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(generateRolls(rollTotals, dropModifier, mockRandomizer)).toEqual([13, [2, 2, 3, 6]])
      })
    })
  })

  describe('when given roll totals with an "explode" modifier', () => {
    const explodeModifier = { ...baseModifier, explode: true }
    const explodeRolls = [1, 2, 3, 6]

    test('it returns the total with all values matching the queries rerolled', () => {
      expect(generateRolls(explodeRolls, explodeModifier, mockRandomizer)).toEqual([212, [1, 2, 3, 6, 200]])
    })
  })

  describe('when given roll totals with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      const rerollModifier = { ...baseModifier, reroll: { above: 3 } }

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        expect(generateRolls(rollTotals, rerollModifier, mockRandomizer)).toEqual([206, [1, 2, 3, 200]])
      })
    })

    describe('that is a single reroll modifier', () => {
      const rerollModifier = { ...baseModifier, reroll: { above: 3, on: 2, maxReroll: 2 } }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(generateRolls(rollTotals, rerollModifier, mockRandomizer)).toEqual([404, [1, 200, 3, 200]])
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const rerollModifier = { ...baseModifier, reroll: [{ below: 2, maxReroll: 2 }, { on: [3] }] }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(generateRolls(rollTotals, rerollModifier, mockRandomizer)).toEqual([406, [200, 2, 200, 4]])
      })
    })
  })

  describe('when given roll totals with a "cap" modifier', () => {
    const dropModifier = { ...baseModifier, cap: { above: 3, below: 2 } }

    test('it returns the total with all values above above and below below replaced with their respective comparitor and the roll totals', () => {
      expect(generateRolls(rollTotals, dropModifier, mockRandomizer)).toEqual([10, [2, 2, 3, 3]])
    })
  })

  describe('when given roll totals with a "plus" modifier', () => {
    const dropModifier = { ...baseModifier, plus: 2 }

    test('it returns the total plus the "plus" modifier, and the roll totals', () => {
      expect(generateRolls(rollTotals, dropModifier, mockRandomizer)).toEqual([12, [1, 2, 3, 4]])
    })
  })

  describe('when given roll totals with a "minus" modifier', () => {
    const dropModifier = { ...baseModifier, minus: 2 }

    test('it returns the total minust the "minus" modifier, and the roll totals', () => {
      expect(generateRolls(rollTotals, dropModifier, mockRandomizer)).toEqual([8, [1, 2, 3, 4]])
    })
  })
})
