import { parseNotation } from 'parseArgs/parseNotation'
import { RandsumPrimeArg, RollParameters } from 'types'
import { isDiceNotation, isRollOptions } from 'utils'

export function parseArgs(primeArgument: RandsumPrimeArg): RollParameters {
  if (isRollOptions(primeArgument)) {
    return { rolls: 1, ...primeArgument }
  }

  if (isDiceNotation(primeArgument)) {
    return parseNotation(primeArgument)
  }

  return { rolls: 1, sides: Number(primeArgument) }
}
