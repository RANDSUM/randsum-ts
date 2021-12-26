type OptionsParameters = 'options' | 'parameters'
export type NumberString<T extends OptionsParameters = 'options'> = T extends 'parameters'
  ? number
  : number | `${number}`

export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

export type RollTotals = NumberString<'parameters'>[]

export type RollDie = () => number

export interface DropOptions<T extends OptionsParameters = 'options'> {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: NumberString<T>[]
}

export interface CapOptions<T extends OptionsParameters = 'options'> {
  above?: NumberString<T>
  below?: NumberString<T>
}

export interface RerollOptions<T extends OptionsParameters = 'options'> extends CapOptions<T> {
  on?: NumberString<T> | NumberString<T>[]
  maxReroll?: NumberString<T>
}

export interface ReplaceOptions<T extends OptionsParameters = 'options'> {
  from: NumberString<T> | CapOptions<T>
  to: NumberString<T>
}

export interface UniqueOptions<T extends OptionsParameters = 'options'> {
  notUnique: NumberString<T>[]
}

export interface RollOptions<T extends OptionsParameters = 'options'> {
  rolls?: NumberString<T>
  sides: NumberString<T>
  plus?: NumberString<T>
  minus?: NumberString<T>
  cap?: CapOptions<T>
  drop?: DropOptions<T>
  replace?: ReplaceOptions<T> | ReplaceOptions<T>[]
  reroll?: RerollOptions<T> | RerollOptions<T>[]
  unique?: boolean | UniqueOptions<T>
  explode?: boolean
}

export type RandsumPrimeArgument = NumberString<'options'> | RollOptions | DiceNotation

export interface RandsumOptions<D = boolean> {
  detailed?: D
  customRandomizer?: (sides: NumberString<'options'>) => number
}

export interface RollParameters extends RollOptions<'parameters'> {
  rolls: NumberString<'parameters'>
  notation?: string
}

export interface RollResult extends RollParameters {
  args: [RandsumPrimeArgument, RandsumOptions | undefined]
  total: number
  rollTotals: RollTotals
  initialRollTotals: NumberString<'parameters'>[]
  modifyInitialRolls: (callbackFunction: (results: RollTotals) => number) => number
  modifyModifiedRolls: (callbackFunction: (results: RollTotals) => number) => number
}

export type RandsumDynamicReturn<T extends boolean> = T extends true ? RollResult : number
