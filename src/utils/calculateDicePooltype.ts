import type { BaseRollResult, DicePools } from '~types'

export function calculateDicePoolType(
  dicePools: DicePools['dicePools']
): BaseRollResult['type'] {
  switch (true) {
    case Object.values(dicePools).every(
      (pool) => typeof pool.options.sides === 'number'
    ):
      return 'numerical'

    case Object.values(dicePools).every((pool) =>
      Array.isArray(pool.options.sides)
    ):
      return 'custom'

    default:
      return 'mixed'
  }
}
