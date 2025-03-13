import { randomUUIDv7 as uuid } from 'bun'
import type { DicePools, RollArgument } from '~types'
import { normalizeArgument } from './normalizeArgument'

export function formDicePools<Sides extends string | number>(
  args: RollArgument<Sides>[]
): DicePools<Sides> {
  return {
    dicePools: args.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: normalizeArgument(arg) }),
      {}
    )
  }
}
