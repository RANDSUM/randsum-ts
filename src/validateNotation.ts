import { isCustomSidesStringArg, isDiceNotationArg } from '~guards'
import type { NotationValidationResult } from '~types'
import { notationToOptions } from '~utils/notationToOptions'
import { optionsToDescription } from './utils/optionsToDescription'
import { optionsToNotation } from './utils/optionsToNotation'

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
