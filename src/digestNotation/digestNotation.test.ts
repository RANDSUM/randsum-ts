import { digestNotation } from '.'

describe('digestNotation', () => {
  describe('given a basic notation string', () => {
    const testString = '4d6'
    test('it returns a RollParameter matching the notation', () => {
      expect(digestNotation(testString)).toMatchObject({ sides: 6, rolls: 4 })
    })
  })
})
