import generateResult from '../generate-results'
import { InvalidUniqueError } from '../generate-results/applicators'
import * as CoreRandomFactory from '../generate-results/core-random-factory'
import * as MakeRolls from '../generate-results/make-rolls'
import { Modifier } from '../parse-arguments/types'

describe('generateResult', () => {
  beforeEach(() => {
    jest.spyOn(CoreRandomFactory, 'default').mockReturnValueOnce(() => 200)
  })

  const testRollSet = [1, 2, 3, 4]
  const baseParameters = {
    sides: 6,
    quantity: testRollSet.length,
    modifiers: [] as Modifier<number>[],
    initialRolls: [] as number[]
  }

  describe('when given roll total with no modifiers', () => {
    test('it returns the sum total of the quantity and the roll total', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

      expect(generateResult(baseParameters)).toMatchObject({
        total: 10,
        rolls: [1, 2, 3, 4]
      })
    })
  })

  describe('when given roll total with a "unique" modifier', () => {
    const uniqueRolls = [1, 1, 2, 3]
    const uniqueParameters = {
      ...baseParameters,
      sides: 4,
      modifiers: [{ unique: true }]
    }

    test('it re-quantity non-unique modifiers', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(uniqueRolls)

      expect(generateResult(uniqueParameters)).toMatchObject({
        total: 206,
        rolls: [1, 200, 2, 3]
      })
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueParameters = {
        ...uniqueParameters,
        modifiers: [{ unique: { notUnique: [1] } }]
      }

      test('it disregards any numbers in that array and makes the rest unique', () => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(uniqueRolls)

        expect(generateResult(notUniqueParameters)).toMatchObject({
          total: 7,
          rolls: [1, 1, 2, 3]
        })
      })
    })

    describe('and the # of quantity is greater than the sides of the die', () => {
      const overflowRollTotals = [1, 1, 1, 2, 3, 4, 3, 3]
      const overflowParameters = {
        ...uniqueParameters,
        quantity: overflowRollTotals.length
      }

      test('it throws an error', () => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(overflowRollTotals)

        expect(() => generateResult(overflowParameters)).toThrow(
          InvalidUniqueError
        )
      })
    })
  })

  describe('when given custom sides', () => {
    const faces = ['r', 'a', 'n', 'd', 's', 'u', 'm']
    const customSidesParameters = {
      ...baseParameters,
      faces,
      sides: faces.length
    }

    test('it returns the expected result as a string', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

      expect(generateResult(customSidesParameters)).toMatchObject({
        total: 'r, a, n, d',
        rolls: ['r', 'a', 'n', 'd']
      })
    })
  })

  describe('when given roll total with a "drop" modifier', () => {
    const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dropParameters = {
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

    test('it returns the total without the provided values', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(longerRollTotals)

      expect(generateResult(dropParameters)).toMatchObject({
        total: 17,
        rolls: [4, 6, 7]
      })
    })
  })

  describe('when given roll total with a "replace" modifier', () => {
    describe('that is a single replace modifiers', () => {
      const dropParameters = {
        ...baseParameters,
        modifiers: [{ replace: { from: 1, to: 2 } }]
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

        expect(generateResult(dropParameters)).toMatchObject({
          total: 11,
          rolls: [2, 2, 3, 4]
        })
      })
    })

    describe('that is an array of replace modifiers', () => {
      const dropParameters = {
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
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

        expect(generateResult(dropParameters)).toMatchObject({
          total: 13,
          rolls: [2, 2, 3, 6]
        })
      })
    })
  })

  describe('when given roll total with an "explode" modifier', () => {
    const explodeRollTotals = [1, 2, 3, 6]
    const explodeParameters = {
      ...baseParameters,
      modifiers: [{ explode: true }]
    }

    test('it returns the total with all values matching the queries rerolled', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(explodeRollTotals)

      expect(generateResult(explodeParameters)).toMatchObject({
        total: 212,
        rolls: [1, 2, 3, 6, 200]
      })
    })
  })

  describe('when given roll total with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      const rerollParameters = {
        ...baseParameters,
        modifiers: [{ reroll: { greaterThan: 3 } }]
      }

      beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementationOnce(() => true)
      })

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

        expect(generateResult(rerollParameters)).toMatchObject({
          total: 206,
          rolls: [1, 2, 3, 200]
        })
      })
    })

    describe('that is a single reroll modifier', () => {
      const rerollParameters = {
        ...baseParameters,
        modifiers: [{ reroll: { greaterThan: 3, exact: 2, maxReroll: 2 } }]
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

        expect(generateResult(rerollParameters)).toMatchObject({
          total: 404,
          rolls: [1, 200, 3, 200]
        })
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const rerollParameters = {
        ...baseParameters,
        modifiers: [{ reroll: [{ lessThan: 2, maxReroll: 2 }, { exact: [3] }] }]
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

        expect(generateResult(rerollParameters)).toMatchObject({
          total: 406,
          rolls: [200, 2, 200, 4]
        })
      })
    })
  })

  describe('when given roll total with a "cap" modifier', () => {
    const dropParameters = {
      ...baseParameters,
      modifiers: [{ cap: { greaterThan: 3, lessThan: 2 } }]
    }

    test('it returns the total with all values greaterThan greaterThan and lessThan lessThan replaced with their respective comparitor and the roll total', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

      expect(generateResult(dropParameters)).toMatchObject({
        total: 10,
        rolls: [2, 2, 3, 3]
      })
    })
  })

  describe('when given roll total with a "plus" modifier', () => {
    const dropParameters = {
      ...baseParameters,
      modifiers: [{ plus: 2 }]
    }

    test('it returns the total plus the "plus" modifier, and the roll total', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

      expect(generateResult(dropParameters)).toMatchObject({
        total: 12,
        rolls: [1, 2, 3, 4]
      })
    })
  })

  describe('when given roll total with a "minus" modifier', () => {
    const dropParameters = {
      ...baseParameters,
      modifiers: [{ minus: 2 }]
    }

    test('it returns the total minus the "minus" modifier, and the roll total', () => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(testRollSet)

      expect(generateResult(dropParameters)).toMatchObject({
        total: 8,
        rolls: [1, 2, 3, 4]
      })
    })
  })
})
