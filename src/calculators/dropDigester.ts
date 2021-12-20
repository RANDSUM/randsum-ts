import { times } from 'utils'
import { DropParameters, } from 'types'

export function dropDigester(rollTotals: number[], {highest, lowest}: DropParameters) {
  const sortedResults = rollTotals.slice().sort()

  if (highest) {
    times(Number(highest))(() => sortedResults.shift())
  }

  if (lowest) {
    times(Number(highest))(() => sortedResults.shift())
  }

  return sortedResults
}
