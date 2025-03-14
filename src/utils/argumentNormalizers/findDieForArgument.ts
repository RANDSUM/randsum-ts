import { D } from '~src/D'
import { isD } from '~src/guards/isD'
import type { RollArgument, RollParameters } from '~types'
import { argumentToOptions } from '../argumentToOptions'

export function findDieForArgument<S extends string | number>(
  argument: RollArgument<S>
): RollParameters<S>['die'] {
  if (isD(argument)) {
    return argument as RollParameters<S>['die']
  }
  return new D(argumentToOptions(argument).sides) as RollParameters<S>['die']
}
