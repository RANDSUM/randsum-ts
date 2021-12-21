import { digestTotals } from 'digestTotals'
import { RollOptions, RollResult } from 'types'
import { generateRollTotals } from 'generateRollTotals'
import { digestNotation } from 'digestNotation'

function isDiceNotation(arg: string | number): arg is string {
  return !Number(arg)
}

export function randsum(firstArg: string | number, modifier?: RollOptions): number | RollResult {
  const partialParams = { rolls: modifier?.rolls || 1, ...modifier }

  const generatedParams = isDiceNotation(firstArg) ? digestNotation(firstArg as string) : { sides: Number(firstArg) }
  // Actually Digest dice notation here, el-oh-el.
  // Replace "20" with "read the dice notation and overwrite PartialParams"
  const rollParams = { ...partialParams, ...generatedParams }

  const rollTotals = generateRollTotals(rollParams)
  const total = digestTotals(rollTotals, rollParams)

  return modifier?.full ? { total, rollTotals, ...rollParams } : total
}
