import type { ComparisonOptions } from '~types'

export function applySingleCap(
  { greaterThan, lessThan }: ComparisonOptions,
  value?: number
): (roll: number) => number {
  return (roll: number) => {
    if (greaterThan !== undefined && roll > greaterThan) {
      return value ?? greaterThan
    }
    if (lessThan !== undefined && roll < lessThan) {
      return value ?? lessThan
    }
    return roll
  }
}
