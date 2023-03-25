import { DieSides, NumberString } from './primitives'

type TypeOrArrayOfType<T> = T | T[]
export type DiceOptions<
  T extends DieSides = number,
  N extends number | 'inclusive' = 'inclusive'
> = {
  quantity?: NumberString<N>
  sides: T extends number ? NumberString<N> : (number | string)[]
}

export type RollOptions<
  T extends DieSides = number,
  N extends number | 'inclusive' = 'inclusive'
> = DiceOptions<T, N> & {
  modifiers?: T extends number ? Array<Modifier<N>> : never
}

export type CapModifier<N extends number | 'inclusive' = 'inclusive'> = Record<
  'cap',
  GreaterLessOptions<N>
>

export type DropModifier<N extends number | 'inclusive' = 'inclusive'> = Record<
  'drop',
  DropOptions<N>
> & {
  drop: DropOptions<N>
}

export type RerollModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'reroll', TypeOrArrayOfType<RerollOptions<N>>>

export type ReplaceModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'replace', TypeOrArrayOfType<ReplaceOptions<N>>>

export type UniqueModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'unique', boolean | UniqueOptions<N>>

export type ExplodeModifier = Record<'explode', boolean>
export type PlusModifier<N extends number | 'inclusive' = 'inclusive'> = Record<
  'plus',
  NumberString<N>
>
export type MinusModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'minus', NumberString<N>>

export type Modifier<N extends number | 'inclusive' = 'inclusive'> =
  | CapModifier<N>
  | DropModifier<N>
  | ReplaceModifier<N>
  | RerollModifier<N>
  | ExplodeModifier
  | UniqueModifier<N>
  | PlusModifier<N>
  | MinusModifier<N>

export type DropOptions<N extends number | 'inclusive' = 'inclusive'> = {
  highest?: NumberString<N>
  lowest?: NumberString<N>
  greaterThan?: NumberString<N>
  lessThan?: NumberString<N>
  exact?: Array<NumberString<N>>
}

export type GreaterLessOptions<N extends number | 'inclusive' = 'inclusive'> = {
  greaterThan?: NumberString<N>
  lessThan?: NumberString<N>
}

export type RerollOptions<N extends number | 'inclusive' = 'inclusive'> =
  GreaterLessOptions<N> & {
    exact?: TypeOrArrayOfType<NumberString<N>>
    maxReroll?: NumberString<N>
  }

export type ReplaceOptions<N extends number | 'inclusive' = 'inclusive'> = {
  from: NumberString<N> | GreaterLessOptions<N>
  to: NumberString<N>
}

export type UniqueOptions<N extends number | 'inclusive' = 'inclusive'> =
  Record<'notUnique', Array<NumberString<N>>>
