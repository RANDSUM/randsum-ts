import type { Modifiers } from '~types'
import { parseCapNotation } from './parseCapNotation'
import { parseDropModifiers } from './parseDropModifiers'
import { parseExplodeNotation } from './parseExplodeNotation'
import { parseMinusNotation } from './parseMinusNotation'
import { parsePlusNotation } from './parsePlusNotation'
import { parseReplaceNotation } from './parseReplaceNotation'
import { parseRerollNotation } from './parseRerollNotation'
import { parseUniqueNotation } from './parseUniqueNotation'

export function parseModifiers(
  modifiersString: string
): Modifiers | Record<never, never> {
  return {
    modifiers: {
      ...parseDropModifiers(modifiersString),
      ...parseExplodeNotation(modifiersString),
      ...parseUniqueNotation(modifiersString),
      ...parseReplaceNotation(modifiersString),
      ...parseRerollNotation(modifiersString),
      ...parseCapNotation(modifiersString),
      ...parsePlusNotation(modifiersString),
      ...parseMinusNotation(modifiersString)
    }
  }
}
