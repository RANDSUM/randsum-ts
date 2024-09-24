import {
  RandsumRollArgument,
  DicePools,
  RandsumRollOptions,
  RandsumRollParameters
} from '~types'
import { uuidv7 as uuid } from 'uuidv7'
import {
  isD,
  isCustomSidesD,
  isDicePoolOptions,
  isDiceNotationArg
} from '~guards'
import { NotationModel, OptionsModel } from '~models'
import { D } from '~src/D'

function formDicePools<Sides extends string | number = string | number>(
  args: RandsumRollArgument<Sides>[]
): DicePools<Sides> {
  return {
    dicePools: args.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: parameterize(arg) }),
      {}
    )
  }
}

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

function parameterize(argument: RandsumRollArgument): RandsumRollParameters {
  const options = normalizeArgument(argument)
  const die = new D(options.sides)
  return {
    options,
    argument,
    die,
    notation: OptionsModel.toNotation(options),
    description: OptionsModel.toDescription(options)
  }
}

export default { formDicePools, parameterize }
