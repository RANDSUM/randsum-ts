import { ArgumentsModel, DicePoolsModel } from '~models'
import {
  DicePoolType,
  RandsumCustomArgument,
  RandsumNumericalArgument,
  RandsumRollArgument,
  RandsumRollResult
} from '~types'

function roll(
  ...args: RandsumNumericalArgument[]
): RandsumRollResult<number, DicePoolType.numerical>
function roll(
  ...args: RandsumCustomArgument[]
): RandsumRollResult<string, DicePoolType.custom>
function roll(
  ...args: RandsumRollArgument<string | number>[]
): RandsumRollResult<string | number, DicePoolType.mixed, string>
function roll<Sides extends string | number = string | number>(
  ...args: RandsumRollArgument<Sides>[]
): RandsumRollResult<Sides> {
  const dicePools = ArgumentsModel.formDicePools(args)
  return DicePoolsModel.generateRollResult(dicePools)
}

export { roll }
