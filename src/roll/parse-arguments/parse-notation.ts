import { completeRollPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { RollParameters } from '../../types/parameters'
import { DiceNotation } from '../../types/primitives'
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
): RollParameters<number> | RollParameters<string> => {
  const initialParams = {
    argument: notationString
  } as RollParameters<string | number>

  return findMatches(notationString).reduce((acc, match) => {
    if (isCoreNotationMatch(match)) {
      const diceOptions = parseCoreNotation(match)
      const dice = dicePoolFactory(diceOptions)

      return {
        ...acc,
        diceOptions,
        dice,
        modifiers: acc.modifiers || {}
      }
    }

    const newModifiers = parseModifiers(match)
    const mergedModifiers = mergeModifiers(acc.modifiers, newModifiers)

    return {
      ...acc,
      modifiers: { ...acc.modifiers, ...mergedModifiers }
    }
  }, initialParams) as RollParameters<number> | RollParameters<string>
}

export default parseNotation
