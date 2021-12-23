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

  describe('given a notation with a space', () => {
    const testString: DiceNotation = '4d6V {>2=6}'

    test('throws an error', () => {
      expect(() => digestNotation(testString)).toThrow('Notation cannot include spaces.')
    })
  })
})
