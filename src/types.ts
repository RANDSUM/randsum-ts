export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

export type Inclusive = 'inclusive'
type NumberStringType = number | Inclusive
export type NumberString<T extends NumberStringType = Inclusive> = T extends number ? number : number | `${number}`

export interface DropOptions<T extends NumberStringType = Inclusive> {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: NumberString<T>[]
}

export interface CapOptions<T extends NumberStringType = Inclusive> {
  above?: NumberString<T>
  below?: NumberString<T>
}

export interface RerollOptions<T extends NumberStringType = Inclusive> extends CapOptions<T> {
  on?: NumberString<T> | NumberString<T>[]
  maxReroll?: NumberString<T>
}

export interface ReplaceOptions<T extends NumberStringType = Inclusive> {
  from: NumberString<T> | CapOptions<T>
  to: NumberString<T>
}

export interface UniqueOptions<T extends NumberStringType = Inclusive> {
  notUnique: NumberString<T>[]
}

export interface RollOptions<T extends NumberStringType = Inclusive> {
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
  customRandomizer?: (sides: NumberString) => number
}
