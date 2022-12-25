import { DiceNotation, InternalRollParameters } from 'types'
import { findMatches } from 'utils'

import parseCapNotation from './notationParsers/parse-cap-notation'
import parseCoreNotation from './notationParsers/parse-core-notation'
import parseDropConstraintsNotation from './notationParsers/parse-drop-contstraints-notation'
import parseDropHighNotation from './notationParsers/parse-drop-high-notation'
import parseDropLowNotation from './notationParsers/parse-drop-low-notation'
import parseReplaceNotation from './notationParsers/parse-replace-notation'
import parseRerollNotation from './notationParsers/parse-reroll-notation'
import parseUniqueNotation from './notationParsers/parse-unique-notation'

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
    const [key, value] = Object.entries(match)[0]
    const { modifiers = [], ...restParameters } = accumulator

    if (key === 'coreNotationMatch') {
      const newRollParameters = { ...accumulator, ...parseCoreNotation(value) }
      if (newRollParameters.faces !== undefined) {
        return { ...newRollParameters, modifiers: [] }
      }
      return newRollParameters
    }
    if (key === 'dropHighMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseDropHighNotation(value)]
      }
    }
    if (key === 'dropLowMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseDropLowNotation(value)]
      }
    }
    if (key === 'dropConstraintsMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseDropConstraintsNotation(value)]
      }
    }
    if (key === 'explodeMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, { explode: Boolean(value) }]
      }
    }
    if (key === 'uniqueMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseUniqueNotation(value)]
      }
    }
    if (key === 'replaceMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseReplaceNotation(value)]
      }
    }
    if (key === 'rerollMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseRerollNotation(value)]
      }
    }
    if (key === 'capMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseCapNotation(value)]
      }
    }
    if (key === 'plusMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, { plus: Number(value.split('+')[1]) }]
      }
    }
    if (key === 'minusMatch') {
      return {
        ...restParameters,
        modifiers: [...modifiers, { minus: Number(value.split('-')[1]) }]
      }
    }
    throw new Error('Unrecognized Match')
  }, rollParameters)
}
