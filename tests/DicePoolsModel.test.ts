import { describe, expect, test } from 'bun:test'
import { DicePoolsModel } from '~models'

import { D } from '~src/D'
import { InvalidUniqueError } from '~src/models/ParametersModel/modifierApplicators'
import { DicePoolType, type DicePools, type Notation } from '~types'

function createMockNumericalDie(
  results: number[],
  rollResult: number = 200
): D<number> {
  return {
    roll: () => rollResult,
    rollMany: () => results
  } as unknown as D<number>
}

function createMockCustomDie(
  results: string[],
  rollResult: string = results[0]
): D<string[]> {
  return {
    roll: () => rollResult,
    rollMany: () => results
  } as unknown as D<string[]>
}

describe('DicePoolsModel.generateResult', () => {
  const testRollSet = [1, 2, 3, 4]
  const coreRawRolls = {
    'test-roll-id': testRollSet
  }

  const mockStandardDie = createMockNumericalDie([200])

  describe('when given roll total with no modifiers', () => {
    const coreParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          argument: '6d4',
          options: { sides: 6, quantity: testRollSet.length },
          die: createMockNumericalDie(testRollSet),
          notation: '6d4',
          description: ['roll 6d4']
        }
      }
    }

    test('it returns the sum total of the quantity and the roll total', () => {
      expect(DicePoolsModel.generateRollResult(coreParameters)).toMatchObject({
        ...coreParameters,
        rawRolls: coreRawRolls,
        total: 10,
        rawResult: [1, 2, 3, 4],
        result: [1, 2, 3, 4],
        type: DicePoolType.numerical
      })
    })
  })

  describe('when given roll total with a "unique" modifier', () => {
    const uniqueRolls = [1, 1, 2, 3]

    const uniqueParameters = {
      dicePools: {
        'test-roll-id': {
          die: createMockNumericalDie(uniqueRolls, 200),
          argument: 1,
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          options: {
            sides: 4,
            quantity: uniqueRolls.length,
            modifiers: { unique: true }
          }
        }
      }
    }

    test('it re-rolls non-unique modifiers', () => {
      const rawRolls = {
        'test-roll-id': uniqueRolls
      }

      expect(DicePoolsModel.generateRollResult(uniqueParameters)).toMatchObject(
        {
          ...uniqueParameters,
          rawRolls,
          modifiedRolls: {
            'test-roll-id': {
              rolls: [1, 200, 2, 3],
              total: 206
            }
          },
          total: 206,
          result: [1, 200, 2, 3],
          rawResult: [1, 1, 2, 3],
          type: DicePoolType.numerical
        }
      )
    })

    describe('when given a "notUnique" array', () => {
      const notUniqueParameters = {
        dicePools: {
          'test-roll-id': {
            die: createMockNumericalDie(uniqueRolls, 200),
            argument: 20,
            notation: '1d1' as Notation<number>,
            description: ['foo'],
            type: DicePoolType.numerical,
            options: {
              sides: 4,
              quantity: uniqueRolls.length,
              modifiers: { unique: { notUnique: [1] } }
            }
          }
        }
      }

      test('it disregards any numbers in that array and makes the rest unique', () => {
        const rawRolls = {
          'test-roll-id': uniqueRolls
        }

        expect(
          DicePoolsModel.generateRollResult(notUniqueParameters)
        ).toMatchObject({
          ...notUniqueParameters,
          rawRolls,
          modifiedRolls: {
            'test-roll-id': {
              rolls: [1, 1, 2, 3],
              total: 7
            }
          },
          total: 7,
          result: [1, 1, 2, 3],
          rawResult: uniqueRolls,
          type: DicePoolType.numerical
        })
      })
    })

    describe('and the # of quantity is greater than the sides of the die', () => {
      const overflowRollTotals = [1, 1, 1, 2, 3, 4, 3, 3]

      const overflowParameters = {
        dicePools: {
          'test-roll-id': {
            die: createMockNumericalDie(overflowRollTotals),
            notation: '1d1' as Notation<number>,
            description: ['foo'],
            argument: 20,
            type: DicePoolType.numerical,
            options: {
              sides: 6,
              quantity: overflowRollTotals.length,
              modifiers: { unique: true }
            }
          }
        }
      }

      test('it throws an error', () => {
        expect(() =>
          DicePoolsModel.generateRollResult(overflowParameters)
        ).toThrow(new InvalidUniqueError())
      })
    })
  })

  describe('when given custom sides', () => {
    const faces = ['r', 'a', 'n', 'd', 's', 'u', 'm']
    const customSidesRoll = ['r', 'a', 'n', 'd']

    const customSidesParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          die: createMockCustomDie(customSidesRoll),
          notation: '1d1' as Notation<'string'>,
          description: ['foo'],
          argument: 20,
          options: {
            sides: faces,
            quantity: 4
          }
        }
      }
    }

    test('it returns the expected result as a string', () => {
      const rawRolls = {
        'test-roll-id': customSidesRoll
      }

      expect(
        DicePoolsModel.generateRollResult(customSidesParameters)
      ).toMatchObject({
        ...customSidesParameters,
        rawRolls,
        modifiedRolls: {
          'test-roll-id': {
            rolls: customSidesRoll,
            total: 'r, a, n, d'
          }
        },
        total: 'r, a, n, d',
        rawResult: customSidesRoll,
        result: customSidesRoll,
        type: DicePoolType.custom
      })
    })
  })

  describe('when given roll total with a "drop" modifier', () => {
    const longerRollTotals = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const dropParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          argument: 20,
          die: createMockNumericalDie(longerRollTotals),
          options: {
            sides: 10,
            quantity: longerRollTotals.length,
            modifiers: {
              drop: {
                highest: 1,
                lowest: 2,
                greaterThan: 8,
                lessThan: 2,
                exact: [5]
              }
            }
          }
        }
      }
    }

    test('it returns the total without the provided values', () => {
      const rawRolls = {
        'test-roll-id': longerRollTotals
      }

      expect(DicePoolsModel.generateRollResult(dropParameters)).toMatchObject({
        ...dropParameters,
        rawRolls,
        modifiedRolls: {
          'test-roll-id': {
            rolls: [4, 6, 7],
            total: 17
          }
        },
        total: 17,
        rawResult: longerRollTotals,
        result: [4, 6, 7],
        type: DicePoolType.numerical
      })
    })
  })

  describe('when given roll total with a "replace" modifier', () => {
    describe('that is a single replace modifier', () => {
      const dropParameters: DicePools = {
        dicePools: {
          'test-roll-id': {
            argument: 20,
            notation: '1d1' as Notation<number>,
            description: ['foo'],
            die: createMockNumericalDie(testRollSet),
            options: {
              sides: 10,
              quantity: testRollSet.length,
              modifiers: { replace: { from: 1, to: 2 } }
            }
          }
        }
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(DicePoolsModel.generateRollResult(dropParameters)).toMatchObject(
          {
            ...dropParameters,
            rawRolls: coreRawRolls,
            modifiedRolls: {
              'test-roll-id': {
                rolls: [2, 2, 3, 4],
                total: 11
              }
            },
            total: 11,
            rawResult: testRollSet,
            result: [2, 2, 3, 4],
            type: DicePoolType.numerical
          }
        )
      })
    })

    describe('that is an array of replace modifiers', () => {
      const dropParameters: DicePools = {
        dicePools: {
          'test-roll-id': {
            argument: 20,
            notation: '1d1' as Notation<number>,
            description: ['foo'],
            die: createMockNumericalDie(testRollSet),
            options: {
              sides: 10,
              quantity: testRollSet.length,
              modifiers: {
                replace: [
                  { from: 1, to: 2 },
                  { from: { greaterThan: 3 }, to: 6 }
                ]
              }
            }
          }
        }
      }

      test('it returns the total with all values replaced according to the provided rules', () => {
        expect(DicePoolsModel.generateRollResult(dropParameters)).toMatchObject(
          {
            ...dropParameters,
            rawRolls: coreRawRolls,
            modifiedRolls: {
              'test-roll-id': {
                rolls: [2, 2, 3, 6],
                total: 13
              }
            },
            total: 13,
            rawResult: testRollSet,
            result: [2, 2, 3, 6],
            type: DicePoolType.numerical
          }
        )
      })
    })
  })

  describe('when given roll total with an "explode" modifier', () => {
    const explodeRollTotals = [1, 2, 3, 6]

    const explodeParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          argument: 20,
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          die: createMockNumericalDie(explodeRollTotals),
          options: {
            sides: 6,
            quantity: explodeRollTotals.length,
            modifiers: { explode: true }
          }
        }
      }
    }

    test('it returns the total with all values matching the queries rerolled', () => {
      const rawRolls = {
        'test-roll-id': explodeRollTotals
      }

      expect(
        DicePoolsModel.generateRollResult(explodeParameters)
      ).toMatchObject({
        ...explodeParameters,
        rawRolls,
        modifiedRolls: {
          'test-roll-id': {
            rolls: [1, 2, 3, 6, 200],
            total: 212
          }
        },
        total: 212,
        rawResult: explodeRollTotals,
        result: [1, 2, 3, 6, 200],
        type: DicePoolType.numerical
      })
    })
  })

  describe('when given roll total with a "reroll" modifier', () => {
    describe('when given an impossible roll', () => {
      const reDicePools: DicePools = {
        dicePools: {
          'test-roll-id': {
            argument: 20,
            notation: '1d1' as Notation<number>,
            description: ['foo'],
            options: {
              sides: 6,
              quantity: testRollSet.length,
              modifiers: { reroll: { greaterThan: 3 } }
            },
            die: createMockNumericalDie(testRollSet)
          }
        }
      }

      test('it stops at 99 rerolls and returns the total with all values matching the queries rerolled', () => {
        expect(DicePoolsModel.generateRollResult(reDicePools)).toMatchObject({
          ...reDicePools,
          rawRolls: coreRawRolls,
          modifiedRolls: {
            'test-roll-id': {
              rolls: [1, 2, 3, 200],
              total: 206
            }
          },
          total: 206,
          rawResult: [1, 2, 3, 4],
          result: [1, 2, 3, 200],
          type: DicePoolType.numerical
        })
      })
    })

    describe('that is a single reroll modifier', () => {
      const reDicePools: DicePools = {
        dicePools: {
          'test-roll-id': {
            argument: 20,
            notation: '1d1' as Notation<number>,
            description: ['foo'],
            options: {
              sides: 6,
              quantity: testRollSet.length,
              modifiers: {
                reroll: { greaterThan: 3, exact: [2], maxReroll: 2 }
              }
            },
            die: createMockNumericalDie(testRollSet)
          }
        }
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(DicePoolsModel.generateRollResult(reDicePools)).toMatchObject({
          ...reDicePools,
          rawRolls: coreRawRolls,
          modifiedRolls: {
            'test-roll-id': {
              rolls: [1, 200, 3, 200],
              total: 404
            }
          },
          total: 404,
          rawResult: [1, 2, 3, 4],
          result: [1, 200, 3, 200],
          type: DicePoolType.numerical
        })
      })
    })

    describe('that is an array of reroll modifiers', () => {
      const reDicePools: DicePools = {
        dicePools: {
          'test-roll-id': {
            argument: 20,
            notation: '1d1' as Notation<number>,
            description: ['foo'],
            options: {
              sides: 6,
              quantity: testRollSet.length,
              modifiers: {
                reroll: { lessThan: 2, maxReroll: 2, exact: [3] }
              }
            },
            die: createMockNumericalDie(testRollSet)
          }
        }
      }

      test('it returns the total with all values matching the queries rerolled', () => {
        expect(DicePoolsModel.generateRollResult(reDicePools)).toMatchObject({
          ...reDicePools,
          rawRolls: coreRawRolls,
          modifiedRolls: {
            'test-roll-id': {
              rolls: [200, 2, 200, 4],
              total: 406
            }
          },
          total: 406,
          rawResult: [1, 2, 3, 4],
          result: [200, 2, 200, 4],
          type: DicePoolType.numerical
        })
      })
    })
  })

  describe('when given roll total with a "cap" modifier', () => {
    const dropParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          argument: 20,
          options: {
            sides: 6,
            quantity: testRollSet.length,
            modifiers: { cap: { greaterThan: 3, lessThan: 2 } }
          },
          die: createMockNumericalDie(testRollSet)
        }
      }
    }

    test('it returns the total with all values greaterThan greaterThan and lessThan lessThan replaced with their respective comparitor and the roll total', () => {
      expect(DicePoolsModel.generateRollResult(dropParameters)).toMatchObject({
        ...dropParameters,
        rawRolls: coreRawRolls,
        modifiedRolls: {
          'test-roll-id': {
            rolls: [2, 2, 3, 3],
            total: 10
          }
        },
        total: 10,
        rawResult: [1, 2, 3, 4],
        result: [2, 2, 3, 3],
        type: DicePoolType.numerical
      })
    })
  })

  describe('when given roll total with a "plus" modifier', () => {
    const dropParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          argument: 20,
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          options: {
            sides: 6,
            quantity: testRollSet.length,
            modifiers: { plus: 2 }
          },
          die: createMockNumericalDie(testRollSet)
        }
      }
    }

    test('it returns the total plus the "plus" modifier, and the roll total', () => {
      expect(DicePoolsModel.generateRollResult(dropParameters)).toMatchObject({
        ...dropParameters,
        rawRolls: coreRawRolls,
        modifiedRolls: {
          'test-roll-id': {
            rolls: [1, 2, 3, 4],
            total: 12
          }
        },
        total: 12,
        rawResult: [1, 2, 3, 4],
        result: [1, 2, 3, 4],
        type: DicePoolType.numerical
      })
    })
  })

  describe('when given roll total with a "minus" modifier', () => {
    const dropParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          argument: 20,
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          options: {
            sides: 6,
            quantity: testRollSet.length,
            modifiers: { minus: 2 }
          },
          die: createMockNumericalDie(testRollSet)
        }
      }
    }

    test('it returns the total minus the "minus" modifier, and the roll total', () => {
      expect(DicePoolsModel.generateRollResult(dropParameters)).toMatchObject({
        ...dropParameters,
        rawRolls: coreRawRolls,
        modifiedRolls: {
          'test-roll-id': {
            rolls: [1, 2, 3, 4],
            total: 8
          }
        },
        total: 8,
        rawResult: [1, 2, 3, 4],
        result: [1, 2, 3, 4],
        type: DicePoolType.numerical
      })
    })
  })

  describe('when given multiple dice pools', () => {
    const parameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          argument: 20,
          options: { sides: 6, quantity: testRollSet.length },
          die: createMockNumericalDie(testRollSet)
        },
        'test-roll-id-2': {
          notation: '1d1' as Notation<number>,
          description: ['foo'],
          argument: 20,
          options: { sides: 6, quantity: testRollSet.length },
          die: createMockNumericalDie(testRollSet)
        }
      }
    }

    test('it returns the combined total', () => {
      const rawRolls = {
        'test-roll-id': testRollSet,
        'test-roll-id-2': testRollSet
      }

      expect(DicePoolsModel.generateRollResult(parameters)).toMatchObject({
        ...parameters,
        rawRolls,
        modifiedRolls: {
          'test-roll-id': {
            rolls: [1, 2, 3, 4],
            total: 10
          },
          'test-roll-id-2': {
            rolls: [1, 2, 3, 4],
            total: 10
          }
        },
        total: 20,
        rawResult: [1, 2, 3, 4, 1, 2, 3, 4],
        result: [1, 2, 3, 4, 1, 2, 3, 4],
        type: DicePoolType.numerical
      })
    })
  })

  describe('when given an roll total with an unrecognized modifier', () => {
    const dropParameters: DicePools = {
      dicePools: {
        'test-roll-id': {
          argument: 20,
          options: {
            sides: 6,
            quantity: testRollSet.length,
            modifiers: { foo: 2 }
          },
          die: mockStandardDie
        }
      }
    } as unknown as DicePools

    test('Throws an error', () => {
      expect(() => DicePoolsModel.generateRollResult(dropParameters)).toThrow(
        'Unknown modifier: foo'
      )
    })
  })
})
