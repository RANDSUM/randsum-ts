import { DieSides, NumberString } from './primitives'

type TypeOrArrayOfType<T> = T | T[]
export type DiceOptions<T extends DieSides> = {
  quantity?: NumberString<'inclusive'>
  sides: T extends number ? NumberString<'inclusive'> : (number | string)[]
}

export type RollOptions<T extends DieSides> = DiceOptions<T> & {
  modifiers?: T extends number ? Array<Modifier<'inclusive'>> : never
}

export type CapModifier<N extends number | 'inclusive'> = Record<
  'cap',
  GreaterLessOptions<N>
>

export type DropModifier<N extends number | 'inclusive'> = Record<
  'drop',
  DropOptions<N>
> & {
  drop: DropOptions<N>
}

export type RerollModifier<N extends number | 'inclusive'> = Record<
  'reroll',
  TypeOrArrayOfType<RerollOptions<N>>
>

export type ReplaceModifier<N extends number | 'inclusive'> = Record<
  'replace',
  TypeOrArrayOfType<ReplaceOptions<N>>
>

export type UniqueModifier<N extends number | 'inclusive'> = Record<
  'unique',
  boolean | UniqueOptions<N>
>

export type ExplodeModifier = Record<'explode', boolean>
export type PlusModifier<N extends number | 'inclusive'> = Record<
  'plus',
  NumberString<N>
>
export type MinusModifier<N extends number | 'inclusive'> = Record<
  'minus',
  NumberString<N>
>

export type Modifier<N extends number | 'inclusive'> =
  | CapModifier<N>
  | DropModifier<N>
  | ReplaceModifier<N>
  | RerollModifier<N>
  | ExplodeModifier
  | UniqueModifier<N>
  | PlusModifier<N>
  | MinusModifier<N>

export type DropOptions<N extends number | 'inclusive'> = {
  highest?: NumberString<N>
  lowest?: NumberString<N>
  greaterThan?: NumberString<N>
  lessThan?: NumberString<N>
  exact?: Array<NumberString<N>>
}

export type GreaterLessOptions<N extends number | 'inclusive'> = {
  greaterThan?: NumberString<N>
  lessThan?: NumberString<N>
}

export type RerollOptions<N extends number | 'inclusive'> =
  GreaterLessOptions<N> & {
    exact?: TypeOrArrayOfType<NumberString<N>>
    maxReroll?: NumberString<N>
  }

export type ReplaceOptions<N extends number | 'inclusive'> = {
  from: NumberString<N> | GreaterLessOptions<N>
  to: NumberString<N>
}

export type UniqueOptions<N extends number | 'inclusive'> = Record<
  'notUnique',
  Array<NumberString<N>>
>
