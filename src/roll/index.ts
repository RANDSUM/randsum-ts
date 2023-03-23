import {
  DiceNotation,
  DieType,
  NumberString,
  RollOptions,
  RollResult
} from '../types'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(
  arg?: NumberString | RollOptions<'standard'> | DiceNotation<'standard'>
): RollResult<'standard'>
function roll(
  arg: RollOptions<'customSides'> | DiceNotation<'customSides'>
): RollResult<'customSides'>
function roll<T extends DieType>(
  arg?: RollOptions<T> | DiceNotation<T> | NumberString
): RollResult<T> {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}

export default roll

const customOptions: RollOptions = { sides: [1, 2, 3] }
const standardOptions: RollOptions = { sides: 20 }

const foo = roll({ sides: [1, 2, 3] })
const bar = roll(standardOptions)
console.log(foo, bar)
