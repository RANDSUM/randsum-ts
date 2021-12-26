import { RollParameters } from 'types'

export function applyExplode(
  rollTotals: number[],
  { sides }: Pick<RollParameters, 'sides'>,
  rollOne: () => number,
): number[] {
  const explodeCount = rollTotals.filter(roll => roll === sides)
  const explodeResults = [...new Array(explodeCount)].map(() => rollOne())
  return [...rollTotals, ...explodeResults]
}
