export type NumberString = number | `${number}`
export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

export type RollDie = () => number

export type RollTotals = NumberString[]

export interface DropOptions {
  highest?: NumberString
  lowest?: NumberString
  greaterThan?: NumberString
  lessThan?: NumberString
  exact?: NumberString[]
}

export interface CapOptions {
  above?: NumberString
  below?: NumberString
}

export interface ReRollOptions extends CapOptions {
  on?: NumberString | NumberString[]
  maxReroll?: NumberString
}

export interface ReplaceOptions {
  from: NumberString | CapOptions
  to: NumberString
}

export interface UniqueOptions {
  notUnique: NumberString[]
}

export interface RollOptions {
  rolls?: NumberString
  sides: NumberString
  plus?: NumberString
  minus?: NumberString
  cap?: CapOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: ReRollOptions | ReRollOptions[]
  unique?: boolean | UniqueOptions
  explode?: boolean
}

export type RandsumPrimeArgument = NumberString | RollOptions | DiceNotation

export interface RandsumOptions<D = boolean> {
  detailed?: D
  customRandomizer?: (sides: NumberString) => number
}

export interface RollParameters extends RollOptions {
  rolls: NumberString
  notation?: string
}

export interface RollResult extends RollParameters {
  args: [RandsumPrimeArgument, RandsumOptions | undefined]
  total: number
  rollTotals: RollTotals
  initialRollTotals: NumberString[]
  modifyInitialRolls: (callbackFunction: (results: RollTotals) => number) => number
  modifyModifiedRolls: (callbackFunction: (results: RollTotals) => number) => number
}

export type RandsumDynamicReturn<T extends boolean> = T extends true ? RollResult : number
