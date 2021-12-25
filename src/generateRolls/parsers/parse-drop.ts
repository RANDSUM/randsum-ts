import { DropOptions, RollTotals } from 'types'
import { times } from 'utils'

export function parseDropFactory({ highest, lowest, greaterThan, lessThan, exact }: DropOptions<'parameters'>) {
  return function parseDrop(rollTotals: RollTotals) {
    const sortedResults = rollTotals
      .filter(roll => {
        switch (true) {
          case greaterThan && roll > greaterThan:
          case lessThan && roll < lessThan:
          case exact && exact.map(number => number).includes(roll):
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
}
