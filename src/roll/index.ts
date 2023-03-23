import { DiceNotation, NumberString, RollOptions, RollResult } from '../types'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(
  arg?: NumberString | RollOptions<'standard'> | DiceNotation<'standard'>
): RollResult<'standard'>
function roll(
  arg: RollOptions<'customSides'> | DiceNotation<'customSides'>
): RollResult<'customSides'>
function roll(arg?: RollOptions | DiceNotation | NumberString): RollResult {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}

export default roll

const custom = roll({ sides: [1, 2, 3] })
const standard = roll({ sides: 20 })
