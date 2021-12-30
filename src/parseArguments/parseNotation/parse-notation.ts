import { DiceNotation, RollParameters } from '../../types'
import { findMatches } from '../utils/find-matches'
import {
  parseCapNotation,
  parseDropConstraintsNotation,
  parseReplaceNotation,
  parseRerollNotation,
  parseUniqeNotation,
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

    rollParameters = {
      ...rollParameters,
      drop: {
        ...rollParameters.drop,
        highest: highestCount !== '' ? Number(highestCount) : 1,
      },
    }
  }

  if (dropLowMatch !== undefined) {
    const lowestCount = dropLowMatch.split('l')[1]

    rollParameters = {
      ...rollParameters,
      drop: {
        ...rollParameters.drop,
        lowest: lowestCount !== '' ? Number(lowestCount) : 1,
      },
    }
  }

  if (dropConstraintsMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      drop: {
        ...rollParameters.drop,
        ...parseDropConstraintsNotation(dropConstraintsMatch),
      },
    }
  }

  if (explodeMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      explode: Boolean(explodeMatch),
    }
  }

  if (uniqueMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseUniqeNotation(uniqueMatch),
    }
  }

  if (replaceMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseReplaceNotation(replaceMatch),
    }
  }

  if (rerollMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseRerollNotation(rerollMatch),
    }
  }

  if (capMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseCapNotation(capMatch),
    }
  }

  if (plusMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      plus: Number(plusMatch.split('+')[1]),
    }
  }

  if (minusMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      minus: Number(minusMatch.split('-')[1]),
    }
  }

  return rollParameters
}
