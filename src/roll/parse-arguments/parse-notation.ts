import { completeRollPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { Modifier } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation } from '../../types/primitives'
import parseModifiers, {
  isCoreNotationMatch,
  Match,
  parseCoreNotation
} from './parse-modifiers'

const findMatches = (notations: string): Match[] =>
  [...notations.matchAll(completeRollPattern)].map<Match>(
    ({ groups: match }) => match as Match
  )

const parseNotation = (
  notationString: DiceNotation | DiceNotation<string>
): RollParameters | RollParameters<string> => {
  const initialParams = {
    argument: notationString,
    modifiers: [] as Modifier<number>[]
  } as RollParameters | RollParameters<string>
  return findMatches(notationString).reduce((acc, match) => {
    if (isCoreNotationMatch(match)) {
      const diceOptions = parseCoreNotation(match)
      const dice = dicePoolFactory(diceOptions)
      const initialRolls = dice.map((die) => die.roll())

      return {
        ...acc,
        diceOptions,
        dice,
        initialRolls,
        modifiers: acc.modifiers || []
      } as RollParameters | RollParameters<string>
    }

    return { ...acc, modifiers: [...acc.modifiers, parseModifiers(match)] }
  }, initialParams)
}
export default parseNotation
