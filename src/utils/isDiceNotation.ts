import { diceNotationPattern } from 'parseArgs/parseNotation/matchers'
import { DiceNotation } from 'types'

export function isDiceNotation(arg: unknown): arg is DiceNotation {
  return !!String(arg).match(diceNotationPattern)
}
