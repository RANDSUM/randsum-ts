import { DiceNotation } from 'types'

import { diceNotationPattern } from './dice-notation-pattern'

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!diceNotationPattern.test(String(argument))
}
