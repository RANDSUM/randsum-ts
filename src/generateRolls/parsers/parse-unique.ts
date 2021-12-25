import { RollDie, RollParameters, RollTotals } from 'types'

export function parseUniqueFactory({ unique, rolls, sides }: RollParameters, rollDie: RollDie) {
  return function parseUnique(rollTotals: RollTotals) {
    if (rolls > sides) {
      throw new Error('You cannot have unique rolls when there are more rolls than sides of die.')
    }
    const notUnique = !unique || typeof unique === 'boolean' ? [] : unique.notUnique

    const filteredArray = new Set(rollTotals.filter(n => !notUnique.includes(n)))
    const fixedRollTotals = rollTotals
      .map(number => Number(number))
      .map((roll, index, array) => {
        let newRoll
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
}
