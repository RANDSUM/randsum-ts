import { DropOptions } from 'types'
import { times } from 'utils'

export function dropDigester(rollTotals: number[], { highest, lowest, greaterThan, lessThan, exact }: DropOptions) {
  const sortedResults = rollTotals
    .filter(number_ => {
      switch (true) {
        case greaterThan && number_ > greaterThan:
        case lessThan && number_ < lessThan:
        case exact && exact.includes(number_):
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
