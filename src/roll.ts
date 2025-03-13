import type {
  CustomArgument,
  CustomRollResult,
  MixedRollResult,
  NumericalArgument,
  NumericalRollResult,
  RollArgument,
  RollResult
} from '~types'
import { formDicePools } from '~utils/formDicePools'
import { rollResultFromDicePools } from '~utils/rollResultFromDicePools'

function roll(...args: NumericalArgument[]): NumericalRollResult
function roll(...args: CustomArgument[]): CustomRollResult
function roll(...args: RollArgument<string | number>[]): MixedRollResult
function roll<Sides extends string | number>(
  ...args: RollArgument<Sides>[]
): RollResult<Sides> {
  const dicePools = formDicePools(args)
  return rollResultFromDicePools(dicePools)
}

export { roll }
