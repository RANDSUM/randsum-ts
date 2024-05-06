import { DicePoolType, NotationValidationResult } from '~types'
import { isDiceNotation } from '../roll/parse-roll-arguments/guards'
import parseNotation from '../roll/parse-roll-arguments/parse-notation'
import formatDescription from '../roll/parse-roll-arguments/format-description.ts'
import formatNotation from '../roll/parse-roll-arguments/format-notation'

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
