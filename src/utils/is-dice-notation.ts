import { diceNotationPattern } from 'parseArguments/parseNotation/matchers'
import { DiceNotation } from 'types'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!diceNotationPattern.test(String(argument))
}
