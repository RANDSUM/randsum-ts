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
  const coreParams = {
    argument: notationString,
    modifiers: [] as Modifier<number>[]
  }

  const matches = findMatches(notationString)

  return (
    matches
      .map((match) => {
        if (isCoreNotationMatch(match)) {
          const diceOptions = parseCoreNotation(match)
          const dice = dicePoolFactory(diceOptions)
          const initialRolls = dice.map((die) => die.roll())

          return {
            ...coreParams,
            diceOptions,
            dice,
            initialRolls
          }
        }
        return { modifiers: [parseModifiers(match)] }
      })
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce(
        (acc, slice) => ({
          ...acc,
          ...slice,
          modifiers: [...(acc.modifiers || []), ...(slice.modifiers || [])]
        }),
        coreParams
      ) as RollParameters | RollParameters<string>
  )
}

export default parseNotation
