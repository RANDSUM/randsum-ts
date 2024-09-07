import { CoreRollArgument, DicePoolOptions, DicePoolParameters } from '~types'
import { dieFactory } from '~src/Die'
import formatDescription from './formatDescription'
import formatNotation from './formatNotation'
import { isDiceNotation, isDicePoolOptions } from '~guards'
import parseNotation from './parseNotation'

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
