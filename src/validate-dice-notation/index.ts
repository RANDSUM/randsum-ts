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

  const options = parseNotation(notation)
  const description = formatDescription(options)
  const typedOptions = options
  const parsedNotation = formatNotation(typedOptions)

  return {
    valid: true,
    notation: parsedNotation,
    type: DicePoolType.standard,
    digested: typedOptions,
    description
  }
}

export default validateDiceNotation
