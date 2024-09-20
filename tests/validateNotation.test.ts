import { describe, expect, it } from 'bun:test'
import { validateDiceNotation } from '~src/validateDiceNotation'
import { RandsumNotation, DicePoolType } from '~types'

describe('validateDiceNotation', () => {
  describe('when the notation is completely invalid', () => {
    const notation = 'invalid-notation'

    it('returns an error result', () => {
      const result = validateDiceNotation(notation)

      expect(result).toEqual({
        valid: false,
        description: []
      })
    })
  })

  describe('when given a typesafe but incorrect dice notation', () => {
    const notation: RandsumNotation = '2d5XXddf'

    it('returns an error result', () => {
      const result = validateDiceNotation(notation)

      expect(result).toEqual({
        valid: false,
        description: []
      })
    })
  })

  describe('when given comma-less multiple dice notation', () => {
    const notations: RandsumNotation[] = [
      '2d5D{2>2}',
      '2d5V{1=2>2=2}',
      '2d5R{2>2}',
      '2d5U{2>2}',
      '2d5C2>2'
    ]

    notations.forEach((notation) => {
      it(`returns an error result for ${notation}`, () => {
        const result = validateDiceNotation(notation)

        expect(result).toEqual({
          valid: false,
          description: []
        })
      })
    })
  })

  describe('when given a nonsensical drop notation that is bugging me', () => {
    const notation: RandsumNotation = '2d5D'

    it('returns an error result', () => {
      const result = validateDiceNotation(notation)

      expect(result).toEqual({
        valid: false,
        description: []
      })
    })
  })

  describe('when given a numerical notation', () => {
    it('returns a valid result', () => {
      const notation = '2d6'
      const result = validateDiceNotation(notation)

      expect(result).toEqual({
        valid: true,
        notation: '2d6',
        type: DicePoolType.numerical,
        digested: { sides: 6, quantity: 2, modifiers: {} },
        description: ['Roll 2 6-sided dice']
      })

      const notation2 = '1D20'
      const result2 = validateDiceNotation(notation2)

      expect(result2).toEqual({
        valid: true,
        notation: '1d20',
        type: DicePoolType.numerical,
        digested: { sides: 20, quantity: 1, modifiers: {} },
        description: ['Roll 1 20-sided die']
      })
    })
  })

  describe('when given a custom sides notation', () => {
    it('returns a valid result', () => {
      const notation = '2d{ht}'
      const result = validateDiceNotation(notation)

      expect(result).toEqual({
        valid: true,
        notation: '2d{ht}',
        type: DicePoolType.custom,
        digested: { sides: ['h', 't'], quantity: 2, modifiers: {} },
        description: ['Roll 2 dice with the following sides: (h,t)']
      })
    })
  })
})
