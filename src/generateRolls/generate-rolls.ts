import { RollDie, RollParameters, RollTotals } from 'types'
import { sumArray } from 'utils'

import { rollParsers, totalParsers } from './parsers'

export function generateRolls(
  rollTotals: RollTotals,
  rollParameters: RollParameters,
  rollDie: RollDie,
): [number, RollTotals] {
  let modifiedRollTotals = [...rollTotals]

  for (const parser of rollParsers(rollParameters, rollDie)) {
    modifiedRollTotals = parser([...modifiedRollTotals])
  }

  let modifiedTotal = sumArray([...modifiedRollTotals])

  for (const modifierFunction of totalParsers(rollParameters)) {
    modifiedTotal = modifierFunction(modifiedTotal)
  }

  return [modifiedTotal, modifiedRollTotals.map(number => Number(number))]
}
