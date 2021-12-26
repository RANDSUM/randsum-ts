type Strict = 'strict' | undefined
export type NumberString<T extends 'strict' | undefined = undefined> = T extends 'strict'
  ? number
  : number | `${number}`

export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

export type RollTotals = NumberString<'strict'>[]

export type RollDie = () => number

export interface DropOptions<T extends Strict = undefined> {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: NumberString<T>[]
}

export interface CapOptions<T extends Strict = undefined> {
  above?: NumberString<T>
  below?: NumberString<T>
}

export interface RerollOptions<T extends Strict = undefined> extends CapOptions<T> {
  on?: NumberString<T> | NumberString<T>[]
  maxReroll?: NumberString<T>
}

export interface ReplaceOptions<T extends Strict = undefined> {
  from: NumberString<T> | CapOptions<T>
  to: NumberString<T>
}

export interface UniqueOptions<T extends Strict = undefined> {
  notUnique: NumberString<T>[]
}

export interface RollOptions<T extends Strict = undefined> {
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

interface UserOptions<D extends boolean = boolean> {
  detailed?: D
  customRandomizer?: (sides: NumberString) => number
}

export type RandsumOptions<D extends boolean = boolean> = RollOptions & UserOptions<D>

export type RollParameters<D extends boolean = boolean> = RollOptions<'strict'> &
  UserOptions<D> & {
    rolls: NumberString<'strict'>
    notation?: string
  }

export type PrimeArgument = NumberString | RollOptions | DiceNotation
export type RandsumOptionsWithoutSides<D extends boolean = boolean> = Omit<RandsumOptions<D>, 'sides'>

export type RollModifier = (callbackFunction: (results: RollTotals) => number) => number

export interface RollResult extends RollParameters {
  total: number
  rollTotals: RollTotals
  initialRollTotals: NumberString<'strict'>[]
  modifyInitialRolls: RollModifier
  modifyModifiedRolls: RollModifier
}
