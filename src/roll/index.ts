import { RollArgument, RollResult } from '~types'
import generateResult from './generate-result'
import parseRollArguments from './parse-roll-arguments'

export default function roll(arg?: RollArgument): RollResult {
  return generateResult(parseRollArguments(arg))
}
