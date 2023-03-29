import { CustomSidesOption, RollOptions } from '../types/options'
import { DiceNotation, DieSides, NumberString } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(
  arg?: NumberString | RollOptions<number> | DiceNotation<number>
): RollResult<number>
function roll(
  arg: RollOptions<string> | DiceNotation<string> | CustomSidesOption
): RollResult<string>
function roll<D extends DieSides>(
  arg: D extends number
    ? NumberString | RollOptions<number> | DiceNotation<number> | undefined
    : DiceNotation<string> | RollOptions<string> | CustomSidesOption
): RollResult<D>
function roll(
  arg?:
    | RollOptions<number>
    | RollOptions<string>
    | DiceNotation<number>
    | DiceNotation<string>
    | NumberString
    | CustomSidesOption
): RollResult<number> | RollResult<string> {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}

export default roll
