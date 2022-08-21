import { RollParameters } from './parameters'

export interface RollResult {
  total: number
  rolls: number[]
  rollParameters: RollParameters
}
