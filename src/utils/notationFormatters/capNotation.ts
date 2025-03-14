import type { GreaterLessOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function capNotation(cap: GreaterLessOptions): string {
  const capList = formatGreaterLess(cap)
  return `C{${capList.join(',')}}`
}
