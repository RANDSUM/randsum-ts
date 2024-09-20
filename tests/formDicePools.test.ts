import { describe, expect, test } from 'bun:test'

import { formDicePools } from '~src/roll/formDicePools'
import { RandsumNotation, RandsumRollParameters, DicePools } from '~types'

const extractDicePoolValues = (params: DicePools): RandsumRollParameters[] => {
  const pools = Object.entries(params.dicePools)
  return pools.map(([, value]) => value)
}

describe('formDicePools', () => {
  describe('given a single argument', () => {
    const argument = 20

    test('returns DicePools with one key', () => {
      const params = formDicePools([argument])
      const dicePools = extractDicePoolValues(params)

      expect(dicePools.length).toBe(1)
      expect(dicePools[0].argument).toBe(argument)
    })
  })

  describe('given an array of arguments', () => {
    const argument: [number, RandsumNotation, string[]] = [2, '4d6', ['h', 't']]

    test('returns a DicePools matching the argument', () => {
      const params = formDicePools(argument)
      const dicePools = extractDicePoolValues(params)

      expect(dicePools.length).toBe(3)

      expect(dicePools[0].argument).toBe(argument[0])
      expect(dicePools[1].argument).toBe(argument[1])
      expect(dicePools[2].argument).toBe(argument[2])
    })
  })
})
