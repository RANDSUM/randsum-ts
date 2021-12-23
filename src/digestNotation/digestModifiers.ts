import { parseDropNotation } from './notationParsers'

export function digestModifiers(modifierString: string) {
  return { drop: parseDropNotation(modifierString) }
}
