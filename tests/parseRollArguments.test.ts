import { describe, expect, test } from 'bun:test'

import { CustomSidesDie, StandardDie } from '~src/Die'
import { DiceNotation, DicePoolParameters, RollParameters } from '~types'
import parseRollArguments from '~src/parseRollArguments'

const testableParams = (
  params: RollParameters
): {
  key: string
  value: DicePoolParameters
}[] => {
  const pools = Object.entries(params.dicePools)
  return pools.map(([key, value]) => ({ key, value }))
}

describe('parseRollArguments', () => {
  describe('given undefined', () => {
    const argument = undefined

    test('returns a RollParameter matching the argument', () => {
      const params = parseRollArguments(argument)
      const testParam = testableParams(params)[0]

      expect(typeof testParam.key).toBe('string')
      expect(testParam.value).toMatchObject({
        argument,
        options: { quantity: 1, sides: 20 },
        die: new StandardDie(20),
        notation: '1d20',
        description: ['Roll 1 20-sided die']
      })
    })
  })

  describe('given a number', () => {
    const argument = 2

    test('returns a RollParameter matching the argument', () => {
      const params = parseRollArguments(argument)
      const testParam = testableParams(params)[0]

      expect(typeof testParam.key).toBe('string')
      expect(testParam.value).toMatchObject({
        argument,
        options: { quantity: 1, sides: argument },
        die: new StandardDie(argument),
        notation: '1d2',
        description: ['Roll 1 2-sided die']
      })
    })
  })

  describe('given custom sides', () => {
    const argument = ['h', 't']

    test('returns a RollParameter matching the argument', () => {
      const params = parseRollArguments(argument)
      const testParam = testableParams(params)[0]

      expect(typeof testParam.key).toBe('string')
      expect(testParam.value).toMatchObject({
        argument,
        options: { quantity: 1, sides: argument },
        die: new CustomSidesDie(argument),
        notation: '1d{ht}',
        description: ['Roll 1 die with the following sides: (h,t)']
      })
    })
  })

  describe('given Roll Options', () => {
    describe('simple', () => {
      const argument = {
        quantity: 4,
        sides: 6
      }

      test('returns a RollParameter matching the argument', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new StandardDie(argument.sides),
          notation: '4d6',
          description: ['Roll 4 6-sided dice']
        })
      })
    })

    describe('simple with modifiers', () => {
      const argument = {
        quantity: 4,
        sides: 6,
        modifiers: {
          reroll: {
            exact: [2, 1, 4],
            maxReroll: 3
          },
          replace: { from: { greaterThan: 5 }, to: 1 },
          unique: true
        }
      }

      test('returns a RollParameter matching the argument', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new StandardDie(argument.sides),
          notation: '4d6V{>5=1}R{2,1,4}3U',
          description: [
            'Roll 4 6-sided dice',
            'Replace greater than [5] with [1]',
            'Reroll [2] [1] and [4] (up to 3 times)',
            'No Duplicate Rolls'
          ]
        })
      })
    })

    describe('custom sides', () => {
      const argument = {
        quantity: 4,
        sides: ['r', 'a', 'n', 'd', 's', 'u', 'm']
      }

      test('returns a RollParameter matching the argument', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new CustomSidesDie(argument.sides),
          notation: '4d{randsum}',
          description: ['Roll 4 dice with the following sides: (r,a,n,d,s,u,m)']
        })
      })
    })

    describe('complex', () => {
      const argument = {
        quantity: 4,
        sides: 6,
        modifiers: {
          plus: 2,
          minus: 1,
          drop: {
            highest: undefined,
            greaterThan: 2,
            lessThan: 6,
            lowest: 1,
            exact: [2, 3]
          },
          reroll: { exact: undefined },
          cap: { greaterThan: 2, lessThan: 1 },
          replace: { from: 6, to: 1 },
          unique: { notUnique: [1, 2] },
          explode: true
        }
      }

      test('returns a RollParameter matching the argument', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new StandardDie(argument.sides),
          notation: '4d6C{>2,<1}LD{>2,<6,2,3}V{6=1}!U{1,2}+2-1',
          description: [
            'Roll 4 6-sided dice',
            'No Rolls greater than [2]',
            'No Rolls less than [1]',
            'Drop lowest',
            'Drop [2] and [3]',
            'Drop greater than [2]',
            'Drop less than [6]',
            'Replace [6] with [1]',
            'Exploding Dice',
            'No Duplicates (except [1] and [2])',
            'Add 2',
            'Subtract 1'
          ]
        })
      })
    })
  })

  describe('given DiceNotation', () => {
    const coreTestString: DiceNotation = '4d6'
    const coreRollParameters = { sides: 6, quantity: 4 }

    describe('given a basic notation', () => {
      const argument = coreTestString

      test('returns a RollParameter matching the notation', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: coreRollParameters,
          die: new StandardDie(coreRollParameters.sides),
          notation: '4d6',
          description: ['Roll 4 6-sided dice']
        })
      })
    })

    describe('given a notation that uses custom faces', () => {
      describe('with a simple notation', () => {
        const argument: DiceNotation = '4d{++--  }'
        const customSides = ['+', '+', '-', '-', ' ', ' ']

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: { quantity: 4, sides: customSides },
            die: new CustomSidesDie(customSides),
            notation: '4d{++--  }',
            description: ['Roll 4 dice with the following sides: (+,+,-,-, , )']
          })
        })
      })
    })

    describe('given a notation that contains a drop highest modifier', () => {
      describe('with a simple notation', () => {
        const argument: DiceNotation = `${coreTestString}H`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { highest: 1 } }
            },
            die: new StandardDie(coreRollParameters.sides),
            notation: '4d6H',
            description: ['Roll 4 6-sided dice', 'Drop highest']
          })
        })
      })

      describe('with a complex notation', () => {
        const argument: DiceNotation = `${coreTestString}H2`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { highest: 2 } }
            },
            die: new StandardDie(coreRollParameters.sides),
            notation: '4d6H2',
            description: ['Roll 4 6-sided dice', 'Drop highest 2']
          })
        })
      })
    })

    describe('given a notation that contains a drop lowest modifier', () => {
      describe('with a simple notation', () => {
        const argument: DiceNotation = `${coreTestString}L`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { lowest: 1 } }
            },
            die: new StandardDie(coreRollParameters.sides),
            notation: '4d6L',
            description: ['Roll 4 6-sided dice', 'Drop lowest']
          })
        })
      })

      describe('with a complex notation', () => {
        const argument: DiceNotation = `${coreTestString}L2`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { lowest: 2 } }
            },
            die: new StandardDie(coreRollParameters.sides),
            notation: '4d6L2',
            description: ['Roll 4 6-sided dice', 'Drop lowest 2']
          })
        })
      })
    })

    describe('given a notation that contains a drop less than, greater than, and exact', () => {
      const argument: DiceNotation = `${coreTestString}D{<2,>5,2,4}`

      test('returns a RollParameter matching the notation', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: {
              drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] }
            }
          },
          die: new StandardDie(coreRollParameters.sides),
          notation: '4d6D{>5,<2,2,4}',
          description: [
            'Roll 4 6-sided dice',
            'Drop [2] and [4]',
            'Drop greater than [5]',
            'Drop less than [2]'
          ]
        })
      })
    })

    describe('given a notation that contains a cap before and lessThan', () => {
      const argument: DiceNotation = `${coreTestString}C{<2,>5}`

      test('returns a RollParameter matching the notation', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { cap: { lessThan: 2, greaterThan: 5 } }
          },
          die: new StandardDie(coreRollParameters.sides),

          notation: '4d6C{>5,<2}',
          description: [
            'Roll 4 6-sided dice',
            'No Rolls greater than [5]',
            'No Rolls less than [2]'
          ]
        })
      })
    })

    describe('given a notation that contains a minus modifier', () => {
      const argument: DiceNotation = `${coreTestString}-2`

      test('returns a RollParameter matching the notation', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { minus: 2 }
          },
          die: new StandardDie(coreRollParameters.sides),
          notation: '4d6-2',
          description: ['Roll 4 6-sided dice', 'Subtract 2']
        })
      })
    })

    describe('given a notation that contains a plus modifier', () => {
      const argument: DiceNotation = `${coreTestString}+2`

      test('returns a RollParameter matching the notation', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { plus: 2 }
          },
          die: new StandardDie(coreRollParameters.sides),
          notation: '4d6+2',
          description: ['Roll 4 6-sided dice', 'Add 2']
        })
      })
    })

    describe('given a notation that contains a reroll modifier', () => {
      const argument: DiceNotation = `${coreTestString}R{5,20,<6,>2}3`

      test('returns a RollParameter matching the notation', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: {
              reroll: {
                exact: [5, 20],
                lessThan: 6,
                greaterThan: 2,
                maxReroll: 3
              }
            }
          },
          die: new StandardDie(coreRollParameters.sides),
          notation: '4d6R{5,20,>2,<6}3',
          description: [
            'Roll 4 6-sided dice',
            'Reroll [5] and [20], greater than [2] and less than [6] (up to 3 times)'
          ]
        })
      })
    })

    describe('given a notation that contains a unique notation', () => {
      describe('with a unique notation', () => {
        const argument: DiceNotation = `${coreTestString}U{5,6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { unique: { notUnique: [5, 6] } }
            },
            die: new StandardDie(coreRollParameters.sides),
            notation: '4d6U{5,6}',
            description: [
              'Roll 4 6-sided dice',
              'No Duplicates (except [5] and [6])'
            ]
          })
        })
      })

      describe('with a simple unique notation', () => {
        const argument: DiceNotation = `${coreTestString}U`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { unique: true }
            },
            die: new StandardDie(coreRollParameters.sides),
            notation: '4d6U',
            description: ['Roll 4 6-sided dice', 'No Duplicate Rolls']
          })
        })
      })
    })

    describe('given a notation that contains an explode modifier', () => {
      const argument: DiceNotation = `${coreTestString}!`

      test('returns a RollParameter matching the notation', () => {
        const params = parseRollArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { explode: true }
          },
          die: new StandardDie(coreRollParameters.sides),
          notation: '4d6!',
          description: ['Roll 4 6-sided dice', 'Exploding Dice']
        })
      })
    })

    describe('given a notation that contains a replace modifier', () => {
      describe('with multiple replacements', () => {
        const argument: DiceNotation = `${coreTestString}V{1=2,>2=6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: {
                replace: [
                  { from: 1, to: 2 },
                  { from: { greaterThan: 2 }, to: 6 }
                ]
              }
            },
            die: new StandardDie(coreRollParameters.sides),

            notation: '4d6V{1=2,>2=6}',
            description: [
              'Roll 4 6-sided dice',
              'Replace [1] with [2]',
              'Replace greater than [2] with [6]'
            ]
          })
        })
      })

      describe('with a single replacement', () => {
        const argument: DiceNotation = `${coreTestString}V{<2=6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { replace: [{ from: { lessThan: 2 }, to: 6 }] }
            },
            die: new StandardDie(coreRollParameters.sides),

            notation: '4d6V{<2=6}',
            description: [
              'Roll 4 6-sided dice',
              'Replace less than [2] with [6]'
            ]
          })
        })
      })
    })

    describe('With a corner case dice notation', () => {
      describe('like an ordered dice notation', () => {
        test('it produces proper organized parameters', () => {
          const explodeFirstString: DiceNotation = '4d6!H'
          const explodeParams = parseRollArguments(explodeFirstString)
          const explodeTestParam = testableParams(explodeParams)[0]

          expect(typeof explodeTestParam.key).toBe('string')
          expect(explodeTestParam.value).toMatchObject({
            argument: explodeFirstString,
            options: {
              ...coreRollParameters,
              modifiers: { explode: true, drop: { highest: 1 } }
            },
            die: new StandardDie(coreRollParameters.sides),
            notation: '4d6H!',
            description: [
              'Roll 4 6-sided dice',
              'Drop highest',
              'Exploding Dice'
            ]
          })

          const dropFirstString: DiceNotation = '4d6H!'
          const dropFirstParams = parseRollArguments(dropFirstString)
          const dropFirstTestParam = testableParams(dropFirstParams)[0]

          expect(typeof dropFirstTestParam.key).toBe('string')
          expect(dropFirstTestParam.value).toMatchObject({
            argument: dropFirstString,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { highest: 1 }, explode: true }
            },
            die: new StandardDie(coreRollParameters.sides),

            notation: '4d6H!',
            description: [
              'Roll 4 6-sided dice',
              'Drop highest',
              'Exploding Dice'
            ]
          })
        })
      })

      describe('like a complicated dice notation', () => {
        const argument: DiceNotation = `10d20 H2 L V{1=2,>2=6} D{<2,>5,2,4} C{<2,>18} R{5,2}3 U{5}  R{<6} ! +2 -5 +3`

        test('returns a RollParameter matching the notation', () => {
          const params = parseRollArguments(argument)
          const testParam = testableParams(params)[0]

          expect(testParam.value).toMatchObject({
            argument,
            options: {
              quantity: 10,
              sides: 20,
              modifiers: {
                drop: {
                  highest: 2,
                  lowest: 1,
                  exact: [2, 4],
                  greaterThan: 5,
                  lessThan: 2
                },
                replace: [
                  { from: 1, to: 2 },
                  { from: { greaterThan: 2 }, to: 6 }
                ],
                cap: { greaterThan: 18, lessThan: 2 },
                reroll: { exact: [5, 2], lessThan: 6, maxReroll: 3 },
                unique: { notUnique: [5] },
                explode: true,
                plus: 5,
                minus: 5
              }
            },
            die: new StandardDie(20),
            notation:
              '10d20C{>18,<2}H2LD{>5,<2,2,4}V{1=2,>2=6}R{5,2,<6}3!U{5}+5-5',
            description: [
              'Roll 10 20-sided dice',
              'No Rolls greater than [18]',
              'No Rolls less than [2]',
              'Drop highest 2',
              'Drop lowest',
              'Drop [2] and [4]',
              'Drop greater than [5]',
              'Drop less than [2]',
              'Replace [1] with [2]',
              'Replace greater than [2] with [6]',
              'Reroll [5] and [2], less than [6] (up to 3 times)',
              'Exploding Dice',
              'No Duplicates (except [5])',
              'Add 5',
              'Subtract 5'
            ]
          })
        })
      })
    })
  })

  describe('given an array of arguments', () => {
    const argument: [number, DiceNotation, string[]] = [2, '4d6', ['h', 't']]

    test('returns a RollParameter matching the argument', () => {
      const params = parseRollArguments(argument)
      const testables = testableParams(params)

      const numParams = testables[0]
      expect(numParams.value).toMatchObject({
        argument: argument[0],
        options: { quantity: 1, sides: 2 },
        die: new StandardDie(2),
        notation: '1d2',
        description: ['Roll 1 2-sided die']
      })

      const noteParams = testables[1]
      expect(noteParams.value).toMatchObject({
        argument: argument[1],
        options: { quantity: 4, sides: 6 },
        die: new StandardDie(6),
        notation: '4d6',
        description: ['Roll 4 6-sided dice']
      })

      const customParams = testables[2]
      expect(customParams.value).toMatchObject({
        argument: argument[2],
        options: { quantity: 1, sides: argument[2] },
        die: new CustomSidesDie(argument[2]),

        notation: '1d{ht}',
        description: ['Roll 1 die with the following sides: (h,t)']
      })
    })
  })
})
