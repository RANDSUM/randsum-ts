import { NumberString, NumberStringArgument, TypeOrArrayOfType } from './primitives'

export interface DropModifier<T extends NumberStringArgument = 'inclusive'> extends Record<'drop', DropOptions<T>> {
  drop: DropOptions<T>
}

export interface DropOptions<T extends NumberStringArgument = 'inclusive'> {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: Array<NumberString<T>>
}

export interface GreaterLessOptions<T extends NumberStringArgument = 'inclusive'> {
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
}

export interface CapModifier<T extends NumberStringArgument = 'inclusive'> extends Record<'cap', GreaterLessOptions<T>> { }

export interface RerollOptions<T extends NumberStringArgument = 'inclusive'> extends GreaterLessOptions<T> {
  exact?: TypeOrArrayOfType<NumberString<T>>
  maxReroll?: NumberString<T>
}

export interface RerollModifier<T extends NumberStringArgument = 'inclusive'> extends Record<'reroll', TypeOrArrayOfType<RerollOptions<T>>> { }

export interface ReplaceOptions<T extends NumberStringArgument = 'inclusive'> {
  from: NumberString<T> | GreaterLessOptions<T>
  to: NumberString<T>
}

export interface ReplaceModifier<T extends NumberStringArgument = 'inclusive'> extends Record<'replace', TypeOrArrayOfType<ReplaceOptions<T>>> { }

export interface UniqueOptions<T extends NumberStringArgument = 'inclusive'> extends Record<'notUnique', Array<NumberString<T>>> { }

export interface UniqueModifier<T extends NumberStringArgument = 'inclusive'> extends Record<'unique', boolean | UniqueOptions<T>> { }

export interface ExplodeModifier extends Record<'explode', boolean> { }

export interface PlusModifier<T extends NumberStringArgument = 'inclusive'> extends Record<'plus', NumberString<T>> { }

export interface MinusModifier<T extends NumberStringArgument = 'inclusive'> extends Record<'minus', NumberString<T>> { }

export type Modifier<T extends NumberStringArgument = 'inclusive'> =
  | CapModifier<T>
  | DropModifier<T>
  | ReplaceModifier<T>
  | RerollModifier<T>
  | ExplodeModifier
  | UniqueModifier<T>
  | PlusModifier<T>
  | MinusModifier<T>
