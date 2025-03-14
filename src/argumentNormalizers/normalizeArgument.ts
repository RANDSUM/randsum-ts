import { D } from '~src/D'
import type { RollArgument, RollParameters } from '~types'
import { optionsToDescription } from '../descriptionFormatters/optionsToDescription'
import { optionsToNotation } from '../notationFormatters/optionsToNotation'
import { argumentToOptions } from './argumentToOptions'

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
    die: D.forArgument(argument),
    notation: optionsToNotation(options),
    description: optionsToDescription(options)
  } as RollParameters<S>
}

export { normalizeArgument }
