import { DiceNotation } from 'types'

export const diceNotationPattern = /(\d+)[Dd](\d+)/

export function isDiceNotation(argument: unknown): argument is DiceNotation {
  return !!diceNotationPattern.test(String(argument))
}
