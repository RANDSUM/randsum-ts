import { RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'
import { modifyRollTotals } from './modifyRollTotals'
import { modifyTotal } from './modifyTotal'

export function transformRollTotalsWithParameters(
  rollTotals: RollTotals,
  { plus, minus, ...rollParams }: RollParameters,
  rollDie: () => number,
): [number, number[]] {
  const modifiedRollTotals = modifyRollTotals(rollTotals.slice(), rollParams, rollDie)

  return [modifyTotal(sumArray(modifiedRollTotals), { plus, minus }), modifiedRollTotals]
}
