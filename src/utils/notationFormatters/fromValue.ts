import type { ComparisonOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function fromValue(from: number | ComparisonOptions): string | number {
  if (typeof from === 'number') return from
  return formatGreaterLess(from).join(',')
}
