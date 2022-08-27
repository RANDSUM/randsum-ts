import { isDiceNotation, isRandsumOptions } from 'utils'

import {
  DiceNotation,
  InternalRollParameters,
  NumberString,
  RandsumOptions,
  SecondaryRandsumOptions,
  UserOptions,
  DetailedType,
  DieType
} from 'types'
import { parseNotation } from './parseNotation'
import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments(
  primeArgument:
    | RandsumOptions<DieType, DetailedType>
    | DiceNotation<DieType>
    | NumberString,
  secondArgument:
    | SecondaryRandsumOptions<DieType, DetailedType>
    | UserOptions<DetailedType> = {}
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
