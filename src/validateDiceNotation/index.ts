import { DicePoolType, NotationValidationResult } from '~types'
import { isDiceNotation } from '../roll/parseRollArguments/guards.ts'
import parseNotation from '../roll/parseRollArguments/parseNotation.ts'
import formatDescription from '../roll/parseRollArguments/formatDescription/index.ts'
import formatNotation from '../roll/parseRollArguments/formatNotation/index.ts'

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
