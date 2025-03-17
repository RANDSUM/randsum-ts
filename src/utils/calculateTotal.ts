import type { TotalType } from '~types'

export function calculateTotal<
  S extends string | number,
  R extends S | TotalType<S>
>(rolls: S[], bonus = 0): R {
  if (rolls.every((roll) => typeof roll === 'number')) {
    return rolls.reduce(
      (acc, cur) => (acc as number) + (cur as number),
      bonus
    ) as R
  }

  return rolls.flat().join(', ') as R
}
