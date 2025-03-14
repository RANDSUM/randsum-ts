import { isD } from '~guards/isD'
import { isDiceNotationArg } from '~guards/isDiceNotationArg'
import { isDicePoolOptions } from '~guards/isDicePoolOptions'
import { notationToOptions } from '~src/notationParsers/notationToOptions'
import type { RollArgument, RollOptions } from '~types'

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
