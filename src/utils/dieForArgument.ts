import { isD } from '~guards/isD'
import { D } from '~src/D'
import type { RollArgument, RollParameters } from '~types'
import { argumentToOptions } from './argumentToOptions'

export function dieForArgument<A extends string | number>(
  argument: RollArgument<A>
): RollParameters<A>['die'] {
  if (isD(argument)) {
    return argument as RollParameters<A>['die']
  }
  return new D(argumentToOptions(argument).sides) as RollParameters<A>['die']
}
