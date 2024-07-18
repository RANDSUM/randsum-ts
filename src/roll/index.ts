import { RollArgument, RollResult } from '~types'
import generateRollResult from './generateRollResult'
import parseRollArguments from './parseRollArguments'

export default function roll(arg?: RollArgument): RollResult {
  return generateRollResult(parseRollArguments(arg))
}
