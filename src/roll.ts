import type {
  CustomRollArgument,
  CustomRollResult,
  MixedRollResult,
  NumericRollArgument,
  NumericRollResult,
  RollArgument,
  RollResult
} from '~types'
import { formDicePools } from './utils/formDicePools'
import { rollResultFromDicePools } from './utils/rollResultFromDicePools'

function roll(...args: NumericRollArgument[]): NumericRollResult
function roll(...args: CustomRollArgument[]): CustomRollResult
function roll(
  ...args: (NumericRollArgument | CustomRollArgument)[]
): MixedRollResult
function roll(...args: RollArgument[]): RollResult {
  const dicePools = formDicePools(args)
  return rollResultFromDicePools(dicePools)
}

export { roll }
