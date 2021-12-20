import { generateUniqueFullRolls } from './generateFullUniqueRolls'

describe('generateFullUniqueRolls', () => {
  test('it produces an array from one to the number provided', () => {
    expect(generateUniqueFullRolls(6)).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]))
  })
})
