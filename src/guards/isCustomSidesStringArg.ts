import type { RollArgument } from '~types'

export function isCustomSidesStringArg(
  argument: RollArgument<string> | RollArgument<number>
): argument is string[] {
  return (
    Array.isArray(argument) && argument.every((arg) => typeof arg === 'string')
  )
}
