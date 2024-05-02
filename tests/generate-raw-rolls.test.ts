import { describe, expect, test } from 'bun:test'

import generateRawRolls from '../src/roll/generate-result/generate-raw-rolls'
import { DicePoolParameters, RollParameters } from '../src/types'

describe('generateRawRolls', () => {
  describe('when given a RollParameters object', () => {
    const dicePoolParams: RollParameters = {
      dicePools: {
        'first-id': {
          argument: 20,
          options: {
            quantity: 4,
            sides: 20
          },
          die: {
            roll: () => 1
          } as unknown as DicePoolParameters<number>['die']
        },
        'second-id': {
          argument: ['h', 't'],
          options: {
            quantity: 1,
            sides: ['h', 't']
          },
          die: {
            roll: () => 'h'
          } as unknown as DicePoolParameters<string>['die']
        }
      }
    }

    test('returns an object with the same keys and an array of rolls equal to the desired quality with the provided die', () => {
      const result = generateRawRolls(dicePoolParams.dicePools)

      expect(result).toMatchObject({
        'first-id': [1, 1, 1, 1],
        'second-id': ['h']
      })
    })
  })
})
