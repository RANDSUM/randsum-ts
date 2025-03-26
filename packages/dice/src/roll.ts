import type {
  CustomRollArgument,
  CustomRollResult,
  DicePool,
  MixedRollResult,
  NumericRollArgument,
  NumericRollResult,
  RollArgument,
  RollResult
} from './types'
import {
  generateKey,
  normalizeArgument,
  rollResultFromDicePools
} from './utils'

function roll(...args: NumericRollArgument[]): NumericRollResult
function roll(...args: CustomRollArgument[]): CustomRollResult
function roll(
  ...args: (NumericRollArgument | CustomRollArgument)[]
): MixedRollResult
function roll(...args: RollArgument[]): RollResult {
  const dicePools: DicePool = {
    dicePools: Object.fromEntries(
      args.map((arg) => [generateKey(), normalizeArgument(arg)])
    )
  }

  return rollResultFromDicePools(dicePools)
}

export { roll }
