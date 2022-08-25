import { RollParameters } from './parameters'
import { Detailed } from './primitives'

export interface RollResult<D extends Detailed = never> {
  total: number
  rolls: number[]
  rollParameters: RollParameters<D>
}
