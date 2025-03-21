import { v4 as uuid } from 'uuid'
import type {
  CustomRollArgument,
  CustomRollResult,
  MixedRollResult,
  NumericRollArgument,
  NumericRollResult,
  RollArgument,
  RollResult
} from '~types'
import { normalizeArgument } from '~utils/normalizeArgument'
import { rollResultFromDicePools } from './utils/rollResultFromDicePools'

function roll(arg: NumericRollArgument): NumericRollResult
function roll(arg: CustomRollArgument): CustomRollResult
function roll(...args: NumericRollArgument[]): NumericRollResult
function roll(...args: CustomRollArgument[]): CustomRollResult
function roll(
  ...args: (NumericRollArgument | CustomRollArgument)[]
): MixedRollResult
function roll(...args: RollArgument[]): RollResult {
  return rollResultFromDicePools({
    dicePools: Object.fromEntries(
      args.map((arg) => [uuid(), normalizeArgument(arg)])
    )
  })
}

export { roll }
