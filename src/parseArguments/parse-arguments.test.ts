import { DiceNotation, RollParameters } from 'types'

import { parseArguments } from './parse-arguments'

describe('parseArguments', () => {
  describe('given a number string', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments('2')).toMatchObject({ rolls: 1, sides: 2 })
    })
    describe('and a complex RandsumOption', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments('2', { detailed: true })).toMatchObject({ rolls: 1, sides: 2, detailed: true })
      })
    })
  })

  describe('given a number', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(parseArguments(2)).toMatchObject({ rolls: 1, sides: 2 })
    })
  })

  describe('given Roll Options', () => {
    describe('simple', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments({
            rolls: 4,
            sides: '6',
            reroll: { on: ['2', 1] },
            replace: { from: '6', to: '1' },
            unique: true,
          }),
        ).toMatchObject({
          rolls: 4,
          sides: 6,
          reroll: { on: [2, 1] },
          replace: { from: 6, to: 1 },
          unique: true,
        })
      })
    })

    describe('complex', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(
          parseArguments({
            rolls: 4,
            sides: '6',
            drop: { highest: 5, lowest: '1', exact: [2, '3'] },
            reroll: [{ on: ['2', 1] }],
            cap: { above: '2', below: 1 },
            replace: [{ from: '6', to: '1' }],
            unique: { notUnique: ['1', 2] },
          }),
        ).toMatchObject({
          rolls: 4,
          sides: 6,
          drop: { highest: 5, lowest: 1, exact: [2, 3] },
          reroll: [{ on: [2, 1] }],
          cap: { above: 2, below: 1 },
          replace: [{ from: 6, to: 1 }],
          unique: { notUnique: [1, 2] },
        })
      })
    })
  })

  describe('given DiceNotation', () => {
    const baseTestString: DiceNotation = '4d6'
    const baseRollParameters: RollParameters = { sides: 6, rolls: 4 }

    describe('given a basic notation', () => {
      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(baseTestString)).toMatchObject(baseRollParameters)
      })
    })

    describe('given a notation that contains a drop highest modifier', () => {
      describe('with a simple notation', () => {
        const testString: DiceNotation = `${baseTestString}H`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({ ...baseRollParameters, drop: { highest: 1 } })
        })
      })

      describe('with a complex notation', () => {
        const testString: DiceNotation = `${baseTestString}H2`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({ ...baseRollParameters, drop: { highest: 2 } })
        })
      })
    })

    describe('given a notation that contains a drop lowest modifier', () => {
      describe('with a simple notation', () => {
        const testString: DiceNotation = `${baseTestString}L`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({ ...baseRollParameters, drop: { lowest: 1 } })
        })
      })

      describe('with a complex notation', () => {
        const testString: DiceNotation = `${baseTestString}L2`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({ ...baseRollParameters, drop: { lowest: 2 } })
        })
      })
    })

    describe('given a notation that contains a drop less than, greater than, and exact', () => {
      const testString: DiceNotation = `${baseTestString}D{<2,>5,2,4}`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          ...baseRollParameters,
          drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] },
        })
      })
    })

    describe('given a notation that contains a cap before and below', () => {
      const testString: DiceNotation = `${baseTestString}C<2>5`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          ...baseRollParameters,
          cap: { below: 2, above: 5 },
        })
      })
    })

    describe('given a notation that contains a minus modifier', () => {
      const testString: DiceNotation = `${baseTestString}-2`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({ ...baseRollParameters, minus: 2 })
      })
    })

    describe('given a notation that contains a plus modifier', () => {
      const testString: DiceNotation = `${baseTestString}+2`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({ ...baseRollParameters, plus: 2 })
      })
    })

    describe('given a notation that contains a reroll modifier', () => {
      describe('with a simple value', () => {
        const testString: DiceNotation = `${baseTestString}R{>6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            reroll: { above: 6 },
          })
        })
      })

      describe('with a complex value', () => {
        const testString: DiceNotation = `${baseTestString}R{5,2,<6}3`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            reroll: { on: [5, 2], below: 6, maxReroll: 3 },
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
            unique: { notUnique: [5, 6] },
          })
        })
      })
      describe('with a simple unique notation', () => {
        const testString: DiceNotation = `${baseTestString}U`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            unique: true,
          })
        })
      })
    })

    describe('given a notation that contains an explode modifier', () => {
      const testString: DiceNotation = `${baseTestString}!`

      test('returns a RollParameter matching the notation', () => {
        expect(parseArguments(testString)).toMatchObject({
          ...baseRollParameters,
          explode: true,
        })
      })
    })

    describe('given a notation that contains a replace modifier', () => {
      describe('with multiple replacements', () => {
        const testString: DiceNotation = `${baseTestString}V{1=2,>2=6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            replace: [
              { from: 1, to: 2 },
              { from: { above: 2 }, to: 6 },
            ],
          })
        })
      })

      describe('with a single replaceent', () => {
        const testString: DiceNotation = `${baseTestString}V{<2=6}`

        test('returns a RollParameter matching the notation', () => {
          expect(parseArguments(testString)).toMatchObject({
            ...baseRollParameters,
            replace: { from: { below: 2 }, to: 6 },
          })
        })
      })
    })

    describe('given a notation with a space', () => {
      const testString: DiceNotation = '4d6V {>2=6}'

      test('throws an error', () => {
        expect(() => parseArguments(testString)).toThrow('Notation cannot include spaces.')
      })
    })
  })
})
