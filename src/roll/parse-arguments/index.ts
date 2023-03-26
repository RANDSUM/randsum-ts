import { coreNotationPattern } from '../../constants/regexp'
import { dicePoolFactory } from '../../Die'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation, DieSides, NumberString } from '../../types/primitives'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'

const isRollOptions = (
  argument: unknown
): argument is RollOptions | RollOptions<string> =>
  typeof argument === 'object' &&
  (argument as RollOptions | RollOptions<string>).sides !== undefined

export const isDiceNotation = (
  argument: unknown
): argument is DiceNotation | DiceNotation<string> =>
  !!coreNotationPattern.test(String(argument))

function parseArguments<T extends DieSides>(
  argument: T extends number
    ? RollOptions | DiceNotation | NumberString | undefined
    : RollOptions<string> | DiceNotation<string>
): T extends number ? RollParameters : RollParameters<string>
function parseArguments(
  argument:
    | RollOptions
    | RollOptions<string>
    | DiceNotation
    | DiceNotation<string>
    | NumberString
    | undefined
): RollParameters | RollParameters<string> {
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
    modifiers: [],
    initialRolls: dice.map((die) => die.roll())
  }
}
export default parseArguments
