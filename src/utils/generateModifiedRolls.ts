import type { DicePools, RollResult } from '~types'
import { calculateTotal } from './calculateTotal'
import { applyModifiers } from './modifierApplicators/applyModifiers'

export function generateModifiedRolls(
  dicePools: DicePools,
  rawRolls: RollResult['rawRolls']
): RollResult['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools.dicePools).map((key) => {
      const params = dicePools.dicePools[key]
      const modified = applyModifiers(params, rawRolls[key])
      const modifiedRoll = {
        rolls: modified.rolls,
        total: calculateTotal(modified.rolls, modified.simpleMathModifier)
      }
      return [key, modifiedRoll]
    }) as [string, RollResult['modifiedRolls'][string]][]
  )
}
