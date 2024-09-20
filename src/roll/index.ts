import { RandsumRollArgument, RandsumRollResult } from '~types'
import { generateRollResultFromParameters } from './generateRollResultFromParameters'
import { formDicePools } from './formDicePools'

function roll(arg?: RandsumRollArgument): RandsumRollResult {
  const dicePools = formDicePools(arg)
  return generateRollResultFromParameters(dicePools)
}

export { roll }
