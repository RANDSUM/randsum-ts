import { Die } from './Dice/die'

// Primitives
type DiceNotationWithNumericSides = `${number}${'d' | 'D'}${number}${string}`
type DiceNotationWithCustomSides = `${number}${'d' | 'D'}{${string}}`

export type RandsumNotation<D extends string | number = string | number> =
  D extends number ? DiceNotationWithNumericSides : DiceNotationWithCustomSides

export enum DicePoolType {
  standard = 'standard',
  custom = 'custom',
  mixed = 'mixed'
}

// Options
export interface RandsumRollOptions<
  D extends string | number = string | number
> {
  quantity?: number
  sides: D extends number ? number : string[]
  modifiers?: D extends number ? Modifiers : Record<string, never>
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

type CoreRollOptions<D extends string | number = string | number> = Omit<
  RandsumRollOptions<D>,
  'modifiers'
>

export type RequiredCoreDiceParameters<
  D extends string | number = string | number
> = {
  [Property in keyof CoreRollOptions<D>]-?: CoreRollOptions<D>[Property]
}

// Arguments

export type CoreRollArgument =
  | string
  | number
  | RandsumRollOptions
  | RandsumNotation
  | (number | string)[]

export type RandsumRollArgument =
  | CoreRollArgument
  | CoreRollArgument[]
  | undefined

// Parameters

export interface RandsumRollParameters<
  D extends string | number = string | number
> {
  argument: RandsumRollArgument
  options: RandsumRollOptions<D>
  die: Die<D>
  notation: RandsumNotation<D>
  description: string[]
}
export interface DicePools {
  dicePools: {
    [key: string]: RandsumRollParameters
  }
}

// Results

export interface RandsumRollResult extends DicePools {
  rawRolls: {
    [key: string]: string[] | number[]
  }
  modifiedRolls: {
    [key: string]: {
      rolls: string[] | number[]
      total: number
    }
  }
  result: (string | number)[][]
  rawResult: (string | number)[][]
  type: DicePoolType
  total: number
}

export interface RandsumNotationValidationResult {
  valid: boolean
  type?: DicePoolType.custom | DicePoolType.standard
  digested?: RandsumRollOptions
  notation?: RandsumNotation
  description: string[]
}
