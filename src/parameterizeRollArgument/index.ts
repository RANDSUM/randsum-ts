import { RandsumRollArgument, RandsumRollParameters } from '~types'
import { D } from '~src/D'
import { formatDescription } from '~utils/formatDescription'
import { formatNotation } from '~utils/formatNotation'
import { parseIntoRollOptions } from './parseIntoRollOptions'

function parameterizeRollArgument(
  argument: RandsumRollArgument
): RandsumRollParameters {
  const options = parseIntoRollOptions(argument)
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
