export type RollAccessor = (results: number[]) => number
export type DropParamValue = number | boolean

export interface DropParameters {
  highest?: DropParamValue
  lowest?: DropParamValue
}

export type RollOptions = {
  accessor?: RollAccessor
  plus?: number
  minus?: number
  drop?: DropParameters
  rolls?: number
  full?: boolean
}

export type RollParameters = RollOptions & {
  sides: number
  rolls: number
}

export type RollResult = RollParameters & {
  total: number
  rollTotals: number[]
}
