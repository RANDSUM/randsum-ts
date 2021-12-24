import { RollDie, RollParameters, RollTotals } from 'types'

import { explodeDigester } from './explodeDigester'

export function parseExplodeFactory(
  { explode, ...explodeParams }: { explode: RollParameters['explode'] } & Parameters<typeof explodeDigester>[1],
  rollDie: RollDie,
) {
  return function parseExplode(rollTotals: RollTotals) {
    return !explode ? rollTotals : explodeDigester(rollTotals, explodeParams, rollDie)
  }
}
