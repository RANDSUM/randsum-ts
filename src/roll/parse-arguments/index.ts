import { dicePoolFactory } from '../../Die'
import { isDiceNotation, isRollOptions } from '../../types/guards'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation, NumberString } from '../../types/primitives'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'

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

  const quantity = 1
  const sides = argument === undefined ? 20 : Number(argument)
  const diceOptions = [{ sides }]
  const dice = dicePoolFactory(diceOptions)

  return {
    diceOptions,
    argument,
    dice,
    sides,
    modifiers: [],
    initialRolls: dice.map((die) => die.roll()),
    quantity
  }
}
export default parseArguments
