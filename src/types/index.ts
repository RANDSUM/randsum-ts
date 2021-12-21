export type RollAccessor = (results: number[]) => number

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
  accessor?: RollAccessor
  plus?: number
  minus?: number
  cap?: CapOptions
  drop?: DropOptions
  replace?: ReplaceOptions | ReplaceOptions[]
  reroll?: ReRollOptions
  rolls?: number
  full?: boolean
  unique?: boolean
  explode?: boolean
  notUnique?: number[]
}

export interface RollParameters extends RollOptions {
  sides: number
  rolls: number
}

export interface RollResult extends RollParameters {
  total: number
  rollTotals: number[]
}
