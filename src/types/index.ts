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
  rolls?: number
  full?: boolean
  unique?: boolean
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
