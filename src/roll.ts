import type {
  CustomRollResult,
  MixedRollResult,
  NumericalRollResult,
  RollArgument,
  RollResult
} from '~types'
import { formDicePools } from './utils/formDicePools'
import { rollResultFromDicePools } from './utils/rollResultFromDicePools'

function roll(...args: RollArgument<number>[]): NumericalRollResult
function roll(...args: RollArgument<string>[]): CustomRollResult
function roll(...args: RollArgument<string | number>[]): MixedRollResult
function roll<S extends string | number>(
  ...args: RollArgument<S>[]
): RollResult<S> {
  const dicePools = formDicePools(args)
  return rollResultFromDicePools(dicePools)
}

export { roll }

// const rollResult = roll('1d6', '2d8', '3d10', '4d12', '5d20', '6d100')
