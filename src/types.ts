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

/**
 * Base type for dice implementations
 * T represents the constructor argument type (number | string[])
 */
export type BaseD<T extends number | string[]> = {
  /** Number of sides on the die */
  readonly sides: number

  /** Array of possible face values */
  readonly faces: T extends number ? number[] : string[]

  /** Type of die */
  readonly type: T extends number ? 'numerical' : 'custom'

  /** Whether this is a custom-faced die */
  readonly isCustom: T extends number ? false : true

  /**
   * Roll the die
   * @param quantity - Number of dice to roll
   * @returns For numerical dice: sum of rolls; For custom dice: comma-separated results
   */
  roll(quantity?: number): T extends number ? number : string

  /**
   * Roll the die and return individual results
   * @param quantity - Number of dice to roll
   * @returns Array of individual roll results
   */
  rollSpread(quantity?: number): T extends number ? number[] : string[]
  toOptions: T extends number ? NumericRollOptions : CustomRollOptions
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
  | BaseD<number>
  | NumericRollOptions
  | NumericDiceNotation
  | number
  | `${number}`

export type CustomRollArgument =
  | BaseD<string[]>
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
  die: BaseD<number>
  notation: NumericDiceNotation
}

export interface CustomRollParams extends BaseRollParams {
  argument: CustomRollArgument
  options: CustomRollOptions
  die: BaseD<string[]>
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
