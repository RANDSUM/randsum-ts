import type { ComparisonOptions } from '~types'

export function formatGreaterLessNotation(
  options: ComparisonOptions,
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
