import { digestTotals } from './digestTotals'

describe('digestTotals', () => {
  const rollTotals = [1, 2, 3, 4]
  const baseModifier = { sides: 6, rolls: rollTotals.length }

  describe('when given roll totals with no modifiers', () => {
    test('it returns the sum total of the rolls and the roll totals', () => {
      // Remaining Rolls: [1,2,3,4]
      expect(digestTotals(rollTotals, baseModifier)).toEqual(10)
    })
  })

  describe('when given an "acessor" modifier', () => {
    const accessor = (rolls: number[]) => rolls[0]
    const baseAccessorModifier = { ...baseModifier, accessor }

    describe('and modifiers other than size or rolls', () => {
      const extraModifier = { ...baseAccessorModifier, plus: 2 }
      // it('gives a warning', () => {

      // })

      it('passes the rollTotals into the accessor function and returns the result', () => {
        expect(digestTotals(rollTotals, extraModifier)).toEqual(rollTotals[0])
      })
    })

    it('passes the rollTotals into the accessor function and returns the result', () => {
      expect(digestTotals(rollTotals, baseAccessorModifier)).toEqual(rollTotals[0])
    })
  })

  describe('when not given an "acessor" modifier', () => {
    describe('when given roll totals with a "unique" modifier', () => {
      const duplicateRollTotals = [1, 1, 2, 3]
      const uniqueModifier = { sides: 4, rolls: duplicateRollTotals.length, unique: true }

      test('it re-rolls non-unique modifiers ', () => {
        // Remaining Rolls: [1,2,3,4]
        expect(digestTotals(duplicateRollTotals, uniqueModifier)).toEqual(10)
      })

      describe('when given a "notUnique" array', () => {
        const notUniqueModifier = { ...uniqueModifier, notUnique: [1] }

        test('it disregards any numbers in that array and makes the rest unique', () => {
          // Remaining Rolls: [1,1,2,3]
          expect(digestTotals(duplicateRollTotals, notUniqueModifier)).toEqual(7)
        })
      })

      describe('and the # of rolls is greater than the sides of the die', () => {
        const overflowRollTotals = [1, 1, 1, 2, 3, 4, 3, 3]
        const overflowModifier = { ...uniqueModifier, rolls: overflowRollTotals.length }

        test('it disregards the unique modifier and returns the row as-is', () => {
          // Remaining Rolls:  overflowRollTotals
          expect(digestTotals(overflowRollTotals, overflowModifier)).toEqual(18)
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
        expect(digestTotals(longerRollTotals, dropModifier)).toEqual(17)
      })
    })

    describe('when given roll totals with a "replace" modifier', () => {
      const dropModifier = {
        ...baseModifier,
        replace: [
          { from: 1, to: 2 },
          { from: { above: 3 }, to: 6 },
        ],
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        // Remaining Rolls: [2,2,3,6]
        expect(digestTotals(rollTotals, dropModifier)).toEqual(13)
      })
    })

    describe('when given roll totals with a "reroll" modifier', () => {
      const rerollModifier = { ...baseModifier, reroll: { below: 2, on: 3, maxRerolls: 2 } }
      const fakeRandom = () => 200

      test('it returns the total with all values matching the queries rerolled', () => {
        // Remaining Rolls: [200,2,200,4]
        expect(digestTotals(rollTotals, rerollModifier, fakeRandom)).toEqual(406)
      })
    })

    describe('when given roll totals with a "cap" modifier', () => {
      const dropModifier = { ...baseModifier, cap: { above: 3, below: 2 } }

      test('it returns the total with all values above above and below below replaced with their respective comparitor', () => {
        // Remaining Rolls: [2,2,3,3]
        expect(digestTotals(rollTotals, dropModifier)).toEqual(10)
      })
    })

    describe('when given roll totals with a "plus" modifier', () => {
      const dropModifier = { ...baseModifier, plus: 2 }

      test('it returns the total without the provided values', () => {
        // Remaining Rolls: [1,2,3,4] + 2
        expect(digestTotals(rollTotals, dropModifier)).toEqual(12)
      })
    })

    describe('when given roll totals with a "minus" modifier', () => {
      const dropModifier = { ...baseModifier, minus: 2 }

      test('it returns the total without the provided values', () => {
        // Remaining Rolls: [1,2,3,4] + 2
        expect(digestTotals(rollTotals, dropModifier)).toEqual(8)
      })
    })
  })
})
