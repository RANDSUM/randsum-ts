import { describe, expect, test } from 'bun:test'
import { RawRollsModel } from '~models'
import { D } from '~src/D'

import { DicePools } from '~types'

describe('RawRollsModel', () => {
  describe('RawRollsModel.generate', () => {
    describe('when given a DicePools object', () => {
      const dicePoolParams: DicePools = {
        dicePools: {
          'first-id': {
            argument: 20,
            notation: '20d4',
            description: ['roll 20d4'],
            options: {
              quantity: 4,
              sides: 20
            },
            die: new D(1)
          },
          'second-id': {
            argument: ['h', 't'],
            notation: '20d{ht}',
            description: ['roll 20 dice with sides h and t'],
            options: {
              quantity: 1,
              sides: ['h', 't']
            },
            die: new D(['h'])
          }
        }
      }

      test('returns an object with the same keys and an array of rolls equal to the desired quality with the provided die', () => {
        const result = RawRollsModel.generate(dicePoolParams.dicePools)

        expect(result).toMatchObject({
          'first-id': [1, 1, 1, 1],
          'second-id': ['h']
        })
      })
    })
  })
})
