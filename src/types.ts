// --- Primitives ---

export type NumericalDiceNotation = `${number}${'d' | 'D'}${number}${string}`
export type CustomDiceNotation = `${number}${'d' | 'D'}{${string}}`
export type Notation = NumericalDiceNotation | CustomDiceNotation

// --- Core Types ---

export interface CoreDie {
  type: 'numerical' | 'custom'
  sides: number
  isCustom: boolean
}

export interface BaseRollOptions {
  quantity?: number
}

export interface GreaterLessOptions {
  greaterThan?: number
  lessThan?: number
}

// --- Modifier Types ---

export interface DropOptions extends GreaterLessOptions {
  highest?: number
  lowest?: number
  exact?: number[]
}

export interface RerollOptions extends GreaterLessOptions {
  exact?: number[]
  max?: number
}

export interface ReplaceOptions {
  from: number | GreaterLessOptions
  to: number
}

export interface UniqueOptions {
  notUnique: number[]
}

export type Modifiers = {
  cap?: GreaterLessOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: RerollOptions
  unique?: boolean | UniqueOptions
  explode?: boolean
  plus?: number
  minus?: number
}

// --- Die Types ---

export interface NumericalDie extends CoreDie {
  type: 'numerical'
  faces: number[]
  roll: (quantity?: number) => number
  rollSpread: (quantity?: number) => number[]
  toOptions: NumericalRollOptions
}

export interface CustomDie extends CoreDie {
  type: 'custom'
  faces: string[]
  roll: (quantity?: number) => string
  rollSpread: (quantity?: number) => string[]
  toOptions: CustomRollOptions
}

export type Die = NumericalDie | CustomDie

// --- Roll Option Types ---

export interface NumericalRollOptions extends BaseRollOptions {
  sides: number
  modifiers?: Modifiers
}

export interface CustomRollOptions extends BaseRollOptions {
  sides: string[]
  modifiers?: Record<string, never>
}

export type RollOptions = NumericalRollOptions | CustomRollOptions

// --- Argument Types ---

export type NumericalRollArgument =
  | NumericalDie
  | NumericalRollOptions
  | NumericalDiceNotation
  | number
  | `${number}`

export type CustomRollArgument =
  | CustomDie
  | CustomRollOptions
  | CustomDiceNotation
  | string[]

export type RollArgument = NumericalRollArgument | CustomRollArgument

// --- Parameter Types ---

export interface BaseRollParameters {
  description: string[]
}

export interface NumericalRollParameters extends BaseRollParameters {
  argument: NumericalRollArgument
  options: NumericalRollOptions
  die: NumericalDie
  notation: NumericalDiceNotation
}

export interface CustomRollParameters extends BaseRollParameters {
  argument: CustomRollArgument
  options: CustomRollOptions
  die: CustomDie
  notation: CustomDiceNotation
}

export type RollParameters = NumericalRollParameters | CustomRollParameters

// --- Result Types ---

export interface BaseRollResult {
  rawResult: (number | string)[]
  type: 'numerical' | 'custom' | 'mixed'
}

export interface NumericalRollResult extends BaseRollResult {
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
  rawRolls: Record<string, number[]> | Record<string, string[]>
  modifiedRolls: Record<
    string,
    { rolls: string[]; total: string } | { rolls: number[]; total: number }
  >
  result: (string | number)[]
  total: string | number
}

export type RollResult =
  | NumericalRollResult
  | CustomRollResult
  | MixedRollResult

// --- Bonus Types ---

export interface NumericalRollBonuses {
  rolls: number[]
  simpleMathModifier: number
}

export interface CustomRollBonuses {
  rolls: string[]
  simpleMathModifier: number
}

export type RollBonuses = NumericalRollBonuses | CustomRollBonuses

// --- Notation Validation Types ---

export interface CoreNotationValidationResult {
  valid: boolean
  description: string[]
}

export interface NumericalNotationValidationResult
  extends CoreNotationValidationResult {
  valid: true
  type: 'numerical'
  digested: NumericalRollOptions
  notation: NumericalDiceNotation
}

export interface CustomNotationValidationResult
  extends CoreNotationValidationResult {
  valid: true
  type: 'custom'
  digested: CustomRollOptions
  notation: CustomDiceNotation
}

export interface InvalidNotationValidationResult
  extends CoreNotationValidationResult {
  valid: false
}

export type NotationValidationResult =
  | NumericalNotationValidationResult
  | CustomNotationValidationResult
  | InvalidNotationValidationResult

// --- Dice Pools ---

export interface DicePools {
  dicePools: Record<string, RollParameters>
}

export type RequiredNumericalRolllParameters = Required<
  Omit<NumericalRollOptions, 'modifiers'>
>
