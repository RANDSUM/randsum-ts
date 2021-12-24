import { RollParameters } from 'types'
import { diceNotationPattern } from 'utils'

import { parseCapNotation } from './parse-cap-notation'
import { parseDropConstrainNotation } from './parse-drop-contstraint-notation'
import { parseDropHighNotation } from './parse-drop-high-notation'
import { parseDropLowNotation } from './parse-drop-low-notation'
import { parseExplodeNotation } from './parse-explode-notation'
import { parseMinusNotation } from './parse-minus-notation'
import { parsePlusNotation } from './parse-plus-notation'
import { parseReplaceNotation } from './parse-replace-notation'
import { parseRerollNotation } from './parse-reroll-notation'
import { parseRollsNotation } from './parse-rolls-notation'
import { parseSideNotation } from './parse-side-notation'
import { parseUniqeNotation } from './parse-unique-notation'

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

type NotationParsers = [RegExp, keyof RollParameters, (notationString: string) => unknown]

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
