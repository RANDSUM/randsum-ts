import { transformRollTotalsWithParameters } from 'transformRollTotalsWithParameters'

describe('transformRollTotalsWithParameters', () => {
  const rollTotals = [1, 2, 3, 4]
  const baseModifier = { sides: 6, rolls: rollTotals.length }
  const mockRandomizer = () => 200

  describe('when given roll totals with no modifiers', () => {
    test('it returns the sum total of the rolls and the roll totals', () => {
      // Remaining Rolls: [1,2,3,4]
      expect(transformRollTotalsWithParameters(rollTotals, baseModifier, mockRandomizer)).toEqual(10)
    })
  })

  describe('when given roll totals with a "unique" modifier', () => {
    const duplicateRollTotals = [1, 1, 2, 3]
    const uniqueModifier = { sides: 4, rolls: duplicateRollTotals.length, unique: true }

    test('it re-rolls non-unique modifiers ', () => {
      // Remaining Rolls: [1,200,2,3]
      expect(transformRollTotalsWithParameters(duplicateRollTotals, uniqueModifier, mockRandomizer)).toEqual(206)
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueModifier = { ...uniqueModifier, notUnique: [1] }

      test('it disregards any numbers in that array and makes the rest unique', () => {
        // Remaining Rolls: [1,1,2,3]
        expect(transformRollTotalsWithParameters(duplicateRollTotals, notUniqueModifier, mockRandomizer)).toEqual(7)
      })
    })

    describe('and the # of rolls is greater than the sides of the die', () => {
      const overflowRollTotals = [1, 1, 1, 2, 3, 4, 3, 3]
      const overflowModifier = { ...uniqueModifier, rolls: overflowRollTotals.length }

      test('it throws an error', () => {
        // Remaining Rolls:  overflowRollTotals
        expect(() => transformRollTotalsWithParameters(overflowRollTotals, overflowModifier, mockRandomizer)).toThrow(
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
      // Remaining Rolls: [4,6,7]
      expect(transformRollTotalsWithParameters(longerRollTotals, dropModifier, mockRandomizer)).toEqual(17)
    })
  })

  describe('when given roll totals with a "replace" modifier', () => {
    describe('that is a single replace modifiers', () => {
      const dropModifier = {
        ...baseModifier,
        replace: { from: 1, to: 2 },
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        // Remaining Rolls: [2,2,3,4]
        expect(transformRollTotalsWithParameters(rollTotals, dropModifier, mockRandomizer)).toEqual(11)
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
        // Remaining Rolls: [2,2,3,6]
        expect(transformRollTotalsWithParameters(rollTotals, dropModifier, mockRandomizer)).toEqual(13)
      })
    })
  })

  describe('when given roll totals with an "explode" modifier', () => {
    const explodeModifier = { ...baseModifier, explode: true }
    const explodeRolls = [1, 2, 3, 6]

    test('it returns the total with all values matching the queries rerolled', () => {
      // Remaining Rolls: [1,2,3,6,200]
      expect(transformRollTotalsWithParameters(explodeRolls, explodeModifier, mockRandomizer)).toEqual(212)
    })
  })

  describe('when given roll totals with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      // without a max reroll, our mockRandomizer will always return 200.
      // by setting to reroll above 3, it will theorhetically run indefinitely.
      // This will hit our backstop and produce a warning.
      const rerollModifier = { ...baseModifier, reroll: { above: 3 } }

      // test('it produces a console warning')

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        // Remaining Rolls: [1,2,3,200]
        expect(transformRollTotalsWithParameters(rollTotals, rerollModifier, mockRandomizer)).toEqual(206)
      })
    })

    describe('that is a single reroll modifier', () => {
      const rerollModifier = { ...baseModifier, reroll: { above: 3, on: 2, maxReroll: 2 } }

      test('it returns the total with all values matching the queries rerolled', () => {
        // Remaining Rolls: [1,200,3,200]
        expect(transformRollTotalsWithParameters(rollTotals, rerollModifier, mockRandomizer)).toEqual(404)
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const rerollModifier = { ...baseModifier, reroll: [{ below: 2, maxReroll: 2 }, { on: [3] }] }

      test('it returns the total with all values matching the queries rerolled', () => {
        // Remaining Rolls: [200,2,200,4]
        expect(transformRollTotalsWithParameters(rollTotals, rerollModifier, mockRandomizer)).toEqual(406)
      })
    })
  })

  describe('when given roll totals with a "cap" modifier', () => {
    const dropModifier = { ...baseModifier, cap: { above: 3, below: 2 } }

    test('it returns the total with all values above above and below below replaced with their respective comparitor', () => {
      // Remaining Rolls: [2,2,3,3]
      expect(transformRollTotalsWithParameters(rollTotals, dropModifier, mockRandomizer)).toEqual(10)
    })
  })

  describe('when given roll totals with a "plus" modifier', () => {
    const dropModifier = { ...baseModifier, plus: 2 }

    test('it returns the total without the provided values', () => {
      // Remaining Rolls: [1,2,3,4] + 2
      expect(transformRollTotalsWithParameters(rollTotals, dropModifier, mockRandomizer)).toEqual(12)
    })
  })

  describe('when given roll totals with a "minus" modifier', () => {
    const dropModifier = { ...baseModifier, minus: 2 }

    test('it returns the total without the provided values', () => {
      // Remaining Rolls: [1,2,3,4] + 2
      expect(transformRollTotalsWithParameters(rollTotals, dropModifier, mockRandomizer)).toEqual(8)
    })
  })
})
