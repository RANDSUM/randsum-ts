import type { ModifierOptions, RequiredNumericRollParameters } from '~types'
import { InvalidUniqueError } from '../invalidUniqueError'
import { generateNotUniqueArray } from './generateNotUniqueArray'

export function applyUnique(
  rolls: number[],
  {
    unique,
    sides,
    quantity
  }: RequiredNumericRollParameters & Pick<ModifierOptions, 'unique'>,
  rollOne: () => number
): number[] {
  if (quantity > sides) {
    throw new InvalidUniqueError()
  }
  const notUnique = generateNotUniqueArray(unique)

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
