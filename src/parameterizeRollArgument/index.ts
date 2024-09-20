import { RandsumRollArgument, RandsumRollParameters } from '~types'
import { D } from '~src/D'
import { formatDescription } from '~utils/formatDescription'
import { formatNotation } from '~utils/formatNotation'
import { normalizeArgument } from './normalizeArgument'

function parameterizeRollArgument(
  argument: RandsumRollArgument
): RandsumRollParameters {
  const options = normalizeArgument(argument)
  const die = new D(options.sides)
  return {
    options,
    argument,
    die,
    notation: formatNotation(options),
    description: formatDescription(options)
  }
}

export { parameterizeRollArgument }
