import { describe, expect, test } from 'bun:test'

import { roll } from '../src'

describe('roll', () => {
  describe('Stress Test', () => {
    const loops = 9999
    const dummyArray = Array.from({ length: loops }, () => roll().total)

    test('it never goes outside of the bounds of the roll', () => {
      dummyArray.forEach((individualRoll) => {
        expect(individualRoll).toBeLessThanOrEqual(20)
        expect(individualRoll).toBeGreaterThan(0)
      })
    })
  })
})
