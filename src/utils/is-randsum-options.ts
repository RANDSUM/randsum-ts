import { Detailed, RandsumOptions } from 'types'

export function isRandsumOptions<D extends Detailed>(
  argument: unknown
): argument is RandsumOptions<D> {
  return (
    typeof argument === 'object' &&
    typeof (argument as RandsumOptions<D>).sides === 'number'
  )
}
