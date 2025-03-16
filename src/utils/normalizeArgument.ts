import type { RollArgument, RollParameters } from '~types'
import { argumentToOptions } from './argumentToOptions'
import { dieForArgument } from './dieForArgument'
import { optionsToDescription } from './optionsToDescription'
import { optionsToNotation } from './optionsToNotation'

function normalizeArgument(
  argument: RollArgument<number>
): RollParameters<number>
function normalizeArgument(
  argument: RollArgument<string>
): RollParameters<string>
function normalizeArgument(
  argument: RollArgument<string | number>
): RollParameters<string | number>
function normalizeArgument<S extends string | number>(
  argument: RollArgument<S>
): RollParameters<S> {
  const options = argumentToOptions(argument)
  return {
    argument,
    options,
    die: dieForArgument(argument),
    notation: optionsToNotation<S>(options),
    description: optionsToDescription(options)
  }
}

export { normalizeArgument }
