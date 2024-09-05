import { DiceNotation, DicePoolOptions } from '~types'
import formatNotation from '../roll/parseRollArguments/formatNotation'

export default function optionsToNotation(
  options: DicePoolOptions
): DiceNotation {
  return formatNotation(options)
}
