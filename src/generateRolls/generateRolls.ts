import { RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'
import { modifyTotal, modifyRollTotals } from './modifiers'

export function generateRolls(
  rollTotals: RollTotals,
  { plus, minus, ...rollParams }: RollParameters,
  rollDie: () => number,
): [number, RollTotals] {
  const modifiedRollTotals = modifyRollTotals(rollTotals.slice(), rollParams, rollDie)
  const total = modifyTotal(sumArray(modifiedRollTotals.slice()), { plus, minus })

  return [total, modifiedRollTotals]
}
