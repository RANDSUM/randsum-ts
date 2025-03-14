import type { ReplaceOptions } from '~types'
import { extractFromValue } from './extractFromValue'

export function singleReplaceString(replace: ReplaceOptions): string {
  return `Replace ${extractFromValue(replace.from)} with [${replace.to}]`
}
