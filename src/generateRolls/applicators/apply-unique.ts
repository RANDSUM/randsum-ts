import { RollParameters } from 'types'

export function applyUnique(
  rolls: number[],
  { unique, quantity, sides }: RollParameters,
  rollOne: () => number,
): number[] {
  if (quantity > sides) {
    throw new Error('You cannot have unique rolls when there are more rolls than sides of die.')
  }
  const notUnique =
    unique === undefined || typeof unique === 'boolean' ? [] : unique.notUnique.map(number => Number(number))

  const filteredArray = new Set(rolls.filter(n => !notUnique.includes(Number(n))))
  const fixedRollTotals = rolls
    .map(number => Number(number))
    .map((roll, index, array) => {
      let newRoll: number
      switch (true) {
        case array.indexOf(roll) === index:
        case notUnique.includes(roll):
          return roll
        default:
          do {
            newRoll = rollOne()
          } while (filteredArray.has(newRoll))
          return newRoll
      }
    })

  return fixedRollTotals
}
