import { RollParameters } from './parameters'

export interface RollResult<D extends Detailed = undefined> {
  total: number
  rolls: number[]
  rollParameters: RollParameters<D>
}
