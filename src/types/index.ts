export type RollTotals = number[]

export type RollModifier = (results: RollTotals) => number
export type RollModifierAccessor = (callback: RollModifier) => number
export type Randomizer = (sides: number) => number
export type RollDie = () => number

export type RandsumPrimeArg = string | number | RollOptions
export type RollResultOrNum<T extends boolean> = T extends true ? RollResult : number

export interface RandsumOptions<D = boolean> {
  detailed?: D
  customRandomizer?: Randomizer
}

export interface DropOptions {
  highest?: number
  lowest?: number
  greaterThan?: number
  lessThan?: number
  exact?: number[]
}

export interface CapOptions {
  above?: number
  below?: number
}

export interface ReRollOptions extends CapOptions {
  on?: number | number[]
  maxReroll?: number
}

export interface ReplaceOptions {
  from: number | CapOptions
  to: number
}

export interface RollOptions {
  plus?: number
  minus?: number
  cap?: CapOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: ReRollOptions | ReRollOptions[]
  rolls?: number
  unique?: boolean
  explode?: boolean
  notUnique?: number[]
  rollTotals?: RollTotals
  sides: number
}

export type NotifiableOptions = Pick<
  RollOptions,
  'plus' | 'minus' | 'cap' | 'drop' | 'replace' | 'reroll' | 'rolls' | 'unique' | 'explode' | 'notUnique'
>
export type NotificationModifier = {
  -readonly [K in keyof NotifiableOptions]: NotifiableOptions[K]
}

export interface RollParameters extends RollOptions {
  rolls: number
  notationModifiers?: NotifiableOptions[]
}

export interface RollResult extends RollParameters {
  total: number
  rollTotals: number[]
  initialRollTotals: number[]
  modifyInitialRoll: RollModifierAccessor
  modifyModifiedRoll: RollModifierAccessor
}
