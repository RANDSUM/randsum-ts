import { makeRolls } from '../../parseArguments/utils'
import { RollParameters } from '../../types'

export function applyExplode (
  rolls: number[],
  { sides }: Pick<RollParameters, 'sides'>,
  rollOne: () => number
): number[] {
  const explodeCount = rolls.filter(roll => roll === sides).length
  const explodeResults = makeRolls(explodeCount, rollOne)
  return [...rolls, ...explodeResults]
}
