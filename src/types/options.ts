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

const isModifierType = <M extends Modifier<number | 'inclusive'>>(
  argument: Modifier<number | 'inclusive'>,
  key: keyof M
): argument is M => (argument as M)[key] !== undefined

export type CapModifier<N extends number | 'inclusive' = 'inclusive'> = Record<
  'cap',
  GreaterLessOptions<N>
>

export const isCapModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is CapModifier<N> => isModifierType<CapModifier<N>>(modifier, 'cap')

export type DropModifier<N extends number | 'inclusive' = 'inclusive'> = Record<
  'drop',
  DropOptions<N>
> & {
  drop: DropOptions<N>
}

export const isDropModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is DropModifier<N> =>
  isModifierType<DropModifier<N>>(modifier, 'drop')

export type RerollModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'reroll', TypeOrArrayOfType<RerollOptions<N>>>

export const isRerollModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is RerollModifier<N> =>
  isModifierType<RerollModifier<N>>(modifier, 'reroll')

export type ReplaceModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'replace', TypeOrArrayOfType<ReplaceOptions<N>>>

export const isReplaceModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is ReplaceModifier<N> =>
  isModifierType<ReplaceModifier<N>>(modifier, 'replace')

export const isUniqueModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is UniqueModifier<N> =>
  isModifierType<UniqueModifier<N>>(modifier, 'unique')

export type UniqueModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'unique', boolean | UniqueOptions<N>>

export type ExplodeModifier = Record<'explode', boolean>
export const isExplodeModifier = (
  modifier: Modifier<number | 'inclusive'>
): modifier is ExplodeModifier =>
  isModifierType<ExplodeModifier>(modifier, 'explode')

export type PlusModifier<N extends number | 'inclusive' = 'inclusive'> = Record<
  'plus',
  NumberString<N>
>
export const isPlusModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is PlusModifier<N> =>
  isModifierType<PlusModifier<N>>(modifier, 'plus')

export type MinusModifier<N extends number | 'inclusive' = 'inclusive'> =
  Record<'minus', NumberString<N>>

export const isMinusModifier = <N extends number | 'inclusive'>(
  modifier: Modifier<N>
): modifier is MinusModifier<N> =>
  isModifierType<MinusModifier<N>>(modifier, 'minus')

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
