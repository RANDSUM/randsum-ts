import { RollParameters } from 'types'

export function applyExplode(
  rolls: number[],
  { sides }: Pick<RollParameters, 'sides'>,
  rollOne: () => number,
): number[] {
  const explodeCount = rolls.filter(roll => roll === sides)
  const explodeResults = [...new Array(explodeCount)].map(() => rollOne())
  return [...rolls, ...explodeResults]
}
