import type { DicePools, RollResult } from '~types'
import { calculateTotal } from './calculateTotal'
import { applyModifiers } from './modifierApplicators/applyModifiers'

export function generateModifiedRolls<S extends string | number>(
  dicePools: DicePools<S>,
  rawRolls: RollResult<S>['rawRolls']
): RollResult<S>['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools.dicePools).map((key) => {
      const params = dicePools.dicePools[key]
      const modified = applyModifiers(params, rawRolls[key])
      const modifiedRoll = {
        rolls: modified.rolls,
        total: calculateTotal<S, S>(modified.rolls, modified.simpleMathModifier)
      }
      return [key, modifiedRoll]
    })
  )
}
