import { RollOptions } from '../types/options'
import { DiceNotation, NumberString } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(arg?: NumberString | RollOptions | DiceNotation): RollResult
function roll(
  arg: RollOptions<'customSides'> | DiceNotation<'customSides'>
): RollResult<'customSides'>
function roll(
  arg?:
    | RollOptions
    | RollOptions<'customSides'>
    | DiceNotation
    | DiceNotation<'customSides'>
    | NumberString
): RollResult | RollResult<'customSides'> {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}

export default roll
