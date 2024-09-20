import { DicePoolType, RandsumNotationValidationResult } from '~types'
import { isDiceNotation } from '~guards'
import { formatNotation } from '~utils/formatNotation'
import { parseNotation } from '~utils/parseNotation'
import { formatDescription } from '~utils/formatDescription'

function validateDiceNotation(
  notation: string
): RandsumNotationValidationResult {
  if (!isDiceNotation(notation)) {
    return {
      valid: false,
      description: []
    }
  }

  const digested = parseNotation(notation)
  const description = formatDescription(digested)
  const parsedNotation = formatNotation(digested)
  const type = Array.isArray(digested.sides)
    ? DicePoolType.custom
    : DicePoolType.standard

  return {
    valid: true,
    notation: parsedNotation,
    type,
    digested,
    description
  }
}

export { validateDiceNotation }
