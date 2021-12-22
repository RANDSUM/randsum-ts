import { digestNotation } from 'digestNotation'
import { RandsumPrimeArg, RollParameters } from 'types'
import { isDiceNotation, isRollOptions } from 'utils'

export function digestPrimeArgIntoParameters(primeArg: RandsumPrimeArg): RollParameters {
  if (isRollOptions(primeArg)) {
    return { rolls: 1, ...primeArg }
  }

  return isDiceNotation(primeArg) ? digestNotation(primeArg) : { rolls: 1, sides: Number(primeArg) }
}
