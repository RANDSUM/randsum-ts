import { CustomSides, RollOptions } from '../types/options'
import { DiceNotation, NumberString } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(
  arg?: NumberString | RollOptions<number> | DiceNotation<number> | undefined
): RollResult<number>
function roll(
  arg: DiceNotation<string> | RollOptions<string> | CustomSides
): RollResult<string>

/** @hidden */
function roll<D extends string | number>(
  arg: D extends number
    ? NumberString | RollOptions<number> | DiceNotation<number> | undefined
    : DiceNotation<string> | RollOptions<string> | CustomSides
): RollResult<D>
function roll(
  arg?:
    | NumberString
    | RollOptions<number>
    | DiceNotation<number>
    | undefined
    | DiceNotation<string>
    | RollOptions<string>
    | CustomSides
): RollResult<number> | RollResult<string> {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}

export default roll
