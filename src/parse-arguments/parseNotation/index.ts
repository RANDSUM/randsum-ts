import { DiceNotation, InternalRollParameters } from 'types'
import { findMatches, isCoreNotationMatch } from 'utils'

import parseCoreNotation from './notationParsers/parse-core-notation'
import parseModifiers from './notationParsers/parse-modifiers'

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
