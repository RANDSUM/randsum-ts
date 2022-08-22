import {
  NumberString,
  NumberStringArgument,
  TypeOrArrayOfType,
} from './primitives'

export interface DropModifier<T extends NumberStringArgument = 'inclusive'>
  extends Record<'drop', DropOptions<T>> {
  drop: DropOptions<T>
}

export interface DropOptions<T extends NumberStringArgument = 'inclusive'> {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: Array<NumberString<T>>
}

export interface GreaterLessOptions<
  T extends NumberStringArgument = 'inclusive'
> {
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
}

export type CapModifier<T extends NumberStringArgument = 'inclusive'> = Record<
  'cap',
  GreaterLessOptions<T>
>

export interface RerollOptions<T extends NumberStringArgument = 'inclusive'>
  extends GreaterLessOptions<T> {
  exact?: TypeOrArrayOfType<NumberString<T>>
  maxReroll?: NumberString<T>
}

export type RerollModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'reroll', TypeOrArrayOfType<RerollOptions<T>>>

export interface ReplaceOptions<T extends NumberStringArgument = 'inclusive'> {
  from: NumberString<T> | GreaterLessOptions<T>
  to: NumberString<T>
}

export type ReplaceModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'replace', TypeOrArrayOfType<ReplaceOptions<T>>>

export type UniqueOptions<T extends NumberStringArgument = 'inclusive'> =
  Record<'notUnique', Array<NumberString<T>>>

export type UniqueModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'unique', boolean | UniqueOptions<T>>

export type ExplodeModifier = Record<'explode', boolean>

export type PlusModifier<T extends NumberStringArgument = 'inclusive'> = Record<
  'plus',
  NumberString<T>
>

export type MinusModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'minus', NumberString<T>>

export type Modifier<T extends NumberStringArgument = 'inclusive'> =
  | CapModifier<T>
  | DropModifier<T>
  | ReplaceModifier<T>
  | RerollModifier<T>
  | ExplodeModifier
  | UniqueModifier<T>
  | PlusModifier<T>
  | MinusModifier<T>
