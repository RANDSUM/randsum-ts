import { calculateTotal } from './calculateTotal'

describe('calculateTotal', () => {
  const rollTotals = [1, 2, 3, 4]
  const baseModifier = { sides: 6, rolls: rollTotals.length }

  describe('when given roll totals with no modifiers', () => {
    test('it returns the sum total of the rolls and the roll totals', () => {
      // Remaining Rolls: [1,2,3,4]
      expect(calculateTotal(rollTotals, baseModifier)).toEqual(10)
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
        expect(calculateTotal(rollTotals, extraModifier)).toEqual(rollTotals[0])
      })
    })

    it('passes the rollTotals into the accessor function and returns the result', () => {
      expect(calculateTotal(rollTotals, baseAccessorModifier)).toEqual(rollTotals[0])
    })
  })

  describe('when not given an "acessor" modifier', () => {
    describe('when given roll totals with a "drop" modifier', () => {
      const dropModifier = {
        ...baseModifier,
        drop: {
          highest: 1,
          lowest: 2,
          greaterThan: 8,
          lessThan: 2,
          exact: [5],
        },
      }
      const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      test('it returns the total without the provided values', () => {
        // Remaining Rolls: [4,6,7]
        expect(calculateTotal(longerRollTotals, dropModifier)).toEqual(17)
      })
    })

    describe('when given roll totals with a "plus" modifier', () => {
      const dropModifier = { ...baseModifier, plus: 2 }

      test('it returns the total without the provided values', () => {
        // Remaining Rolls: [1,2,3,4] + 2
        expect(calculateTotal(rollTotals, dropModifier)).toEqual(12)
      })
    })

    describe('when given roll totals with a "minus" modifier', () => {
      const dropModifier = { ...baseModifier, minus: 2 }

      test('it returns the total without the provided values', () => {
        // Remaining Rolls: [1,2,3,4] + 2
        expect(calculateTotal(rollTotals, dropModifier)).toEqual(8)
      })
    })
  })
})
