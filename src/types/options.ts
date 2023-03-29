import { DieSides, InclusiveOrNumber, NumberString } from './primitives'

type TypeOrArrayOfType<T> = T | T[]

export type CustomSidesOption = (string | number)[]
export interface DiceOptions<D extends DieSides> {
  quantity?: NumberString<'inclusive'>
  sides: D extends number ? NumberString<'inclusive'> : CustomSidesOption
}

export interface RollOptions<D extends DieSides> extends DiceOptions<D> {
  modifiers?: D extends number ? Array<Modifier<'inclusive'>> : never
}

export interface CapModifier<N extends InclusiveOrNumber> {
  cap: GreaterLessOptions<N>
}

export interface DropModifier<N extends InclusiveOrNumber> {
  drop: DropOptions<N>
}

export interface RerollModifier<N extends InclusiveOrNumber> {
  reroll: TypeOrArrayOfType<RerollOptions<N>>
}

export interface ReplaceModifier<N extends InclusiveOrNumber> {
  replace: TypeOrArrayOfType<ReplaceOptions<N>>
}

export interface UniqueModifier<N extends InclusiveOrNumber> {
  unique: boolean | UniqueOptions<N>
}

export interface ExplodeModifier {
  explode: boolean
}

export interface PlusModifier<N extends InclusiveOrNumber> {
  plus: NumberString<N>
}
export interface MinusModifier<N extends InclusiveOrNumber> {
  minus: NumberString<N>
}

export type Modifier<N extends InclusiveOrNumber> =
  | CapModifier<N>
  | DropModifier<N>
  | ReplaceModifier<N>
  | RerollModifier<N>
  | ExplodeModifier
  | UniqueModifier<N>
  | PlusModifier<N>
  | MinusModifier<N>

export interface DropOptions<N extends InclusiveOrNumber> {
  highest?: NumberString<N>
  lowest?: NumberString<N>
  greaterThan?: NumberString<N>
  lessThan?: NumberString<N>
  exact?: Array<NumberString<N>>
}

export interface GreaterLessOptions<N extends InclusiveOrNumber> {
  greaterThan?: NumberString<N>
  lessThan?: NumberString<N>
}

export interface RerollOptions<N extends InclusiveOrNumber>
  extends GreaterLessOptions<N> {
  exact?: TypeOrArrayOfType<NumberString<N>>
  maxReroll?: NumberString<N>
}

export interface ReplaceOptions<N extends InclusiveOrNumber> {
  from: NumberString<N> | GreaterLessOptions<N>
  to: NumberString<N>
}

export interface UniqueOptions<N extends InclusiveOrNumber> {
  notUnique: Array<NumberString<N>>
}
