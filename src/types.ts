export type StandardDie = 'standard'
export type CustomSidesDie = 'customSides'
export type DieType = StandardDie | CustomSidesDie

type DiceNotationWithNumericSides = `${number}${'d' | 'D'}${number}${string}`
type CustomDiceSidesNotation = `{${string}}`
type DiceNotationWithCustomSides = `${number}${
  | 'd'
  | 'D'}${CustomDiceSidesNotation}`

export type DiceNotation<N extends DieType = DieType> = N extends StandardDie
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

type NumberStringArgument = number | 'inclusive'

export type NumberString<T extends NumberStringArgument = 'inclusive'> =
  T extends 'inclusive' ? number | `${number}` : number

type CustomSides = Array<number | string>

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

type TypeOrArrayOfType<T> = T | T[]
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

type StandardRandsumOptions<T extends NumberStringArgument = 'inclusive'> = {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}

export type InternalRollParameters = StandardRandsumOptions<number> & {
  modifiers: Array<Modifier<number>>
  quantity: number
  faces?: CustomSides
}

export type RollParameters = InternalRollParameters & {
  initialRolls: number[]
  rollOne: () => number
}

type BaseRollResult = {
  rollParameters: RollParameters
  arguments: [RandsumOptions | DiceNotation | NumberString | undefined]
}

type StandardRollResult = BaseRollResult & {
  total: number
  rolls: number[]
}

type CustomSidesRollResult = BaseRollResult & {
  total: string
  rolls: CustomSides
}

export type RollResult<N extends DieType = DieType> = N extends StandardDie
  ? StandardRollResult
  : CustomSidesRollResult

type CustomSidesRandsumOptions = Omit<
  StandardRandsumOptions,
  'sides' | 'modifiers'
> & {
  sides: CustomSides
}

export type RandsumOptions<N extends DieType = DieType> = N extends StandardDie
  ? StandardRandsumOptions
  : CustomSidesRandsumOptions

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

export const isCapModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is CapModifier<NumberStringArgument> =>
  isModifierType<CapModifier<NumberStringArgument>>(modifier, 'cap')

export type DropModifier<T extends NumberStringArgument = 'inclusive'> = Record<
  'drop',
  DropOptions<T>
> & {
  drop: DropOptions<T>
}

export const isDropModifier = (
  modifier: Modifier<NumberStringArgument>
): modifier is DropModifier<NumberStringArgument> =>
  isModifierType<DropModifier<NumberStringArgument>>(modifier, 'drop')

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
