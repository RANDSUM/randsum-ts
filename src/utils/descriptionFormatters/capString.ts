import type { GreaterLessOptions } from '~types'
import { formatGreaterLess } from './formatGreaterLess'

export function capString(cap: GreaterLessOptions): string[] {
  return formatGreaterLess(cap).map((str) => `No Rolls ${str}`)
}
