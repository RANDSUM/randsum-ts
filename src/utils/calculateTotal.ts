import { isFullNumArray } from '~src/guards/isFullNumArray'

export function calculateTotal<S extends string | number>(
  rolls: S[],
  bonus = 0
): S {
  if (isFullNumArray(rolls)) {
    return rolls.reduce(
      (acc, cur) => (acc as number) + (cur as number),
      bonus
    ) as S
  }

  return rolls.flat().join(', ') as S
}
