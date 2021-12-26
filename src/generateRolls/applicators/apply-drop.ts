import { DropOptions } from 'types'

function times(iterator: number) {
  return (callback: (index?: number) => void) => {
    if (iterator > 0) {
      callback(iterator)
      times(iterator - 1)(callback)
    }
  }
}

export function applyDrop(
  rollTotals: number[],
  { highest, lowest, greaterThan, lessThan, exact }: DropOptions<number>,
) {
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
