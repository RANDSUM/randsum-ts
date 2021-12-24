import { RollParameters, RollTotals } from 'types'

import { dropDigester } from './dropDigester'

export function parseDropFactory(drop: RollParameters['drop']) {
  return function parseDrop(rollTotals: RollTotals) {
    return !drop ? rollTotals : dropDigester(rollTotals, drop)
  }
}
