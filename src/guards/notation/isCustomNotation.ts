import type { DiceNotation } from '~types'

export function isCustomNotation(notation: DiceNotation): boolean {
  return notation.includes('{')
}