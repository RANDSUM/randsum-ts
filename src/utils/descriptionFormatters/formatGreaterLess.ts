import type { GreaterLessOptions } from '~types'

export function formatGreaterLess(
  options: GreaterLessOptions,
  list: string[] = []
): string[] {
  if (options.greaterThan) {
    list.push(`greater than [${options.greaterThan}]`)
  }
  if (options.lessThan) {
    list.push(`less than [${options.lessThan}]`)
  }

  return list
}
