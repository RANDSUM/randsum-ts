import { isD } from '~src/guards/isD'
import { isDiceNotationArg } from '~src/guards/isDiceNotationArg'
import { isDicePoolOptions } from '~src/guards/isDicePoolOptions'
import type { RollArgument, RollOptions } from '~types'
import { notationToOptions } from './notationToOptions'

export function argumentToOptions(argument: RollArgument): RollOptions {
  switch (true) {
    case isDicePoolOptions(argument):
      return argument
    case isD(argument):
      return argument.toOptions()
    case isDiceNotationArg(argument):
      return notationToOptions(argument)
    default:
      if (Array.isArray(argument)) {
        return { quantity: 1, sides: argument.map(String) }
      }
      return { quantity: 1, sides: Number(argument) }
  }
}
