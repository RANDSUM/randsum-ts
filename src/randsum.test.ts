import randsum from '.'
import { Randomizer } from 'types'

const randsumSimpleTests = (result: number) => {
  test('returns a number as total', () => {
    expect(Number.isInteger(result)).toBe(true)
  })
}

const mockRandomizerRoll = 420
const mockRandomizer: Randomizer = () => mockRandomizerRoll
const randsumCustomRandomizerSimpleTests = (result: number, rolls: number) => {
  test('returns a number as total', () => {
    expect(Number.isInteger(result)).toBe(true)
  })

  test('expects total to be correct', () => {
    expect(result).toEqual(rolls * mockRandomizerRoll)
  })
}

describe('Randsum', () => {
  describe('with a string', () => {
    randsumSimpleTests(randsum('20'))
  })

  describe('with a number', () => {
    randsumSimpleTests(randsum(20))
  })

  describe('with a modifier object', () => {
    randsumSimpleTests(randsum({ sides: 20, rolls: 2, drop: { highest: 1 } }))
  })

  describe('with basic dice notation', () => {
    randsumSimpleTests(randsum('2d20'))
  })

  describe('with a custom randomizer', () => {
    randsumCustomRandomizerSimpleTests(randsum('2d20', { customRandomizer: mockRandomizer }), 2)
  })

  describe('with a detailed report', () => {
    const result = randsum('2d20', { detailed: true })

    test('result.rollTotals returns an array of results as rolls', () => {
      expect(result.rollTotals.length).toEqual(2)

      result.rollTotals.forEach(result => {
        expect(Number.isInteger(result)).toBe(true)
      })
    })

    test('it returns the args passed in to the function', () => {
      expect(result.args).toEqual(['2d20', { detailed: true }])
    })

    test('result.sides returns the number of sides of the dice rolled', () => {
      expect(result.sides).toEqual(20)
    })

    test('result.rolls returns the number of dice rolled', () => {
      expect(result.rolls).toEqual(2)
    })

    test('result.modifyRolls returns a function that accepts a callback that gets passed the rollTotals', () => {
      expect(result.modifyInitialRoll(rolls => 40 * rolls.length)).toEqual(80)
    })
    test('result.modifyRolls returns a function that accepts a callback that gets passed the rollTotals', () => {
      expect(result.modifyModifiedRoll(rolls => 40 * rolls.length)).toEqual(80)
    })
  })
})
