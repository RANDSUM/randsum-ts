import type { ComparisonOptions } from '~types'
import { formatGreaterLessNotation } from './formatGreaterLessNotation'

export function fromValue(from: number | ComparisonOptions): string | number {
  if (typeof from === 'number') return from
  return formatGreaterLessNotation(from).join(',')
}
