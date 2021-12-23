import { RollParameters } from 'types'

export function uniqueDigester(
  rollTotals: number[],
  { rolls, sides, unique }: Pick<RollParameters, 'unique' | 'rolls' | 'sides'>,
  rollDie: () => number,
): number[] {
  if (rolls > sides) {
    throw 'You cannot have unique rolls when there are more rolls than sides of die.'
  }
  const notUnique = typeof unique === 'boolean' ? false : unique?.notUnique

  const filteredArray = rollTotals.filter(n => !(notUnique && notUnique.includes(n)))
  const fixedRollTotals = rollTotals.map((num, index, arr) => {
    let roll
    switch (true) {
      case arr.indexOf(num) === index:
      case !!notUnique && notUnique.includes(num):
        return num
      default:
        do {
          roll = rollDie()
        } while (filteredArray.includes(roll))
        return roll
    }
  })

  return fixedRollTotals
}
