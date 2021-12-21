import { digestTotals } from 'digestTotals'
import { RollOptions, RollResult } from 'types'
import { generateRollTotals } from 'generateRollTotals'
import { digestNotation } from 'digestNotation'

function isDiceNotation(arg: string | number): arg is string {
  return !Number(arg)
}

export function randsum(firstArg: string | number, modifier?: RollOptions): number | RollResult {
  const partialParams = { rolls: modifier?.rolls || 1, ...modifier }
  const rollParams = isDiceNotation(firstArg) ? digestNotation(firstArg) : { ...partialParams, sides: Number(firstArg) }

  const rollTotals = generateRollTotals(rollParams)
  const total = digestTotals(rollTotals, rollParams)

  return modifier?.full ? { total, rollTotals, ...rollParams } : total
}
