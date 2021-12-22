import { RandsumPrimeArg, RollOptions } from 'types'

export function isRollOptions(arg: RandsumPrimeArg): arg is RollOptions {
  return typeof arg === 'object'
}
