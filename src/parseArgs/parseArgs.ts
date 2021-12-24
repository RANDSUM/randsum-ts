import { parseNotation } from 'parseArgs/parseNotation'
import { RandsumPrimeArg, RollParameters } from 'types'
import { isDiceNotation, isRollOptions } from 'utils'

export function parseArgs(primeArg: RandsumPrimeArg): RollParameters {
  if (isRollOptions(primeArg)) {
    return { rolls: 1, ...primeArg }
  }

  if (isDiceNotation(primeArg)) {
    return parseNotation(primeArg)
  }

  return { rolls: 1, sides: Number(primeArg) }
}
