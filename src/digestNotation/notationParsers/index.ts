import {
  dropHigh,
  dropConstraints,
  dropLow,
  plus,
  minus,
  cap,
  replace,
  reroll,
  explode,
  unique,
} from 'digestNotation/matchers'
import { parseCapNotation } from './parseCapNotation'
import { parseDropHighNotation, parseDropConstrainNotation, parseDropLowNotation } from './parseDropNotation'
import { parseExplodeNotation } from './parseExplodeNotation'
import { parseMinusNotation } from './parseMinusNotation'
import { parsePlusNotation } from './parsePlusNotation'
import { parseReplaceNotation } from './parseReplaceNotation'
import { parseRerollNotation } from './parseRerollNotation'
import { parseUniqeNotation } from './parseUniqeNotation'

type NotationParsers = [RegExp, string, (modifierString: string) => unknown]

export const notationParsers: NotationParsers[] = [
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
