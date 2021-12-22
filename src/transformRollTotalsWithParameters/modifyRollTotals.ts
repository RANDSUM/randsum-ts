import { RollDie, RollParameters, RollTotals } from 'types'
import { parseCapFactory } from './cap'
import { parseDropFactory } from './drop'
import { parseExplodeFactory } from './explode'
import { parseReplaceFactory } from './replace'
import { parseRerollFactory } from './reroll'
import { parseUniqueFactory } from './unique'

export function modifyRollTotals(
  rollTotals: RollTotals,
  { sides, rolls, reroll, unique, explode, notUnique, cap, drop, replace }: Omit<RollParameters, 'plus' | 'minus'>,
  rollDie: RollDie,
) {
  return [
    parseRerollFactory(reroll, rollDie),
    parseUniqueFactory({ sides, rolls, unique, notUnique }, rollDie),
    parseReplaceFactory(replace),
    parseCapFactory(cap),
    parseDropFactory(drop),
    parseExplodeFactory({ explode, sides }, rollDie),
  ].reduce((newTotals, parser) => parser(newTotals.slice()), rollTotals.slice())
}
