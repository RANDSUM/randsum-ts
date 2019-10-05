import { DropParameters, RollParameters } from '../../types'
import { sum, times } from '../../utils'

const dropDigester = (results: number[], dropParams?: DropParameters) => {
  if (dropParams) {
    const { highest, lowest } = dropParams
    highest &&
      (Number.isInteger(highest as number)
        ? times(highest as number)(() => results.pop())
        : results.pop())
    lowest &&
      (Number.isInteger(lowest as number)
        ? times(lowest as number)(() => results.shift())
        : results.shift())
  }
}

export const parameterDigester = (
  results: number[],
  parameters: RollParameters,
) => {
  const sortedResults = results.slice().sort()
  dropDigester(sortedResults, parameters.drop)

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
