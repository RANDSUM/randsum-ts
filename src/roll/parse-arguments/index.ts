import { coreNotationPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { isCustomSides } from '../../Die/guards'
import { RollArgument } from '../../types/argument'
import { CustomSides, DicePoolOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation } from '../../types/primitives'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'

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

function parseArgument(
  argument: RollArgument
): RollParameters<number | string> {
  if (isDicePoolOptions(argument)) {
    return parseOptions(argument)
  }

  if (isDiceNotation(argument)) {
    return parseNotation(argument)
  }

  if (isCustomSides(argument)) {
    const diceOptions = [{ quantity: 1, sides: argument.map(String) }]
    const dice = dicePoolFactory(diceOptions)
    return {
      diceOptions,
      argument,
      dice,
      modifiers: {}
    }
  }

  const sides = argument === undefined ? 20 : Number(argument)
  const diceOptions = [{ quantity: 1, sides }]
  const dice = dicePoolFactory(diceOptions)

  return {
    diceOptions,
    argument,
    dice,
    modifiers: {}
  }
}

function parseArguments(
  argument: RollArgument
): RollParameters<number | string> {
  return parseArgument(argument)
}
export default parseArguments
