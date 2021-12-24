import { RollParameters, RollTotals } from 'types'

import { dropDigester } from './drop-digester'

export function parseDropFactory(drop: RollParameters['drop']) {
  return function parseDrop(rollTotals: RollTotals) {
    return !drop ? rollTotals : dropDigester(rollTotals, drop)
  }
}
