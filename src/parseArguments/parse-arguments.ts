import { isDiceNotation, isRandsumOptions } from 'utils'

import {
  DiceNotation,
  InternalRollParameters,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  UserOptions
} from '../types'
import { parseNotation } from '../utils/parseNotation'
import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments<D extends boolean | undefined>(
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
