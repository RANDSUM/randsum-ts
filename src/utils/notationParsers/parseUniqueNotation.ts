import { uniquePattern } from '~patterns'
import type { ModifierOptions } from '~types'
import { extractMatches } from './extractMatches'

export function parseUniqueNotation(
  modifiersString: string
): Pick<ModifierOptions, 'unique'> {
  return extractMatches(modifiersString, uniquePattern).reduce<
    Pick<ModifierOptions, 'unique'>
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
