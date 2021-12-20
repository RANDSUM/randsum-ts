import { rollModifierCalculator } from './rollModifierCalculator'

describe('rollModifierCalculator', () => {
  const rollTotals = [1, 2, 3, 4]
  const baseModifier = { sides: 6, rolls: rollTotals.length }

  describe('when given roll totals with no modifiers', () => {
    test('it returns the sum total of the rolls', () => {
      // Remaining Rolls: [1,2,3,4]
      expect(rollModifierCalculator(rollTotals, baseModifier)).toEqual(10)
    })
  })

  describe('when given roll totals with a "drop" modifier', () => {
    const dropModifier = { ...baseModifier, drop: { highest: true, lowest: 2 } }

    test('it returns the total without the provided values', () => {
      // Remaining Rolls: [3]
      expect(rollModifierCalculator(rollTotals, dropModifier)).toEqual(3)
    })
  })

  describe('when given roll totals with a "plus" modifier', () => {
    const dropModifier = { ...baseModifier, plus: 2 }

    test('it returns the total without the provided values', () => {
      // Remaining Rolls: [1,2,3,4] + 2
      expect(rollModifierCalculator(rollTotals, dropModifier)).toEqual(12)
    })
  })

  describe('when given roll totals with a "minus" modifier', () => {
    const dropModifier = { ...baseModifier, minus: 2 }

    test('it returns the total without the provided values', () => {
      // Remaining Rolls: [1,2,3,4] + 2
      expect(rollModifierCalculator(rollTotals, dropModifier)).toEqual(8)
    })
  })
})
