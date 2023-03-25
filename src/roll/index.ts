import { RollOptions } from '../types/options'
import { DiceNotation, DieSides, NumberString } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(arg?: NumberString | RollOptions | DiceNotation): RollResult
function roll(
  arg: RollOptions<string> | DiceNotation<string>
): RollResult<string>
function roll<T extends DieSides>(
  arg: T extends number
    ? RollOptions | DiceNotation | NumberString | undefined
    : RollOptions<string> | DiceNotation<string>
): T extends number ? RollResult : RollResult<string>
function roll(
  arg?:
    | RollOptions
    | RollOptions<string>
    | DiceNotation
    | DiceNotation<string>
    | NumberString
): RollResult | RollResult<string> {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}
export default roll
