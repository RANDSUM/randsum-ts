import { times } from 'utils'
import { DropParameters, DropParamValue, isNum } from 'types'

function dropHighDigester(results: number[], highest: DropParamValue) {
  isNum(highest)
    ? times(highest)(() => results.pop())
    : results.pop()
}

function dropLowDigester(results: number[], lowest: DropParamValue) {
  isNum(lowest)
    ? times(lowest)(() => results.shift())
    : results.shift()
}

export function dropDigester(results: number[], dropParameters: DropParameters) {
  const { highest, lowest } = dropParameters

  lowest && dropLowDigester(results, lowest)
  highest && dropHighDigester(results, highest)
}
