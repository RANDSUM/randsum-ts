import { times } from 'utils'
import { DropParameters } from 'types'

export function dropDigester(rollTotals: number[], { highest, lowest, greaterThan, lessThan, exact }: DropParameters) {
  const sortedResults = rollTotals
    .slice()
    .filter((num) => {
      switch (true) {
        case greaterThan && num > greaterThan:
        case lessThan && num < lessThan:
        case exact && exact.includes(num):
          return false
        default:
          return true
      }
    })
    .sort()

  if (highest) {
    times(highest)(() => sortedResults.pop())
  }

  if (lowest) {
    times(lowest)(() => sortedResults.shift())
  }

  return sortedResults
}
