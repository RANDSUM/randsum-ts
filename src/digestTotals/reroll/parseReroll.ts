import { RollParameters, RollTotals, RollDie } from 'types'
import { rerollDigester } from './rerollDigester'

export function parseRerollFactory(reroll: RollParameters['reroll'], rollDie: RollDie) {
  return function parseReroll(rollTotals: RollTotals) {
    if (!reroll) {
      return rollTotals
    }
    const params = Array.isArray(reroll) ? reroll : [reroll]

    return params.reduce((newTotals, rerollModifier) => {
      return rerollDigester(newTotals, rerollModifier, rollDie)
    }, rollTotals)
  }
}
