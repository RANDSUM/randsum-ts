import { RollDie, RollParameters, RollTotals } from 'types'

export function applyExplode(rollTotals: RollTotals, { sides }: Pick<RollParameters, 'sides'>, rollDie: RollDie) {
  const explodeCount = rollTotals.filter(roll => roll === sides)
  const explodeResults = [...new Array(explodeCount)].map(() => rollDie())
  return [...rollTotals, ...explodeResults]
}
