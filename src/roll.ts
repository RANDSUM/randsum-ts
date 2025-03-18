import type {
  CustomRollArgument,
  CustomRollResult,
  MixedRollResult,
  NumericalRollArgument,
  NumericalRollResult,
  RollArgument,
  RollResult
} from '~types'
import { formDicePools } from './utils/formDicePools'
import { rollResultFromDicePools } from './utils/rollResultFromDicePools'

function roll(...args: NumericalRollArgument[]): NumericalRollResult
function roll(...args: CustomRollArgument[]): CustomRollResult
function roll(
  ...args: (NumericalRollArgument | CustomRollArgument)[]
): MixedRollResult
function roll(...args: RollArgument[]): RollResult {
  const dicePools = formDicePools(args)
  return rollResultFromDicePools(dicePools)
}

export { roll }
