import { RollParameters } from '../../types'
import { isNumber, sum, times } from '../../utils'

export const parameterDigester = (
  results: number[],
  parameters: RollParameters,
) => {
  const sortedResults = results.slice().sort()

  if (parameters.drop) {
    if (parameters.drop.highest) {
      isNumber(parameters.drop.highest)
        ? times(parameters.drop.highest as number)(() => sortedResults.pop())
        : sortedResults.pop()
    }
    if (parameters.drop.lowest) {
      isNumber(parameters.drop.lowest)
        ? times(parameters.drop.lowest as number)(() => sortedResults.shift())
        : sortedResults.shift()
    }
  }

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
