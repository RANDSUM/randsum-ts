import { describe, expect, test } from 'bun:test'

import parseArguments from '../src/roll/parse-arguments'
import { DiceNotation } from '../src/types/primitives'

describe('parseArguments', () => {
  describe('given undefined', () => {
    const arg = undefined
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments(arg)).toMatchObject({
        diceOptions: [{ sides: 20 }]
      })
    })
  })

  describe('given a number string', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments('2')).toMatchObject({ diceOptions: [{ sides: 2 }] })
    })
  })

  describe('given a number', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments(2)).toMatchObject({
        diceOptions: [{ sides: 2 }]
      })
    })
  })

  describe('given custom sides', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments(['h', 't'])).toMatchObject({
        diceOptions: [{ quantity: 1, sides: ['h', 't'] }]
      })
    })
  })

  describe('given Roll Options', () => {
    describe('simple', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments({
            quantity: 4,
            sides: '6'
          })
        ).toMatchObject({
          diceOptions: [{ sides: 6, quantity: 4 }]
        })
      })
    })

    describe('simple with modifiers', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments({
            quantity: 4,
            sides: '6',
            modifiers: [
              {
                reroll: [{ exact: ['2', 1] }, { exact: 4 }, { maxReroll: 3 }]
              },
              { replace: { from: { greaterThan: 5 }, to: '1' } },
              { unique: true }
            ]
          })
        ).toMatchObject({
          diceOptions: [{ sides: 6, quantity: 4 }],
          modifiers: [
            {
              reroll: [{ exact: [2, 1] }, { exact: [4] }, { maxReroll: 3 }]
            },
            { replace: { from: { greaterThan: 5 }, to: 1 } },
            { unique: true }
          ]
        })
      })
    })

    describe('custom sides', () => {
      test('returns a RollParameter matching the notation', () => {
        const options = {
          quantity: 4,
          sides: ['r', 'a', 'n', 'd', 's', 'u', 'm']
        }
        expect(parseArguments(options)).toMatchObject({
          diceOptions: [options],
          modifiers: []
        })
      })
    })

    describe('complex', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments({
            quantity: 4,
            sides: 6,
            modifiers: [
              { plus: 2 },
              { minus: 1 },
              {
                drop: {
                  highest: undefined,
                  greaterThan: '2',
                  lessThan: '6',
                  lowest: '1',
                  exact: [2, '3']
                }
              },
              { reroll: { exact: undefined } },
              { cap: { greaterThan: '2', lessThan: 1 } },
              { replace: [{ from: '6', to: '1' }] },
              { unique: { notUnique: ['1', 2] } },
              { explode: true }
            ]
          })
        ).toMatchObject({
          diceOptions: [{ sides: 6, quantity: 4 }],
          modifiers: [
            { plus: 2 },
            { minus: 1 },
            {
              drop: {
                highest: undefined,
                greaterThan: 2,
                lessThan: 6,
                lowest: 1,
                exact: [2, 3]
              }
            },
            {
              reroll: {
                greaterThan: undefined,
                lessThan: undefined,
                maxReroll: undefined
              }
            },
            { cap: { greaterThan: 2, lessThan: 1 } },
            { replace: [{ from: 6, to: 1 }] },
            { unique: { notUnique: [1, 2] } },
            { explode: true }
          ]
        })
      })
    })
  })

  describe('given DiceNotation', () => {
    const coreTestString: DiceNotation<number> = '4d6'
    const coreRollParameters = { sides: 6, quantity: 4 }

    describe('given a basic notation', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(coreTestString)).toMatchObject({
          diceOptions: [coreRollParameters]
        })
      })
    })

    describe('given a notation that uses custom faces', () => {
      describe('with a simple notation', () => {
        const testString: DiceNotation<string> = '4d{++--  }'

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [
              {
                sides: ['+', '+', '-', '-', ' ', ' '],
                quantity: 4
              }
            ]
          })
        })
      })
    })

    describe('given a notation that contains a drop highest modifier', () => {
      describe('with a simple notation', () => {
        const testString: DiceNotation<number> = `${coreTestString}H`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ drop: { highest: 1 } }]
          })
        })
      })

      describe('with a complex notation', () => {
        const testString: DiceNotation<number> = `${coreTestString}H2`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ drop: { highest: 2 } }]
          })
        })
      })
    })

    describe('given a notation that contains a drop lowest modifier', () => {
      describe('with a simple notation', () => {
        const testString: DiceNotation<number> = `${coreTestString}L`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ drop: { lowest: 1 } }]
          })
        })
      })

      describe('with a complex notation', () => {
        const testString: DiceNotation<number> = `${coreTestString}L2`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ drop: { lowest: 2 } }]
          })
        })
      })
    })

    describe('given a notation that contains a drop less than, greater than, and exact', () => {
      describe('simple', () => {
        const testString: DiceNotation<number> = `${coreTestString}D{<2,>5,2,4}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [
              { drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] } }
            ]
          })
        })
      })

      describe('complex', () => {
        const testString: DiceNotation<number> = `400d20D{<2,>5,2,4}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [
              {
                quantity: 400,
                sides: 20
              }
            ],
            modifiers: [
              { drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] } }
            ]
          })
        })
      })
    })

    describe('given a notation that contains a cap before and lessThan', () => {
      const testString: DiceNotation<number> = `${coreTestString}C<2>5`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          diceOptions: [coreRollParameters],
          modifiers: [{ cap: { lessThan: 2, greaterThan: 5 } }]
        })
      })
    })

    describe('given a notation that contains a minus modifier', () => {
      const testString: DiceNotation<number> = `${coreTestString}-2`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          diceOptions: [coreRollParameters],
          modifiers: [{ minus: 2 }]
        })
      })
    })

    describe('given a notation that contains a plus modifier', () => {
      const testString: DiceNotation<number> = `${coreTestString}+2`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          diceOptions: [coreRollParameters],
          modifiers: [{ plus: 2 }]
        })
      })
    })

    describe('given a notation that contains a reroll modifier', () => {
      describe('with a simple value', () => {
        const testString: DiceNotation<number> = `${coreTestString}R{>6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ reroll: { greaterThan: 6 } }]
          })
        })
      })

      describe('with a complex value', () => {
        const testString: DiceNotation<number> = `${coreTestString}R{5,2,<6}3`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [
              { reroll: { exact: [5, 2], lessThan: 6, maxReroll: 3 } }
            ]
          })
        })
      })
    })

    describe('given a notation that contains a unique notation', () => {
      describe('with a unique notation', () => {
        const testString: DiceNotation<number> = `${coreTestString}U{5,6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ unique: { notUnique: [5, 6] } }]
          })
        })
      })

      describe('with a simple unique notation', () => {
        const testString: DiceNotation<number> = `${coreTestString}U`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ unique: true }]
          })
        })
      })
    })

    describe('given a notation that contains an explode modifier', () => {
      const testString: DiceNotation<number> = `${coreTestString}!`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          diceOptions: [coreRollParameters],
          modifiers: [{ explode: true }]
        })
      })
    })

    describe('given a notation that contains a replace modifier', () => {
      describe('with multiple replacements', () => {
        const testString: DiceNotation<number> = `${coreTestString}V{1=2,>2=6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [
              {
                replace: [
                  { from: 1, to: 2 },
                  { from: { greaterThan: 2 }, to: 6 }
                ]
              }
            ]
          })
        })
      })

      describe('with a single replaceent', () => {
        const testString: DiceNotation<number> = `${coreTestString}V{<2=6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [coreRollParameters],
            modifiers: [{ replace: { from: { lessThan: 2 }, to: 6 } }]
          })
        })
      })
    })

    describe('With a corner case dice notation', () => {
      describe('like an ordered dice notation', () => {
        test('it produces proper organized parameters', () => {
          const explodeFirstString: DiceNotation<number> = '4d6!H'
          const dropFirstString: DiceNotation<number> = '4d6H!'

          expect(parseArguments(explodeFirstString)).toMatchObject({
            diceOptions: [
              {
                quantity: 4,
                sides: 6
              }
            ],
            modifiers: [{ explode: true }, { drop: { highest: 1 } }]
          })

          expect(parseArguments(dropFirstString)).toMatchObject({
            diceOptions: [
              {
                quantity: 4,
                sides: 6
              }
            ],
            modifiers: [{ drop: { highest: 1 } }, { explode: true }]
          })
        })
      })

      describe('like a complicated dice notation', () => {
        const testString: DiceNotation<number> = `10d20 H2 L V{1=2,>2=6} D{<2,>5,2,4} C<2>18 R{5,2,<6}3 U{5} ! +2 -5 +3`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            diceOptions: [
              {
                quantity: 10,
                sides: 20
              }
            ],
            modifiers: [
              {
                drop: {
                  highest: 2
                }
              },
              {
                drop: {
                  lowest: 1
                }
              },
              {
                replace: [
                  { from: 1, to: 2 },
                  { from: { greaterThan: 2 }, to: 6 }
                ]
              },
              {
                drop: {
                  exact: [2, 4],
                  greaterThan: 5,
                  lessThan: 2
                }
              },
              { cap: { greaterThan: 18, lessThan: 2 } },
              { reroll: { exact: [5, 2], lessThan: 6, maxReroll: 3 } },
              { unique: { notUnique: [5] } },
              { explode: true },
              { plus: 2 },
              { minus: 5 },
              { plus: 3 }
            ]
          })
        })
      })
    })
  })
})
