import { RollParameters } from '../../types'
import { sum } from '../../utils'
import { dropDigester } from './dropDigester'

export const parameterDigester = (
  results: number[],
  parameters: RollParameters,
) => {
  const sortedResults = results.slice().sort()

  const { drop } = parameters
  drop && dropDigester(sortedResults, drop)

  let total = sum(sortedResults)

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
