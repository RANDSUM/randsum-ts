import type { RequiredNumericRollParameters } from '~types'

export function applyExplode(
  rolls: number[],
  { sides }: Pick<RequiredNumericRollParameters, 'sides'>,
  rollOne: () => number
): number[] {
  const explodeCount = rolls.filter((roll) => roll === sides).length
  const explodeResults = Array.from({ length: explodeCount }, rollOne)
  return [...rolls, ...explodeResults]
}
