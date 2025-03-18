import { v4 as uuid } from 'uuid'
import type {
  CustomRollArgument,
  CustomRollResult,
  DicePool,
  MixedRollResult,
  NumericRollArgument,
  NumericRollResult,
  RollArgument,
  RollResult
} from '~types'
import { normalizeArgument } from '~utils/normalizeArgument'
import { rollResultFromDicePools } from './utils/rollResultFromDicePools'

// Function overloads for type-safety
function roll(...args: NumericRollArgument[]): NumericRollResult
function roll(...args: CustomRollArgument[]): CustomRollResult
function roll(
  ...args: (NumericRollArgument | CustomRollArgument)[]
): MixedRollResult
function roll(...args: RollArgument[]): RollResult {
  const dicePools: DicePool = {
    dicePools: Object.fromEntries(
      args.map((arg) => [uuid(), normalizeArgument(arg)])
    )
  }

  return rollResultFromDicePools(dicePools)
}

export { roll }
