import { D } from './D'

// Primitives

export type NumericDiceNotation = `${number}${'d' | 'D'}${number}${string}`
export type CustomDiceNotation = `${number}${'d' | 'D'}{${string}}`
export type Notation<Sides extends string | number = string | number> =
  Sides extends number ? NumericDiceNotation : CustomDiceNotation

export enum DicePoolType {
  numerical = 'numerical',
  custom = 'custom',
  mixed = 'mixed'
}

// Options

export interface RollOptions<Sides extends string | number = string | number> {
  quantity?: number
  sides: Sides extends number ? number : string[]
  modifiers?: Sides extends number ? Modifiers : Record<string, never>
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
  maxReroll?: number
}

export interface ReplaceOptions {
  from: number | GreaterLessOptions
  to: number
}

export interface UniqueOptions {
  notUnique: number[]
}

type CoreRollOptions<Sides extends string | number = string | number> = Omit<
  RollOptions<Sides>,
  'modifiers'
>

export type RequiredCoreDiceParameters<
  Sides extends string | number = string | number
> = {
  [Property in keyof CoreRollOptions<Sides>]-?: CoreRollOptions<Sides>[Property]
}

// Arguments

export type NumericalArgument =
  | `${number}`
  | number
  | D<number>
  | RollOptions<number>
  | Notation<number>

export type CustomArgument =
  | D<string[]>
  | RollOptions<string>
  | Notation<string>
  | string[]

export type RollArgument<Sides extends string | number = string | number> =
  Sides extends string ? CustomArgument : NumericalArgument

// Parameters

export interface RollParameters<
  Sides extends string | number = string | number
> {
  argument: RollArgument<Sides>
  options: RollOptions<Sides>
  die: D<Sides extends string ? string[] : number>
  notation: Notation<Sides>
  description: string[]
}

export interface DicePools<Sides extends string | number = string | number> {
  dicePools: {
    [key: string]: RollParameters<Sides>
  }
}

// Results

export interface RollResult<
  Sides extends string | number = string | number,
  DP extends DicePoolType = DicePoolType,
  Total extends Sides = Sides
> extends DicePools<Sides> {
  rawRolls: {
    [key: string]: Sides[]
  }
  modifiedRolls: {
    [key: string]: {
      rolls: Sides[]
      total: Sides
    }
  }
  result: Sides[]
  rawResult: Sides[]
  type: DP
  total: Total
}

export type NumericalRollResult = RollResult<number, DicePoolType.numerical>
export type CustomRollResult = RollResult<string, DicePoolType.custom>
export type MixedRollResult = RollResult<
  string | number,
  DicePoolType.mixed,
  string
>

export interface NotationValidationResult {
  valid: boolean
  type?: DicePoolType.custom | DicePoolType.numerical
  digested?: RollOptions
  notation?: Notation
  description: string[]
}
