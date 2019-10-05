export type RollAccessor = (results: number[]) => number
export type DropParamValue = number | boolean
export interface DropParameters {
  highest?: DropParamValue
  lowest?: DropParamValue
}
export interface RollParameters {
  plus?: number
  minus?: number
  drop?: DropParameters
}
export type RollModifier = RollAccessor | RollParameters
export interface RollResult {
  total: number
  rolls: number[]
  modifier?: RollModifier
}
