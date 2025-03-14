import type { ReplaceOptions } from '~types'
import { singleReplaceNotation } from './singleReplaceNotation'

export function replaceArgs(
  replace: ReplaceOptions | ReplaceOptions[]
): string[] {
  if (Array.isArray(replace)) return replace.map(singleReplaceNotation).flat()
  return [singleReplaceNotation(replace)]
}
