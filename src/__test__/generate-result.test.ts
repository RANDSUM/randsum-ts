import generateResult from '../generate-results'
import { InvalidUniqueError } from '../generate-results/applicators'
import * as CoreRandomFactory from '../generate-results/core-random-factory'
import * as MakeRolls from '../generate-results/make-rolls'
import { RollParameters } from '../types'

type BaseParameters = Omit<RollParameters, 'initialRolls' | 'rollOne'>
// type BaseRolls = Pick<RollParameters, 'initialRolls' | 'rollOne'>

describe('generateResult', () => {
  beforeEach(() => {
    jest.spyOn(CoreRandomFactory, 'default').mockReturnValueOnce(() => 200)
  })

  const rolls = [1, 2, 3, 4]
  const baseParameters: BaseParameters = {
    sides: 6,
    quantity: rolls.length,
    modifiers: []
  }

  describe('when given roll total with no modifiers', () => {
    beforeEach(() => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(rolls)
    })

    test('it returns the sum total of the quantity and the roll total', () => {
      expect(generateResult(baseParameters)).toMatchObject({
        total: 10,
        rolls: [1, 2, 3, 4]
      })
    })
  })

  describe('when given roll total with a "unique" modifier', () => {
    const duplicateRollTotals = [1, 1, 2, 3]
    const uniqueParameters: BaseParameters = {
      ...baseParameters,
      sides: 4,
      quantity: duplicateRollTotals.length,
      modifiers: [{ unique: true }]
    }

    beforeEach(() => {
      jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(duplicateRollTotals)
    })

    test('it re-quantity non-unique modifiers', () => {
      expect(generateResult(uniqueParameters)).toMatchObject({
        total: 206,
        rolls: [1, 200, 2, 3]
      })
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueParameters: BaseParameters = {
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
      const overflowParameters: BaseParameters = {
        ...uniqueParameters,
        quantity: overflowRollTotals.length
      }

      beforeEach(() => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(overflowRollTotals)
      })

      test('it throws an error', () => {
        expect(() => generateResult(overflowParameters)).toThrow(
          InvalidUniqueError
        )
      })
    })

    describe('when given custom sides', () => {
      const faces = ['r', 'a', 'n', 'd', 's', 'u', 'm']
      const customSidesParameters: BaseParameters = {
        ...baseParameters,
        faces,
        sides: faces.length
      }

      beforeEach(() => {
        jest.spyOn(MakeRolls, 'default').mockReturnValueOnce(rolls)
      })

      test('it returns the expected result as a string', () => {
        console.log('FOO')
        console.log('FOO')
        console.log(JSON.stringify(rolls))
        console.log(JSON.stringify(MakeRolls.default(4, () => 4)))
        console.log('FOO')
        expect(generateResult(customSidesParameters)).toMatchObject({
          total: 'r, a, n, d',
          rolls: ['r', 'a', 'n', 'd']
        })
      })
    })
  })

  // describe('when given roll total with a "drop" modifier', () => {
  //   const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  //   const dropParameters: BaseParameters = {
  //     ...baseParameters,
  //     sides: 10,
  //     quantity: longerRollTotals.length,
  //     modifiers: [
  //       {
  //         drop: {
  //           highest: 1,
  //           lowest: 2,
  //           greaterThan: 8,
  //           lessThan: 2,
  //           exact: [5]
  //         }
  //       }
  //     ]
  //   }
  //   const overflowRollGenerator = (): BaseRolls => ({
  //     ...baseRollGenerator(),
  //     initialRolls: longerRollTotals
  //   })

  //   test('it returns the total without the provided values', () => {
  //     expect(
  //       generateResult(dropParameters, overflowRollGenerator)
  //     ).toMatchObject({
  //       total: 17,
  //       rolls: [4, 6, 7]
  //     })
  //   })
  // })

  // describe('when given roll total with a "replace" modifier', () => {
  //   describe('that is a single replace modifiers', () => {
  //     const dropParameters: BaseParameters = {
  //       ...baseParameters,
  //       modifiers: [{ replace: { from: 1, to: 2 } }]
  //     }

  //     test('it returns the total with all values replaced according to the provided rules', () => {
  //       expect(generateResult(dropParameters)).toMatchObject({
  //         total: 11,
  //         rolls: [2, 2, 3, 4]
  //       })
  //     })
  //   })

  //   describe('that is an array of replace modifiers', () => {
  //     const dropParameters: BaseParameters = {
  //       ...baseParameters,
  //       modifiers: [
  //         {
  //           replace: [
  //             { from: 1, to: 2 },
  //             { from: { greaterThan: 3 }, to: 6 }
  //           ]
  //         }
  //       ]
  //     }

  //     test('it returns the total with all values replaced according to the provided rules', () => {
  //       expect(generateResult(dropParameters)).toMatchObject({
  //         total: 13,
  //         rolls: [2, 2, 3, 6]
  //       })
  //     })
  //   })
  // })

  // describe('when given roll total with an "explode" modifier', () => {
  //   const explodeRollTotals = [1, 2, 3, 6]
  //   const explodeParameters: BaseParameters = {
  //     ...baseParameters,
  //     modifiers: [{ explode: true }]
  //   }

  //   const explodeRollGenerator = (): BaseRolls => ({
  //     ...baseRollGenerator(),
  //     initialRolls: explodeRollTotals
  //   })

  //   test('it returns the total with all values matching the queries rerolled', () => {
  //     expect(generateResult(explodeParameters)).toMatchObject({
  //       total: 212,
  //       rolls: [1, 2, 3, 6, 200]
  //     })
  //   })
  // })

  // describe('when given roll total with a "reroll" modifier', () => {
  //   describe('when given an impossible roll', () => {
  //     const rerollParameters: BaseParameters = {
  //       ...baseParameters,
  //       modifiers: [{ reroll: { greaterThan: 3 } }]
  //     }

  //     beforeEach(() => {
  //       jest.spyOn(console, 'warn').mockImplementationOnce(() => true)
  //     })

  //     test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
  //       expect(generateResult(rerollParameters)).toMatchObject({
  //         total: 206,
  //         rolls: [1, 2, 3, 200]
  //       })
  //     })
  //   })

  //   describe('that is a single reroll modifier', () => {
  //     const rerollParameters: BaseParameters = {
  //       ...baseParameters,
  //       modifiers: [{ reroll: { greaterThan: 3, exact: 2, maxReroll: 2 } }]
  //     }

  //     test('it returns the total with all values matching the queries rerolled', () => {
  //       expect(generateResult(rerollParameters)).toMatchObject({
  //         total: 404,
  //         rolls: [1, 200, 3, 200]
  //       })
  //     })
  //   })

  //   describe('that is an array of reroll modifiers', () => {
  //     const rerollParameters: BaseParameters = {
  //       ...baseParameters,
  //       modifiers: [{ reroll: [{ lessThan: 2, maxReroll: 2 }, { exact: [3] }] }]
  //     }

  //     test('it returns the total with all values matching the queries rerolled', () => {
  //       expect(generateResult(rerollParameters)).toMatchObject({
  //         total: 406,
  //         rolls: [200, 2, 200, 4]
  //       })
  //     })
  //   })
  // })

  // describe('when given roll total with a "cap" modifier', () => {
  //   const dropParameters: BaseParameters = {
  //     ...baseParameters,
  //     modifiers: [{ cap: { greaterThan: 3, lessThan: 2 } }]
  //   }

  //   test('it returns the total with all values greaterThan greaterThan and lessThan lessThan replaced with their respective comparitor and the roll total', () => {
  //     expect(generateResult(dropParameters)).toMatchObject({
  //       total: 10,
  //       rolls: [2, 2, 3, 3]
  //     })
  //   })
  // })

  // describe('when given roll total with a "plus" modifier', () => {
  //   const dropParameters: BaseParameters = {
  //     ...baseParameters,
  //     modifiers: [{ plus: 2 }]
  //   }

  //   test('it returns the total plus the "plus" modifier, and the roll total', () => {
  //     expect(generateResult(dropParameters)).toMatchObject({
  //       total: 12,
  //       rolls: [1, 2, 3, 4]
  //     })
  //   })
  // })

  // describe('when given roll total with a "minus" modifier', () => {
  //   const dropParameters: BaseParameters = {
  //     ...baseParameters,
  //     modifiers: [{ minus: 2 }]
  //   }

  //   test('it returns the total minus the "minus" modifier, and the roll total', () => {
  //     expect(generateResult(dropParameters)).toMatchObject({
  //       total: 8,
  //       rolls: [1, 2, 3, 4]
  //     })
  //   })
  // })
})
