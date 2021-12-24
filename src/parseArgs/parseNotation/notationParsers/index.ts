import {
  cap,
  diceNotationPattern,
  dropConstraints,
  dropHigh,
  dropLow,
  explode,
  minus,
  plus,
  replace,
  reroll,
  unique,
} from 'parseArgs/parseNotation/matchers'
import { RollParameters } from 'types'

import { parseCapNotation } from './parseCapNotation'
import { parseDropConstrainNotation, parseDropHighNotation, parseDropLowNotation } from './parseDropNotation'
import { parseExplodeNotation } from './parseExplodeNotation'
import { parseMinusNotation } from './parseMinusNotation'
import { parsePlusNotation } from './parsePlusNotation'
import { parseReplaceNotation } from './parseReplaceNotation'
import { parseRerollNotation } from './parseRerollNotation'
import { parseRollsNotation } from './parseRollsNotation'
import { parseSideNotation } from './parseSidesNotation'
import { parseUniqeNotation } from './parseUniqeNotation'

type NotationParsers = [RegExp, keyof RollParameters, (modifierString: string) => unknown]

export const notationParsers: NotationParsers[] = [
  [diceNotationPattern, 'sides', parseSideNotation],
  [diceNotationPattern, 'rolls', parseRollsNotation],
  [dropHigh, 'drop', parseDropHighNotation],
  [dropConstraints, 'drop', parseDropConstrainNotation],
  [dropLow, 'drop', parseDropLowNotation],
  [plus, 'plus', parsePlusNotation],
  [minus, 'minus', parseMinusNotation],
  [cap, 'cap', parseCapNotation],
  [replace, 'replace', parseReplaceNotation],
  [reroll, 'reroll', parseRerollNotation],
  [explode, 'explode', parseExplodeNotation],
  [unique, 'unique', parseUniqeNotation],
]
