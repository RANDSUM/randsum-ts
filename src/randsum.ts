import { digestTotals } from 'digestTotals'
import { RandsumFirstArg, RollResult } from 'types'
import { generateRollTotals } from 'generateRollTotals'
import { digestArgsIntoParameters } from 'digestArgsIntoParameters'

// randsum(6) - return a random d6 roll
// randsum('2d6') - roll 2 d6, add the totals, and return the result
// randsum('3d20', true) - roll 3 d20, return a detailed result

export function randsum(firstArg: RandsumFirstArg): number
export function randsum<D extends boolean>(firstArg: RandsumFirstArg, detailed: D): D extends true ? RollResult : number
export function randsum(firstArg: RandsumFirstArg, detailed?: boolean): number | RollResult {
  const rollParams = digestArgsIntoParameters(firstArg)

  const rollTotals = generateRollTotals(rollParams)
  const total = digestTotals(rollTotals, rollParams)

  return (detailed ? { total, rollTotals, ...rollParams } : total) as any
}
