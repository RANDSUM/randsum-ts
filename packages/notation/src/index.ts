export { isDiceNotation } from './isDiceNotation'
export { validateNotation } from './validateNotation'

export { completeRollPattern, coreNotationPattern } from './patterns'

export { notationToOptions } from './utils/notationToOptions'

export type {
  CustomValidationResult,
  InvalidValidationResult,
  NumericValidationResult,
  ValidationResult
} from './types'

export type {
  BaseRollOptions,
  ComparisonOptions,
  CustomDiceNotation,
  CustomRollOptions,
  DiceNotation,
  DropOptions,
  ModifierOptions,
  NumericDiceNotation,
  NumericRollOptions,
  ReplaceOptions,
  RerollOptions,
  RollOptions,
  UniqueOptions
} from '@randsum/core'
