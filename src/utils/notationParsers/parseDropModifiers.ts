import {
  dropConstraintsPattern,
  dropHighestPattern,
  dropLowestPattern
} from '~patterns'
import type { Modifiers } from '~types'
import { extractMatches } from './extractMatches'
import { parseDropConstraintsNotation } from './parseDropConstraintsNotation'
import { parseDropHighNotation } from './parseDropHighNotation'
import { parseDropLowNotation } from './parseDropLowNotation'

export function parseDropModifiers(
  modifiersString: string
): Pick<Modifiers, 'drop'> {
  const dropHighModifiers = parseDropHighNotation(
    extractMatches(modifiersString, dropHighestPattern)
  )
  const dropLowModifiers = parseDropLowNotation(
    extractMatches(modifiersString, dropLowestPattern)
  )
  const dropConstraintsModifiers = parseDropConstraintsNotation(
    extractMatches(modifiersString, dropConstraintsPattern)
  )

  const rawDropModifiers = {
    drop: {
      ...dropHighModifiers.drop,
      ...dropLowModifiers.drop,
      ...dropConstraintsModifiers.drop
    }
  }

  if (Object.keys(rawDropModifiers.drop).length > 0) {
    return rawDropModifiers
  }
  return {}
}
