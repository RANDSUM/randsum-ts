import type { GreaterLessOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function extractFromValue(from: number | GreaterLessOptions): string {
  if (typeof from === 'number') return `[${from}]`

  return formatGreaterLess(from).join(' and ')
}
