export type RollAccessor = (results: number[]) => number
export type DropParamValue = number | boolean

export interface DropParameters {
  highest?: DropParamValue
  lowest?: DropParamValue
}

export interface RollAccessorOptions {
  callback?: RollAccessor
}

export interface LongRollOptions {
  plus?: number
  minus?: number
  drop?: DropParameters
  full?: boolean
}

export type RollOptions = (RollAccessorOptions | LongRollOptions) & {
  rolls?: number
}

export type RollParameters = RollOptions & {
  sides: number
  rolls: number
}

export interface RollResult {
  total: number
  rolls: number[]
  rollParams: RollParameters
}

export * from './guards'
