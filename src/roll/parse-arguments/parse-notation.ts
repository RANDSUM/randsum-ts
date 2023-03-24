import { completeRollPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { isCustomSidesRollParameters } from '../../types/guards'
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
  let rollParameters: RollParameters | RollParameters<string> = {
    argument: notationString,
    dice: [],
    diceOptions: [],
    modifiers: [] as Modifier<number>[],
    initialRolls: []
  }

  findMatches(notationString).forEach((match) => {
    const { modifiers, ...restParameters } = rollParameters

    if (isCoreNotationMatch(match)) {
      const diceOptions = parseCoreNotation(match)
      const newRollParameters = {
        ...rollParameters,
        diceOptions
      }

      if (isCustomSidesRollParameters(newRollParameters)) {
        const dice = dicePoolFactory(newRollParameters.diceOptions)
        const initialRolls = dice.map((die) => die.roll())

        rollParameters = {
          ...newRollParameters,
          dice,
          initialRolls,
          modifiers: []
        }
      } else {
        const dice = dicePoolFactory(newRollParameters.diceOptions)
        const initialRolls = dice.map((die) => die.roll())

        rollParameters = {
          ...rollParameters,
          diceOptions,
          dice,
          initialRolls
        }
      }
      return
    }

    rollParameters = {
      ...restParameters,
      modifiers: [...modifiers, parseModifiers(match)]
    }
  })

  return rollParameters
}

export default parseNotation
