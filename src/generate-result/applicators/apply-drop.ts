import { DropOptions } from 'types'

function times(iterator: number) {
  return (callback: (index?: number) => void) => {
    if (iterator > 0) {
      callback(iterator)
      times(iterator - 1)(callback)
    }
  }
}

export default function applyDrop(
  rolls: number[],
  { highest, lowest, greaterThan, lessThan, exact }: DropOptions<number>
): number[] {
  const sortedResults = rolls
    .filter(
      (roll) =>
        !(
          (greaterThan !== undefined && roll > greaterThan) ||
          (lessThan !== undefined && roll < lessThan) ||
          exact?.map((number) => number).includes(roll) === true
        )
    )
    .sort((a, b) => a - b)

  if (highest !== undefined) {
    times(highest)(() => sortedResults.pop())
  }

  if (lowest !== undefined) {
    times(lowest)(() => sortedResults.shift())
  }

  return sortedResults
}
