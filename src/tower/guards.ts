import { D } from '~dice'
import { RollConfigArgument } from './types'

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
