import { isCustomSidesRollResult } from '../../types/guards'
import { DieSides } from '../../types/primitives'
import { RollResult } from '../../types/results'
import roll from '..'

type ExpectedResults = {
  sides: number
  quantity?: number
  rollLength?: number
  faces?: string[]
  modifiers?: RollResult<DieSides>['rollParameters']['modifiers']
}

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
    expect(result.rolls).toHaveLength(rollLength || quantity || 1)

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
    describe('diceOptions', () => {
      it('has one options array in it', () => {
        expect(result.rollParameters.diceOptions).toHaveLength(1)
      })

      it('has the correct value of quantity', () => {
        expect(result.rollParameters.diceOptions[0].quantity).toEqual(
          quantity || 1
        )
      })

      if (isCustomSidesRollResult(result)) {
        it('has the correct number of sides', () => {
          expect(result.rollParameters.diceOptions[0].sides).toEqual(faces)
        })
      } else {
        it('has the correct value of sides', () => {
          expect(result.rollParameters.diceOptions[0].sides).toEqual(sides)
        })
      }
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

    testResult(result, { sides: 20 })
  })

  describe('(string)', () => {
    const firstArg = '20'
    const result = roll(firstArg)

    testResult(result, { sides: 20 })
  })

  describe('(number)', () => {
    const firstArg = 20
    const result = roll(firstArg)

    testResult(result, { sides: 20 })
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
      modifiers: firstArg.modifiers
    })
  })

  describe('(diceNotation)', () => {
    const firstArg = '2d20'
    const result = roll(firstArg)

    testResult(result, {
      quantity: 2,
      sides: 20
    })
  })

  describe('(objectWithCustomSides)', () => {
    const firstArg = {
      sides: ['r', 'a', 'n', 'd', 's', 'u', 'm']
    }
    const result = roll(firstArg)

    testResult(result, {
      faces: firstArg.sides,
      sides: firstArg.sides.length
    })
  })
})
