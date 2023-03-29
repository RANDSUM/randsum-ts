import { completeRollPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { RollParameters } from '../../types/parameters'
import { DiceNotation, DieSides } from '../../types/primitives'
import parseModifiers, {
  isCoreNotationMatch,
  Match,
  parseCoreNotation
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
  } as RollParameters<DieSides>

  return findMatches(notationString).reduce((acc, match) => {
    if (isCoreNotationMatch(match)) {
      const diceOptions = parseCoreNotation(match)
      const dice = dicePoolFactory(diceOptions)

      return {
        ...acc,
        diceOptions,
        dice,
        modifiers: acc.modifiers || []
      }
    }

    return {
      ...acc,
      modifiers: [...acc.modifiers, parseModifiers(match)]
    }
  }, initialParams) as RollParameters<number> | RollParameters<string>
}
export default parseNotation
