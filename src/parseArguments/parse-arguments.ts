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
import { parseNotation } from 'utils/parseNotation'
import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments<D extends Detailed>(
  primeArgument: RandsumOptions<D> | DiceNotation | NumberString,
  secondArgument: RandsumOptionsWithoutSides<D> | UserOptions<D> = {}
): InternalRollParameters<D> {
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
