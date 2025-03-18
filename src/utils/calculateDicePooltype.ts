import type { DicePools, DicePoolType } from '~types'

export function calculateDicePoolType<S extends string | number>(
  dicePools: DicePools<S>['dicePools']
): DicePoolType<S> {
  switch (true) {
    case Object.values(dicePools).every(
      (pool) => typeof pool.options.sides === 'number'
    ):
      return 'numerical' as DicePoolType<S>

    case Object.values(dicePools).every((pool) =>
      Array.isArray(pool.options.sides)
    ):
      return 'custom' as DicePoolType<S>

    default:
      return 'mixed' as DicePoolType<S>
  }
}
