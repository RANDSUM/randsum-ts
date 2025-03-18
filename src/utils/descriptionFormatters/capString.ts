import type { ComparisonOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function capString(cap: ComparisonOptions): string[] {
  return formatGreaterLess(cap).map((str) => `No Rolls ${str}`)
}
