import { RollArgument, DicePools, RollOptions, RollParameters } from '~types'
import { randomUUIDv7 as uuid } from 'bun'
import { isD, isDicePoolOptions, isDiceNotationArg } from '~guards'
import { NotationModel, OptionsModel } from '~models'
import { D } from '~src/D'

function formDicePools<Sides extends string | number>(
  args: RollArgument<Sides>[]
): DicePools<Sides> {
  return {
    dicePools: args.reduce(
      (acc, arg) => ({ ...acc, [uuid()]: parameterize(arg) }),
      {}
    )
  }
}

function toOptions(argument: RollArgument): RollOptions {
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

function parameterize(argument: RollArgument<number>): RollParameters<number>
function parameterize(argument: RollArgument<string>): RollParameters<string>
function parameterize(
  argument: RollArgument<string | number>
): RollParameters<string | number>
function parameterize<Sides extends string | number>(
  argument: RollArgument<Sides>
): RollParameters<Sides> {
  const options = toOptions(argument)
  return {
    argument,
    options,
    die: isD(argument) ? argument : new D(options.sides),
    notation: OptionsModel.toNotation(options),
    description: OptionsModel.toDescription(options)
  } as RollParameters<Sides>
}

export default { formDicePools, parameterize }
