import { coreNotationPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation, NumberString } from '../../types/primitives'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'

const isRollOptions = (
  argument: unknown
): argument is RollOptions<number> | RollOptions<string> =>
  typeof argument === 'object' &&
  (argument as RollOptions<number> | RollOptions<string>).sides !== undefined

export const isDiceNotation = (
  argument: unknown
): argument is DiceNotation<number> | DiceNotation<string> =>
  !!coreNotationPattern.test(String(argument))

function parseArguments(
  argument:
    | RollOptions<number>
    | RollOptions<string>
    | DiceNotation<number>
    | DiceNotation<string>
    | NumberString
    | undefined
): RollParameters<number> | RollParameters<string> {
  if (isRollOptions(argument)) {
    return parseOptions(argument)
  }

  if (isDiceNotation(argument)) {
    return parseNotation(argument)
  }

  const sides = argument === undefined ? 20 : Number(argument)
  const diceOptions = [{ quantity: 1, sides }]
  const dice = dicePoolFactory(diceOptions)

  return {
    diceOptions,
    argument,
    dice,
    modifiers: []
  }
}
export default parseArguments
