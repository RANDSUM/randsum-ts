import { InvalidUniqueError } from 'errors'
import generateResult from 'generate-result'
import { InternalRollParameters, RollParamCore } from 'types'

const mockRandomizer = (): number => 5

describe('generateResult', () => {
  const rolls = [1, 2, 3, 4]
  const baseParameters: InternalRollParameters = {
    sides: 6,
    quantity: rolls.length,
    modifiers: [],
    faces: undefined,
    randomizer: mockRandomizer
  }
  const baseRollGenerator = (): RollParamCore => ({
    initialRolls: rolls,
    rollOne: () => 200
  })

  describe('when given roll total with no modifiers', () => {
    test('it returns the sum total of the quantity and the roll total', () => {
      expect(generateResult(baseParameters, baseRollGenerator)).toMatchObject({
        total: 10,
        rolls: [1, 2, 3, 4]
      })
    })

    test('it passes size, quantity, and randomizer from RollParameters to the Roll Generator', () => {
      const spyMockRandomizer = jest.fn()
      const mockRollGenerator = jest
        .fn()
        .mockReturnValue({ rollOnce: () => 200, initialRolls: [200] })

      generateResult(
        { ...baseParameters, randomizer: spyMockRandomizer },

        mockRollGenerator
      )

      expect(mockRollGenerator).toHaveBeenCalledWith(
        baseParameters.sides,
        baseParameters.quantity,
        spyMockRandomizer
      )
    })
  })

  describe('when given roll total with a "unique" modifier', () => {
    const duplicateRollTotals = [1, 1, 2, 3]
    const uniqueParameters: InternalRollParameters = {
      ...baseParameters,
      sides: 4,
      quantity: duplicateRollTotals.length,
      modifiers: [{ unique: true }]
    }
    const uniqueRollGenerator = (): RollParamCore => ({
      ...baseRollGenerator(),
      initialRolls: duplicateRollTotals
    })

    test('it re-quantity non-unique modifiers', () => {
      expect(
        generateResult(uniqueParameters, uniqueRollGenerator)
      ).toMatchObject({
        total: 206,
        rolls: [1, 200, 2, 3]
      })
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueParameters: InternalRollParameters = {
        ...uniqueParameters,
        modifiers: [{ unique: { notUnique: [1] } }]
      }

      test('it disregards any numbers in that array and makes the rest unique', () => {
        expect(
          generateResult(
            notUniqueParameters,

            uniqueRollGenerator
          )
        ).toMatchObject({
          total: 7,
          rolls: [1, 1, 2, 3]
        })
      })
    })

    describe('and the # of quantity is greater than the sides of the die', () => {
      const overflowRollTotals = [1, 1, 1, 2, 3, 4, 3, 3]
      const overflowParameters: InternalRollParameters = {
        ...uniqueParameters,
        quantity: overflowRollTotals.length
      }
      const overflowRollGenerator = (): RollParamCore => ({
        ...baseRollGenerator(),
        initialRolls: overflowRollTotals
      })

      test('it throws an error', () => {
        expect(() =>
          generateResult(
            overflowParameters,

            overflowRollGenerator
          )
        ).toThrow(InvalidUniqueError)
      })
    })
  })

  describe('when given custom sides', () => {
    const faces = ['r', 'a', 'n', 'd', 's', 'u', 'm']
    const customSidesParameters: InternalRollParameters = {
      ...baseParameters,
      faces,
      sides: faces.length,
      quantity: 2
    }
    test('it returns the expected result as a string', () => {
      expect(
        generateResult(customSidesParameters, baseRollGenerator)
      ).toMatchObject({
        total: 'r, a, n, d',
        rolls: ['r', 'a', 'n', 'd']
      })
    })
  })

  describe('when given roll total with a "drop" modifier', () => {
    const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dropParameters: InternalRollParameters = {
      ...baseParameters,
      sides: 10,
      quantity: longerRollTotals.length,
      modifiers: [
        {
          drop: {
            highest: 1,
            lowest: 2,
            greaterThan: 8,
            lessThan: 2,
            exact: [5]
          }
        }
      ]
    }
    const overflowRollGenerator = (): RollParamCore => ({
      ...baseRollGenerator(),
      initialRolls: longerRollTotals
    })

    test('it returns the total without the provided values', () => {
      expect(
        generateResult(dropParameters, overflowRollGenerator)
      ).toMatchObject({
        total: 17,
        rolls: [4, 6, 7]
      })
    })
  })

  describe('when given roll total with a "replace" modifier', () => {
    describe('that is a single replace modifiers', () => {
      const dropParameters: InternalRollParameters = {
        ...baseParameters,
        modifiers: [{ replace: { from: 1, to: 2 } }]
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(generateResult(dropParameters, baseRollGenerator)).toMatchObject(
          { total: 11, rolls: [2, 2, 3, 4] }
        )
      })
    })

    describe('that is an array of replace modifiers', () => {
      const dropParameters: InternalRollParameters = {
        ...baseParameters,
        modifiers: [
          {
            replace: [
              { from: 1, to: 2 },
              { from: { greaterThan: 3 }, to: 6 }
            ]
          }
        ]
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(generateResult(dropParameters, baseRollGenerator)).toMatchObject(
          { total: 13, rolls: [2, 2, 3, 6] }
        )
      })
    })
  })

  describe('when given roll total with an "explode" modifier', () => {
    const explodeRollTotals = [1, 2, 3, 6]
    const explodeParameters: InternalRollParameters = {
      ...baseParameters,
      modifiers: [{ explode: true }]
    }

    const explodeRollGenerator = (): RollParamCore => ({
      ...baseRollGenerator(),
      initialRolls: explodeRollTotals
    })

    test('it returns the total with all values matching the queries rerolled', () => {
      expect(
        generateResult(explodeParameters, explodeRollGenerator)
      ).toMatchObject({
        total: 212,
        rolls: [1, 2, 3, 6, 200]
      })
    })
  })

  describe('when given roll total with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      const rerollParameters: InternalRollParameters = {
        ...baseParameters,
        modifiers: [{ reroll: { greaterThan: 3 } }]
      }

      beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementationOnce(() => true)
      })

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        expect(
          generateResult(rerollParameters, baseRollGenerator)
        ).toMatchObject({
          total: 206,
          rolls: [1, 2, 3, 200]
        })
      })
    })

    describe('that is a single reroll modifier', () => {
      const rerollParameters: InternalRollParameters = {
        ...baseParameters,
        modifiers: [{ reroll: { greaterThan: 3, exact: 2, maxReroll: 2 } }]
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(
          generateResult(rerollParameters, baseRollGenerator)
        ).toMatchObject({
          total: 404,
          rolls: [1, 200, 3, 200]
        })
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const rerollParameters: InternalRollParameters = {
        ...baseParameters,
        modifiers: [{ reroll: [{ lessThan: 2, maxReroll: 2 }, { exact: [3] }] }]
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(
          generateResult(rerollParameters, baseRollGenerator)
        ).toMatchObject({
          total: 406,
          rolls: [200, 2, 200, 4]
        })
      })
    })
  })

  describe('when given roll total with a "cap" modifier', () => {
    const dropParameters: InternalRollParameters = {
      ...baseParameters,
      modifiers: [{ cap: { greaterThan: 3, lessThan: 2 } }]
    }

    test('it returns the total with all values greaterThan greaterThan and lessThan lessThan replaced with their respective comparitor and the roll total', () => {
      expect(generateResult(dropParameters, baseRollGenerator)).toMatchObject({
        total: 10,
        rolls: [2, 2, 3, 3]
      })
    })
  })

  describe('when given roll total with a "plus" modifier', () => {
    const dropParameters: InternalRollParameters = {
      ...baseParameters,
      modifiers: [{ plus: 2 }]
    }

    test('it returns the total plus the "plus" modifier, and the roll total', () => {
      expect(generateResult(dropParameters, baseRollGenerator)).toMatchObject({
        total: 12,
        rolls: [1, 2, 3, 4]
      })
    })
  })

  describe('when given roll total with a "minus" modifier', () => {
    const dropParameters: InternalRollParameters = {
      ...baseParameters,
      modifiers: [{ minus: 2 }]
    }

    test('it returns the total minus the "minus" modifier, and the roll total', () => {
      expect(generateResult(dropParameters, baseRollGenerator)).toMatchObject({
        total: 8,
        rolls: [1, 2, 3, 4]
      })
    })
  })

  describe('when given roll total with an unrecognized modifier', () => {
    const dropParameters: InternalRollParameters = {
      ...baseParameters,
      modifiers: [{ minus: 2 }]
    }

    test('it returns the total minus the "minus" modifier, and the roll total', () => {
      expect(generateResult(dropParameters, baseRollGenerator)).toMatchObject({
        total: 8,
        rolls: [1, 2, 3, 4]
      })
    })
  })
})
