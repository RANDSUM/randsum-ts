import { RollDie, RollParameters, RollTotals } from 'types'

export function parseExplodeFactory({ sides }: Pick<RollParameters, 'sides'>, rollDie: RollDie) {
  return function parseExplode(rollTotals: RollTotals) {
    const explodeCount = rollTotals.filter(roll => roll === sides)
    const explodeResults = [...new Array(explodeCount)].map(() => rollDie())
    return [...rollTotals, ...explodeResults]
  }
}
