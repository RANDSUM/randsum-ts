// Primitives

type NumericDiceNotation = `${number}${'d' | 'D'}${number}${string}`
type CustomDiceNotation = `${number}${'d' | 'D'}{${string}}`
export type Notation<S extends string | number> = S extends number
  ? NumericDiceNotation
  : CustomDiceNotation

export type DicePoolType<S extends string | number> = S extends string | number
  ? 'mixed'
  : S extends string
    ? 'custom'
    : S extends number
      ? 'numerical'
      : never

export type TotalType<S extends string | number> = S extends string | number
  ? string
  : S extends string
    ? string
    : S extends number
      ? number
      : never

// Die

export type Type<T> = T extends string[]
  ? 'custom'
  : T extends number
    ? 'numerical'
    : never
export type Faces<T> = T extends string[]
  ? T
  : T extends number
    ? number[]
    : never
export type Result<S> = S extends string[] ? string : number

export interface Die<Sides extends number | string[]> {
  sides: number
  faces: Faces<Sides>
  type: Type<Sides>
  roll: (quantity?: number) => Result<Sides>
  rollSpread: (quantity?: number) => Result<Sides>[]
  toOptions: RollOptions<Result<Sides>>
  isCustom: boolean
}

// Options

export interface RollOptions<S extends string | number> {
  quantity?: number
  sides: S extends number ? number : string[]
  modifiers?: S extends number ? Modifiers : Record<string, never>
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

type CoreRollOptions<S extends string | number> = Omit<
  RollOptions<S>,
  'modifiers'
>

export type RequiredCoreDiceParameters<S extends string | number> = {
  [Property in keyof CoreRollOptions<S>]-?: CoreRollOptions<S>[Property]
}

// Arguments

export type RollArgument<S extends string | number> = S extends string
  ? Die<string[]> | RollOptions<string> | Notation<string> | string[]
  : `${number}` | number | Die<number> | RollOptions<number> | Notation<number>

// Parameters

export interface RollParameters<S extends string | number> {
  argument: RollArgument<S>
  options: RollOptions<S>
  die: S extends string ? Die<string[]> : Die<number>
  notation: Notation<S>
  description: string[]
}

export interface DicePools<S extends string | number> {
  dicePools: {
    [key: string]: RollParameters<S>
  }
}

// Results

export interface RollResult<S extends string | number> extends DicePools<S> {
  rawRolls: {
    [key: string]: S[]
  }
  modifiedRolls: {
    [key: string]: {
      rolls: S[]
      total: S
    }
  }
  result: S[]
  rawResult: S[]
  type: DicePoolType<S>
  total: TotalType<S>
}

export type RollBonuses<S extends string | number> = {
  rolls: S[]
  simpleMathModifier: number
}

export type NumericalRollResult = RollResult<number>
export type CustomRollResult = RollResult<string>
export type MixedRollResult = RollResult<string | number>

export interface NotationValidationResult<S extends string | number> {
  valid: boolean
  type?: 'custom' | 'numerical'
  digested?: RollOptions<S>
  notation?: Notation<S>
  description: string[]
}
