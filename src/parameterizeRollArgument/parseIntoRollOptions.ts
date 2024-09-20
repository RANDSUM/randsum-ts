import {
  isDicePoolOptions,
  isDiceNotationArg,
  isD,
  isCustomSidesD
} from '~guards'
import { RandsumRollArgument, RandsumRollOptions } from '~types'
import { parseNotation } from '~utils/parseNotation'

function parseIntoRollOptions(
  argument: RandsumRollArgument
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

  if (isDiceNotationArg(argument)) {
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
