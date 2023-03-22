import generateResult from './generate-results'
import parseArguments from './parse-arguments'
import { DiceNotation, NumberString, RollOptions, RollResult } from './types'

function roll(
  arg?: NumberString | RollOptions<'standard'> | DiceNotation<'standard'>
): RollResult<'standard'>
function roll(
  arg: RollOptions<'customSides'> | DiceNotation<'customSides'>
): RollResult<'customSides'>

function roll(
  arg?:
    | RollOptions<'standard'>
    | RollOptions<'customSides'>
    | DiceNotation<'standard'>
    | DiceNotation<'customSides'>
    | NumberString
): RollResult<'customSides'> | RollResult<'standard'> {
  const parameters = parseArguments(arg)
  const result = generateResult(parameters)
  return {
    ...result,
    arguments: [arg]
  }
}

export default roll
