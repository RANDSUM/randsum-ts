import { randsum } from './randsum'

describe('Randsum', () => {
  describe('Stress Test', () => {
    const loops = 9999
    const array = new Array(loops)
    for (let index = 0; index < loops; index += 1) {
      array[index] = randsum(20)
    }

    test('it never goes outside of the bounds of the roll', () => {
      for (const roll of array) {
        expect(roll).toBeLessThanOrEqual(20)
        expect(roll).toBeGreaterThan(0)
      }
    })
  })

  describe('Simple results', () => {
    describe('with a string', () => {
      const result = randsum('20')

      test('returns a number as total', () => {
        expect(Number.isInteger(result)).toBe(true)
      })
    })

    describe('with a number', () => {
      const result = randsum(20)

      test('returns a number as total', () => {
        expect(Number.isInteger(result)).toBe(true)
      })

      describe('and a SecondaryRandsumOptions object', () => {
        const result = randsum(20, { quantity: 21 })

        test('returns a number as total', () => {
          expect(Number.isInteger(result)).toBe(true)
        })
      })
    })

    describe('with a RandsumOptions object', () => {
      const result = randsum({
        sides: 20,
        quantity: 2,
        modifiers: [{ drop: { highest: 1 } }]
      })

      test('returns a number as total', () => {
        expect(Number.isInteger(result)).toBe(true)
      })
    })

    describe('with basic dice notation', () => {
      const result = randsum('2d20')

      test('returns a number as total', () => {
        expect(Number.isInteger(result)).toBe(true)
      })

      describe('and a UserOption object', () => {
        const result = randsum('2d20', { randomizer: () => 1 })

        test('returns a number as total', () => {
          expect(Number.isInteger(result)).toBe(true)
        })
      })
    })

    const mockRandomizerRoll = 420
    const mockRandomizer = (): number => mockRandomizerRoll

    describe('with a custom randomizer', () => {
      const result = randsum('2d20', { randomizer: mockRandomizer })

      test('expects total to be correct', () => {
        expect(result).toEqual(2 * mockRandomizerRoll)
      })
    })
  })

  describe('with a detailed report', () => {
    const result = randsum('2d20', { detailed: true })

    test('result.rolls returns an array of results as rolls', () => {
      expect(result.rolls).toHaveLength(2)

      for (const roll of result.rolls) {
        expect(Number.isInteger(roll)).toBe(true)
      }
    })

    test('result.sides returns the number of sides of the dice rolled', () => {
      expect(result.rollParameters.sides).toBe(20)
    })

    test('result.quantity returns the number of dice rolled', () => {
      expect(result.rollParameters.quantity).toBe(2)
    })
  })

  describe('with custom sides', () => {
    const result = randsum({ sides: ['r', 'a', 'n', 'd', 's', 'u', 'm'] })

    it('returns a string', () => {
      expect(typeof result == 'string').toBe(true)
    })

    describe('with a detailed result', () => {
      const { total } = randsum({
        sides: ['r', 'a', 'n', 'd', 's', 'u', 'm'],
        detailed: true
      })

      it('returns a string for total', () => {
        expect(typeof total == 'string').toBe(true)
      })
    })
  })
})
