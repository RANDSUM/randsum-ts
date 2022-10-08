import { isDiceNotation, isRandsumOptions } from '../utils'
import { InternalRollParameters, RandsumArguments } from '../types'
import { parseNotation } from './parseNotation'
import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments(
  primeArgument: RandsumArguments['primeArgument'],
  secondArgument: RandsumArguments['secondArgument'] = {}
): InternalRollParameters {
  if (isRandsumOptions(primeArgument)) {
    return convertOptionsToParameters(primeArgument)
  }

  return {
    ...convertOptionsToParameters(secondArgument),
    ...(isDiceNotation(primeArgument)
      ? parseNotation(primeArgument)
      : { sides: Number(primeArgument) }),
  }
}
