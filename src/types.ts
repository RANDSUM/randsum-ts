import SingleDie from './Die/single-die'

export type DiceNotationWithNumericSides = `${number}${
  | 'd'
  | 'D'}${number}${string}`

export type DiceNotationWithCustomSides = `${number}${'d' | 'D'}{${string}}`

export type DiceNotation<D extends string | number> = D extends number
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

export enum DicePoolType {
  standard = 'standard',
  custom = 'custom',
  mixed = 'mixed'
}

export type TypeOrArrayOfType<T> = T | T[]

export interface DicePoolOptions<D extends string | number> {
  quantity?: number
  sides: D extends number ? number : string[]
  modifiers?: D extends number ? Modifiers : {}
}

export type Modifiers = {
  cap?: GreaterLessOptions
  drop?: DropOptions
  replace?: TypeOrArrayOfType<ReplaceOptions>
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

export type CoreRollArgument =
  | string
  | number
  | DicePoolOptions<string>
  | DicePoolOptions<number>
  | DiceNotation<number>
  | DiceNotation<string>
  | (number | string)[]

export type RollArgument = TypeOrArrayOfType<CoreRollArgument> | undefined

type RawDiceParams<D extends string | number> = Omit<
  DicePoolOptions<D>,
  'modifiers'
>

export type DiceParameters<D extends string | number> = {
  [Property in keyof RawDiceParams<D>]-?: RawDiceParams<D>[Property]
}

export interface DicePoolParameters<D extends string | number> {
  argument: RollArgument
  options: DicePoolOptions<D>
  die: SingleDie<D>
  notation: DiceNotation<D>
  description: string[]
}

export interface RollParameters {
  dicePools: {
    [key: string]: DicePoolParameters<string> | DicePoolParameters<number>
  }
}

export interface RollResult extends RollParameters {
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
  type: DicePoolType
  total: number
}
