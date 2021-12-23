import { parseDropConstrainNotation } from './parseDropConstraintNotation'
import { parseDropHighNotation } from './parseDropHighNotation'
import { parseDropLowNotation } from './parseDropLowNotation'

export function parseDropNotation(modifierString: string) {
  const dropHigh = parseDropHighNotation(modifierString)
  const dropwLow = parseDropLowNotation(modifierString)
  const constraints = parseDropConstrainNotation(modifierString)

  const drop = { ...dropHigh, ...dropwLow, ...constraints }

  return Object.keys(drop).length ? drop : undefined
}
