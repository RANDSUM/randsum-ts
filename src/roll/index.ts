import { RandsumRollArgument, RandsumRollResult } from '~types'
import { generateRollResult } from './generateRollResult'
import { formDicePools } from './formDicePools'

function roll(arg?: RandsumRollArgument): RandsumRollResult {
  const dicePools = formDicePools(arg)
  return generateRollResult(dicePools)
}

export { roll }
