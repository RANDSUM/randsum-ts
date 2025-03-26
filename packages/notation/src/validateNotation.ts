import { optionsConverter } from '@randsum/core'
import { isDiceNotation } from './isDiceNotation'
import type {
  CustomDiceNotation,
  CustomValidationResult,
  InvalidValidationResult,
  NumericDiceNotation,
  NumericValidationResult,
  ValidationResult
} from './types'
import { notationToOptions } from './utils/notationToOptions'

export function validateNotation(
  notation: NumericDiceNotation
): NumericValidationResult
export function validateNotation(
  notation: CustomDiceNotation
): CustomValidationResult
export function validateNotation(notation: string): InvalidValidationResult
export function validateNotation(notation: string): ValidationResult {
  if (!isDiceNotation(notation)) {
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
  if (Array.isArray(sides)) {
    return 'custom'
  }
  return 'numerical'
}
