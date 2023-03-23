import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation, DieType } from '../../types/primitives'
import { RollResult } from '../../types/results'
import { coreNotationPattern } from './regexp'

export const isRollOptions = <T extends DieType = 'standard'>(
  argument: unknown
): argument is RollOptions<T> =>
  typeof argument === 'object' &&
  (argument as RollOptions<T>).sides !== undefined

export const isCustomSidesRollOptions = (
  argument: unknown
): argument is RollOptions<'customSides'> =>
  Array.isArray((argument as RollOptions<'customSides'>).sides)

export const isCustomSidesRollParameters = (
  argument: unknown
): argument is RollParameters<'customSides'> =>
  (argument as RollParameters<'customSides'>).faces !== undefined

export const isCustomSidesRollResult = (
  argument: RollResult | RollResult<'customSides'>
): argument is RollResult<'customSides'> => typeof argument.total === 'string'

export const isDiceNotation = (argument: unknown): argument is DiceNotation =>
  !!coreNotationPattern.test(String(argument))
