import { RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'
import { modifyRollTotals } from './modifyRollTotals'
import { modifyTotal } from './modifyTotal'

export function generateRolls(
  rollTotals: RollTotals,
  { plus, minus, ...rollParams }: RollParameters,
  rollDie: () => number,
): [number, RollTotals, RollTotals] {
  const modifiedRollTotals = modifyRollTotals(rollTotals.slice(), rollParams, rollDie)
  const total = modifyTotal(sumArray(modifiedRollTotals.slice()), { plus, minus })

  return [total, modifiedRollTotals, rollTotals]
}
