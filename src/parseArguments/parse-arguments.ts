import { isDiceNotation, isRandsumOptions } from 'utils'

import {
  Detailed,
  DiceNotation,
  InternalRollParameters,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  UserOptions
} from '../types'
import { parseNotation } from '../utils/parseNotation'
import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments<D extends boolean>(
  primeArgument: RandsumOptions<D> | DiceNotation | NumberString,
  secondArgument: RandsumOptionsWithoutSides<D> | UserOptions<D> = {}
): { detailed: Detailed<D> } & InternalRollParameters {
  if (isRandsumOptions(primeArgument)) {
    return convertOptionsToParameters<D>(primeArgument)
  }

  return {
    ...convertOptionsToParameters<D>(secondArgument),
    ...(isDiceNotation(primeArgument)
      ? parseNotation(primeArgument)
      : { sides: Number(primeArgument) })
  }
}
