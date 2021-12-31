import { DiceNotation, RollParameters } from '../../types'
import { findMatches, mergeModifier } from '../utils'
import {
  parseCapNotation,
  parseDropConstraintsNotation,
  parseReplaceNotation,
  parseRerollNotation,
  parseUniqueNotation,
} from './notationParsers'

export function parseNotation(notationString: DiceNotation): RollParameters {
  const {
    coreNotationMatch,
    dropHighMatch,
    dropLowMatch,
    dropConstraintsMatch,
    explodeMatch,
    uniqueMatch,
    replaceMatch,
    rerollMatch,
    capMatch,
    plusMatch,
    minusMatch,
  } = findMatches(notationString.toLowerCase().replace(' ', ''))

  const [quantity, sides] = coreNotationMatch.split('d').map((number: unknown) => Number(number))

  let rollParameters: RollParameters = {
    sides,
    quantity,
  }

  if (dropHighMatch !== undefined) {
    const highestCount = dropHighMatch.split('h')[1]

    rollParameters = mergeModifier(
      {
        drop: { highest: highestCount !== '' ? Number(highestCount) : 1 },
      },
      rollParameters,
    )
  }

  if (dropLowMatch !== undefined) {
    const lowestCount = dropLowMatch.split('l')[1]

    rollParameters = mergeModifier(
      {
        drop: {
          lowest: lowestCount !== '' ? Number(lowestCount) : 1,
        },
      },
      rollParameters,
    )
  }

  if (dropConstraintsMatch !== undefined) {
    rollParameters = mergeModifier(
      {
        drop: {
          ...parseDropConstraintsNotation(dropConstraintsMatch),
        },
      },
      rollParameters,
    )
  }

  if (explodeMatch !== undefined) {
    rollParameters = mergeModifier({ explode: Boolean(explodeMatch) }, rollParameters)
  }

  if (uniqueMatch !== undefined) {
    rollParameters = mergeModifier(parseUniqueNotation(uniqueMatch), rollParameters)
  }

  if (replaceMatch !== undefined) {
    rollParameters = mergeModifier(parseReplaceNotation(replaceMatch), rollParameters)
  }

  if (rerollMatch !== undefined) {
    rollParameters = mergeModifier(parseRerollNotation(rerollMatch), rollParameters)
  }

  if (capMatch !== undefined) {
    rollParameters = mergeModifier(parseCapNotation(capMatch), rollParameters)
  }

  if (plusMatch !== undefined) {
    rollParameters = mergeModifier({ plus: Number(plusMatch.split('+')[1]) }, rollParameters, 'total')
  }

  if (minusMatch !== undefined) {
    rollParameters = mergeModifier({ minus: Number(minusMatch.split('-')[1]) }, rollParameters, 'total')
  }

  return rollParameters
}
