import { parseNotation } from 'parseArguments/parseNotation'
import { RandsumPrimeArgument, RollParameters } from 'types'
import { isDiceNotation, isRollOptions } from 'utils'

import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments(primeArgument: RandsumPrimeArgument): RollParameters {
  if (isDiceNotation(primeArgument)) {
    return parseNotation(primeArgument)
  }

  return {
    rolls: 1,
    ...(isRollOptions(primeArgument) ? convertOptionsToParameters(primeArgument) : { sides: Number(primeArgument) }),
  }
}
