import { randsum } from 'randsum'

describe('Randsum', () => {
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
  })

  describe('with a modifier object', () => {
    const result = randsum({ sides: 20, quantity: 2, drop: { highest: 1 } })

    test('returns a number as total', () => {
      expect(Number.isInteger(result)).toBe(true)
    })
  })

  describe('with basic dice notation', () => {
    const result = randsum('2d20')

    test('returns a number as total', () => {
      expect(Number.isInteger(result)).toBe(true)
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

  describe('with a detailed report', () => {
    const result = randsum('2d20', { detailed: true })

    test('result.rollTotals returns an array of results as rolls', () => {
      expect(result.rollTotals.length).toEqual(2)

      for (const roll of result.rollTotals) {
        expect(Number.isInteger(roll)).toBe(true)
      }
    })

    test('result.sides returns the number of sides of the dice rolled', () => {
      expect(result.sides).toEqual(20)
    })

    test('result.quantity returns the number of dice rolled', () => {
      expect(result.quantity).toEqual(2)
    })

    test('result.modifyInitialRolls returns a function that accepts a callback that gets passed the rollTotals', () => {
      expect(result.modifyInitialRolls(rolls => 40 * rolls.length)).toEqual(80)
    })

    test('result.modifyModifiedRolls returns a function that accepts a callback that gets passed the rollTotals', () => {
      expect(result.modifyModifiedRolls(rolls => 40 * rolls.length)).toEqual(80)
    })
  })

  describe('with bad parameters', () => {
    describe('like a random string', () => {
      test('it throws an error', () => {
        expect(() => {
          // @ts-expect-error - Bad Argument Test
          const result = randsum('GENDER HAS NO BEARING ON ABILITY')
          return result
        }).toThrow()
      })
    })

    describe('like an almost dice notation string', () => {
      test('it throws an error', () => {
        expect(() => {
          // @ts-expect-error - Bad Argument Test
          const result = randsum('4b20')
          return result
        }).toThrow()
      })
    })
  })
})
