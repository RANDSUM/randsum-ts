import { DiceNotation, RollOptions, RollParameters, RollResult } from '../types'
import { coreNotationPattern } from './regexp'

export const isRollOptions = (
  argument: unknown
): argument is RollOptions<'standard'> | RollOptions<'customSides'> =>
  typeof argument === 'object' &&
  (argument as RollOptions<'standard'> | RollOptions<'customSides'>).sides !==
    undefined

export const isCustomSidesRollParameters = (
  argument: RollParameters
): argument is RollParameters<'customSides'> =>
  (argument as RollParameters<'customSides'>).faces !== undefined

export const isCustomSidesRollResult = (
  argument: RollResult
): argument is RollResult<'customSides'> => typeof argument.total === 'string'

export const isDiceNotation = (argument: unknown): argument is DiceNotation =>
  !!coreNotationPattern.test(String(argument))
