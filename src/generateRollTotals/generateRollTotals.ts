import { RollParameters } from 'types'
import { randomNumber } from 'utils'

export function generateRollTotals({ sides, rolls }: RollParameters, roller = randomNumber) {
  return Array.from(Array(rolls)).map(() => roller(sides))
}
