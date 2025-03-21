import { isDiceNotationArg } from '~guards/notation/isDiceNotationArg'
import type {
  CustomDiceNotation,
  CustomValidationResult,
  InvalidValidationResult,
  NumericDiceNotation,
  NumericValidationResult,
  ValidationResult
} from '~types'
import { caclulateDieType } from '~utils/calculateDieType'
import { notationToOptions } from '~utils/notationToOptions'
import { optionsToDescription } from '~utils/optionsToDescription'
import { optionsToNotation } from '~utils/optionsToNotation'

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
    notation: optionsToNotation(digested),
    type: caclulateDieType(digested.sides),
    description: optionsToDescription(digested)
  } as ValidationResult
}
