export type RollAccessor = (results: number[]) => number

export interface DropParameters {
  highest?: number
  lowest?: number
  greaterThan?: number
  lessThan?: number
  exact?: number[]
}

export type RollOptions = {
  accessor?: RollAccessor
  plus?: number
  minus?: number
  drop?: DropParameters
  rolls?: number
  full?: boolean
  unique?: boolean
  notUnique?: number[]
}

export type RollParameters = RollOptions & {
  sides: number
  rolls: number
}

export type RollResult = RollParameters & {
  total: number
  rollTotals: number[]
}
