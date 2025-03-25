import { isD } from '~guards/isD'
import { D } from '~src/D'
import type { RollArgument, RollParams } from '~types'
import { argumentToOptions } from './argumentToOptions'
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

function dieForArgument(argument: RollArgument): RollParams['die'] {
  if (isD(argument)) {
    return argument
  }
  const options = argumentToOptions(argument)
  return new D(options.sides) as RollParams['die']
}
