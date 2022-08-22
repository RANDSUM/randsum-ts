import { DiceNotation } from '../types'
import { parseArguments } from './parse-arguments'

describe('parseArguments', () => {
  describe('given a number string', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments('2')).toMatchObject({ quantity: 1, sides: 2 })
    })

    describe('and a complex RandsumOptionsWithoutSides object', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments('2', { quantity: 3, detailed: true }),
        ).toMatchObject({
          quantity: 3,
          sides: 2,
          detailed: true,
        })
      })
    })
  })

  describe('given a number', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments(2)).toMatchObject({ quantity: 1, sides: 2 })
    })

    describe('and a complex RandsumOptionWithoutSides', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments(2, { quantity: 3, detailed: true }),
        ).toMatchObject({
          quantity: 3,
          sides: 2,
          detailed: true,
        })
      })
    })
  })

  describe('given Roll Options', () => {
    describe('simple', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments({
            quantity: 4,
            sides: '6',
            modifiers: [
              { reroll: { exact: ['2', 1] } },
              { replace: { from: '6', to: '1' } },
              { unique: true },
            ],
          }),
        ).toMatchObject({
          quantity: 4,
          sides: 6,
          modifiers: expect.arrayContaining([
            { reroll: { exact: [2, 1] } },
            { replace: { from: 6, to: 1 } },
            { unique: true },
          ]),
        })
      })
    })

    describe('complex', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments({
            quantity: 4,
            sides: '6',
            modifiers: [
              { plus: 2 },
              { minus: 1 },
              {
                drop: {
                  highest: '5',
                  greaterThan: '2',
                  lessThan: '6',
                  lowest: '1',
                  exact: [2, '3'],
                },
              },
              { reroll: [{ exact: ['2', 1] }] },
              { cap: { greaterThan: '2', lessThan: 1 } },
              { replace: [{ from: '6', to: '1' }] },
              { unique: { notUnique: ['1', 2] } },
              { explode: true },
            ],
          }),
        ).toMatchObject({
          quantity: 4,
          sides: 6,
          modifiers: expect.arrayContaining([
            {
              drop: {
                highest: 5,
                greaterThan: 2,
                lessThan: 6,
                lowest: 1,
                exact: [2, 3],
              },
            },
            { reroll: [{ exact: [2, 1] }] },
            { cap: { greaterThan: 2, lessThan: 1 } },
            { replace: [{ from: 6, to: 1 }] },
            { unique: { notUnique: [1, 2] } },
            { explode: true },
            { plus: 2 },
            { minus: 1 },
          ]),
        })
      })
    })
  })

  describe('given DiceNotation', () => {
    const baseTestString: DiceNotation = '4d6'
    const baseRollParameters = { sides: 6, quantity: 4 }

    describe('given a basic notation', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(baseTestString)).toMatchObject(baseRollParameters)
      })

      describe('and a UserOptions object', () => {
        const userOptions = { detailed: false, randomizer: () => 1 }

        test('returns a RollParameter matching the notation and detailed options', () => {
          expect(parseArguments(baseTestString, userOptions)).toMatchObject({
            ...baseRollParameters,
            detailed: userOptions.detailed,
          })
        })
      })
    })

    describe('given a notation that contains a drop highest modifier', () => {
      describe('with a simple notation', () => {
        const testString: DiceNotation = `${baseTestString}H`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([{ drop: { highest: 1 } }]),
          })
        })
      })

      describe('with a complex notation', () => {
        const testString: DiceNotation = `${baseTestString}H2`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([{ drop: { highest: 2 } }]),
          })
        })
      })
    })

    describe('given a notation that contains a drop lowest modifier', () => {
      describe('with a simple notation', () => {
        const testString: DiceNotation = `${baseTestString}L`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([{ drop: { lowest: 1 } }]),
          })
        })
      })

      describe('with a complex notation', () => {
        const testString: DiceNotation = `${baseTestString}L2`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([{ drop: { lowest: 2 } }]),
          })
        })
      })
    })

    describe('given a notation that contains a drop less than, greater than, and exact', () => {
      describe('simple', () => {
        const testString: DiceNotation = `${baseTestString}D{<2,>5,2,4}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([
              { drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] } },
            ]),
          })
        })
      })

      describe('complex', () => {
        const testString: DiceNotation = `400d20D{<2,>5,2,4}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            quantity: 400,
            sides: 20,
            modifiers: expect.arrayContaining([
              { drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] } },
            ]),
          })
        })
      })
    })

    describe('given a notation that contains a cap before and lessThan', () => {
      const testString: DiceNotation = `${baseTestString}C<2>5`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          ...baseRollParameters,
          modifiers: expect.arrayContaining([
            { cap: { lessThan: 2, greaterThan: 5 } },
          ]),
        })
      })
    })

    describe('given a notation that contains a minus modifier', () => {
      const testString: DiceNotation = `${baseTestString}-2`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          ...baseRollParameters,
          modifiers: expect.arrayContaining([{ minus: 2 }]),
        })
      })
    })

    describe('given a notation that contains a plus modifier', () => {
      const testString: DiceNotation = `${baseTestString}+2`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          ...baseRollParameters,
          modifiers: expect.arrayContaining([{ plus: 2 }]),
        })
      })
    })

    describe('given a notation that contains a reroll modifier', () => {
      describe('with a simple value', () => {
        const testString: DiceNotation = `${baseTestString}R{>6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([{ reroll: { greaterThan: 6 } }]),
          })
        })
      })

      describe('with a complex value', () => {
        const testString: DiceNotation = `${baseTestString}R{5,2,<6}3`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([
              { reroll: { exact: [5, 2], lessThan: 6, maxReroll: 3 } },
            ]),
          })
        })
      })
    })

    describe('given a notation that contains a unique notation', () => {
      describe('with a unique notation', () => {
        const testString: DiceNotation = `${baseTestString}U{5,6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([
              { unique: { notUnique: [5, 6] } },
            ]),
          })
        })
      })

      describe('with a simple unique notation', () => {
        const testString: DiceNotation = `${baseTestString}U`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([{ unique: true }]),
          })
        })
      })
    })

    describe('given a notation that contains an explode modifier', () => {
      const testString: DiceNotation = `${baseTestString}!`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          ...baseRollParameters,
          modifiers: expect.arrayContaining([{ explode: true }]),
        })
      })
    })

    describe('given a notation that contains a replace modifier', () => {
      describe('with multiple replacements', () => {
        const testString: DiceNotation = `${baseTestString}V{1=2,>2=6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([
              {
                replace: [
                  { from: 1, to: 2 },
                  { from: { greaterThan: 2 }, to: 6 },
                ],
              },
            ]),
          })
        })
      })

      describe('with a single replaceent', () => {
        const testString: DiceNotation = `${baseTestString}V{<2=6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            modifiers: expect.arrayContaining([
              { replace: { from: { lessThan: 2 }, to: 6 } },
            ]),
          })
        })
      })
    })

    describe('With a corner case dice notation', () => {
      describe('like an ordered dice notation', () => {
        test('it produces proper organized parameters', () => {
          const explodeFirstString: DiceNotation = '4d6!H'
          const dropFirstString: DiceNotation = '4d6H!'

          expect(parseArguments(explodeFirstString)).toMatchObject({
            quantity: 4,
            sides: 6,
            modifiers: [{ explode: true }, { drop: { highest: 1 } }],
          })

          expect(parseArguments(dropFirstString)).toMatchObject({
            quantity: 4,
            sides: 6,
            modifiers: [{ drop: { highest: 1 } }, { explode: true }],
          })
        })
      })

      describe('like a complicated dice notation', () => {
        const testString: DiceNotation = `10d20 H2 L V{1=2,>2=6} D{<2,>5,2,4} C<2>18 R{5,2,<6}3 U{5} ! +2 -5 +3`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            quantity: 10,
            sides: 20,
            modifiers: expect.arrayContaining([
              { plus: 2 },
              { plus: 3 },
              { minus: 5 },
              {
                drop: {
                  highest: 2,
                },
              },
              {
                drop: {
                  lowest: 1,
                },
              },
              {
                drop: {
                  exact: [2, 4],
                  greaterThan: 5,
                  lessThan: 2,
                },
              },
              { cap: { greaterThan: 18, lessThan: 2 } },
              { reroll: { exact: [5, 2], lessThan: 6, maxReroll: 3 } },
              { explode: true },
              { unique: { notUnique: [5] } },
              {
                replace: [
                  { from: 1, to: 2 },
                  { from: { greaterThan: 2 }, to: 6 },
                ],
              },
            ]),
          })
        })
      })
    })
  })
})
