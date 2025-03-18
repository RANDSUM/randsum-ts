import type { ComparisonOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function extractFromValue(from: number | ComparisonOptions): string {
  if (typeof from === 'number') return `[${from}]`

  return formatGreaterLess(from).join(' and ')
}
