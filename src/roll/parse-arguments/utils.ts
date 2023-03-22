import {
  DiceNotation,
  DieType,
  RollOptions,
  RollParameters,
  RollResult
} from '../../types'
import { coreNotationPattern } from './regexp'

export const isRollOptions = <T extends DieType>(
  argument: unknown
): argument is RollOptions<T> =>
  typeof argument === 'object' &&
  (argument as RollOptions<T>).sides !== undefined

export const isCustomSidesRollOptions = (
  argument: unknown
): argument is RollOptions<'customSides'> =>
  Array.isArray((argument as RollOptions<'customSides'>).sides)

export const isCustomSidesRollParameters = (
  argument: RollParameters
): argument is RollParameters<'customSides'> =>
  (argument as RollParameters<'customSides'>).faces !== undefined

export const isCustomSidesRollResult = (
  argument: RollResult
): argument is RollResult<'customSides'> => typeof argument.total === 'string'

export const isDiceNotation = (argument: unknown): argument is DiceNotation =>
  !!coreNotationPattern.test(String(argument))
