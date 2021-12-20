import { RollParameters } from 'types'
import { randomNumber, sumArray } from 'utils'
import { dropDigester } from './dropDigester'

export const parameterDigester = (
  sides: number,
  parameters: RollParameters,
) => {
  const rolls = parameters.rolls || 1
  const results = Array.from(Array(rolls)).map(() => randomNumber(sides))
  const sortedResults = results.slice().sort()

  const { drop } = parameters
  drop && dropDigester(sortedResults, drop)

  let total = sumArray(sortedResults)

  if (parameters.plus) {
    total = total + parameters.plus
  }
  if (parameters.minus) {
    parameters.minus < 0
      ? (total = total + parameters.minus)
      : (total = total - parameters.minus)
  }
  return total
}
