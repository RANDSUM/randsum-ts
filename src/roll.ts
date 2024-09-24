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
): RandsumRollResult<Sides, DicePoolType> {
  const dicePools = ArgumentsModel.formDicePools(args)
  return DicePoolsModel.generateRollResult(dicePools)
}

const foo = roll(1, 2, 3)
console.log(foo.total)
console.log(foo.type)

const bar = roll(['a', 'b', 'c'], ['1'])
console.log(bar.total)
console.log(bar.type)

const baz = roll(1, 2, 3, ['1'])
console.log(baz.total)
console.log(baz.type)

export { roll }
