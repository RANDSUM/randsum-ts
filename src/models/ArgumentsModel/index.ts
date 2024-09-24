import {
  RandsumRollArgument,
  DicePools,
  RandsumRollOptions,
  RandsumRollParameters
} from '~types'
import { uuidv7 as uuid } from 'uuidv7'
import { isD, isDicePoolOptions, isDiceNotationArg } from '~guards'
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

function toOptions(argument: RandsumRollArgument): RandsumRollOptions {
  if (isDicePoolOptions(argument)) {
    return argument
  }

  if (isD(argument)) {
    return argument.toOptions()
  }

  if (isDiceNotationArg(argument)) {
    return NotationModel.toOptions(argument)
  }

  const sides = Array.isArray(argument)
    ? argument.map(String)
    : Number(argument)

  return {
    quantity: 1,
    sides
  }
}

function parameterize(argument: RandsumRollArgument): RandsumRollParameters {
  const options = toOptions(argument)
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
