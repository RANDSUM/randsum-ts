import { describe, expect, test } from 'bun:test'

import {
  CustomSides,
  CustomSidesDie,
  DicePoolParameters,
  RollParameters,
  StandardDie
} from '../src'
import parseArguments from '../src/roll/parse-arguments'
import { DiceNotation } from '../src/types/primitives'

const testableParams = (
  params: RollParameters
): {
  key: string
  value: DicePoolParameters<string> | DicePoolParameters<number>
}[] => {
  const pools = Object.entries(params.dicePools)
  return pools.map(([key, value]) => ({ key, value }))
}

describe('parseArguments', () => {
  describe('given undefined', () => {
    const argument = undefined

    test('returns a RollParameter matching the argument', () => {
      const params = parseArguments(argument)
      const testParam = testableParams(params)[0]

      expect(typeof testParam.key).toBe('string')
      expect(testParam.value).toMatchObject({
        argument,
        options: { quantity: 1, sides: 20 },
        die: new StandardDie(20)
      })
    })
  })

  describe('given a number', () => {
    const argument = 2

    test('returns a RollParameter matching the argument', () => {
      const params = parseArguments(argument)
      const testParam = testableParams(params)[0]

      expect(typeof testParam.key).toBe('string')
      expect(testParam.value).toMatchObject({
        argument,
        options: { quantity: 1, sides: argument },
        die: new StandardDie(argument)
      })
    })
  })

  describe('given custom sides', () => {
    const argument = ['h', 't']

    test('returns a RollParameter matching the argument', () => {
      const params = parseArguments(argument)
      const testParam = testableParams(params)[0]

      expect(typeof testParam.key).toBe('string')
      expect(testParam.value).toMatchObject({
        argument,
        options: { quantity: 1, sides: argument },
        die: new CustomSidesDie(argument)
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
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new StandardDie(argument.sides)
        })
      })
    })

    describe('simple with modifiers', () => {
      const argument = {
        quantity: 4,
        sides: 6,
        modifiers: {
          reroll: [
            {
              exact: [2, 1, 4]
            },
            { maxReroll: 3 }
          ],
          replace: { from: { greaterThan: 5 }, to: 1 },
          unique: true
        }
      }

      test('returns a RollParameter matching the argument', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new StandardDie(argument.sides)
        })
      })
    })

    describe('custom sides', () => {
      const argument = {
        quantity: 4,
        sides: ['r', 'a', 'n', 'd', 's', 'u', 'm']
      }
      test('returns a RollParameter matching the argument', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new CustomSidesDie(argument.sides)
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
          replace: [{ from: 6, to: 1 }],
          unique: { notUnique: [1, 2] },
          explode: true
        }
      }

      test('returns a RollParameter matching the argument', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: argument,
          die: new StandardDie(argument.sides)
        })
      })
    })
  })

  describe('given DiceNotation', () => {
    const coreTestString: DiceNotation<number> = '4d6'
    const coreRollParameters = { sides: 6, quantity: 4 }

    describe('given a basic notation', () => {
      const argument = coreTestString

      test('returns a RollParameter matching the notation', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: coreRollParameters,
          die: new StandardDie(coreRollParameters.sides)
        })
      })
    })

    describe('given a notation that uses custom faces', () => {
      describe('with a simple notation', () => {
        const argument: DiceNotation<string> = '4d{++--  }'
        const customSides = ['+', '+', '-', '-', ' ', ' ']

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: { quantity: 4, sides: customSides },
            die: new CustomSidesDie(customSides)
          })
        })
      })
    })

    describe('given a notation that contains a drop highest modifier', () => {
      describe('with a simple notation', () => {
        const argument: DiceNotation<number> = `${coreTestString}H`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { highest: 1 } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })

      describe('with a complex notation', () => {
        const argument: DiceNotation<number> = `${coreTestString}H2`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { highest: 2 } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })
    })

    describe('given a notation that contains a drop lowest modifier', () => {
      describe('with a simple notation', () => {
        const argument: DiceNotation<number> = `${coreTestString}L`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { lowest: 1 } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })

      describe('with a complex notation', () => {
        const argument: DiceNotation<number> = `${coreTestString}L2`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { lowest: 2 } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })
    })

    describe('given a notation that contains a drop less than, greater than, and exact', () => {
      describe('simple', () => {
        const argument: DiceNotation<number> = `${coreTestString}D{<2,>5,2,4}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: {
                drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] }
              }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })

      describe('complex', () => {
        const argument: DiceNotation<number> = `400d20D{<2,>5,2,4}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              sides: 20,
              quantity: 400,
              modifiers: {
                drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] }
              }
            },
            die: new StandardDie(20)
          })
        })
      })
    })

    describe('given a notation that contains a cap before and lessThan', () => {
      const argument: DiceNotation<number> = `${coreTestString}C<2>5`

      test('returns a RollParameter matching the notation', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { cap: { lessThan: 2, greaterThan: 5 } }
          },
          die: new StandardDie(coreRollParameters.sides)
        })
      })
    })

    describe('given a notation that contains a minus modifier', () => {
      const argument: DiceNotation<number> = `${coreTestString}-2`

      test('returns a RollParameter matching the notation', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { minus: 2 }
          },
          die: new StandardDie(coreRollParameters.sides)
        })
      })
    })

    describe('given a notation that contains a plus modifier', () => {
      const argument: DiceNotation<number> = `${coreTestString}+2`

      test('returns a RollParameter matching the notation', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { plus: 2 }
          },
          die: new StandardDie(coreRollParameters.sides)
        })
      })
    })

    describe('given a notation that contains a reroll modifier', () => {
      describe('with a simple value', () => {
        const argument: DiceNotation<number> = `${coreTestString}R{>6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { reroll: { greaterThan: 6 } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })

      describe('with a complex value', () => {
        const argument: DiceNotation<number> = `${coreTestString}R{5,2}3R{<6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: {
                reroll: { exact: [5, 2], lessThan: 6, maxReroll: 3 }
              }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })
    })

    describe('given a notation that contains a unique notation', () => {
      describe('with a unique notation', () => {
        const argument: DiceNotation<number> = `${coreTestString}U{5,6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { unique: { notUnique: [5, 6] } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })

      describe('with a simple unique notation', () => {
        const argument: DiceNotation<number> = `${coreTestString}U`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { unique: true }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })
    })

    describe('given a notation that contains an explode modifier', () => {
      const argument: DiceNotation<number> = `${coreTestString}!`

      test('returns a RollParameter matching the notation', () => {
        const params = parseArguments(argument)
        const testParam = testableParams(params)[0]

        expect(typeof testParam.key).toBe('string')
        expect(testParam.value).toMatchObject({
          argument,
          options: {
            ...coreRollParameters,
            modifiers: { explode: true }
          },
          die: new StandardDie(coreRollParameters.sides)
        })
      })
    })

    describe('given a notation that contains a replace modifier', () => {
      describe('with multiple replacements', () => {
        const argument: DiceNotation<number> = `${coreTestString}V{1=2,>2=6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
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
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })

      describe('with a single replaceent', () => {
        const argument: DiceNotation<number> = `${coreTestString}V{<2=6}`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
          expect(testParam.value).toMatchObject({
            argument,
            options: {
              ...coreRollParameters,
              modifiers: { replace: { from: { lessThan: 2 }, to: 6 } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })
    })

    describe('With a corner case dice notation', () => {
      describe('like an ordered dice notation', () => {
        test('it produces proper organized parameters', () => {
          const explodeFirstString: DiceNotation<number> = '4d6!H'
          const explodeParams = parseArguments(explodeFirstString)
          const explodeTestParam = testableParams(explodeParams)[0]

          expect(typeof explodeTestParam.key).toBe('string')
          expect(explodeTestParam.value).toMatchObject({
            argument: explodeFirstString,
            options: {
              ...coreRollParameters,
              modifiers: { explode: true, drop: { highest: 1 } }
            },
            die: new StandardDie(coreRollParameters.sides)
          })

          const dropFirstString: DiceNotation<number> = '4d6H!'
          const dropFirstParams = parseArguments(dropFirstString)
          const dropFirstTestParam = testableParams(dropFirstParams)[0]

          expect(typeof dropFirstTestParam.key).toBe('string')
          expect(dropFirstTestParam.value).toMatchObject({
            argument: dropFirstString,
            options: {
              ...coreRollParameters,
              modifiers: { drop: { highest: 1 }, explode: true }
            },
            die: new StandardDie(coreRollParameters.sides)
          })
        })
      })

      describe('like a complicated dice notation', () => {
        const argument: DiceNotation<number> = `10d20 H2 L V{1=2,>2=6} D{<2,>5,2,4} C<2>18 R{5,2}3 U{5}  R{<6} ! +2 -5 +3`

        test('returns a RollParameter matching the notation', () => {
          const params = parseArguments(argument)
          const testParam = testableParams(params)[0]

          expect(typeof testParam.key).toBe('string')
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
            die: new StandardDie(20)
          })
        })
      })
    })
  })

  describe('given an array of arguments', () => {
    const argument: [number, DiceNotation<number>, CustomSides] = [
      2,
      '4d6',
      ['h', 't']
    ]

    test('returns a RollParameter matching the argument', () => {
      const params = parseArguments(argument)
      const testables = testableParams(params)

      const numParams = testables[0]
      expect(typeof numParams.key).toBe('string')
      expect(numParams.value).toMatchObject({
        argument: argument[0],
        options: { quantity: 1, sides: 2 },
        die: new StandardDie(2)
      })

      const noteParams = testables[1]
      expect(typeof noteParams.key).toBe('string')
      expect(noteParams.value).toMatchObject({
        argument: argument[1],
        options: { quantity: 4, sides: 6 },
        die: new StandardDie(6)
      })

      const customParams = testables[2]
      expect(typeof customParams.key).toBe('string')
      expect(customParams.value).toMatchObject({
        argument: argument[2],
        options: { quantity: 1, sides: argument[2] },
        die: new CustomSidesDie(argument[2])
      })
    })
  })
})
