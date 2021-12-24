import { RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'

import { modifyRollTotals, modifyTotal } from './modifiers'

export function generateRolls(
  rollTotals: RollTotals,
  { plus, minus, ...rollParameters }: RollParameters,
  rollDie: () => number,
): [number, RollTotals] {
  const modifiedRollTotals = modifyRollTotals([...rollTotals], rollParameters, rollDie)
  const total = modifyTotal(sumArray([...modifiedRollTotals]), { plus, minus })

  return [total, modifiedRollTotals]
}
