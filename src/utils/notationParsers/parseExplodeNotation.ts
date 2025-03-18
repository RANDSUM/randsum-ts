import { explodePattern } from '~patterns'
import type { ModifierOptions } from '~types'
import { extractMatches } from './extractMatches'

export function parseExplodeNotation(
  modifiersString: string
): Pick<ModifierOptions, 'explode'> {
  const notations = extractMatches(modifiersString, explodePattern)
  if (notations.length === 0) {
    return {}
  }
  return { explode: true }
}
