import {
  parseCapFactory,
  parseDropFactory,
  parseExplodeFactory,
  parseReplaceFactory,
  parseRerollFactory,
  parseUniqueFactory,
} from 'generateRolls/modifiers'
import { RollDie, RollParameters, RollTotals } from 'types'

export function modifyRollTotals(
  rollTotals: RollTotals,
  { sides, rolls, reroll, unique, explode, cap, drop, replace }: Omit<RollParameters, 'plus' | 'minus'>,
  rollDie: RollDie,
) {
  return [
    parseRerollFactory(reroll, rollDie),
    parseUniqueFactory({ sides, rolls, unique }, rollDie),
    parseReplaceFactory(replace),
    parseCapFactory(cap),
    parseDropFactory(drop),
    parseExplodeFactory({ explode, sides }, rollDie),
  ].reduce((newTotals, parser) => parser(newTotals.slice()), rollTotals.slice())
}
