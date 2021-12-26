import { RollParameters } from 'types'

export function applyUnique(rollTotals: number[], { unique, rolls, sides }: RollParameters, rollDie: () => number) {
  if (rolls > sides) {
    throw new Error('You cannot have unique rolls when there are more rolls than sides of die.')
  }
  const notUnique = !unique || typeof unique === 'boolean' ? [] : unique.notUnique.map(number => Number(number))

  const filteredArray = new Set(rollTotals.filter(n => !notUnique.includes(Number(n))))
  const fixedRollTotals = rollTotals
    .map(number => Number(number))
    .map((roll, index, array) => {
      let newRoll: number
      switch (true) {
        case array.indexOf(roll) === index:
        case notUnique.includes(roll):
          return roll
        default:
          do {
            newRoll = rollDie()
          } while (filteredArray.has(newRoll))
          return newRoll
      }
    })

  return fixedRollTotals
}
