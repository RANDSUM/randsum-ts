import type { ReplaceOptions } from '~types'
import { replaceArgs } from './replaceArgs'

export function replaceNotation(replace: ReplaceOptions | ReplaceOptions[]) {
  return `V{${replaceArgs(replace).join(',')}}`
}
