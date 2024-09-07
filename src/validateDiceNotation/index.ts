import { DicePoolType, NotationValidationResult } from '~types'
import { isDiceNotation } from '~guards'
import parseNotation from '~src/parseRollArguments/parseNotation'
import formatDescription from '~src/parseRollArguments/formatDescription'
import formatNotation from '~src/parseRollArguments/formatNotation/'

function validateDiceNotation(notation: string): NotationValidationResult {
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

export default validateDiceNotation
