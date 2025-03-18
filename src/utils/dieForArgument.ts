import { isD } from '~guards/isD'
import { D } from '~src/D'
import type { RollArgument, RollParameters } from '~types'
import { argumentToOptions } from './argumentToOptions'

export function dieForArgument(argument: RollArgument): RollParameters['die'] {
  if (isD(argument)) {
    return argument
  }
  const options = argumentToOptions(argument)
  return D(options.sides)
}
