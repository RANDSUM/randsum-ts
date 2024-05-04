import { RollArgument, RollResult } from '~types'
import generateRollResult from './generate-roll-result'
import parseRollArguments from './parse-roll-arguments'

export default function roll(arg?: RollArgument): RollResult {
  return generateRollResult(parseRollArguments(arg))
}
