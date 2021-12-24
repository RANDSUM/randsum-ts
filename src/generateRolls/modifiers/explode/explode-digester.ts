import { RollParameters } from 'types'

export function explodeDigester(rollTotals: number[], { sides }: Pick<RollParameters, 'sides'>, rollDie: () => number) {
  const explodeCount = rollTotals.filter(number_ => number_ === sides)
  const explodeResults = [...new Array(explodeCount)].map(() => rollDie())
  return [...rollTotals, ...explodeResults]
}
