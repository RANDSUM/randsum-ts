import { diceNotationPattern } from 'parseArguments/parseNotation/matchers'
import { DiceNotation } from 'types'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  if (typeof argument !== 'string') {
    return false
  }
  return !!diceNotationPattern.test(argument)
}
