import { RollDie, RollParameters, RollTotals } from 'types'

import { explodeDigester } from './explode-digester'

export function parseExplodeFactory(
  { explode, ...explodeParameters }: { explode: RollParameters['explode'] } & Parameters<typeof explodeDigester>[1],
  rollDie: RollDie,
) {
  return function parseExplode(rollTotals: RollTotals) {
    return !explode ? rollTotals : explodeDigester(rollTotals, explodeParameters, rollDie)
  }
}
