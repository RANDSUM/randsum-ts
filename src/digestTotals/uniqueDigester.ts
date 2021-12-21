import { RollParameters } from 'types'
import { randomNumber } from 'utils'

export function uniqueDigester(
  rollTotals: number[],
  { rolls, sides, notUnique }: Pick<RollParameters, 'notUnique' | 'rolls' | 'sides'>,
): number[] {
  if (rolls > sides) {
    console.warn('You cannot have unique rolls when there are more rolls than sides of die. Disregarding "unique".')
    return rollTotals
  }

  const filteredArray = rollTotals.filter(n => !(notUnique && notUnique.includes(n)))
  const fixedRollTotals = rollTotals.map((num, index, arr) => {
    let roll
    switch (true) {
      case arr.indexOf(num) === index:
      case !!notUnique && notUnique.includes(num):
        return num
      default:
        do {
          roll = randomNumber(sides)
        } while (filteredArray.includes(roll))
        return roll
    }
  })

  return fixedRollTotals
}
