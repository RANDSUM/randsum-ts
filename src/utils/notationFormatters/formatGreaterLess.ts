import type { GreaterLessOptions } from '~types'

export function formatGreaterLess(
  options: GreaterLessOptions,
  list: string[] = []
): string[] {
  if (options.greaterThan) {
    list.push(`>${options.greaterThan}`)
  }
  if (options.lessThan) {
    list.push(`<${options.lessThan}`)
  }

  return list
}
