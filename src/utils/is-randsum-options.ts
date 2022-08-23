import { PrimeArgument, RandsumOptions } from 'types'

export function isRandsumOptions<D extends boolean>(
  argument: PrimeArgument<D>
): argument is RandsumOptions<D> {
  return typeof argument === 'object'
}
