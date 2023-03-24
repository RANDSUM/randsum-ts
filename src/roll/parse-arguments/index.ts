import { StandardDicePool } from '../../Die'
import { RollOptions } from '../../types/options'
import { RollParameters } from '../../types/parameters'
import { DiceNotation, NumberString } from '../../types/primitives'
import parseNotation from './parse-notation'
import parseOptions from './parse-options'
import { isDiceNotation, isRollOptions } from './utils'

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
  const dice = [{ quantity, sides }]
  const pool = new StandardDicePool(dice)

  return {
    dice,
    argument,
    pool,
    sides,
    modifiers: [],
    initialRolls: pool.roll(),
    quantity
  }
}
export default parseArguments
