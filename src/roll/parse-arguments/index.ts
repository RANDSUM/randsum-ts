import { coreNotationPattern } from '../../constants/regexp'
import { dieFactory } from '../../Die'
import { CoreRollArgument, RollArgument } from '../../types/argument'
import { CustomSides, DicePoolOptions } from '../../types/options'
import { DicePoolParameters, RollParameters } from '../../types/parameters'
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
  options: CoreRollArgument | undefined
): DicePoolOptions<string | number> {
  if (isDicePoolOptions(options)) {
    return options
  }

  if (isDiceNotation(options)) {
    return parseNotation(options)
  }

  return {
    quantity: 1,
    sides: Array.isArray(options) ? options.map(String) : Number(options || 20)
  }
}

function parseArgument(
  argument: CoreRollArgument | undefined
): RollParameters['dicePools'] {
  const id = crypto.randomUUID()
  const options = parseDiceOptions(argument)

  return {
    [id]: {
      options,
      argument,
      die: dieFactory(options.sides)
    } as DicePoolParameters<number> | DicePoolParameters<string>
  }
}

const isCustomSides = (
  argument: RollArgument | undefined
): argument is CustomSides =>
  Array.isArray(argument) && argument.every((arg) => typeof arg === 'string')

const normalizeArguments = (
  argument: RollArgument | undefined
): CoreRollArgument[] | undefined[] => {
  if (!argument) {
    return [undefined]
  }

  if (isCustomSides(argument)) {
    return [argument]
  }

  if (Array.isArray(argument)) {
    return argument
  }

  return [argument].flat()
}

function parseArguments(argument: RollArgument | undefined): RollParameters {
  return {
    dicePools: normalizeArguments(argument).reduce(
      (acc, arg) => ({ ...acc, ...parseArgument(arg) }),
      {}
    )
  }
}

export default parseArguments
