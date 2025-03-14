import type { GreaterLessOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function fromValue(from: number | GreaterLessOptions): string | number {
  if (typeof from === 'number') return from
  return formatGreaterLess(from).join(',')
}
