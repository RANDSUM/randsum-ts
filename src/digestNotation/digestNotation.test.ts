import { DiceNotation, RollParameters } from 'types'
import { digestNotation } from '.'

describe('digestNotation', () => {
  const baseTestString: DiceNotation = '4d6'
  const baseRollParams: RollParameters = { sides: 6, rolls: 4 }
  describe('given a basic notation', () => {
    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(baseTestString)).toMatchObject(baseRollParams)
    })
  })

  describe('given a notation that contains a drop highest modifier', () => {
    const testString: DiceNotation = `${baseTestString}H2`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ ...baseRollParams, drop: { highest: 2 } })
    })
  })

  describe('given a notation that contains a drop lowest modifier', () => {
    const testString: DiceNotation = `${baseTestString}L2`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ ...baseRollParams, drop: { lowest: 2 } })
    })
  })

  describe('given a notation that contains a drop less than, greater than, and exact', () => {
    const testString: DiceNotation = `${baseTestString}D{<2,>5,2,4}`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({
        ...baseRollParams,
        drop: { greaterThan: 5, lessThan: 2, exact: [2, 4] },
      })
    })
  })

  describe('given a notation that contains a cap before and below', () => {
    const testString: DiceNotation = `${baseTestString}C<2>5`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({
        ...baseRollParams,
        cap: { below: 2, above: 5 },
      })
    })
  })

  describe('given a notation that contains a minus modifier', () => {
    const testString: DiceNotation = `${baseTestString}-2`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ ...baseRollParams, minus: 2 })
    })
  })

  describe('given a notation that contains a plus modifier', () => {
    const testString: DiceNotation = `${baseTestString}+2`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ ...baseRollParams, plus: 2 })
    })
  })

  describe('given a notation that contains a reroll modifier', () => {
    describe('with a simple value', () => {
      const testString: DiceNotation = `${baseTestString}R{>6}`

      test('returns a RollParameter matching the notation', () => {
        expect(digestNotation(testString)).toMatchObject({
          ...baseRollParams,
          reroll: { above: 6 },
        })
      })
    })

    describe('with a complex value', () => {
      const testString: DiceNotation = `${baseTestString}R{5,2,<6}3`

      test('returns a RollParameter matching the notation', () => {
        expect(digestNotation(testString)).toMatchObject({
          ...baseRollParams,
          reroll: { on: [5, 2], below: 6, maxReroll: 3 },
        })
      })
    })
  })

  describe('given a notation that contains a unique notation', () => {
    describe('with a unique notation', () => {
      const testString: DiceNotation = `${baseTestString}U{5,6}`

      test('returns a RollParameter matching the notation', () => {
        expect(digestNotation(testString)).toMatchObject({
          ...baseRollParams,
          unique: { notUnique: [5, 6] },
        })
      })
    })
    describe('with a simple unique notation', () => {
      const testString: DiceNotation = `${baseTestString}U`

      test('returns a RollParameter matching the notation', () => {
        expect(digestNotation(testString)).toMatchObject({
          ...baseRollParams,
          unique: true,
        })
      })
    })
  })

  describe('given a notation that contains an explode modifier', () => {
    const testString: DiceNotation = `${baseTestString}!`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({
        ...baseRollParams,
        explode: true,
      })
    })
  })

  describe('given a notation that contains a replace modifier', () => {
    const testString: DiceNotation = `${baseTestString}V{1=2,>2=6}`

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({
        ...baseRollParams,
        replace: [
          { from: 1, to: 2 },
          { from: { above: 2 }, to: 6 },
        ],
      })
    })
  })

  describe('given a notation with a space', () => {
    const testString: DiceNotation = '4d6V {>2=6}'

    test('throws an error', () => {
      expect(() => digestNotation(testString)).toThrow('Notation cannot include spaces.')
    })
  })
})
