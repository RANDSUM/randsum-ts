import { DiceNotation, RollParameters } from '../../types'
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

const parseNotation = (notationString: DiceNotation): RollParameters => {
  let rollParameters: RollParameters = {
    sides: 1,
    quantity: 1,
    modifiers: [],
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
        rollParameters = { ...newRollParameters, modifiers: [] }
      }
      rollParameters = newRollParameters
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
