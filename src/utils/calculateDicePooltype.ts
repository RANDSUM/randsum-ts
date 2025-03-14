import type { DicePools, DicePoolType } from '~types'

export function calculateDicePoolType(
  dicePools: DicePools<string | number>['dicePools']
): DicePoolType {
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
