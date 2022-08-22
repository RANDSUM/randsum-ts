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

export function parseArguments<D extends boolean> (
  primeArgument: RandsumOptions<D> | DiceNotation | NumberString,
  secondArgument: RandsumOptionsWithoutSides<D> | UserOptions<D> = {}
): { detailed: D } & InternalRollParameters {
  if (isRandsumOptions(primeArgument)) {
    return convertOptionsToParameters<D>(primeArgument)
  }

  if (isDiceNotation(primeArgument)) {
    return { ...convertOptionsToParameters<D>(secondArgument), ...parseNotation(primeArgument) }
  }

  return { ...convertOptionsToParameters<D>(secondArgument), sides: Number(primeArgument) }
}
