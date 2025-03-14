import type { Modifiers, RequiredCoreDiceParameters } from '~types'
import { InvalidUniqueError } from '../invalidUniqueError'
import { generateNotUniqueArray } from './generateNotUniqueArray'

export function applyUnique(
  rolls: number[],
  {
    unique,
    sides,
    quantity
  }: RequiredCoreDiceParameters<number> & Pick<Modifiers, 'unique'>,
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
