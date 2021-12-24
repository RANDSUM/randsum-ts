import { RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'

import { modifyRollTotals } from './parsers'
import { modifyTotal } from './parsers/modify-total'

export function generateRolls(
  rollTotals: RollTotals,
  { plus, minus, ...rollParameters }: RollParameters,
  rollDie: () => number,
): [number, RollTotals] {
  const modifiedRollTotals = modifyRollTotals([...rollTotals], rollParameters, rollDie)

  const rawTotal = sumArray([...modifiedRollTotals])

  const total = modifyTotal(rawTotal, { plus, minus })

  return [total, modifiedRollTotals]
}
