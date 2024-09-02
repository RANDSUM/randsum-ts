import { completeRollPattern } from '~matchPattern'
import { DiceNotation, DicePoolOptions } from '~types'
import {
  isCoreNotationMatch,
  Match,
  mergeModifiers,
  parseCoreNotation,
  parseModifiers
} from './parseModifiers'

const findMatches = (notations: string): Match[] => {
  const matches = []
  let parsed: RegExpExecArray | null
  while ((parsed = completeRollPattern.exec(notations))) {
    matches.push(parsed.groups as Match)
  }

  return matches
}

const parseNotation = (
  notationString: DiceNotation
): DicePoolOptions<number | string> => {
  const initialParams = {
    modifiers: {}
  }

  return findMatches(notationString).reduce((acc, match) => {
    if (!match) return acc
    if (isCoreNotationMatch(match)) {
      return {
        ...acc,
        ...parseCoreNotation(match)
      }
    }

    const newModifiers = parseModifiers(match)
    const mergedModifiers = mergeModifiers(acc?.modifiers, newModifiers)

    return {
      ...acc,
      modifiers: { ...acc.modifiers, ...mergedModifiers }
    }
  }, initialParams) as DicePoolOptions
}

export default parseNotation
