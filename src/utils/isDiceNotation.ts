import { diceNotationPattern } from 'digestNotation/matchers'

export function isDiceNotation(arg: unknown): arg is string {
  return !!String(arg).match(diceNotationPattern)
}
