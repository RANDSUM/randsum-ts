import { replacePattern } from '~patterns'
import type { ModifierOptions } from '~types'
import { extractMatches } from './extractMatches'

export function parseReplaceNotation(
  modifiersString: string
): Pick<ModifierOptions, 'replace'> {
  const notations = extractMatches(modifiersString, replacePattern)
  if (notations.length === 0) {
    return {}
  }
  const replace = notations
    .map((notationString) => {
      const replaceOptions = notationString
        .split(/[Vv]/)[1]
        .replaceAll('{', '')
        .replaceAll('}', '')
        .split(',')
        .map((replacement) => {
          const [noteFrom, noteTo] = replacement.split('=')

          const coreReplacement = { to: Number(noteTo) }
          if (noteFrom.includes('>')) {
            return {
              ...coreReplacement,
              from: { greaterThan: Number(noteFrom.replaceAll('>', '')) }
            }
          }
          if (noteFrom.includes('<')) {
            return {
              ...coreReplacement,
              from: { lessThan: Number(noteFrom.replaceAll('<', '')) }
            }
          }
          return { ...coreReplacement, from: Number(noteFrom) }
        })

      if (replaceOptions.length === 1) {
        return replaceOptions[0]
      }
      return replaceOptions.filter(Boolean)
    })
    .flat()
  return { replace }
}
