import type { DicePools, RollResult } from '~types'

export function generateRawRolls<S extends string | number>(
  dicePools: DicePools<S>['dicePools']
): RollResult<S>['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const {
        die,
        options: { quantity }
      } = dicePools[key]
      return [key, die.rollMany(quantity || 1) as S[]]
    })
  )
}
