import { RandsumRollArgument, RandsumRollResult } from '~types'
import { generateRollResult } from './generateRollResult'
import { formDicePools } from './formDicePools'

function roll(...args: RandsumRollArgument[]): RandsumRollResult {
  const dicePools = formDicePools(args)
  return generateRollResult(dicePools)
}

export { roll }
