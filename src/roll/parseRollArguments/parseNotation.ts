import { completeRollPattern } from '~constants'
import { DiceNotation, DicePoolOptions } from '~types'
import {
  isCoreNotationMatch,
  Match,
  mergeModifiers,
  parseCoreNotation,
  parseModifiers
} from './parseModifiers'
import matchAll from 'string.prototype.matchall'

const findMatches = (notations: string): Match[] =>
  [...matchAll(notations, completeRollPattern)].map(
    ({ groups: match }) => match as Match
  )

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
