import { CapOptions } from 'types'

import { singleCapDigester } from './singleCapDigester'

export function capDigester(rollTotals: number[], ops: CapOptions) {
  return rollTotals.map(singleCapDigester(ops))
}
