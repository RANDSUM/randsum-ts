import { RandsumRollArgument, RandsumRollParameters } from '~types'
import { D } from '~src/D'
import { normalizeArgument } from './normalizeArgument'
import OptionsModel from '~models/OptionsModel'

function parameterizeRollArgument(
  argument: RandsumRollArgument
): RandsumRollParameters {
  const options = normalizeArgument(argument)
  const die = new D(options.sides)
  return {
    options,
    argument,
    die,
    notation: OptionsModel.toNotation(options),
    description: OptionsModel.toDescription(options)
  }
}

export { parameterizeRollArgument }
