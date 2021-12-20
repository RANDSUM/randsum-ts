import { RollParameters } from 'types'
import { randomNumber } from 'utils'

export function generateRollTotals({ sides, rolls }: RollParameters) {
  return Array.from(Array(rolls)).map(() => randomNumber(sides))
}
