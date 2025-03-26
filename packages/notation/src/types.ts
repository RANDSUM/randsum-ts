import type { BaseRollOptions, NumericRollOptions } from "@randsum/core"

// --------------------------
// --- NOTATION & STRINGS ---
// --------------------------


export type NumericDiceNotation = `${number}${'d' | 'D'}${number}${string}`
export type CustomDiceNotation = `${number}${'d' | 'D'}{${string}}`
export type DiceNotation = NumericDiceNotation | CustomDiceNotation

// -----------------------
// --- ROLL OPTIONS ---
// -----------------------

export interface CustomRollOptions extends BaseRollOptions {
  quantity?: number
  sides: string[]
  modifiers?: Record<string, never>
}


export type RollOptions = NumericRollOptions | CustomRollOptions


// -----------------------
// --- VALIDATION ---
// -----------------------

interface BaseValidationResult {
  valid: boolean
  description: string[]
}

export interface NumericValidationResult extends BaseValidationResult {
  valid: true
  type: 'numerical'
  digested: NumericRollOptions
  notation: NumericDiceNotation
}

export interface CustomValidationResult extends BaseValidationResult {
  valid: true
  type: 'custom'
  digested: CustomRollOptions
  notation: CustomDiceNotation
}

export interface InvalidValidationResult extends BaseValidationResult {
  valid: false
}

export type ValidationResult =
  | NumericValidationResult
  | CustomValidationResult
  | InvalidValidationResult

export type {
  ModifierOptions,
  NumericRollOptions
} from '@randsum/core'
