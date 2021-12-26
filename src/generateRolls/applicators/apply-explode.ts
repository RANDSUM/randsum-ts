import { RollParameters } from 'types'

export function applyExplode(rollTotals: number[], { sides }: Pick<RollParameters, 'sides'>, rollDie: () => number) {
  const explodeCount = rollTotals.filter(roll => roll === sides)
  const explodeResults = [...new Array(explodeCount)].map(() => rollDie())
  return [...rollTotals, ...explodeResults]
}
