import { digestNotation } from '.'

describe('digestNotation', () => {
  describe('given nonsense', () => {
    const testString = '221212eee11www'

    test('throws an error', () => {
      expect(() => digestNotation(testString)).toThrow(`Dice Notation is not parseable. Received: ${testString}`)
    })
  })

  describe('given a basic notation string', () => {
    const testString = '4d6'

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ sides: 6, rolls: 4 })
    })
  })
})
