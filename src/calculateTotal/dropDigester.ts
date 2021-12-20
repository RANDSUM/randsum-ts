import { times } from 'utils'
import { DropParameters } from 'types'

export function dropDigester(rollTotals: number[], { highest, lowest }: DropParameters) {
  const sortedResults = rollTotals.slice().sort()

  if (highest) {
    times(Number(highest))(() => sortedResults.pop())
  }

  if (lowest) {
    times(Number(lowest))(() => sortedResults.shift())
  }

  return sortedResults
}
