import { isDiceNotationArg } from '~src/guards/isDiceNotationArg'
import type {
  CustomDiceNotation,
  CustomNotationValidationResult,
  InvalidNotationValidationResult,
  NotationValidationResult,
  NumericalDiceNotation,
  NumericalNotationValidationResult
} from '~types'
import { caclulateDieType } from '~utils/calculateDieType'
import { notationToOptions } from '~utils/notationToOptions'
import { optionsToDescription } from '~utils/optionsToDescription'
import { optionsToNotation } from '~utils/optionsToNotation'

export function validateNotation(
  notation: NumericalDiceNotation
): NumericalNotationValidationResult
export function validateNotation(
  notation: CustomDiceNotation
): CustomNotationValidationResult
export function validateNotation(
  notation: string
): InvalidNotationValidationResult
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
    type: caclulateDieType(digested.sides),
    description: optionsToDescription(digested)
  } as NotationValidationResult
}
