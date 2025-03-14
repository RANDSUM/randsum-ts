import type { ReplaceOptions } from '~types'
import { fromValue } from './fromValue'

export function singleReplaceNotation(replace: ReplaceOptions): string {
  return `${fromValue(replace.from)}=${replace.to}`
}
