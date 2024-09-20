import { describe, expect, test } from 'bun:test'
import { D } from '~src/D'

import { roll } from '~src/roll'

describe('roll', () => {
  describe('Stress Test', () => {
    const loops = 9999
    const dummyArray = Array.from(
      { length: loops },
      () => roll(20, { sides: 20 }, new D(20)).total
    )

    test('it never goes outside of the bounds of the roll', () => {
      dummyArray.forEach((individualRoll) => {
        expect(individualRoll).toBeLessThanOrEqual(60)
        expect(individualRoll).toBeGreaterThan(0)
      })
    })
  })
})
