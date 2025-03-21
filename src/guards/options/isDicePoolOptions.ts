import type { RollOptions } from '~types'
import { isD } from '../dice/isD'

export function isDicePoolOptions(argument: unknown): argument is RollOptions {
  return (
    typeof argument === 'object' &&
    argument !== null &&
    !isD(argument) &&
    'sides' in argument
  )
}
