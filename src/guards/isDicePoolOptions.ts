import { D } from '~src/D'
import type { RollOptions } from '~types'

export function isDicePoolOptions(argument: unknown): argument is RollOptions {
  return (
    typeof argument === 'object' &&
    argument instanceof D === false &&
    (argument as RollOptions).sides !== undefined
  )
}
