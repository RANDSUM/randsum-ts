import { DiceNotation } from '../../types'
import { diceNotationPattern } from './patterns'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!diceNotationPattern.test(String(argument))
}
