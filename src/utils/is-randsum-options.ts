import { RandsumOptions, RandsumOptionsWithoutSides } from 'types'

export function isRandsumOptions<D extends boolean | undefined>(
  argument: unknown
): argument is RandsumOptions<D> {
  return (
    typeof argument === 'object' &&
    typeof (argument as RandsumOptions<D>).sides === 'number'
  )
}
