import { CoreRollArgument, RandsumRollResult } from '~types'
import { generateRollResult } from './generateRollResult'
import { formDicePools } from './formDicePools'

function roll(...args: CoreRollArgument[]): RandsumRollResult {
  const dicePools = formDicePools(args)
  return generateRollResult(dicePools)
}

export { roll }
