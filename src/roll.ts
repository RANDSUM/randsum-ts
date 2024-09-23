import { ArgumentsModel, DicePoolsModel } from '~models'
import { RandsumRollArgument, RandsumRollResult } from '~types'

function roll(...args: RandsumRollArgument[]): RandsumRollResult {
  const dicePools = ArgumentsModel.formDicePools(args)
  return DicePoolsModel.generateRollResult(dicePools)
}

export { roll }
