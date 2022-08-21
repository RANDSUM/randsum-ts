import { GreaterLessOptions } from 'types'

export function applySingleCap ({ greaterThan, lessThan }: GreaterLessOptions<number>, value?: number) {
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
