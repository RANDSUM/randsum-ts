// --------------------------
// --- NOTATION & STRINGS ---
// --------------------------

// Old: NumericDiceNotation
export type NumericDiceNotation = `${number}${'d' | 'D'}${number}${string}`
// Old: CustomDiceNotation
export type CustomDiceNotation = `${number}${'d' | 'D'}{${string}}`
// Old: Notation
export type DiceNotation = NumericDiceNotation | CustomDiceNotation

// -----------------------
// --- OPTIONS & MODIFIERS ---
// -----------------------

// Old: BaseRollOptions
export interface DiceOptions {
  quantity?: number
}

// Old: ComparisonOptions
export interface ComparisonOptions {
  greaterThan?: number
  lessThan?: number
}

// Old: DropOptions
export interface DropOptions extends ComparisonOptions {
  highest?: number
  lowest?: number
  exact?: number[]
}

// Old: RerollOptions
export interface RerollOptions extends ComparisonOptions {
  exact?: number[]
  max?: number
}

// Old: ReplaceOptions
export interface ReplaceOptions {
  from: number | ComparisonOptions
  to: number
}

// Old: UniqueOptions
export interface UniqueOptions {
  notUnique: number[]
}

// Old: ModifierOptions
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

// Old: CoreDie
export interface BaseDie {
  sides: number
  isCustom: boolean
}

// Old: NumericalDie
export interface NumericDie extends BaseDie {
  type: 'numerical'
  isCustom: false
  faces: number[]
  roll(quantity?: number): number
  rollSpread(quantity?: number): number[]
  toOptions: NumericRollOptions
}

// Old: CustomDie
export interface CustomDie extends BaseDie {
  type: 'custom'
  isCustom: true
  faces: string[]
  roll(quantity?: number): string
  rollSpread(quantity?: number): string[]
  toOptions: CustomRollOptions
}

// Old: Die
export type Die = NumericDie | CustomDie

// -----------------------
// --- ROLL OPTIONS ---
// -----------------------

// Old: NumericalRollOptions
export interface NumericRollOptions extends DiceOptions {
  sides: number
  modifiers?: ModifierOptions
}

// Old: CustomRollOptions
export interface CustomRollOptions extends DiceOptions {
  sides: string[]
  modifiers?: Record<string, never>
}

// Old: RollOptions
export type RollOptions = NumericRollOptions | CustomRollOptions

// Old: RequiredNumericalRollParameters
export type RequiredNumericRollParameters = Required<
  Omit<NumericRollOptions, 'modifiers'>
>

// -----------------------
// --- ROLL ARGUMENTS ---
// -----------------------

// Old: NumericRollArgument
export type NumericRollArgument =
  | NumericDie
  | NumericRollOptions
  | NumericDiceNotation
  | number
  | `${number}`

// Old: CustomRollArgument
export type CustomRollArgument =
  | CustomDie
  | CustomRollOptions
  | CustomDiceNotation
  | string[]

// Old: RollArgument
export type RollArgument = NumericRollArgument | CustomRollArgument

// -----------------------
// --- ROLL PARAMETERS ---
// -----------------------

// Old: BaseRollParameters
export interface BaseRollParams {
  description: string[]
}

// Old: NumericalRollParameters
export interface NumericRollParams extends BaseRollParams {
  argument: NumericRollArgument
  options: NumericRollOptions
  die: NumericDie
  notation: NumericDiceNotation
}

// Old: CustomRollParameters
export interface CustomRollParams extends BaseRollParams {
  argument: CustomRollArgument
  options: CustomRollOptions
  die: CustomDie
  notation: CustomDiceNotation
}

// Old: RollParameters
export type RollParams = NumericRollParams | CustomRollParams

// Old: DicePools
export interface DicePool {
  dicePools: Record<string, RollParams>
}

// -----------------------
// --- ROLL RESULTS ---
// -----------------------

// Old: BaseRollResult
export interface BaseRollResult {
  rawResult: (number | string)[]
  type: 'numerical' | 'custom' | 'mixed'
}

// Old: NumericalRollResult
export interface NumericRollResult extends BaseRollResult {
  type: 'numerical'
  rawRolls: Record<string, number[]>
  modifiedRolls: Record<string, { rolls: number[]; total: number }>
  result: number[]
  total: number
}

// Old: CustomRollResult
export interface CustomRollResult extends BaseRollResult {
  type: 'custom'
  rawRolls: Record<string, string[]>
  modifiedRolls: Record<string, { rolls: string[]; total: string }>
  result: string[]
  total: string
}

// Old: MixedRollResult
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

// Old: RollResult
export type RollResult = NumericRollResult | CustomRollResult | MixedRollResult

// -----------------------
// --- ROLL BONUSES ---
// -----------------------

// Old: NumericalRollBonuses
export interface NumericRollBonus {
  rolls: number[]
  simpleMathModifier: number
}

// Old: CustomRollBonuses
export interface CustomRollBonus {
  rolls: string[]
  simpleMathModifier: number
}

// Old: RollBonuses
export type RollBonus = NumericRollBonus | CustomRollBonus

// -----------------------
// --- VALIDATION ---
// -----------------------

// Old: CoreNotationValidationResult
export interface BaseValidationResult {
  valid: boolean
  description: string[]
}

// Old: NumericValidationResult
export interface NumericValidationResult extends BaseValidationResult {
  valid: true
  type: 'numerical'
  digested: NumericRollOptions
  notation: NumericDiceNotation
}

// Old: CustomNotationValidationResult
export interface CustomValidationResult extends BaseValidationResult {
  valid: true
  type: 'custom'
  digested: CustomRollOptions
  notation: CustomDiceNotation
}

// Old: InvalidNotationValidationResult
export interface InvalidValidationResult extends BaseValidationResult {
  valid: false
}

// Old: NotationValidationResult
export type ValidationResult =
  | NumericValidationResult
  | CustomValidationResult
  | InvalidValidationResult
