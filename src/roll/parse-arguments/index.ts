import { coreNotationPattern } from '../../constants/regexp'
import { dieFactory } from '../../Die'
import { isCustomSides } from '../../Die/guards'
import { RollArgument } from '../../types/argument'
import { DicePoolOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation } from '../../types/primitives'
import parseNotation from './parse-notation'

const isDicePoolOptions = (
  argument: unknown
): argument is DicePoolOptions<number> | DicePoolOptions<string> =>
  typeof argument === 'object' &&
  (argument as DicePoolOptions<number> | DicePoolOptions<string>).sides !==
    undefined

export const isDiceNotation = (
  argument: unknown
): argument is DiceNotation<number> | DiceNotation<string> =>
  !!coreNotationPattern.test(String(argument))

function parseDiceOptions(
  options: RollArgument
): DicePoolOptions<string | number> {
  if (isDicePoolOptions(options)) {
    return options
  }

  if (isDiceNotation(options)) {
    return parseNotation(options)
  }

  return {
    quantity: 1,
    sides: isCustomSides(options) ? options.map(String) : Number(options)
  }
}

function parseArgument(
  argument: RollArgument
): RollParameters<number | string> {
  const id = crypto.randomUUID()
  const options = parseDiceOptions(argument)

  return {
    dicePools: {
      [id]: {
        options,
        argument,
        die: dieFactory(options.sides)
      }
    }
  }
}

function parseArguments(
  argument: RollArgument
): RollParameters<number | string> {
  return parseArgument(argument)
}

export default parseArguments
