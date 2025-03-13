import { isCustomSidesStringArg, isDiceNotationArg } from '~guards'
import type { NotationValidationResult } from '~types'
import { optionsToDescription } from '~utils/descriptionFormatters'
import { optionsToNotation } from '~utils/notationFormatters'
import { notationToOptions } from '~utils/notationParsers'

export function validateNotation(notation: string): NotationValidationResult {
  if (!isDiceNotationArg(notation)) {
    return {
      valid: false,
      description: []
    }
  }

  const digested = notationToOptions(notation)

  return {
    valid: true,
    digested,
    notation: optionsToNotation(digested),
    type: notationType(digested.sides),
    description: optionsToDescription(digested)
  }
}

function notationType(sides: number | string[]): 'custom' | 'numerical' {
  if (isCustomSidesStringArg(sides)) {
    return 'custom'
  }
  return 'numerical'
}
