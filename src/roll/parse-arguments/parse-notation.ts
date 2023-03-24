import { CustomSidesDicePool, StandardDicePool } from '../../Die'
import { Modifier } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation } from '../../types/primitives'
import parseModifiers, {
  isCoreNotationMatch,
  Match,
  parseCoreNotation
} from './parse-modifiers'
import { completeRollPattern } from './regexp'
import { isCustomSidesRollParameters } from './utils'

const findMatches = (notations: string): Match[] =>
  [...notations.matchAll(completeRollPattern)].map<Match>(
    ({ groups: match }) => match as Match
  )

const parseNotation = (
  notationString: DiceNotation | DiceNotation<string>
): RollParameters | RollParameters<string> => {
  let rollParameters: RollParameters | RollParameters<string> = {
    pool: new StandardDicePool([]),
    argument: notationString,
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
        const pool = new CustomSidesDicePool([
          {
            quantity: newRollParameters.quantity,
            sides: newRollParameters.faces
          }
        ])
        const initialRolls = pool.roll()
        rollParameters = {
          ...newRollParameters,
          pool,
          initialRolls,
          modifiers: []
        }
      } else {
        const pool = new StandardDicePool([
          {
            quantity: newRollParameters.quantity,
            sides: newRollParameters.sides
          }
        ])
        const initialRolls = pool.roll()

        rollParameters = {
          ...newRollParameters,
          pool,
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
