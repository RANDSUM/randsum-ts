import { parseNotation } from 'parseNotation'
import { RandsumPrimeArg, RollParameters } from 'types'
import { isDiceNotation, isRollOptions } from 'utils'

export function digestPrimeArgIntoParameters(primeArg: RandsumPrimeArg): RollParameters {
  if (isRollOptions(primeArg)) {
    return { rolls: 1, ...primeArg }
  }

  return isDiceNotation(primeArg) ? parseNotation(primeArg) : { rolls: 1, sides: Number(primeArg) }
}
