import { CoreRollArgument, DicePoolOptions, DicePoolParameters } from '~types'
import { dieFactory } from '~Die'
import formatDescription from './formatDescription/index.ts'
import formatNotation from './formatNotation/index.ts'
import { isDiceNotation, isDicePoolOptions } from './guards.ts'
import parseNotation from './parseNotation.ts'

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

function parameterizeRollArgument(
  argument: CoreRollArgument | undefined
): DicePoolParameters {
  const options = parseDiceOptions(argument)
  const die = dieFactory(options.sides)
  return {
    options,
    argument,
    die,
    notation: formatNotation(options),
    description: formatDescription(options)
  } as DicePoolParameters
}

export default parameterizeRollArgument
