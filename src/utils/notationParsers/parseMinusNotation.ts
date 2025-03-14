import { minusPattern } from '~patterns'
import type { Modifiers } from '~types'
import { extractMatches } from './extractMatches'

export function parseMinusNotation(
  modifiersString: string
): Pick<Modifiers, 'minus'> {
  const notations = extractMatches(modifiersString, minusPattern)
  if (notations.length === 0) {
    return {}
  }
  const minus = notations
    .map((notationString) => Number(notationString.split('-')[1]))
    .reduce((acc, num) => acc - num, 0)

  return {
    minus: Math.abs(minus)
  }
}
