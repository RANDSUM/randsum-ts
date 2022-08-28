import {
  RollParameters,
  DropOptions,
  GreaterLessOptions,
  ReplaceOptions,
  RerollOptions,
  UniqueModifier
} from 'types'
import { makeRolls } from 'utils'

function times(iterator: number) {
  return (callback: (index?: number) => void) => {
    if (iterator > 0) {
      callback(iterator)
      times(iterator - 1)(callback)
    }
  }
}

export function applyDrop(
  rolls: number[],
  { highest, lowest, greaterThan, lessThan, exact }: DropOptions<number>
): number[] {
  const sortedResults = rolls
    .filter((roll) => {
      if (
        (greaterThan !== undefined && roll > greaterThan) ||
        (lessThan !== undefined && roll < lessThan) ||
        exact?.map((number) => number).includes(roll) === true
      ) {
        return false
      }
      return true
    })
    .sort((a, b) => a - b)

  if (highest !== undefined) {
    times(highest)(() => sortedResults.pop())
  }

  if (lowest !== undefined) {
    times(lowest)(() => sortedResults.shift())
  }

  return sortedResults
}

export function applyExplode(
  rolls: number[],
  { sides }: Pick<RollParameters, 'sides'>,
  rollOne: () => number
): number[] {
  const explodeCount = rolls.filter((roll) => roll === sides).length
  const explodeResults = makeRolls(explodeCount, rollOne)
  return [...rolls, ...explodeResults]
}

export function applyReplace(
  rolls: number[],
  replace: ReplaceOptions<number> | Array<ReplaceOptions<number>>
): number[] {
  const parameters = Array.isArray(replace) ? replace : [replace]

  let replaceRolls = rolls
  for (const { from, to } of parameters) {
    replaceRolls = replaceRolls.map((roll) => {
      if (from !== undefined) {
        if (typeof from === 'object') {
          return applySingleCap(from, to)(roll)
        } else {
          if (roll === from) {
            return to
          }
        }
      }
      return roll
    })
  }

  return replaceRolls
}

function rerollRoll(
  roll: number,
  { greaterThan, lessThan, exact, maxReroll }: RerollOptions<number>,
  rollOne: () => number,
  index = 0
): number {
  if (maxReroll === index) {
    return roll
  }
  if (index === 99) {
    console.warn('You have rerolled 99 times, stopping reroll.')
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

export function applyReroll(
  rolls: number[],
  reroll: RerollOptions<number> | Array<RerollOptions<number>>,
  rollOne: () => number
): number[] {
  const parameters = Array.isArray(reroll) ? reroll : [reroll]

  let rerollRolls = rolls
  for (const rerollModifier of parameters) {
    rerollRolls = rerollRolls.map((roll) => {
      return rerollRoll(roll, rerollModifier, rollOne)
    })
  }
  return rerollRolls
}

export function applySingleCap(
  { greaterThan, lessThan }: GreaterLessOptions<number>,
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

export function applyUnique(
  rolls: number[],
  {
    unique,
    quantity,
    sides
  }: Pick<RollParameters, 'quantity' | 'sides'> & UniqueModifier,
  rollOne: () => number
): number[] {
  if (quantity > sides) {
    throw new Error(
      'You cannot have unique rolls when there are more rolls than sides of die.'
    )
  }
  const notUnique =
    unique === undefined || typeof unique === 'boolean'
      ? []
      : unique.notUnique.map(Number)

  const filteredArray = new Set(
    rolls.filter((n) => !notUnique.includes(Number(n)))
  )
  const fixedRollTotals = rolls.map(Number).map((roll, index, array) => {
    let newRoll: number
    if (array.indexOf(roll) === index || notUnique.includes(roll)) {
      return roll
    }
    do {
      newRoll = rollOne()
    } while (filteredArray.has(newRoll))
    return newRoll
  })

  return fixedRollTotals
}
