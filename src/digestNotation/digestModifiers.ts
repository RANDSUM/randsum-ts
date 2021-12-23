import { parseDropConstrainNotation, parseDropHighNotation, parseDropLowNotation } from './notationParsers'

export function digestModifiers(modifierString: string) {
  const dropHigh = parseDropHighNotation(modifierString)
  const dropwLow = parseDropLowNotation(modifierString)
  const constraints = parseDropConstrainNotation(modifierString)
  const drop = { ...dropHigh, ...dropwLow, ...constraints }

  return { drop }
}
