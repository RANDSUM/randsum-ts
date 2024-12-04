import { describe, expect, it } from 'bun:test'
import { CustomFacesDiceNotation } from '../types'
import { validateCustomFacesNotation } from '../validateCustomFacesNotation'

describe('validateCustomFacesNotation', () => {
  describe('when given a valid custom dice notation', () => {
    const notation: CustomFacesDiceNotation = '2d{HT}'

    it('returns a valid result', () => {
      const result = validateCustomFacesNotation(notation)

      expect(result).toEqual({
        valid: true,
        argument: notation,
        notation: '2d{HT}',
        config: {
          sides: 2,
          quantity: 2,
          faces: ['H', 'T']
        },
        description: ['Roll 2 2-sided dice', 'with faces: H, T']
      })
    })
  })

  describe('when the notation is completely invalid', () => {
    const notation = 'invalid-notation'

    it('returns an error result', () => {
      const result = validateCustomFacesNotation(notation)

      expect(result).toEqual({
        valid: false,
        argument: notation,
        notation: undefined,
        config: undefined,
        description: undefined
      })
    })
  })
})
