import { RollOptions } from '../types/options'
import { DiceNotation, NumberString } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(
  arg?: NumberString | RollOptions<number> | DiceNotation<number>
): RollResult<number>
function roll(
  arg: RollOptions<string> | DiceNotation<string>
): RollResult<string>
function roll(
  arg?:
    | RollOptions<number>
    | RollOptions<string>
    | DiceNotation<number>
    | DiceNotation<string>
    | NumberString
): RollResult<number> | RollResult<string> {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}

export default roll
