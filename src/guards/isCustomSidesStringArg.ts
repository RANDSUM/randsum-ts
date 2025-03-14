import type { RollArgument } from '~types'

export function isCustomSidesStringArg(
  argument: RollArgument
): argument is string[] {
  return (
    Array.isArray(argument) && argument.every((arg) => typeof arg === 'string')
  )
}
