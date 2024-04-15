export type TypeOrArrayOfType<T> = T | T[]

export type CustomSides = (string | number)[]

export interface DiceOptions<D extends string | number = number> {
  quantity?: number
  sides: D extends number ? number : CustomSides
}

export interface RollOptions<D extends string | number = number>
  extends DiceOptions<D> {
  modifiers?: D extends number ? Modifier[] : never
}

export interface CapModifier {
  cap: GreaterLessOptions
}

export interface DropModifier {
  drop: DropOptions
}

export interface RerollModifier {
  reroll: TypeOrArrayOfType<RerollOptions>
}

export interface ReplaceModifier {
  replace: TypeOrArrayOfType<ReplaceOptions>
}

export interface UniqueModifier {
  unique: boolean | UniqueOptions
}

export interface ExplodeModifier {
  explode: boolean
}

export interface PlusModifier {
  plus: number
}
export interface MinusModifier {
  minus: number
}

export type Modifier =
  | CapModifier
  | DropModifier
  | ReplaceModifier
  | RerollModifier
  | ExplodeModifier
  | UniqueModifier
  | PlusModifier
  | MinusModifier

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
