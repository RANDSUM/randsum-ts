import { RollParameters } from 'types'

export function explodeDigester(rollTotals: number[], { sides }: Pick<RollParameters, 'sides'>, rollDie: () => number) {
  const explodeCount = rollTotals.filter(num => num === sides)
  const explodeResults = [...Array(explodeCount)].map(rollDie)
  return [...rollTotals, ...explodeResults]
}
