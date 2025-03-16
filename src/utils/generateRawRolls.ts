import type { DicePools, RollResult } from '~types'
import { coreSpreadRolls } from './coreSpreadRolls'

export function generateRawRolls<S extends string | number>(
  dicePools: DicePools<S>['dicePools']
): RollResult<S>['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const {
        options: { quantity, sides }
      } = dicePools[key]

      if (typeof sides === 'number') {
        return [key, coreSpreadRolls(quantity || 1, sides)]
      }

      return [key, coreSpreadRolls(quantity || 1, sides.length, sides)] as S[]
    })
  )
}

// function maxFromSides(sides: number | string[]): number {
//   if (typeof sides === 'number') {
//     return sides
//   }
//   return sides.length
// }
