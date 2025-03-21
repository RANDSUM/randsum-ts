import { isNumericRollOptions } from '~guards/options/isNumericRollOptions'
import type { DicePool, RollResult } from '~types'
import { coreSpreadRolls } from './coreSpreadRolls'

export function generateRawRolls(
  dicePools: DicePool['dicePools']
): RollResult['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const pool = dicePools[key]
      const { options } = pool
      const quantity = options.quantity || 1

      if (isNumericRollOptions(options)) {
        const sides = options.sides
        return [key, coreSpreadRolls(quantity, sides) as number[]]
      } else {
        const faces = options.sides
        return [key, coreSpreadRolls(quantity, faces.length, faces) as string[]]
      }
    })
  )
}
