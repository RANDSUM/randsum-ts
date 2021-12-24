import { RandsumPrimeArg, RollOptions } from 'types'

export function isRollOptions(argument: RandsumPrimeArg): argument is RollOptions {
  return typeof argument === 'object'
}
