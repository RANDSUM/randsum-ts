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
): number[] {
  const sortedResults = rollTotals
    .filter(roll => {
      switch (true) {
        case greaterThan !== undefined && roll > greaterThan:
        case lessThan !== undefined && roll < lessThan:
        case exact?.map(number => number).includes(roll):
          return false
        default:
          return true
      }
    })
    .sort((a, b) => a - b)

  if (highest !== undefined) {
    times(highest)(() => sortedResults.pop())
  }

  if (lowest !== undefined) {
    times(lowest)(() => sortedResults.shift())
  }

  return sortedResults
}
