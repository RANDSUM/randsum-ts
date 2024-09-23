import { RandsumRollArgument, RandsumRollResult } from '~types'
import DicePoolsModel from '~models/DicePoolsModel'
import ArgumentsModel from '~models/ArgumentsModel'

function roll(...args: RandsumRollArgument[]): RandsumRollResult {
  const dicePools = ArgumentsModel.formDicePools(args)
  return DicePoolsModel.generateRollResult(dicePools)
}

export { roll }
