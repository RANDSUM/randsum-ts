export type RollAccessor = (results: number[]) => number
export interface DropParameters {
  highest?: number | boolean
  lowest?: number | boolean
}
export interface RollParameters {
  plus?: number
  minus?: number
  drop?: DropParameters
}
export type RollModifier = RollAccessor | RollParameters
