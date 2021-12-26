import { DiceNotation, RollParameters } from 'types'
import { diceNotationPattern } from 'utils'

import {
  parseCapNotation,
  parseDropConstraintsNotation,
  parseReplaceNotation,
  parseRerollNotation,
  parseUniqeNotation,
} from './notationParsers'

const dropHigh = /[Hh](\d*)/
const dropLow = /[Ll](\d*)/
const dropConstraints = /.{3,}[Dd]{?([<>|]?\d,?)*}?/
const explode = /!+{?([<>|]?\d+,?)*}?/
const unique = /[Uu]({(\d,?)+})?/
const replace = /[Vv]{?([<>|]?\d+=?\d+,?)*}?/
const reroll = /[Rr]{?([<>|]?\d,?)*}\d?/
const cap = /[Cc]([<>|]?\d+)*/
const plus = /\+\d+/
const minus = /-\d+/

export function findMatch(notationString: string, pattern: RegExp) {
  const match = notationString.match(pattern)

  return match ? match[0] : false
}

export function parseNotation(notationString: DiceNotation): RollParameters {
  const formattedNotations = notationString.toLowerCase()

  if (formattedNotations.includes(' ')) {
    throw new Error('Notation cannot include spaces.')
  }

  const coreNotation = findMatch(formattedNotations, diceNotationPattern) as DiceNotation
  const [rolls, sides] = coreNotation.split('d').map(number => Number(number))

  let rollParameters: RollParameters = {
    notation: formattedNotations,
    sides,
    rolls,
  }

  const dropHighMatch = findMatch(formattedNotations, dropHigh)
  if (dropHighMatch) {
    rollParameters = {
      ...rollParameters,
      drop: {
        ...rollParameters.drop,
        highest: Number(dropHighMatch.split('h')[1]) || 1,
      },
    }
  }

  const dropLowMatch = findMatch(formattedNotations, dropLow)
  if (dropLowMatch) {
    rollParameters = {
      ...rollParameters,
      drop: {
        ...rollParameters.drop,
        lowest: Number(dropLowMatch.split('l')[1]) || 1,
      },
    }
  }

  const dropConstraintsMatch = findMatch(formattedNotations, dropConstraints)
  if (dropConstraintsMatch) {
    rollParameters = {
      ...rollParameters,
      drop: {
        ...rollParameters.drop,
        ...parseDropConstraintsNotation(dropConstraintsMatch),
      },
    }
  }

  const explodeMatch = findMatch(formattedNotations, explode)
  if (explodeMatch) {
    rollParameters = {
      ...rollParameters,
      explode: !!explodeMatch,
    }
  }

  const uniqueMatch = findMatch(formattedNotations, unique)
  if (uniqueMatch) {
    rollParameters = {
      ...rollParameters,
      ...parseUniqeNotation(uniqueMatch),
    }
  }

  const replaceMatch = findMatch(formattedNotations, replace)
  if (replaceMatch) {
    rollParameters = {
      ...rollParameters,
      ...parseReplaceNotation(replaceMatch),
    }
  }

  const rerollMatch = findMatch(formattedNotations, reroll)
  if (rerollMatch) {
    rollParameters = {
      ...rollParameters,
      ...parseRerollNotation(rerollMatch),
    }
  }

  const capMatch = findMatch(formattedNotations, cap)
  if (capMatch) {
    rollParameters = {
      ...rollParameters,
      ...parseCapNotation(capMatch),
    }
  }

  const plusMatch = findMatch(formattedNotations, plus)
  if (plusMatch) {
    rollParameters = {
      ...rollParameters,
      plus: Number(notationString.split('+')[1]),
    }
  }

  const minusMatch = findMatch(formattedNotations, minus)
  if (minusMatch) {
    rollParameters = {
      ...rollParameters,
      minus: Number(notationString.split('-')[1]),
    }
  }

  return rollParameters
}
