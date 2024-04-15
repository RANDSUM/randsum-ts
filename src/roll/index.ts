import { CustomSides, RollOptions } from '../types/options'
import { DiceNotation } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'
import { generateInitialRolls } from './utils'

function roll(
  arg?: number | RollOptions<number> | DiceNotation<number> | undefined
): RollResult<number>
function roll(
  arg: DiceNotation<string> | RollOptions<string> | CustomSides
): RollResult<string>
function roll<D extends string | number>(
  arg: D extends number
    ? number | RollOptions<number> | DiceNotation<number> | undefined
    : DiceNotation<string> | RollOptions<string> | CustomSides
): RollResult<D>
function roll(
  arg?:
    | number
    | RollOptions<number>
    | DiceNotation<number>
    | undefined
    | DiceNotation<string>
    | RollOptions<string>
    | CustomSides
): RollResult<number> | RollResult<string> {
  const parameters = parseArguments(arg)
  return generateResult({ ...parameters, generateInitialRolls })
}

export default roll
