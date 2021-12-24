import { CapOptions } from 'types'

import { singleCapDigester } from './single-cap-digester'

export function capDigester(rollTotals: number[], ops: CapOptions) {
  return rollTotals.map(singleCapDigester(ops))
}
