import { parseReplaceFactory, parseRerollFactory, parseUniqueFactory } from 'generateRolls/modifiers'
import { RollDie, RollParameters, RollParser } from 'types'

import { parseCapFactory } from './parse-cap-factory'
import { parseDropFactory } from './parse-drop'
import { parseExplodeFactory } from './parse-explode'

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
