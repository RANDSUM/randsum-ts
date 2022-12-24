export type StandardDie = 'standard'
export type CustomSidesDie = 'customSides'
export type DieType = StandardDie | CustomSidesDie

export type DiceNotationWithNumericSides = `${number}${
  | 'd'
  | 'D'}${number}${string}`

export type CustomDiceSidesNotation = `{${string}}`
export type DiceNotationWithCustomSides = `${number}${
  | 'd'
  | 'D'}${CustomDiceSidesNotation}`

export type DiceNotation<N extends DieType = DieType> = N extends StandardDie
  ? DiceNotationWithNumericSides
  : DiceNotationWithCustomSides

export type NumberStringArgument = number | 'inclusive'

export type TypeOrArrayOfType<T> = T | T[]

export type NumberString<T extends NumberStringArgument = 'inclusive'> =
  T extends 'inclusive' ? number | `${number}` : number

export type Randomizer = (sides: number) => number

export type CustomSides = Array<number | string>

export type Detailed = true
export type Simple = false
export type DetailedType = Detailed | Simple

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

export interface RerollOptions<T extends NumberStringArgument = 'inclusive'>
  extends GreaterLessOptions<T> {
  exact?: TypeOrArrayOfType<NumberString<T>>
  maxReroll?: NumberString<T>
}
export interface ReplaceOptions<T extends NumberStringArgument = 'inclusive'> {
  from: NumberString<T> | GreaterLessOptions<T>
  to: NumberString<T>
}

export type CapModifier<T extends NumberStringArgument = 'inclusive'> = Record<
  'cap',
  GreaterLessOptions<T>
>
export interface DropModifier<T extends NumberStringArgument = 'inclusive'>
  extends Record<'drop', DropOptions<T>> {
  drop: DropOptions<T>
}

export type RerollModifier<T extends NumberStringArgument = 'inclusive'> =
  Record<'reroll', TypeOrArrayOfType<RerollOptions<T>>>

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

export interface UserOptions<D extends DetailedType> {
  detailed?: D
  randomizer?: Randomizer
}

export interface RollOptions<T extends NumberStringArgument = 'inclusive'> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}

export type StandardRandsumOptions<D extends DetailedType> = RollOptions &
  UserOptions<D>
export type CustomSidesRandsumOptions<D extends DetailedType> = Omit<
  StandardRandsumOptions<D>,
  'sides' | 'modifiers'
> & {
  sides: CustomSides
}
export type RandsumOptions<
  N extends DieType,
  D extends DetailedType
> = N extends StandardDie
  ? StandardRandsumOptions<D>
  : CustomSidesRandsumOptions<D>

export type SecondaryStandardRandsumOptions<D extends DetailedType> = Omit<
  StandardRandsumOptions<D>,
  'sides'
>
export type SecondaryCustomSidesRandsumOptions<D extends DetailedType> = Omit<
  CustomSidesRandsumOptions<D>,
  'sides' | 'modifiers '
> & { faces: CustomSides }

export type SecondaryRandsumOptions<
  N extends DieType,
  D extends DetailedType
> = N extends StandardDie
  ? SecondaryStandardRandsumOptions<D>
  : SecondaryCustomSidesRandsumOptions<D>

export type RandsumArguments<
  N extends DieType = DieType,
  D extends DetailedType = DetailedType
> = {
  primeArgument: RandsumOptions<N, D> | DiceNotation<N> | NumberString
  secondArgument?: SecondaryRandsumOptions<N, D> | UserOptions<D>
}

export type Match =
  | { coreNotationMatch: string }
  | { dropHighMatch?: string }
  | { dropLowMatch?: string }
  | { dropConstraintsMatch?: string }
  | { explodeMatch?: string }
  | { uniqueMatch?: string }
  | { replaceMatch?: string }
  | { rerollMatch?: string }
  | { capMatch?: string }
  | { plusMatch?: string }
  | { minusMatch?: string }

export interface InternalRollParameters extends RollOptions<number> {
  modifiers: Array<Modifier<number>>
  quantity: number
  detailed?: DetailedType
  randomizer: Randomizer
  faces: CustomSides | undefined
}

export type RollParamCore = {
  initialRolls: number[]
  rollOne: () => number
}
export type RollParameters = Omit<InternalRollParameters, 'detailed'> &
  RollParamCore

export type BaseRollResult = {
  rollParameters: RollParameters
  arguments: [
    RandsumArguments['primeArgument'],
    RandsumArguments['secondArgument']
  ]
}

type StandardRollResult = BaseRollResult & {
  total: number
  rolls: number[]
}

type CustomSidesRollResult = BaseRollResult & {
  total: string
  rolls: CustomSides
}

export type RollResult<N extends DieType> = N extends StandardDie
  ? StandardRollResult
  : CustomSidesRollResult
