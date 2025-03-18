import type { RollArgument, RollParameters } from '~types'
import { argumentToOptions } from './argumentToOptions'
import { dieForArgument } from './dieForArgument'
import { optionsToDescription } from './optionsToDescription'
import { optionsToNotation } from './optionsToNotation'

function normalizeArgument(argument: RollArgument): RollParameters {
  const options = argumentToOptions(argument)
  return {
    argument,
    options,
    die: dieForArgument(argument),
    notation: optionsToNotation(options),
    description: optionsToDescription(options)
  } as RollParameters
}

export { normalizeArgument }
