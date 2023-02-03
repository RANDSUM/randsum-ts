import { DiceNotation } from '../types'

export const coreNotationPattern = /(?<coreNotationMatch>^\d+[Dd](\d+|{.*}))/

export default function isDiceNotation(
  argument: unknown
): argument is DiceNotation {
  return !!coreNotationPattern.test(String(argument))
}
