import { CapOptions } from '../../types'

export function convertCapOptionsToParameters({ greaterThan, lessThan }: CapOptions): CapOptions<number> {
  return {
    greaterThan: greaterThan !== undefined ? Number(greaterThan) : undefined,
    lessThan: lessThan !== undefined ? Number(lessThan) : undefined,
  }
}
