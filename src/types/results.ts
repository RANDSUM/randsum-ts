import { RollParameters } from './parameters'

export interface RollResult<D extends string | number = number> {
  rollParameters: RollParameters<D>
  total: D
  initialRolls: D[]
  rolls: D[]
}
