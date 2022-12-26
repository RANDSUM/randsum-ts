import {
  coreNotationPattern,
  DiceNotation,
  InternalRollParameters,
  isCoreNotationMatch,
  Match
} from 'types'

import parseModifiers, { parseCoreNotation } from './parsers'

const modifierRollPatterns =
  /(?<dropHighMatch>[Hh]\d*)|(?<dropLowMatch>[Ll]\d*)|(?<dropConstraintsMatch>[Dd]{?([<>|]?\d+,?)*}?)|(?<explodeMatch>!+{?([<>|]?\d+,?)*}?)|(?<uniqueMatch>[Uu]({(\d+,?)+})?)|(?<replaceMatch>[Vv]{?([<>|]?\d+=?\d+,?)*}?)|(?<rerollMatch>[Rr]{?([<>|]?\d,?)*}\d*)|(?<capMatch>[Cc]([<>|]?\d+)*)|(?<plusMatch>\+\d+)|(?<minusMatch>-\d+)/
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
): Omit<InternalRollParameters, 'randomizer'> {
  const rollParameters: Omit<InternalRollParameters, 'randomizer'> = {
    sides: 1,
    quantity: 1,
    faces: undefined,
    modifiers: []
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  return findMatches(notationString).reduce((accumulator, match) => {
    const { modifiers = [], ...restParameters } = accumulator

    if (isCoreNotationMatch(match)) {
      const newRollParameters = {
        ...accumulator,
        ...parseCoreNotation(match)
      }
      if (newRollParameters.faces !== undefined) {
        return { ...newRollParameters, modifiers: [] }
      }
      return newRollParameters
    }

    return {
      ...restParameters,
      modifiers: [...modifiers, parseModifiers(match)]
    }
  }, rollParameters)
}
