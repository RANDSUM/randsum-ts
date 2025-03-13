import { ArgumentsModel, DicePoolsModel } from '~models'
import {
  CustomArgument,
  CustomRollResult,
  MixedRollResult,
  NumericalArgument,
  NumericalRollResult,
  RollArgument,
  RollResult
} from '~types'

function roll(...args: NumericalArgument[]): NumericalRollResult
function roll(...args: CustomArgument[]): CustomRollResult
function roll(...args: RollArgument<string | number>[]): MixedRollResult
function roll<Sides extends string | number>(
  ...args: RollArgument<Sides>[]
): RollResult<Sides> {
  const dicePools = ArgumentsModel.formDicePools(args)
  return DicePoolsModel.generateRollResult(dicePools)
}

export { roll }
