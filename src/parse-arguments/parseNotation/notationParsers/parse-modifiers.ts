import { Match, Modifier } from 'types'
import {
  isCapMatch,
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

import parseCapNotation from './parse-cap-notation'
import parseDropConstraintsNotation from './parse-drop-contstraints-notation'
import parseDropHighNotation from './parse-drop-high-notation'
import parseDropLowNotation from './parse-drop-low-notation'
import parseExplodeNotation from './parse-explode-notation'
import parseMinusNotation from './parse-minus-notation'
import parsePlusNotation from './parse-plus-notation'
import parseReplaceNotation from './parse-replace-notation'
import parseRerollNotation from './parse-reroll-notation'
import parseUniqueNotation from './parse-unique-notation'

export default function parseModifiers(match: Match): Modifier<number> {
  if (isDropHighMatch(match)) {
    return parseDropHighNotation(match)
  }
  if (isDropLowMatch(match)) {
    return parseDropLowNotation(match)
  }
  if (isDropConstraintsMatch(match)) {
    return parseDropConstraintsNotation(match)
  }
  if (isExplodeMatch(match)) {
    return parseExplodeNotation(match)
  }
  if (isUniqueMatch(match)) {
    return parseUniqueNotation(match)
  }
  if (isReplaceMatch(match)) {
    return parseReplaceNotation(match)
  }
  if (isRerollMatch(match)) {
    return parseRerollNotation(match)
  }
  if (isCapMatch(match)) {
    return parseCapNotation(match)
  }
  if (isPlusMatch(match)) {
    return parsePlusNotation(match)
  }
  if (isMinusMatch(match)) {
    return parseMinusNotation(match)
  }
  throw new Error('Unrecognized Match')
}
