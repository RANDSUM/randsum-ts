import {
  NumberString,
  NumberStringArgument,
  TypeOrArrayOfType
} from './primitives'

function isModifierType<T extends Modifier<NumberStringArgument>>(
  argument: Modifier<NumberStringArgument>,
  key: keyof T
): argument is T {
  return (argument as T)[key] !== undefined
}

export type CapModifier<T extends NumberStringArgument = 'inclusive'> = Record<
  'cap',
  GreaterLessOptions<T>
>

export const isCapModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is CapModifier<T> => isModifierType<CapModifier<T>>(modifier, 'cap')

export type DropModifier<T extends NumberStringArgument = 'inclusive'> = Record<
  'drop',
  DropOptions<T>
> & {
  drop: DropOptions<T>
}

export const isDropModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is DropModifier<T> =>
  isModifierType<DropModifier<T>>(modifier, 'drop')

export type RerollModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'reroll', TypeOrArrayOfType<RerollOptions<T>>>

export const isRerollModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is RerollModifier<T> =>
  isModifierType<RerollModifier<T>>(modifier, 'reroll')

export type ReplaceModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'replace', TypeOrArrayOfType<ReplaceOptions<T>>>

export const isReplaceModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is ReplaceModifier<T> =>
  isModifierType<ReplaceModifier<T>>(modifier, 'replace')

export const isUniqueModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is UniqueModifier<T> =>
  isModifierType<UniqueModifier<T>>(modifier, 'unique')

export type UniqueModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'unique', boolean | UniqueOptions<T>>

export type ExplodeModifier = Record<'explode', boolean>
export const isExplodeModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is ExplodeModifier =>
  isModifierType<ExplodeModifier>(modifier, 'explode')

export type PlusModifier<T extends NumberStringArgument = 'inclusive'> = Record<
  'plus',
  NumberString<T>
>
export const isPlusModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is PlusModifier<T> =>
  isModifierType<PlusModifier<T>>(modifier, 'plus')

export type MinusModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'minus', NumberString<T>>

export const isMinusModifier = <T extends NumberStringArgument>(
  modifier: Modifier<T>
): modifier is MinusModifier<T> =>
  isModifierType<MinusModifier<T>>(modifier, 'minus')

export type Modifier<T extends NumberStringArgument = 'inclusive'> =
  | CapModifier<T>
  | DropModifier<T>
  | ReplaceModifier<T>
  | RerollModifier<T>
  | ExplodeModifier
  | UniqueModifier<T>
  | PlusModifier<T>
  | MinusModifier<T>

export type DropOptions<T extends NumberStringArgument = 'inclusive'> = {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: Array<NumberString<T>>
}

export type GreaterLessOptions<T extends NumberStringArgument = 'inclusive'> = {
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
}

export type RerollOptions<T extends NumberStringArgument = 'inclusive'> =
  GreaterLessOptions<T> & {
    exact?: TypeOrArrayOfType<NumberString<T>>
    maxReroll?: NumberString<T>
  }

export type ReplaceOptions<T extends NumberStringArgument = 'inclusive'> = {
  from: NumberString<T> | GreaterLessOptions<T>
  to: NumberString<T>
}

export type UniqueOptions<T extends NumberStringArgument = 'inclusive'> =
  Record<'notUnique', Array<NumberString<T>>>
