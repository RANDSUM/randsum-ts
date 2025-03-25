import { isCustomSidesStringArg } from '~guards/isCustomSidesStringArg'
import { isDiceNotationArg } from '~guards/isDiceNotationArg'
import type {
  CustomDiceNotation,
  CustomValidationResult,
  InvalidValidationResult,
  NumericDiceNotation,
  NumericValidationResult,
  ValidationResult
} from '~types'
import { notationToOptions } from '~utils/notationToOptions'
import { optionsConverter } from '~utils/optionsConverter'

export function validateNotation(
  notation: NumericDiceNotation
): NumericValidationResult
export function validateNotation(
  notation: CustomDiceNotation
): CustomValidationResult
export function validateNotation(notation: string): InvalidValidationResult
export function validateNotation(notation: string): ValidationResult {
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
    notation: optionsConverter.toNotation(digested),
    type: caclulateDieType(digested.sides),
    description: optionsConverter.toDescription(digested)
  } as ValidationResult
}

function caclulateDieType(sides: number | string[]): 'custom' | 'numerical' {
  if (isCustomSidesStringArg(sides)) {
    return 'custom'
  }
  return 'numerical'
}
