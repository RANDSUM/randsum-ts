import { coreNotationPattern } from '~constants'
import { dieFactory } from '~Die'
import {
  CoreRollArgument,
  DiceNotation,
  DicePoolOptions,
  DicePoolParameters,
  RollArgument,
  RollParameters
} from '~types'
import parseNotation from './parse-notation'
import formatNotation from './format-notation'
import formatDescription from './format-description.ts'

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

export function parseRollArgument(
  argument: CoreRollArgument | undefined
): RollParameters['dicePools'] {
  const id = crypto.randomUUID()
  const options = parseDiceOptions(argument)

  return {
    [id]: {
      options,
      argument,
      die: dieFactory(options.sides),
      notation: formatNotation(options),
      description: formatDescription(options)
    } as DicePoolParameters<number> | DicePoolParameters<string>
  }
}

const isCustomSides = (
  argument: RollArgument | undefined
): argument is string[] =>
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

function parseRollArguments(argument: RollArgument): RollParameters {
  return {
    dicePools: normalizeArguments(argument).reduce(
      (acc, arg) => ({ ...acc, ...parseRollArgument(arg) }),
      {}
    )
  }
}

export default parseRollArguments
