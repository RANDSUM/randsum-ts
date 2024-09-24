import { ArgumentsModel, DicePoolsModel } from '~models'
import {
  RandsumCustomArgument,
  RandsumNumericalArgument,
  RandsumRollArgument,
  RandsumRollResult
} from '~types'

function roll(...args: RandsumNumericalArgument[]): RandsumRollResult<number>
function roll(...args: RandsumCustomArgument[]): RandsumRollResult<string>
function roll(
  ...args: RandsumRollArgument[]
): RandsumRollResult<string | number>
function roll(...args: RandsumRollArgument[]): RandsumRollResult {
  const dicePools = ArgumentsModel.formDicePools(args)
  return DicePoolsModel.generateRollResult(dicePools)
}

export { roll }
