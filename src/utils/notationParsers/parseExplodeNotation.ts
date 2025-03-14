import { explodePattern } from '~patterns'
import type { Modifiers } from '~types'
import { extractMatches } from './extractMatches'

export function parseExplodeNotation(
  modifiersString: string
): Pick<Modifiers, 'explode'> {
  const notations = extractMatches(modifiersString, explodePattern)
  if (notations.length === 0) {
    return {}
  }
  return { explode: true }
}
