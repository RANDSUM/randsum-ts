import {
  isDicePoolOptions,
  isDiceNotationArg,
  isD,
  isCustomSidesD
} from '~guards'
import { RandsumRollArgument, RandsumRollOptions } from '~types'
import NotationModel from '~models/NotationModel'

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
    return NotationModel.toOptions(argument)
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
