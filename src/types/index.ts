export type RollAccessor = (results: number[]) => number
export type DropParamValue = number | boolean

export interface DropParameters {
  highest?: DropParamValue
  lowest?: DropParamValue
}

export interface RollParameters {
  rolls?: number
  plus?: number
  minus?: number
  drop?: DropParameters
  full?: boolean
}

export interface InternalRollParamaters extends RollParameters {
  sides: number
  rolls: number
}

export type RollModifier = RollAccessor | RollParameters

export interface RollResult {
  total: number
  rolls: number[]
  modifier?: RollModifier
}

export * from './guards'
