import type { ComparisonOptions } from '~types'
import { formatGreaterLessDescriptions } from './formatGreaterLessDescriptions'

export function extractFromValue(from: number | ComparisonOptions): string {
  if (typeof from === 'number') return `[${from}]`

  return formatGreaterLessDescriptions(from).join(' and ')
}
