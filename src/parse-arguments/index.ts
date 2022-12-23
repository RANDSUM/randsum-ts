import { InternalRollParameters, RandsumArguments } from 'types'
import { isDiceNotation, isRandsumOptions } from 'utils'

import { convertOptionsToParameters } from './convertOptionsToParameters'
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
