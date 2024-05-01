import { RollArgument } from '../types/argument'
import { RollResult } from '../types/results'
import generateResult from './generate-result'
import parseArguments from './parse-arguments'

export default function roll(arg?: RollArgument): RollResult {
  return generateResult(parseArguments(arg))
}
