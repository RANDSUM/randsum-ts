import type { RollOptions } from '@randsum/core'
import { isD } from './isD'

export function isDicePoolOptions(argument: unknown): argument is RollOptions {
  return (
    typeof argument === 'object' &&
    !isD(argument) &&
    (argument as RollOptions).sides !== undefined
  )
}
