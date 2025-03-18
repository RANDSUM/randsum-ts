import type { DicePool, RollResult } from '~types'
import { calculateDicePoolType } from './calculateDicePooltype'
import { calculateTotal } from './calculateTotal'
import { generateModifiedRolls } from './generateModifiedRolls'
import { generateRawRolls } from './generateRawRolls'

export function rollResultFromDicePools(dicePools: DicePool): RollResult {
  const rawRolls = generateRawRolls(dicePools.dicePools)
  const modifiedRolls = generateModifiedRolls(dicePools, rawRolls)
  const modifiedValues = Object.values(modifiedRolls)

  return {
    ...dicePools,
    rawRolls,
    modifiedRolls,
    rawResult: Object.values(rawRolls).flat(),
    result: modifiedValues.map((pool) => pool.rolls).flat(),
    type: calculateDicePoolType(dicePools.dicePools),
    total: calculateTotal(modifiedValues.map((pool) => pool.total))
  } as RollResult
}
