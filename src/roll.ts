import { ArgumentsModel, DicePoolsModel } from '~models'
import {
  RandsumCustomArgument,
  RandsumCustomRollResult,
  RandsumMixedRollResult,
  RandsumNumericalArgument,
  RandsumNumericalRollResult,
  RandsumRollArgument,
  RandsumRollResult
} from '~types'

function roll(...args: RandsumNumericalArgument[]): RandsumNumericalRollResult
function roll(...args: RandsumCustomArgument[]): RandsumCustomRollResult
function roll(
  ...args: RandsumRollArgument<string | number>[]
): RandsumMixedRollResult
function roll<Sides extends string | number = string | number>(
  ...args: RandsumRollArgument<Sides>[]
): RandsumRollResult<Sides> {
  const dicePools = ArgumentsModel.formDicePools(args)
  return DicePoolsModel.generateRollResult(dicePools)
}

export { roll }
