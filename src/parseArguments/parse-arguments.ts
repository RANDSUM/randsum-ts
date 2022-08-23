import { isDiceNotation, isRandsumOptions } from 'utils'

import {
  InternalRollParameters,
  PrimeArgument,
  SecondArgument,
  UserOptions
} from '../types'
import { parseNotation } from '../utils/parseNotation'
import { convertOptionsToParameters } from './convertOptionsToParameters'

export function parseArguments<D extends boolean>(
  primeArgument: PrimeArgument<D>,
  secondArgument: SecondArgument<D> = {}
): Pick<UserOptions<D>, 'detailed'> & InternalRollParameters {
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
