import {
  CustomSidesArguments,
  RollArguments,
  StandardSidesArguments
} from '../types/arguments'
import { DieSides } from '../types/primitives'
import { RollResult } from '../types/results'
import generateResult from './generate-results'
import parseArguments from './parse-arguments'

function roll(arg?: StandardSidesArguments): RollResult<number>
function roll(arg: CustomSidesArguments): RollResult<string>

function roll<D extends DieSides>(
  arg: D extends number ? StandardSidesArguments : CustomSidesArguments
): RollResult<D>
function roll(arg?: RollArguments): RollResult<number> | RollResult<string> {
  const parameters = parseArguments(arg)
  return generateResult(parameters)
}

export default roll
