import { DiceNotation, InternalRollParameters } from 'types'
import {
  findMatches,
  isCapMatch,
  isCoreNotationMatch,
  isDropConstraintsMatch,
  isDropHighMatch,
  isDropLowMatch,
  isExplodeMatch,
  isMinusMatch,
  isPlusMatch,
  isReplaceMatch,
  isRerollMatch,
  isUniqueMatch
} from 'utils'

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
    const { modifiers = [], ...restParameters } = accumulator

    // if (key === 'coreNotationMatch') {
    if (isCoreNotationMatch(match)) {
      const newRollParameters = {
        ...accumulator,
        ...parseCoreNotation(match.coreNotationMatch)
      }
      if (newRollParameters.faces !== undefined) {
        return { ...newRollParameters, modifiers: [] }
      }
      return newRollParameters
    }
    if (isDropHighMatch(match)) {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseDropHighNotation(match.dropHighMatch)]
      }
    }
    if (isDropLowMatch(match)) {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseDropLowNotation(match.dropLowMatch)]
      }
    }
    if (isDropConstraintsMatch(match)) {
      return {
        ...restParameters,
        modifiers: [
          ...modifiers,
          parseDropConstraintsNotation(match.dropConstraintsMatch)
        ]
      }
    }
    if (isExplodeMatch(match)) {
      return {
        ...restParameters,
        modifiers: [...modifiers, { explode: Boolean(match.explodeMatch) }]
      }
    }
    if (isUniqueMatch(match)) {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseUniqueNotation(match.uniqueMatch)]
      }
    }
    if (isReplaceMatch(match)) {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseReplaceNotation(match.replaceMatch)]
      }
    }
    if (isRerollMatch(match)) {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseRerollNotation(match.rerollMatch)]
      }
    }
    if (isCapMatch(match)) {
      return {
        ...restParameters,
        modifiers: [...modifiers, parseCapNotation(match.capMatch)]
      }
    }
    if (isPlusMatch(match)) {
      return {
        ...restParameters,
        modifiers: [
          ...modifiers,
          { plus: Number(match.plusMatch.split('+')[1]) }
        ]
      }
    }
    if (isMinusMatch(match)) {
      return {
        ...restParameters,
        modifiers: [
          ...modifiers,
          { minus: Number(match.minusMatch.split('-')[1]) }
        ]
      }
    }
    throw new Error('Unrecognized Match')
  }, rollParameters)
}
