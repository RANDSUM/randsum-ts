import { RollDie, RollParameters, RollTotals } from 'types'

import { parseCapFactory } from './parse-cap'
import { parseDropFactory } from './parse-drop'
import { parseExplodeFactory } from './parse-explode'
import { parseReplaceFactory } from './parse-replace'
import { parseRerollFactory } from './parse-reroll'
import { parseUniqueFactory } from './parse-unique'

type RollParser = (results: RollTotals) => RollTotals

export function rollParsers(
  { sides, rolls, reroll, unique, explode, cap, drop, replace }: RollParameters,
  rollDie: RollDie,
) {
  return [
    !!reroll && parseRerollFactory(reroll, rollDie),
    !!unique && parseUniqueFactory({ sides, rolls, unique }, rollDie),
    !!replace && parseReplaceFactory(replace),
    !!cap && parseCapFactory(cap),
    !!drop && parseDropFactory(drop),
    !!explode && parseExplodeFactory({ sides }, rollDie),
  ].filter((parser): parser is RollParser => !!parser)
}
