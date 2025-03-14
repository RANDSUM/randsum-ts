import { plusPattern } from '~patterns'
import type { Modifiers } from '~types'
import { extractMatches } from './extractMatches'

export function parsePlusNotation(
  modifiersString: string
): Pick<Modifiers, 'plus'> {
  const notations = extractMatches(modifiersString, plusPattern)
  if (notations.length === 0) {
    return {}
  }
  const plus = notations
    .map((notationString) => Number(notationString.split('+')[1]))
    .reduce((acc, num) => acc + num, 0)

  return {
    plus
  }
}
