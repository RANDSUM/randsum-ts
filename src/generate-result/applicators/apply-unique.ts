import { RollParameters, UniqueModifier } from 'types'

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
