import { RollParameters, RollTotals, RollDie } from 'types'
import { uniqueDigester } from './uniqueDigester'

export function parseUniqueFactory(
  { unique, ...uniqueParams }: { unique: RollParameters['unique'] } & Parameters<typeof uniqueDigester>[1],
  rollDie: RollDie,
) {
  return function parseUnique(rollTotals: RollTotals) {
    return !unique ? rollTotals : uniqueDigester(rollTotals, { unique, ...uniqueParams }, rollDie)
  }
}
