import { CustomSidesDicePool, StandardDicePool } from '../../Die'
import { Modifier } from '../../types/options'
import generateResult from '../generate-results'
import { InvalidUniqueError } from '../generate-results/apply-modifiers'

describe('generateResult', () => {
  const testRollSet = [1, 2, 3, 4]
  const coreParameters = {
    argument: undefined,
    sides: 6,
    dice: [],
    faces: [1, 2, 3, 4, 5, 6],
    quantity: testRollSet.length,
    modifiers: [] as Modifier<number>[],
    initialRolls: testRollSet,
    pool: {
      dice: [{ roll: jest.fn().mockReturnValue(200) }]
    } as unknown as StandardDicePool
  }

  describe('when given roll total with no modifiers', () => {
    test('it returns the sum total of the quantity and the roll total', () => {
      expect(generateResult(coreParameters)).toMatchObject({
        total: 10,
        rolls: [1, 2, 3, 4]
      })
    })
  })

  describe('when given roll total with a "unique" modifier', () => {
    const uniqueRolls = [1, 1, 2, 3]
    const uniqueParameters = {
      ...coreParameters,
      sides: 4,
      initialRolls: uniqueRolls,
      modifiers: [{ unique: true }]
    }

    test('it re-quantity non-unique modifiers', () => {
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
        initialRolls: overflowRollTotals,
        quantity: overflowRollTotals.length
      }

      test('it throws an error', () => {
        expect(() => generateResult(overflowParameters)).toThrow(
          InvalidUniqueError
        )
      })
    })
  })

  describe('when given custom sides', () => {
    const faces = ['r', 'a', 'n', 'd', 's', 'u', 'm']
    const customSidesParameters = {
      ...coreParameters,
      pool: new CustomSidesDicePool([{ quantity: 4, sides: faces }]),
      initialRolls: ['r', 'a', 'n', 'd'],
      faces,
      sides: faces.length
    }

    test('it returns the expected result as a string', () => {
      expect(generateResult(customSidesParameters)).toMatchObject({
        total: 'r, a, n, d',
        rolls: ['r', 'a', 'n', 'd']
      })
    })
  })

  describe('when given roll total with a "drop" modifier', () => {
    const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dropParameters = {
      ...coreParameters,
      sides: 10,
      quantity: longerRollTotals.length,
      initialRolls: longerRollTotals,
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
      expect(generateResult(dropParameters)).toMatchObject({
        total: 17,
        rolls: [4, 6, 7]
      })
    })
  })

  describe('when given roll total with a "replace" modifier', () => {
    describe('that is a single replace modifiers', () => {
      const dropParameters = {
        ...coreParameters,
        modifiers: [{ replace: { from: 1, to: 2 } }]
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(generateResult(dropParameters)).toMatchObject({
          total: 11,
          rolls: [2, 2, 3, 4]
        })
      })
    })

    describe('that is an array of replace modifiers', () => {
      const dropParameters = {
        ...coreParameters,
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
      ...coreParameters,
      initialRolls: explodeRollTotals,
      modifiers: [{ explode: true }]
    }

    test('it returns the total with all values matching the queries rerolled', () => {
      expect(generateResult(explodeParameters)).toMatchObject({
        total: 212,
        rolls: [1, 2, 3, 6, 200]
      })
    })
  })

  describe('when given roll total with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      const rerollParameters = {
        ...coreParameters,
        modifiers: [{ reroll: { greaterThan: 3 } }]
      }

      beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementationOnce(() => true)
      })

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        expect(generateResult(rerollParameters)).toMatchObject({
          total: 206,
          rolls: [1, 2, 3, 200]
        })
      })
    })

    describe('that is a single reroll modifier', () => {
      const rerollParameters = {
        ...coreParameters,
        modifiers: [{ reroll: { greaterThan: 3, exact: 2, maxReroll: 2 } }]
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(generateResult(rerollParameters)).toMatchObject({
          total: 404,
          rolls: [1, 200, 3, 200]
        })
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const rerollParameters = {
        ...coreParameters,
        modifiers: [{ reroll: [{ lessThan: 2, maxReroll: 2 }, { exact: [3] }] }]
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(generateResult(rerollParameters)).toMatchObject({
          total: 406,
          rolls: [200, 2, 200, 4]
        })
      })
    })
  })

  describe('when given roll total with a "cap" modifier', () => {
    const dropParameters = {
      ...coreParameters,
      modifiers: [{ cap: { greaterThan: 3, lessThan: 2 } }]
    }

    test('it returns the total with all values greaterThan greaterThan and lessThan lessThan replaced with their respective comparitor and the roll total', () => {
      expect(generateResult(dropParameters)).toMatchObject({
        total: 10,
        rolls: [2, 2, 3, 3]
      })
    })
  })

  describe('when given roll total with a "plus" modifier', () => {
    const dropParameters = {
      ...coreParameters,
      modifiers: [{ plus: 2 }]
    }

    test('it returns the total plus the "plus" modifier, and the roll total', () => {
      expect(generateResult(dropParameters)).toMatchObject({
        total: 12,
        rolls: [1, 2, 3, 4]
      })
    })
  })

  describe('when given roll total with a "minus" modifier', () => {
    const dropParameters = {
      ...coreParameters,
      modifiers: [{ minus: 2 }]
    }

    test('it returns the total minus the "minus" modifier, and the roll total', () => {
      expect(generateResult(dropParameters)).toMatchObject({
        total: 8,
        rolls: [1, 2, 3, 4]
      })
    })
  })
})
