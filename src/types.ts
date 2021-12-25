export type Sides = number | `${number}`
export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

export type RollDie = () => number

export type RollTotals = number[]

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

export interface UniqueOptions {
  notUnique: number[]
}

export interface RollOptions {
  rolls?: number
  sides: Sides
  plus?: number
  minus?: number
  cap?: CapOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: ReRollOptions | ReRollOptions[]
  unique?: boolean | UniqueOptions
  explode?: boolean
}

export type RandsumPrimeArgument = Sides | RollOptions | DiceNotation

export interface RandsumOptions<D = boolean> {
  detailed?: D
  customRandomizer?: (sides: Sides) => number
}

export interface RollParameters extends RollOptions {
  rolls: number
  notation?: string
}

export interface RollResult extends RollParameters {
  args: [RandsumPrimeArgument, RandsumOptions | undefined]
  total: number
  rollTotals: RollTotals
  initialRollTotals: number[]
  modifyInitialRolls: (callbackFunction: (results: RollTotals) => number) => number
  modifyModifiedRolls: (callbackFunction: (results: RollTotals) => number) => number
}

export type RandsumDynamicReturn<T extends boolean> = T extends true ? RollResult : number
