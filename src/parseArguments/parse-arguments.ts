import { isDiceNotation, isRandsumOptions } from 'utils'

import {
  DiceNotation,
  NumberString,
  RandsumOptions,
  RandsumOptionsWithoutSides,
  RollParameters,
  UserOptions
} from '../types'
import { parseNotationArguments } from './parseNotationArguments'
import { parseNumber } from './parseNumber'
import { parseOptionArguments } from './parseOptionArguments'

export function parseArguments<D extends boolean> (
  primeArgument: RandsumOptions<D> | DiceNotation | NumberString,
  secondArgument: RandsumOptionsWithoutSides<D> | UserOptions<D> = {}
): { detailed: D } & RollParameters {
  if (isRandsumOptions(primeArgument)) {
    return parseOptionArguments(primeArgument)
  }

  if (isDiceNotation(primeArgument)) {
    return parseNotationArguments(primeArgument, secondArgument)
  }
  return parseNumber(primeArgument, secondArgument)
}
