import { coreNotationPattern } from '../constants/regexp'
import { RollOptions } from './options'
import { RollParameters } from './parameters'
import { DiceNotation } from './primitives'
import { RollResult } from './results'

export const isRollOptions = (
  argument: unknown
): argument is RollOptions | RollOptions<string> =>
  typeof argument === 'object' &&
  (argument as RollOptions | RollOptions<string>).sides !== undefined

export const isCustomSidesRollOptions = (
  argument: RollOptions | RollOptions<string>
): argument is RollOptions<string> =>
  Array.isArray((argument as RollOptions<string>).sides)

export const isCustomSidesRollParameters = (
  argument: unknown
): argument is RollParameters<string> =>
  (argument as RollParameters<string>).diceOptions.every(({ sides }) =>
    Array.isArray(sides)
  )

export const isCustomSidesRollResult = (
  argument: RollResult | RollResult<string>
): argument is RollResult<string> => typeof argument.total === 'string'

export const isDiceNotation = (
  argument: unknown
): argument is DiceNotation | DiceNotation<string> =>
  !!coreNotationPattern.test(String(argument))
