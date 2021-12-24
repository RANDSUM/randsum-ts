import { RollDie, RollParameters, RollTotals } from 'types'

import { uniqueDigester } from './unique-digester'

export function parseUniqueFactory(
  { unique, ...uniqueParameters }: { unique: RollParameters['unique'] } & Parameters<typeof uniqueDigester>[1],
  rollDie: RollDie,
) {
  return function parseUnique(rollTotals: RollTotals) {
    return !unique ? rollTotals : uniqueDigester(rollTotals, { unique, ...uniqueParameters }, rollDie)
  }
}
