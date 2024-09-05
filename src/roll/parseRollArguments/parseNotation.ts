import {
  capPattern,
  coreNotationPattern,
  dropConstraintsPattern,
  dropHighestPattern,
  explodePattern,
  minusPattern,
  plusPattern,
  replacePattern,
  rerollPattern,
  uniquePattern
} from '~matchPattern'
import { DiceNotation, DicePoolOptions } from '~types'
import {
  CoreNotationMatch,
  isCoreNotationMatch,
  MatchObject,
  mergeModifiers,
  parseCoreNotation,
  parseModifiers
} from './parseModifiers'

const findMatches = (notations: string): MatchObject => {
  return {
    coreNotationMatch: (notations.match(coreNotationPattern)?.at(0) ||
      '') as unknown as CoreNotationMatch,
    dropHighMatch: [...(notations.match(dropHighestPattern) || [])],
    dropLowMatch: [...(notations.match(dropHighestPattern) || [])],
    dropConstraintsMatch: [...(notations.match(dropConstraintsPattern) || [])],
    explodeMatch: [...(notations.match(explodePattern) || [])],
    uniqueMatch: [...(notations.match(uniquePattern) || [])],
    replaceMatch: [...(notations.match(replacePattern) || [])],
    rerollMatch: [...(notations.match(rerollPattern) || [])],
    capMatch: [...(notations.match(capPattern) || [])],
    plusMatch: [...(notations.match(plusPattern) || [])],
    minusMatch: [...(notations.match(minusPattern) || [])]
  }
}

const parseNotation = (
  notationString: DiceNotation
): DicePoolOptions<number | string> => {
  const initialParams = {
    modifiers: {}
  }

  const coreNotationMatch =
    notationString.match(coreNotationPattern)!.at(0) || '0d0'

  const diceParams = parseCoreNotation(coreNotationMatch)

  const matches = {
    dropHighMatch: [...(notationString.match(dropHighestPattern) || [])],
    dropLowMatch: [...(notationString.match(dropHighestPattern) || [])],
    dropConstraintsMatch: [
      ...(notationString.match(dropConstraintsPattern) || [])
    ],
    explodeMatch: [...(notationString.match(explodePattern) || [])],
    uniqueMatch: [...(notationString.match(uniquePattern) || [])],
    replaceMatch: [...(notationString.match(replacePattern) || [])],
    rerollMatch: [...(notationString.match(rerollPattern) || [])],
    capMatch: [...(notationString.match(capPattern) || [])],
    plusMatch: [...(notationString.match(plusPattern) || [])],
    minusMatch: [...(notationString.match(minusPattern) || [])]
  }

  return {
    ...diceParams
  }
}

export default parseNotation
