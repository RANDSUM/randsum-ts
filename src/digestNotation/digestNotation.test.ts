import { digestNotation } from '.'

describe('digestNotation', () => {
  describe('given a basic notation string', () => {
    const testString = '4d6'

    test('returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ sides: 6, rolls: 4 })
    })
  })
})
