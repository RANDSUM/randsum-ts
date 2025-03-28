import { describe, expect, test } from 'bun:test'
import { meetOrBeat5E } from '../src/meetOrBeat5E'
import type { RollArgument5E } from '../src/types'

describe('meetOrBeat5E', () => {
  describe('with standard roll', () => {
    const args: RollArgument5E = { modifier: 5 }

    test('returns true when roll meets DC', () => {
      const dc = 10
      const result = meetOrBeat5E(dc, args)
      expect(typeof result).toBe('boolean')
    })

    test('returns false for impossible DC', () => {
      const impossibleDC = 30 // Max possible roll is 25 (20 + 5)
      const result = meetOrBeat5E(impossibleDC, args)
      expect(result).toBe(false)
    })

    test('returns true for guaranteed DC', () => {
      const guaranteedDC = 6 // Min possible roll is 6 (1 + 5)
      const result = meetOrBeat5E(guaranteedDC, args)
      expect(result).toBe(true)
    })
  })

  describe('with advantage', () => {
    const args: RollArgument5E = {
      modifier: 5,
      rollingWith: 'Advantage'
    }

    test('returns correct boolean result', () => {
      const dc = 15
      const result = meetOrBeat5E(dc, args)
      expect(typeof result).toBe('boolean')
    })
  })

  describe('with disadvantage', () => {
    const args: RollArgument5E = {
      modifier: 5,
      rollingWith: 'Disadvantage'
    }

    test('returns correct boolean result', () => {
      const dc = 15
      const result = meetOrBeat5E(dc, args)
      expect(typeof result).toBe('boolean')
    })
  })

  describe('edge cases', () => {
    test('handles DC of 0', () => {
      const args: RollArgument5E = { modifier: 0 }
      const result = meetOrBeat5E(0, args)
      expect(result).toBe(true)
    })

    test('handles negative DC', () => {
      const args: RollArgument5E = { modifier: 0 }
      const result = meetOrBeat5E(-5, args)
      expect(result).toBe(true)
    })

    test('handles large negative modifier', () => {
      const args: RollArgument5E = { modifier: -10 }
      const result = meetOrBeat5E(15, args)
      expect(typeof result).toBe('boolean')
    })
  })
})
