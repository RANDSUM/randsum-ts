import { RollParameters, RollTotals } from 'types'

import { capDigester } from './cap-digester'

export function parseCapFactory(cap: RollParameters['cap']) {
  return function parseCap(rollTotals: RollTotals) {
    return !cap ? rollTotals : capDigester(rollTotals, cap)
  }
}
