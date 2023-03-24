import { completeRollPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { isCustomSidesRollParameters } from '../../types/guards'
import { Modifier } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation } from '../../types/primitives'
import { generateStandardSides } from '../../utils'
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
    faces: [],
    diceOptions: [],
    sides: 1,
    quantity: 1,
    modifiers: [] as Modifier<number>[],
    initialRolls: []
  }

  findMatches(notationString).forEach((match) => {
    const { modifiers, ...restParameters } = rollParameters

    if (isCoreNotationMatch(match)) {
      const newRollParameters = {
        ...rollParameters,
        ...parseCoreNotation(match)
      }
      if (isCustomSidesRollParameters(newRollParameters)) {
        const diceOptions = [
          {
            quantity: newRollParameters.quantity,
            sides: newRollParameters.faces
          }
        ]
        const dice = dicePoolFactory(diceOptions)
        const initialRolls = dice.map((die) => die.roll())

        rollParameters = {
          ...newRollParameters,
          diceOptions,
          dice,
          initialRolls,
          modifiers: []
        }
      } else {
        const diceOptions = [
          {
            quantity: newRollParameters.quantity,
            sides: newRollParameters.sides
          }
        ]
        const dice = dicePoolFactory(diceOptions)

        const initialRolls = dice.map((die) => die.roll())

        rollParameters = {
          ...newRollParameters,
          diceOptions,
          dice,
          faces: generateStandardSides(newRollParameters.sides),
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
