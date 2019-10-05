import { times } from '..'
import { DropParameters, DropParamValue } from '../../types'

const dropHighDigester = (results: number[], highest: DropParamValue) => {
  Number.isInteger(highest as number)
    ? times(highest as number)(() => results.pop())
    : results.pop()
}

const dropLowDigester = (results: number[], lowest: DropParamValue) => {
  Number.isInteger(lowest as number)
    ? times(lowest as number)(() => results.shift())
    : results.shift()
}

export const dropDigester = (
  results: number[],
  dropParameters: DropParameters,
) => {
  const { highest, lowest } = dropParameters

  lowest && dropLowDigester(results, lowest)
  highest && dropHighDigester(results, highest)
}
