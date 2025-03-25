import { isD } from '~guards/isD'
import { D } from '~src/D'
import type { RollArgument, RollParams } from '~types'
import { optionsConverter } from './optionsConverter'

export function normalizeArgument(argument: RollArgument): RollParams {
  const options = optionsConverter.fromArgument(argument)
  return {
    argument,
    options,
    die: dieForArgument(argument),
    notation: optionsConverter.toNotation(options),
    description: optionsConverter.toDescription(options)
  } as RollParams
}

function dieForArgument(argument: RollArgument): RollParams['die'] {
  if (isD(argument)) {
    return argument
  }
  const options = optionsConverter.fromArgument(argument)
  return new D(options.sides) as RollParams['die']
}
