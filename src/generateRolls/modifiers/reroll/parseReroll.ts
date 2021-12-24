import { RollDie, RollParameters, RollTotals } from 'types'

import { rerollDigester } from './rerollDigester'

export function parseRerollFactory(reroll: RollParameters['reroll'], rollDie: RollDie) {
  return function parseReroll(rollTotals: RollTotals) {
    if (!reroll) {
      return rollTotals
    }
    const parameters = Array.isArray(reroll) ? reroll : [reroll]

    return parameters.reduce((newTotals, rerollModifier) => {
      return rerollDigester(newTotals, rerollModifier, rollDie)
    }, rollTotals)
  }
}
