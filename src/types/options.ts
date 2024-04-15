export type TypeOrArrayOfType<T> = T | T[]

export type CustomSides = (string | number)[]

export interface DiceOptions<D extends string | number = number> {
  quantity?: number
  sides: D extends number ? number : CustomSides
}

export interface RollOptions<D extends string | number = number>
  extends DiceOptions<D> {
  modifiers?: D extends number ? Modifiers : never
}

export type Modifiers = {
  cap?: GreaterLessOptions
  drop?: DropOptions
  replace?: TypeOrArrayOfType<ReplaceOptions>
  reroll?: TypeOrArrayOfType<RerollOptions>
  unique?: boolean | UniqueOptions
  explode?: boolean
  plus?: number
  minus?: number
}

export interface DropOptions {
  highest?: number
  lowest?: number
  greaterThan?: number
  lessThan?: number
  exact?: number[]
}

export interface GreaterLessOptions {
  greaterThan?: number
  lessThan?: number
}

export interface RerollOptions extends GreaterLessOptions {
  exact?: TypeOrArrayOfType<number>
  maxReroll?: number
}

export interface ReplaceOptions {
  from: number | GreaterLessOptions
  to: number
}

export interface UniqueOptions {
  notUnique: number[]
}
