import { RollParameters } from './parameters'

export interface RollResult<F extends number | string = number> {
  total: F
  rolls: number[]
  rollParameters: RollParameters
}
