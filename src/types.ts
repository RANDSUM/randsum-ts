export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`
export type NumberString<T extends number | 'inclusive' = 'inclusive'> = T extends 'inclusive'
  ? number | `${number}`
  : number

export interface DropOptions<T extends number | 'inclusive' = 'inclusive'> {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: Array<NumberString<T>>
}

export interface CapOptions<T extends number | 'inclusive' = 'inclusive'> {
  above?: NumberString<T>
  below?: NumberString<T>
}

export interface RerollOptions<T extends number | 'inclusive' = 'inclusive'> extends CapOptions<T> {
  on?: NumberString<T> | Array<NumberString<T>>
  maxReroll?: NumberString<T>
}

export interface ReplaceOptions<T extends number | 'inclusive' = 'inclusive'> {
  from: NumberString<T> | CapOptions<T>
  to: NumberString<T>
}

export interface UniqueOptions<T extends number | 'inclusive' = 'inclusive'> {
  notUnique: Array<NumberString<T>>
}

export interface RollOptions<T extends number | 'inclusive' = 'inclusive'> {
  rolls?: NumberString<T>
  sides: NumberString<T>
  plus?: NumberString<T>
  minus?: NumberString<T>
  cap?: CapOptions<T>
  drop?: DropOptions<T>
  replace?: ReplaceOptions<T> | Array<ReplaceOptions<T>>
  reroll?: RerollOptions<T> | Array<RerollOptions<T>>
  unique?: boolean | UniqueOptions<T>
  explode?: boolean
}

export interface RollParameters extends RollOptions<number> {
  rolls: number
  notation?: string
}

export interface RollResult extends RollParameters {
  total: number
  rollTotals: number[]
  initialRollTotals: number[]
  modifyInitialRolls: (callbackFunction: (results: number[]) => number) => number
  modifyModifiedRolls: (callbackFunction: (results: number[]) => number) => number
}

export interface UserOptions<D extends boolean = boolean> {
  detailed?: D
  randomizer?: (sides: NumberString) => number
}
