// --- Primitives ---

export type NumericalDiceNotation = `${number}${'d' | 'D'}${number}${string}`
export type CustomDiceNotation = `${number}${'d' | 'D'}{${string}}`

export type Notation = NumericalDiceNotation | CustomDiceNotation
export type DieType = 'numerical' | 'custom'
export type DicePoolType = DieType | 'mixed'
export type Faces = number[] | string[]
export type Result = number | string

// Core Die
export interface CoreDie {
  sides: number
  isCustom: boolean
}

// Die
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

// Options
export interface BaseRollOptions {
  sides: number | string[]
  quantity?: number
}

export interface NumericalRollOptions extends BaseRollOptions {
  sides: number
  modifiers?: Modifiers
}

export interface CustomRollOptions extends BaseRollOptions {
  sides: string[]
  modifiers?: Record<string, never>
}

export type RollOptions = NumericalRollOptions | CustomRollOptions

// Modifiers
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

// Constraint Options
export interface GreaterLessOptions {
  greaterThan?: number
  lessThan?: number
}

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

// Core Roll Options
type CoreRollOptions = Omit<NumericalRollOptions, 'modifiers'>
export type RequiredCoreNumericalDiceParameters = {
  [Property in keyof CoreRollOptions]-?: CoreRollOptions[Property]
}

// Arguments
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

// Parameters
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

// Dice Pools
export interface DicePools {
  dicePools: Record<string, RollParameters>
}

// Results
export interface BaseRollResult extends DicePools {
  rawResult: (number | string)[]
  type: DicePoolType
}

export interface NumericalRollResult extends BaseRollResult {
  rawRolls: Record<string, number[]>
  modifiedRolls: Record<
    string,
    {
      rolls: number[]
      total: number
    }
  >
  result: number[]
  total: number
}

export interface CustomRollResult extends BaseRollResult {
  rawRolls: Record<string, string[]>
  modifiedRolls: Record<
    string,
    {
      rolls: string[]
      total: string
    }
  >
  result: string[]
  total: string
}

export interface MixedRollResult extends BaseRollResult {
  rawRolls: Record<string, string[] | number[]>
  modifiedRolls: Record<
    string,
    | {
        rolls: string[]
        total: string
      }
    | {
        rolls: number[]
        total: number
      }
  >
  result: string[]
  total: string
}

export type RollResult =
  | NumericalRollResult
  | CustomRollResult
  | MixedRollResult

// Roll Bonuses
export interface NumericalRollBonuses {
  rolls: number[]
  simpleMathModifier: number
}

export interface CustomRollBonuses {
  rolls: string[]
  simpleMathModifier: number
}

export type RollBonuses = NumericalRollBonuses | CustomRollBonuses

// Notation Validation Result

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
  description: string[]
}

export interface CustomNotationValidationResult
  extends CoreNotationValidationResult {
  valid: true
  type: 'custom'
  digested: CustomRollOptions
  notation: CustomDiceNotation
  description: string[]
}

export interface InvalidNotationValidationResult
  extends CoreNotationValidationResult {
  valid: false
}
export type NotationValidationResult =
  | NumericalNotationValidationResult
  | CustomNotationValidationResult
  | InvalidNotationValidationResult
