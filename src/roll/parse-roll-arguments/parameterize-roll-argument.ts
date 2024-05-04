import { CoreRollArgument, DicePoolOptions, DicePoolParameters } from '~types'
import { dieFactory } from '~Die'
import formatDescription from './format-description.ts/index.ts'
import formatNotation from './format-notation/index.ts'
import { isDiceNotation, isDicePoolOptions } from './guards.ts'
import parseNotation from './parse-notation.ts'

function parseDiceOptions(
  options: CoreRollArgument | undefined
): DicePoolOptions<string> | DicePoolOptions<number> {
  if (isDicePoolOptions(options)) {
    return options
  }

  if (isDiceNotation(options)) {
    return parseNotation(options)
  }

  const defaultQuantity = 1

  if (Array.isArray(options)) {
    return {
      quantity: defaultQuantity,
      sides: options.map(String)
    }
  }

  return {
    quantity: defaultQuantity,
    sides: Number(options || 20)
  }
}

function parameterizeRollArgument<D extends number | string>(
  argument: CoreRollArgument | undefined
): DicePoolParameters<D> {
  const options = parseDiceOptions(argument)
  const die = dieFactory(options.sides)
  return {
    options,
    argument,
    die,
    notation: formatNotation(options),
    description: formatDescription(options)
  } as DicePoolParameters<D>
}

export default parameterizeRollArgument
