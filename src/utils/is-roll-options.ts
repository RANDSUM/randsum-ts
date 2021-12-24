import { RandsumPrimeArgument, RollOptions } from 'types'

export function isRollOptions(argument: RandsumPrimeArgument): argument is RollOptions {
  return typeof argument === 'object'
}
