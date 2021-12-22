import { RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'
import { modifyRollTotals } from './modifyRollTotals'
import { modifyTotal } from './modifyTotal'

export function transformRollTotalsWithParameters(
  rollTotals: RollTotals,
  { plus, minus, ...rollParams }: RollParameters,
  rollDie: () => number,
): [number, number[]] {
  const modifiedTotals = modifyRollTotals(rollTotals.slice(), rollParams, rollDie)

  return [modifyTotal(sumArray(modifiedTotals), { plus, minus }), modifiedTotals]
}
