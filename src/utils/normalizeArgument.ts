import type { RollArgument, RollParams } from '~types'
import { argumentToOptions } from './argumentToOptions'
import { dieForArgument } from './dieForArgument'
import { optionsToDescription } from './optionsToDescription'
import { optionsToNotation } from './optionsToNotation'

export function normalizeArgument(argument: RollArgument): RollParams {
  const options = argumentToOptions(argument)
  return {
    argument,
    options,
    die: dieForArgument(argument),
    notation: optionsToNotation(options),
    description: optionsToDescription(options)
  } as RollParams
}
