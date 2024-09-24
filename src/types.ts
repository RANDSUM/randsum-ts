import { D } from './D'

// Primitives

export type RandsumNumericDiceNotation =
  `${number}${'d' | 'D'}${number}${string}`
export type RandsumCustomDiceNotation = `${number}${'d' | 'D'}{${string}}`

export type RandsumNotation<Sides extends string | number = string | number> =
  Sides extends number ? RandsumNumericDiceNotation : RandsumCustomDiceNotation

export enum DicePoolType {
  numerical = 'numerical',
  custom = 'custom',
  mixed = 'mixed'
}

// Options

export interface RandsumRollOptions<
  Sides extends string | number = string | number
> {
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
  RandsumRollOptions<Sides>,
  'modifiers'
>

export type RequiredCoreDiceParameters<
  Sides extends string | number = string | number
> = {
  [Property in keyof CoreRollOptions<Sides>]-?: CoreRollOptions<Sides>[Property]
}

// Arguments

export type RandsumNumericalArgument =
  | `${number}`
  | number
  | D<number>
  | RandsumRollOptions<number>
  | RandsumNotation<number>

export type RandsumCustomArgument =
  | D<string[]>
  | RandsumRollOptions<string>
  | RandsumNotation<string>
  | string[]

export type RandsumRollArgument<
  Sides extends string | number = string | number
> = Sides extends string ? RandsumCustomArgument : RandsumNumericalArgument

// Parameters

export interface RandsumRollParameters<
  Sides extends string | number = string | number
> {
  argument: RandsumRollArgument<Sides>
  options: RandsumRollOptions<Sides>
  die: D<Sides extends string ? string[] : number>
  notation: RandsumNotation<Sides>
  description: string[]
}

export interface DicePools<Sides extends string | number = string | number> {
  dicePools: {
    [key: string]: RandsumRollParameters<Sides>
  }
}

// Results

export interface RandsumRollResult<
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
  result: Sides[][]
  rawResult: Sides[][]
  type: DP
  total: Total
}

export type RandsumNotationValidationResult<
  Valid extends boolean = boolean,
  DP extends DicePoolType = DicePoolType,
  Sides extends string | number = string | number
> = Valid extends true
  ? {
      valid: Valid
      type: DP
      digested: RandsumRollOptions<Sides>
      notation: RandsumNotation<Sides>
      description: string[]
    }
  : {
      valid: Valid
      description: []
    }
