import { RollParameters } from 'types'
import { randomNumber } from 'utils'
import { generateUniqueFullRolls } from './generateFullUniqueRolls'

export function generateRollTotals({ sides, rolls, unique, notUnique }: RollParameters, roller = randomNumber) {
  const rollTotals: number[] = []

  while (rollTotals.length < rolls) {
    const tempRoll = roller(sides)
    if (unique) {
      if (rolls > sides) {
        if (rollTotals.length < sides) {
          generateUniqueFullRolls(sides).forEach(num => rollTotals.push(num))
        } else {
          rollTotals.push(tempRoll)
        }
      }

      if (notUnique?.includes(tempRoll)) {
        rollTotals.push(tempRoll)
        continue
      }

      if (rollTotals.includes(tempRoll)) {
        continue
      }
      rollTotals.push(tempRoll)
    } else {
      rollTotals.push(tempRoll)
    }
  }

  return rollTotals
}
