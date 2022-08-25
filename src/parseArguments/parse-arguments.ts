import { isDiceNotation, isRandsumOptions } from 'utils'

import {
  DiceNotation,
  InternalRollParameters,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  UserOptions,
  Detailed
} from 'types'
import { parseNotation } from './parseNotation'
import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments(
  primeArgument: RandsumOptions<Detailed> | DiceNotation | NumberString,
  secondArgument:
    | RandsumOptionsWithoutSides<Detailed>
    | UserOptions<Detailed> = {}
): InternalRollParameters {
  if (isRandsumOptions(primeArgument)) {
    return convertOptionsToParameters(primeArgument)
  }

  const rollData = isDiceNotation(primeArgument)
    ? parseNotation(primeArgument)
    : { sides: Number(primeArgument) }

  return {
    ...convertOptionsToParameters(secondArgument),
    ...rollData
  }
}
