import { D } from '~src/dice/D'
import type { RollConfigArgument } from './types'

export function isD(arg: unknown): arg is D {
  return arg instanceof D
}

export function isRollConfigArgument(
  argument: unknown
): argument is RollConfigArgument {
  return (
    typeof argument === 'object' &&
    argument instanceof D === false &&
    (argument as RollConfigArgument).sides !== undefined
  )
}
