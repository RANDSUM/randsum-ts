import {
  capPattern,
  coreNotationPattern,
  dropConstraintsPattern,
  dropHighestPattern,
  dropLowestPattern,
  explodePattern,
  minusPattern,
  plusPattern,
  replacePattern,
  rerollPattern,
  uniquePattern
} from '~matchPattern'
import { DiceNotation, DicePoolOptions } from '~types'
import { parseCoreNotation, parseModifiers } from './parseModifiers'

const extractMatches = (notationString: string, pattern: RegExp) => {
  return [...(notationString.matchAll(pattern) || [])].map(
    (matches) => matches[0]
  )
}
const parseNotation = (
  notationString: DiceNotation
): DicePoolOptions<number | string> => {
  const coreNotationMatch =
    notationString.match(coreNotationPattern)!.at(0) || '0d0'

  const matches = {
    dropHighMatch: extractMatches(notationString, dropHighestPattern),
    dropLowMatch: extractMatches(notationString, dropLowestPattern),
    dropConstraintsMatch: extractMatches(
      notationString,
      dropConstraintsPattern
    ),
    explodeMatch: extractMatches(notationString, explodePattern),
    uniqueMatch: extractMatches(notationString, uniquePattern),
    replaceMatch: extractMatches(notationString, replacePattern),
    rerollMatch: extractMatches(notationString, rerollPattern),
    capMatch: extractMatches(notationString, capPattern),
    plusMatch: extractMatches(notationString, plusPattern),
    minusMatch: extractMatches(notationString, minusPattern)
  }
  const modifiers = parseModifiers(matches)

  return {
    ...parseCoreNotation(coreNotationMatch),
    modifiers
  }
}

export default parseNotation
