import { isDicePoolOptions, isDiceNotation, isD, isCustomSidesD } from '~guards'
import { CoreRollArgument, RandsumRollOptions } from '~types'
import { parseNotation } from '~utils/parseNotation'

function parseIntoRollOptions(
  argument: CoreRollArgument | undefined
): RandsumRollOptions {
  if (isD(argument)) {
    return {
      quantity: 1,
      sides: isCustomSidesD(argument) ? argument.faces : argument.sides
    }
  }

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

export { parseIntoRollOptions }
