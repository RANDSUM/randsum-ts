import { RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'

import { rollParsers, totalParsers } from './parsers'

export function generateRolls(
  rollTotals: RollTotals,
  rollParameters: RollParameters,
  rollDie: () => number,
): [number, RollTotals] {
  let modifiedRollTotals: RollTotals = [...rollTotals]

  for (const parser of rollParsers(rollParameters, rollDie)) {
    modifiedRollTotals = parser([...modifiedRollTotals])
  }

  const rawTotal = sumArray([...modifiedRollTotals])

  let modifiedTotal = rawTotal

  for (const modifierFunction of totalParsers(rollParameters)) {
    modifiedTotal = modifierFunction(modifiedTotal)
  }

  return [modifiedTotal, modifiedRollTotals]
}
