import { diceNotationPattern } from 'parseArgs/parseNotation/matchers'
import { DiceNotation } from 'types'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  if (typeof argument !== 'string') {
    return false
  }
  return !!diceNotationPattern.test(argument)
}
;``
