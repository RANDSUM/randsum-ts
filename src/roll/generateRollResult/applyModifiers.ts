import { isCustomParameters } from '~guards'
import {
  DiceParameters,
  DicePoolParameters,
  DropOptions,
  GreaterLessOptions,
  Modifiers,
  ReplaceOptions,
  RerollOptions,
  TypeOrArrayOfType
} from '~types'

type RollBonuses = {
  rolls: number[]
  simpleMathModifier: number
}

type ModifiedRollBonuses = {
  rolls: string[]
  simpleMathModifier: 0
}
export class InvalidUniqueError extends Error {
  constructor() {
    super(
      'You cannot have unique rolls when there are more rolls than sides of die.'
    )
  }
}

function applyUnique(
  rolls: number[],
  {
    unique,
    sides,
    quantity
  }: DiceParameters<number> & Pick<Modifiers, 'unique'>,
  rollOne: () => number
): number[] {
  if (quantity > sides) {
    throw new InvalidUniqueError()
  }
  const notUnique =
    unique === undefined || typeof unique === 'boolean'
      ? []
      : unique.notUnique.map(Number)

  const filteredArray = new Set(
    rolls.filter((n) => !notUnique.includes(Number(n)))
  )
  return rolls.map(Number).map((roll, index, array) => {
    let newRoll: number
    if (array.indexOf(roll) === index || notUnique.includes(roll)) {
      return roll
    }
    do {
      newRoll = rollOne()
    } while (filteredArray.has(newRoll))
    return newRoll
  })
}

function applySingleCap(
  { greaterThan, lessThan }: GreaterLessOptions,
  value?: number
) {
  return (roll: number) => {
    if (greaterThan !== undefined && roll > greaterThan) {
      return value ?? greaterThan
    }
    if (lessThan !== undefined && roll < lessThan) {
      return value ?? lessThan
    }
    return roll
  }
}

function rerollRoll(
  roll: number,
  { greaterThan, lessThan, exact, maxReroll }: RerollOptions,
  rollOne: () => number,
  index = 0
): number {
  if (maxReroll === index) {
    return roll
  }
  if (index === 99) {
    return roll
  }

  const exactValue =
    exact !== undefined && Array.isArray(exact)
      ? exact.includes(roll)
      : exact === roll
  if (
    (greaterThan !== undefined && roll > greaterThan) ||
    (lessThan !== undefined && roll < lessThan) ||
    exactValue
  ) {
    return rerollRoll(
      rollOne(),
      { greaterThan, lessThan, exact, maxReroll },
      rollOne,
      index + 1
    )
  }
  return roll
}

function applyReroll(
  rolls: number[],
  reroll: RerollOptions,
  rollOne: () => number
): number[] {
  const newRolls = [...rolls]
  return newRolls.map((roll) => rerollRoll(roll, reroll, rollOne))
}

function applyReplace(
  rolls: number[],
  replace: TypeOrArrayOfType<ReplaceOptions>
): number[] {
  const parameters = Array.isArray(replace) ? replace : [replace]

  let replaceRolls = rolls

  parameters.forEach(({ from, to }) => {
    replaceRolls = replaceRolls.map((roll) => {
      if (from !== undefined) {
        if (typeof from === 'object') {
          return applySingleCap(from, to)(roll)
        }
        if (roll === from) {
          return to
        }
      }
      return roll
    })
  })

  return replaceRolls
}

function applyExplode(
  rolls: number[],
  { sides }: Pick<DiceParameters<number>, 'sides'>,
  rollOne: () => number
): number[] {
  const explodeCount = rolls.filter((roll) => roll === sides).length
  const explodeResults = Array.from({ length: explodeCount }, rollOne)
  return [...rolls, ...explodeResults]
}

function times(iterator: number) {
  return (callback: (index?: number) => void) => {
    if (iterator > 0) {
      callback(iterator)
      times(iterator - 1)(callback)
    }
  }
}

function applyDrop(
  rolls: number[],
  { highest, lowest, greaterThan, lessThan, exact }: DropOptions
): number[] {
  const sortedResults = rolls
    .filter(
      (roll) =>
        !(
          (greaterThan !== undefined && roll > greaterThan) ||
          (lessThan !== undefined && roll < lessThan) ||
          exact?.map((number) => number).includes(roll) === true
        )
    )
    .sort((a, b) => a - b)

  if (highest !== undefined) {
    times(highest)(() => sortedResults.pop())
  }

  if (lowest !== undefined) {
    times(lowest)(() => sortedResults.shift())
  }

  return sortedResults
}

export default function applyModifiers(
  poolParameters: DicePoolParameters<string> | DicePoolParameters<number>,
  initialRolls: number[] | string[]
): RollBonuses | ModifiedRollBonuses {
  if (isCustomParameters(poolParameters)) {
    return {
      simpleMathModifier: 0,
      rolls: initialRolls as string[]
    }
  }

  const rollBonuses: RollBonuses = {
    simpleMathModifier: 0,
    rolls: initialRolls as number[]
  }

  const {
    options: { sides, quantity, modifiers = {} }
  } = poolParameters

  const rollOne: () => number = () => poolParameters.die.roll()

  return Object.keys(modifiers).reduce((bonuses, key) => {
    switch (key) {
      case 'reroll':
        return {
          ...bonuses,
          rolls: modifiers.reroll
            ? applyReroll(bonuses.rolls, modifiers.reroll, rollOne)
            : bonuses.rolls
        }

      case 'unique':
        return {
          ...bonuses,
          rolls: modifiers.unique
            ? applyUnique(
                bonuses.rolls,
                { sides, quantity: quantity || 1, unique: modifiers.unique },
                rollOne
              )
            : bonuses.rolls
        }

      case 'replace':
        return {
          ...bonuses,
          rolls: modifiers.replace
            ? applyReplace(bonuses.rolls, modifiers.replace)
            : bonuses.rolls
        }

      case 'cap':
        return {
          ...bonuses,
          rolls: modifiers.cap
            ? bonuses.rolls.map(applySingleCap(modifiers.cap))
            : bonuses.rolls
        }

      case 'drop':
        return {
          ...bonuses,
          rolls: modifiers.drop
            ? applyDrop(bonuses.rolls, modifiers.drop)
            : bonuses.rolls
        }

      case 'explode':
        return {
          ...bonuses,
          rolls: modifiers.explode
            ? applyExplode(bonuses.rolls, { sides }, rollOne)
            : bonuses.rolls
        }

      case 'plus':
        return {
          ...bonuses,
          simpleMathModifier:
            bonuses.simpleMathModifier + Number(modifiers.plus)
        }

      case 'minus':
        return {
          ...bonuses,
          simpleMathModifier:
            bonuses.simpleMathModifier - Number(modifiers.minus)
        }

      default:
        throw new Error(`Unknown modifier: ${key}`)
    }
  }, rollBonuses)
}
