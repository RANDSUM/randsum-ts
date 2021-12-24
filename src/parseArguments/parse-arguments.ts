import { parseNotation } from 'parseArguments/parseNotation'
import { RandsumPrimeArgument, RollParameters } from 'types'
import { isDiceNotation, isRollOptions } from 'utils'

export function parseArguments(primeArgument: RandsumPrimeArgument): RollParameters {
  if (isRollOptions(primeArgument)) {
    return { rolls: 1, ...primeArgument }
  }

  if (isDiceNotation(primeArgument)) {
    return parseNotation(primeArgument)
  }

  return { rolls: 1, sides: Number(primeArgument) }
}
