import { CapOptions, RollTotals } from 'types'

import { parseSingleCap } from './shared/parse-single-cap'

export function parseCapFactory(capOptions: CapOptions) {
  return function parseCap(rollTotals: RollTotals) {
    return rollTotals.map(parseSingleCap(capOptions))
  }
}
