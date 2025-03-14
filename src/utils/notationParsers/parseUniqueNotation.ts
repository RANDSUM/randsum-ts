import { uniquePattern } from '~patterns'
import type { Modifiers } from '~types'
import { extractMatches } from './extractMatches'

export function parseUniqueNotation(
  modifiersString: string
): Pick<Modifiers, 'unique'> {
  const notations = extractMatches(modifiersString, uniquePattern)
  if (notations.length === 0) {
    return {}
  }
  return notations.reduce(
    (acc, notationString) => {
      if (notationString === 'u' || notationString === 'U') {
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
    },
    { unique: false } as Pick<Modifiers, 'unique'>
  )
}
