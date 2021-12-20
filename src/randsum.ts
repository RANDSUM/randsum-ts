import { calculateTotal } from 'calculateTotal'
import { RollOptions, RollResult } from 'types'
import { generateRollTotals } from 'generateRollTotals'

export function randsum(firstArg: string | number, modifier?: RollOptions): number | RollResult {
  const partialParams = { rolls: modifier?.rolls || 1, ...modifier }
  // Actually Digest dice notation here, el-oh-el.
  // Replace "20" with "read the dice notation and overwrite PartialParams"
  const rollParams = { ...partialParams, sides: Number(firstArg) || 20 }

  const rollTotals = generateRollTotals(rollParams)
  const total = calculateTotal(rollTotals, rollParams)

  return modifier?.full ? { total, rollTotals, ...rollParams } : total
}
