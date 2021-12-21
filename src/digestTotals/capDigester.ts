import { CapOptions } from 'types'
import { singleCapDigester } from './singleCapDigester'

export function capDigester(rollTotals: number[], ops: CapOptions) {
  return rollTotals.slice().map(singleCapDigester(ops))
}
