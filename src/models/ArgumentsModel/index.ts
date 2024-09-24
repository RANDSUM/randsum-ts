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
  switch (true) {
    case isDicePoolOptions(argument):
      return argument
    case isD(argument):
      return argument.toOptions()
    case isDiceNotationArg(argument):
      return NotationModel.toOptions(argument)
    default:
      return {
        quantity: 1,
        sides: Array.isArray(argument) ? argument.map(String) : Number(argument)
      }
  }
}
function parameterize(
  argument: RandsumRollArgument<number>
): RandsumRollParameters<number>
function parameterize(
  argument: RandsumRollArgument<string>
): RandsumRollParameters<string>
function parameterize(
  argument: RandsumRollArgument<string | number>
): RandsumRollParameters<string | number>
function parameterize<Sides extends string | number = string | number>(
  argument: RandsumRollArgument<Sides>
): RandsumRollParameters<Sides> {
  const options = toOptions(argument)
  return {
    argument,
    options,
    die: new D(options.sides),
    notation: OptionsModel.toNotation(options),
    description: OptionsModel.toDescription(options)
  } as RandsumRollParameters<Sides>
}

export default { formDicePools, parameterize }
