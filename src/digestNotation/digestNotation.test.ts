import { digestNotation } from '.'

describe('digestNotation', () => {
  describe('given a basic notation string', () => {
    const testString = '4d6'

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ sides: 6, rolls: 4 })
    })
  })

  describe('given a notation string with a space', () => {
    const testString = '4d6V {>2=6}'

    test('throws an error', () => {
      expect(() => digestNotation(testString)).toThrow('Notation cannot include spaces.')
    })
  })
})
