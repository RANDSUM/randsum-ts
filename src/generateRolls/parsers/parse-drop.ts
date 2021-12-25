import { DropOptions, RollTotals } from 'types'
import { times } from 'utils'

export function parseDropFactory({ highest, lowest, greaterThan, lessThan, exact }: DropOptions) {
  return function parseDrop(rollTotals: RollTotals) {
    const sortedResults = rollTotals
      .filter(roll => {
        switch (true) {
          case greaterThan && roll > greaterThan:
          case lessThan && roll < lessThan:
          case exact && exact.includes(roll):
            return false
          default:
            return true
        }
      })
      .sort()

    if (highest) {
      times(Number(highest))(() => sortedResults.pop())
    }

    if (lowest) {
      times(Number(lowest))(() => sortedResults.shift())
    }

    return sortedResults
  }
}
