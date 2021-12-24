import { RollDie, RollParameters, RollTotals } from 'types'

import { rerollDigester } from './reroll-digester'

export function parseRerollFactory(reroll: RollParameters['reroll'], rollDie: RollDie) {
  return function parseReroll(rollTotals: RollTotals) {
    if (!reroll) {
      return rollTotals
    }
    const parameters = Array.isArray(reroll) ? reroll : [reroll]

    let rerollRolls = rollTotals
    for (const rerollModifier of parameters) {
      rerollRolls = rerollDigester(rerollRolls, rerollModifier, rollDie)
    }
    return rerollRolls
  }
}
