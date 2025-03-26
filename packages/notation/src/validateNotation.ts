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

/**
 * Validates dice notation strings and provides detailed information about their structure.
 *
 * @remarks
 * This function analyzes dice notation strings and returns information about their validity,
 * structure, and human-readable descriptions of what they represent.
 *
 * @example
 * ```typescript
 * // Validate numeric dice notation
 * const result = validateNotation("4d6L")
 * if (result.valid) {
 *   console.log(result.description) // ["Roll 4 six-sided dice", "Drop lowest roll"]
 * }
 *
 * // Validate custom-faced dice
 * const customResult = validateNotation("2d{HT}")
 * if (customResult.valid) {
 *   console.log(customResult.description) // ["Roll 2 dice with the following sides: (H,T)"]
 * }
 * ```
 *
 * @param notation - The dice notation string to validate
 * @returns A {@link ValidationResult} object containing validation information
 *
 * @throws {Error} Never throws - returns invalid result instead
 *
 * @see {@link NumericValidationResult} for numeric dice validation details
 * @see {@link CustomValidationResult} for custom-faced dice validation details
 * @see {@link InvalidValidationResult} for invalid notation result structure
 */
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
