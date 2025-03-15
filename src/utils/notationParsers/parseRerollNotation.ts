import { rerollPattern } from '~patterns'
import type { Modifiers, RerollOptions } from '~types'
import { extractMatches } from './extractMatches'

export function parseRerollNotation(
  modifiersString: string
): Pick<Modifiers, 'reroll'> {
  const notations = extractMatches(modifiersString, rerollPattern)
  if (notations.length === 0) {
    return {}
  }
  return notations.reduce(
    (acc, notationString) => {
      const parsedString = notationString
        .split(/[Rr]/)[1]
        .replaceAll('{', '')
        .replaceAll('}', ',!')
        .split(',')

      const rerollOptions = parsedString.reduce((innerAcc, notation) => {
        if (notation === '!') {
          return innerAcc
        }
        if (notation.includes('<')) {
          return {
            ...innerAcc,
            lessThan: Number(notation.split('<')[1])
          }
        }
        if (notation.includes('>')) {
          return {
            ...innerAcc,
            greaterThan: Number(notation.split('>')[1])
          }
        }
        if (notation.includes('!')) {
          return {
            ...innerAcc,
            max: Number(notation.split('!')[1])
          }
        }

        return {
          ...innerAcc,
          exact: [...(innerAcc.exact || []), Number(notation)]
        }
      }, {} as RerollOptions)

      return {
        reroll: {
          ...acc.reroll,
          ...rerollOptions
        }
      }
    },
    { reroll: {} }
  )
}
