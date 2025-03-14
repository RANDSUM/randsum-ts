import { v4 as uuid } from 'uuid'
import type { DicePools, RollArgument } from '~types'
import { normalizeArgument } from './normalizeArgument'

export function formDicePools<S extends string | number>(
  args: RollArgument<S>[]
): DicePools<S> {
  return {
    dicePools: args.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: normalizeArgument(arg) }),
      {}
    )
  }
}
