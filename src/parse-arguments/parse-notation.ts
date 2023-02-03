import { DiceNotation, InternalRollParameters } from '../types'
import { coreNotationPattern } from './is-dice-notation'
import parseModifiers, {
  isCoreNotationMatch,
  Match,
  parseCoreNotation
} from './parsers'

const modifierRollPatterns =
  // eslint-disable-next-line security/detect-unsafe-regex
  /(?<dropHighMatch>[Hh]\d*)|(?<dropLowMatch>[Ll]\d*)|(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)|(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)|(?<uniqueMatch>[Uu]({(\d+,?)+})?)|(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)|(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)|(?<capMatch>[Cc]([<>|]?\d+)*)|(?<plusMatch>\+\d+)|(?<minusMatch>-\d+)/
// eslint-disable-next-line security/detect-non-literal-regexp
const completeRollPattern = new RegExp(
  `${coreNotationPattern.source}|${modifierRollPatterns.source}`,
  'g'
)

function findMatches(notations: string): Match[] {
  return [...notations.matchAll(completeRollPattern)].map<Match>(
    ({ groups: match }) => match as Match
  )
}

export default function parseNotation(
  notationString: DiceNotation
): InternalRollParameters {
  let rollParameters: InternalRollParameters = {
    sides: 1,
    quantity: 1,
    faces: undefined,
    modifiers: []
  }

  findMatches(notationString).forEach((match) => {
    const { modifiers, ...restParameters } = rollParameters

    if (isCoreNotationMatch(match)) {
      const newRollParameters = {
        ...rollParameters,
        ...parseCoreNotation(match)
      }
      if (newRollParameters.faces !== undefined) {
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
