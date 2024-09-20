import { RollArgument, RollResult } from '~types'
import { generateRollResultFromParameters } from './generateRollResultFromParameters'
import { formDicePools } from './formDicePools'

function roll(arg?: RollArgument): RollResult {
  const dicePools = formDicePools(arg)
  return generateRollResultFromParameters(dicePools)
}

export { roll }
