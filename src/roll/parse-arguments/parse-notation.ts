import { completeRollPattern } from '../../constants/regexp'

import { DicePoolOptions, DiceNotation } from '../../types'

import {
  isCoreNotationMatch,
  Match,
  mergeModifiers,
  parseCoreNotation,
  parseModifiers
} from './parse-modifiers'

const findMatches = (notations: string): Match[] =>
  [...notations.matchAll(completeRollPattern)].map(
    ({ groups: match }) => match as Match
  )

const parseNotation = (
  notationString: DiceNotation<number> | DiceNotation<string>
): DicePoolOptions<number | string> => {
  const initialParams = {
    modifiers: {}
  }

  return findMatches(notationString).reduce((acc, match) => {
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
  }, initialParams) as DicePoolOptions<number> | DicePoolOptions<string>
}

export default parseNotation
