import roll from '../roll'
import { RollResult } from '../types'

type ExpectedResults = {
  sides: number
  quantity: number
  rollLength?: number
  arguments: RollResult['arguments']
  faces?: RollResult<'customSides'>['rollParameters']['faces']
  modifiers?: RollResult['rollParameters']['modifiers']
}

const testResult = (
  result: RollResult,
  {
    quantity,
    sides,
    arguments: args,
    faces,
    modifiers = [],
    rollLength
  }: ExpectedResults
): void => {
  if (faces) {
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

    if (faces) {
      result.rolls.forEach((roll) => {
        expect(typeof roll === 'string').toBe(true)
      })
    } else {
      result.rolls.forEach((roll) => {
        expect(Number.isInteger(roll)).toBe(true)
      })
    }
  })

  test('result.arguments returns arguments provided to `roll`', () => {
    expect(result.arguments).toEqual(args)
  })

  describe('result.rollparameters', () => {
    test('.sides returns the number of sides of the dice rolled', () => {
      expect(result.rollParameters.sides).toEqual(sides)
    })

    test('.quantity returns the number of dice rolled', () => {
      expect(result.rollParameters.quantity).toEqual(quantity)
    })

    test('.faces returns custom faces used in the rolls', () => {
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
      dummyArray.forEach((roll) => {
        expect(roll).toBeLessThanOrEqual(20)
        expect(roll).toBeGreaterThan(0)
      })
    })
  })

  describe('()', () => {
    const result = roll()

    testResult(result, { quantity: 1, sides: 20, arguments: [undefined] })
  })

  describe('(string)', () => {
    const firstArg = '20'
    const result = roll(firstArg)

    testResult(result, { quantity: 1, sides: 20, arguments: [firstArg] })
  })

  describe('(number)', () => {
    const firstArg = 20
    const result = roll(firstArg)

    testResult(result, { quantity: 1, sides: 20, arguments: [firstArg] })
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
      modifiers: firstArg.modifiers,
      arguments: [firstArg]
    })
  })

  describe('(diceNotation)', () => {
    const firstArg = '2d20'
    const result = roll(firstArg)

    testResult(result, {
      quantity: 2,
      sides: 20,
      arguments: [firstArg]
    })
  })

  describe('(objectWithCustomSides)', () => {
    const firstArg = { sides: ['r', 'a', 'n', 'd', 's', 'u', 'm'] }
    const result = roll(firstArg)

    testResult(result, {
      quantity: 1,
      sides: firstArg.sides.length,
      arguments: [firstArg],
      faces: firstArg.sides
    })
  })
})
