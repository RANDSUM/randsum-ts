import { v4 as uuid } from 'uuid'
import type { DicePool, RollArgument } from '~types'
import { normalizeArgument } from './normalizeArgument'

export function formDicePools(args: RollArgument[]): DicePool {
  return {
    dicePools: args.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: normalizeArgument(arg) }),
      {}
    )
  }
}
