import { coreNotationPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { isCustomSidesOptions } from '../../Die/guards'
import { CustomSides, RollOptions } from '../../types/options'
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
    | NumberString
    | RollOptions<number>
    | DiceNotation<number>
    | undefined
    | DiceNotation<string>
    | RollOptions<string>
    | CustomSides
):
  | Omit<RollParameters<number>, 'generateInitialRolls'>
  | Omit<RollParameters<string>, 'generateInitialRolls'> {
  if (isRollOptions(argument)) {
    return parseOptions(argument)
  }

  if (isDiceNotation(argument)) {
    return parseNotation(argument)
  }

  if (isCustomSidesOptions(argument)) {
    const diceOptions = [{ quantity: 1, sides: argument.map(String) }]
    const dice = dicePoolFactory(diceOptions)
    return {
      diceOptions,
      argument,
      dice,
      modifiers: []
    }
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
