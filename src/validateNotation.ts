import { isCustomSidesStringArg } from '~guards/isCustomSidesStringArg'
import { isDiceNotationArg } from '~guards/isDiceNotationArg'
import { optionsToDescription } from '~src/descriptionFormatters/optionsToDescription'
import { optionsToNotation } from '~src/notationFormatters/optionsToNotation'
import { notationToOptions } from '~src/notationParsers/notationToOptions'
import type { NotationValidationResult } from '~types'

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
