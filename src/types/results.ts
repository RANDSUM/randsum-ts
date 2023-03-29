import { RollParameters } from './parameters'
import { DieSides } from './primitives'

export interface RollResult<D extends DieSides> {
  rollParameters: RollParameters<D>
  total: D
  initialRolls: D[]
  rolls: D[]
}
