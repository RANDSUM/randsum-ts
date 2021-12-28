import { DiceNotation, RollParameters } from '../../types'
import { diceNotationPattern } from '../../utils'
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

export function findMatch(notationString: string, pattern: RegExp): string | undefined {
  const match = notationString.match(pattern)

  return match !== null ? match[0] : undefined
}

export function parseNotation(notationString: DiceNotation): RollParameters {
  const formattedNotations = notationString.toLowerCase().replace(' ', '')

  const coreNotation = findMatch(formattedNotations, diceNotationPattern) as DiceNotation
  const [quantity, sides] = coreNotation.split('d').map(number => Number(number))

  let rollParameters: RollParameters = {
    sides,
    quantity,
  }

  const dropHighMatch = findMatch(formattedNotations, dropHigh)
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

  const dropLowMatch = findMatch(formattedNotations, dropLow)
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

  const dropConstraintsMatch = findMatch(formattedNotations, dropConstraints)
  if (dropConstraintsMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      drop: {
        ...rollParameters.drop,
        ...parseDropConstraintsNotation(dropConstraintsMatch),
      },
    }
  }

  const explodeMatch = findMatch(formattedNotations, explode)
  if (explodeMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      explode: Boolean(explodeMatch),
    }
  }

  const uniqueMatch = findMatch(formattedNotations, unique)
  if (uniqueMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseUniqeNotation(uniqueMatch),
    }
  }

  const replaceMatch = findMatch(formattedNotations, replace)
  if (replaceMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseReplaceNotation(replaceMatch),
    }
  }

  const rerollMatch = findMatch(formattedNotations, reroll)
  if (rerollMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseRerollNotation(rerollMatch),
    }
  }

  const capMatch = findMatch(formattedNotations, cap)
  if (capMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      ...parseCapNotation(capMatch),
    }
  }

  const plusMatch = findMatch(formattedNotations, plus)
  if (plusMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      plus: Number(notationString.split('+')[1]),
    }
  }

  const minusMatch = findMatch(formattedNotations, minus)
  if (minusMatch !== undefined) {
    rollParameters = {
      ...rollParameters,
      minus: Number(notationString.split('-')[1]),
    }
  }

  return rollParameters
}
