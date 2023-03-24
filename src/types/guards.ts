import { coreNotationPattern } from '../constants/regexp'
import { RollOptions } from './options'
import { RollParameters } from './parameters'
import { DiceNotation, DieSides } from './primitives'
import { RollResult } from './results'

export const isRollOptions = <T extends DieSides = number>(
  argument: unknown
): argument is RollOptions<T> =>
  typeof argument === 'object' &&
  (argument as RollOptions<T>).sides !== undefined

export const isCustomSidesRollOptions = (
  argument: RollOptions<DieSides>
): argument is RollOptions<string> =>
  Array.isArray((argument as RollOptions<string>).sides)

export const isCustomSidesRollParameters = (
  argument: unknown
): argument is RollParameters<string> =>
  (argument as RollParameters<string>).faces.every(
    (face) => typeof face === 'string'
  )

export const isCustomSidesRollResult = (
  argument: RollResult | RollResult<string>
): argument is RollResult<string> => typeof argument.total === 'string'

export const isDiceNotation = (
  argument: unknown
): argument is DiceNotation<DieSides> =>
  !!coreNotationPattern.test(String(argument))
