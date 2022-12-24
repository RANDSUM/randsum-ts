import { isDiceNotation, isRandsumOptions } from 'typeguards'
import { InternalRollParameters, RandsumArguments } from 'types'

import convertOptionsToParameters from './convertOptionsToParameters'
import parseNotation from './parseNotation'

export default function parseArguments(
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
      : { sides: Number(primeArgument) })
  }
}
