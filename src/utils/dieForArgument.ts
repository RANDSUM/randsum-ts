import { isD } from '~guards/dice/isD'
import { D } from '~src/D'
import type { RollArgument, RollParams } from '~types'
import { argumentToOptions } from './argumentToOptions'

export function dieForArgument(argument: RollArgument): RollParams['die'] {
  if (isD(argument)) {
    return argument
  }
  const options = argumentToOptions(argument)
  return D(options.sides)
}
