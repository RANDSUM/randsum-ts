import type { ReplaceOptions } from '~types'
import { singleReplaceString } from './singleReplaceString'

export function replaceString(
  replace: ReplaceOptions | ReplaceOptions[]
): string[] {
  if (Array.isArray(replace)) return replace.map(singleReplaceString)

  return [singleReplaceString(replace)]
}
