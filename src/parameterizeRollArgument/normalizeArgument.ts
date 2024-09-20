import {
  isDicePoolOptions,
  isDiceNotationArg,
  isD,
  isCustomSidesD
} from '~guards'
import { RandsumRollArgument, RandsumRollOptions } from '~types'
import { parseNotation } from '~utils/parseNotation'

function normalizeArgument(argument: RandsumRollArgument): RandsumRollOptions {
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

  if (Array.isArray(argument)) {
    return {
      quantity: 1,
      sides: argument.map(String)
    }
  }

  return {
    quantity: 1,
    sides: Number(argument || 20)
  }
}

export { normalizeArgument }
