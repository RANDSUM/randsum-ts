import { CustomSides, DicePoolOptions } from '../types/options'
import { DiceNotation } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'
import { generateInitialRolls } from './utils'

function roll(
  arg?: number | DicePoolOptions<number> | DiceNotation<number> | undefined
): RollResult<number>
function roll(
  arg: DiceNotation<string> | DicePoolOptions<string> | CustomSides
): RollResult<string>
function roll<D extends string | number>(
  arg: D extends number
    ? number | DicePoolOptions<number> | DiceNotation<number> | undefined
    : DiceNotation<string> | DicePoolOptions<string> | CustomSides
): RollResult<D>
function roll(
  arg?:
    | number
    | DicePoolOptions<number>
    | DiceNotation<number>
    | undefined
    | DiceNotation<string>
    | DicePoolOptions<string>
    | CustomSides
): RollResult<number> | RollResult<string> {
  const parameters = parseArguments(arg)
  return generateResult({ ...parameters, generateInitialRolls })
}

export default roll
