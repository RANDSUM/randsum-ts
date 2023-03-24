import { DieSides } from '../../types/primitives'
import { RollResult } from '../../types/results'
import roll from '..'
import { isCustomSidesRollResult } from '../parse-arguments/utils'

type ExpectedResults = {
  sides: number
  quantity: number
  rollLength?: number
  faces?: RollResult<DieSides>['rollParameters']['faces']
  modifiers?: RollResult<DieSides>['rollParameters']['modifiers']
}

const default20Faces = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
]
const testResult = (
  result: RollResult | RollResult<string>,
  { quantity, sides, faces, modifiers = [], rollLength }: ExpectedResults
): void => {
  if (isCustomSidesRollResult(result)) {
    test('result.total returns an string', () => {
      expect(typeof result.total === 'string').toBe(true)
    })
  } else {
    test('result.total returns an integer', () => {
      expect(Number.isInteger(result.total)).toBe(true)
    })
  }

  test('result.rolls returns an array of results as rolls', () => {
    expect(result.rolls).toHaveLength(rollLength || quantity)

    if (isCustomSidesRollResult(result)) {
      result.rolls.forEach((individualRoll) => {
        expect(typeof individualRoll === 'string').toBe(true)
      })
    } else {
      result.rolls.forEach((individualRoll) => {
        expect(Number.isInteger(individualRoll)).toBe(true)
      })
    }
  })

  describe('result.rollparameters', () => {
    test('.sides returns the number of sides of the dice rolled', () => {
      expect(result.rollParameters.sides).toEqual(sides)
    })

    test('.quantity returns the number of dice rolled', () => {
      expect(result.rollParameters.quantity).toEqual(quantity)
    })

    test('.faces returns faces used in the rolls', () => {
      expect(result.rollParameters.faces).toEqual(faces)
    })

    test('.modifiers returns modifiers used in the rolls', () => {
      expect(result.rollParameters.modifiers).toEqual(modifiers)
    })
  })
}

describe(roll, () => {
  describe('Stress Test', () => {
    const loops = 9999
    const dummyArray = Array.from({ length: loops })
    for (let i = 0; i < loops; i += 1) {
      dummyArray[i] = roll().total
    }

    test('it never goes outside of the bounds of the roll', () => {
      dummyArray.forEach((individualRoll) => {
        expect(individualRoll).toBeLessThanOrEqual(20)
        expect(individualRoll).toBeGreaterThan(0)
      })
    })
  })

  describe('()', () => {
    const result = roll()

    testResult(result, { quantity: 1, sides: 20, faces: default20Faces })
  })

  describe('(string)', () => {
    const firstArg = '20'
    const result = roll(firstArg)

    testResult(result, { quantity: 1, sides: 20, faces: default20Faces })
  })

  describe('(number)', () => {
    const firstArg = 20
    const result = roll(firstArg)

    testResult(result, { quantity: 1, sides: 20, faces: default20Faces })
  })

  describe('(rollOptions)', () => {
    const firstArg = {
      sides: 20,
      quantity: 2,
      modifiers: [{ drop: { highest: 1 } }]
    }
    const result = roll(firstArg)

    testResult(result, {
      quantity: 2,
      rollLength: 1,
      sides: 20,
      faces: default20Faces,
      modifiers: firstArg.modifiers
    })
  })

  describe('(diceNotation)', () => {
    const firstArg = '2d20'
    const result = roll(firstArg)

    testResult(result, {
      quantity: 2,
      sides: 20,
      faces: default20Faces
    })
  })

  describe('(objectWithCustomSides)', () => {
    const firstArg = {
      sides: ['r', 'a', 'n', 'd', 's', 'u', 'm']
    }
    const result = roll(firstArg)

    testResult(result, {
      quantity: 1,
      sides: firstArg.sides.length,
      faces: firstArg.sides
    })
  })
})
