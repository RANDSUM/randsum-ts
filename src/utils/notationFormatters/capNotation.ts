import type { ComparisonOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function capNotation(cap: ComparisonOptions): string {
  const capList = formatGreaterLess(cap)
  return `C{${capList.join(',')}}`
}
