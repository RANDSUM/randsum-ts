import { CoreRollArgument, RandsumRollParameters } from '~types'
import { D } from '~src/D'
import { formatDescription } from '~utils/formatDescription'
import { formatNotation } from '~utils/formatNotation'
import { parseDiceOptions } from './parseDiceOptions'

function parameterizeRollArgument(
  argument: CoreRollArgument | undefined
): RandsumRollParameters {
  const options = parseDiceOptions(argument)
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
