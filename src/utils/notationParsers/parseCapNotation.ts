import { capPattern } from '~patterns'
import type { GreaterLessOptions, Modifiers } from '~types'
import { extractMatches } from './extractMatches'

export function parseCapNotation(
  modifiersString: string
): Pick<Modifiers, 'cap'> {
  const notations = extractMatches(modifiersString, capPattern)
  if (notations.length === 0) {
    return {}
  }
  return notations.reduce(
    (acc, notationString) => {
      const capString = notationString
        .split(/[Cc]/)[1]
        .replaceAll(/{|}/g, '')
        .split(',')

      const capOptions = capString.reduce((innerAcc, note) => {
        if (note.includes('<')) {
          return {
            ...innerAcc,
            lessThan: Number(note.replaceAll('<', ''))
          }
        }
        return {
          ...innerAcc,
          greaterThan: Number(note.replaceAll('>', ''))
        }
      }, {} as GreaterLessOptions)

      return {
        cap: {
          ...acc.cap,
          ...capOptions
        }
      }
    },
    { cap: {} } as Pick<Modifiers, 'cap'>
  )
}
