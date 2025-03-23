// --------------------------
// --- NOTATION & STRINGS ---
// --------------------------

export type NumericDiceNotation = `${number}${'d' | 'D'}${number}${string}`
export type CustomDiceNotation = `${number}${'d' | 'D'}{${string}}`
export type DiceNotation = NumericDiceNotation | CustomDiceNotation

// -----------------------
// --- OPTIONS & MODIFIERS ---
// -----------------------

interface BaseRollOptions {
  quantity?: number
}

export interface ComparisonOptions {
  greaterThan?: number
  lessThan?: number
}

export interface DropOptions extends ComparisonOptions {
  highest?: number
  lowest?: number
  exact?: number[]
}

export interface RerollOptions extends ComparisonOptions {
  exact?: number[]
  max?: number
}

export interface ReplaceOptions {
  from: number | ComparisonOptions
  to: number
}

export interface UniqueOptions {
  notUnique: number[]
}

export interface ModifierOptions {
  cap?: ComparisonOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: RerollOptions
  unique?: boolean | UniqueOptions
  explode?: boolean
  plus?: number
  minus?: number
}

// -----------------------
// --- DIE TYPES ---
// -----------------------

interface BaseDie {
  sides: number
  isCustom: boolean
  roll(quantity?: number): number | string
  rollSpread(quantity?: number): number[] | string[]
  toOptions: RollOptions
}

export interface NumericDie extends BaseDie {
  type: 'numerical'
  isCustom: false
  faces: number[]
  roll(quantity?: number): number
  rollSpread(quantity?: number): number[]
  toOptions: NumericRollOptions
}

export interface CustomDie extends BaseDie {
  type: 'custom'
  isCustom: true
  faces: string[]
  roll(quantity?: number): string
  rollSpread(quantity?: number): string[]
  toOptions: CustomRollOptions
}

// -----------------------
// --- ROLL OPTIONS ---
// -----------------------

export interface NumericRollOptions extends BaseRollOptions {
  sides: number
  modifiers?: ModifierOptions
}

export interface CustomRollOptions extends BaseRollOptions {
  sides: string[]
  modifiers?: Record<string, never>
}

export type RollOptions = NumericRollOptions | CustomRollOptions

export type RequiredNumericRollParameters = Required<
  Omit<NumericRollOptions, 'modifiers'>
>

// -----------------------
// --- ROLL ARGUMENTS ---
// -----------------------

export type NumericRollArgument =
  | NumericDie
  | NumericRollOptions
  | NumericDiceNotation
  | number
  | `${number}`

export type CustomRollArgument =
  | CustomDie
  | CustomRollOptions
  | CustomDiceNotation
  | string[]

export type RollArgument = NumericRollArgument | CustomRollArgument

// -----------------------
// --- ROLL PARAMETERS ---
// -----------------------

interface BaseRollParams {
  description: string[]
}

interface NumericRollParams extends BaseRollParams {
  argument: NumericRollArgument
  options: NumericRollOptions
  die: NumericDie
  notation: NumericDiceNotation
}

interface CustomRollParams extends BaseRollParams {
  argument: CustomRollArgument
  options: CustomRollOptions
  die: CustomDie
  notation: CustomDiceNotation
}

export type RollParams = NumericRollParams | CustomRollParams

export interface DicePool {
  dicePools: Record<string, RollParams>
}

// -----------------------
// --- ROLL RESULTS ---
// -----------------------

export interface BaseRollResult {
  rawResult: (number | string)[]
  type: 'numerical' | 'custom' | 'mixed'
}

export interface NumericRollResult extends BaseRollResult {
  type: 'numerical'
  rawRolls: Record<string, number[]>
  modifiedRolls: Record<string, { rolls: number[]; total: number }>
  result: number[]
  total: number
}

export interface CustomRollResult extends BaseRollResult {
  type: 'custom'
  rawRolls: Record<string, string[]>
  modifiedRolls: Record<string, { rolls: string[]; total: string }>
  result: string[]
  total: string
}

export interface MixedRollResult extends BaseRollResult {
  type: 'mixed'
  rawRolls: Record<string, number[] | string[]>
  modifiedRolls: Record<
    string,
    { rolls: string[] | number[]; total: string | number }
  >
  result: (string | number)[]
  total: string
}

export type RollResult = NumericRollResult | CustomRollResult | MixedRollResult

// -----------------------
// --- ROLL BONUSES ---
// -----------------------

export interface NumericRollBonus {
  rolls: number[]
  simpleMathModifier: number
}

interface CustomRollBonus {
  rolls: string[]
  simpleMathModifier: number
}

export type RollBonus = NumericRollBonus | CustomRollBonus

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
