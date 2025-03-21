import type { DiceNotation } from '~types'

export function isNumericNotation(notation: DiceNotation): boolean {
  return !notation.includes('{')
}