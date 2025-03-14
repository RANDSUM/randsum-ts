import { uniquePattern } from '~patterns'
import type { Modifiers } from '~types'
import { extractMatches } from './extractMatches'

export function parseUniqueNotation(
  modifiersString: string
): Pick<Modifiers, 'unique'> {
  return extractMatches(modifiersString, uniquePattern).reduce<
    Pick<Modifiers, 'unique'>
  >((acc, notationString) => {
    if (notationString.toUpperCase() === 'U') {
      if (typeof acc.unique === 'object') {
        return acc
      }
      return { unique: true }
    }
    const notUnique = notationString
      .replaceAll(/[Uu]{/g, '')
      .replaceAll('}', '')
      .split(',')

    return {
      unique: {
        notUnique: notUnique.map(Number)
      }
    }
  }, {})
}
