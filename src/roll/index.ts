import { CustomSides, DicePoolOptions } from '../types/options'
import { DiceNotation } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(
  arg?: number | DicePoolOptions | DiceNotation | CustomSides
): RollResult {
  return generateResult(parseArguments(arg))
}

export default roll
