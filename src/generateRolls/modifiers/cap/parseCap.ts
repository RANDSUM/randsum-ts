import { RollParameters, RollTotals } from 'types'

import { capDigester } from './capDigester'

export function parseCapFactory(cap: RollParameters['cap']) {
  return function parseCap(rollTotals: RollTotals) {
    return !cap ? rollTotals : capDigester(rollTotals, cap)
  }
}
