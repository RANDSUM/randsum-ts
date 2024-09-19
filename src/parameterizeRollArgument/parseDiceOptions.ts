import { isDicePoolOptions, isDiceNotation } from '~guards'
import { CoreRollArgument, DicePoolOptions } from '~types'
import { parseNotation } from '~utils/parseNotation'

function parseDiceOptions(
  argument: CoreRollArgument | undefined
): DicePoolOptions {
  if (isDicePoolOptions(argument)) {
    return argument
  }

  if (isDiceNotation(argument)) {
    return parseNotation(argument)
  }

  const defaultQuantity = 1

  if (Array.isArray(argument)) {
    return {
      quantity: defaultQuantity,
      sides: argument.map(String)
    }
  }

  return {
    quantity: defaultQuantity,
    sides: Number(argument || 20)
  }
}

export { parseDiceOptions }
