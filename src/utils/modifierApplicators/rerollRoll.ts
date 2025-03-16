import type { RerollOptions } from '~types'
import { extractExactValue } from './extractExactValue'

export function rerollRoll(
  roll: number,
  { greaterThan, lessThan, exact, max }: RerollOptions,
  rollOne: () => number,
  index = 0
): number {
  if (max === index) {
    return roll
  }
  if (index === 99) {
    return roll
  }

  if (
    (greaterThan !== undefined && roll > greaterThan) ||
    (lessThan !== undefined && roll < lessThan) ||
    extractExactValue(exact, roll)
  ) {
    return rerollRoll(
      rollOne(),
      { greaterThan, lessThan, exact, max },
      rollOne,
      index + 1
    )
  }
  return roll
}
