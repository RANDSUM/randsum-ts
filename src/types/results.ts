import { RollParameters } from './parameters'
import { DieSides } from './primitives'

export type RollResult<T extends DieSides = number> = {
  rollParameters: RollParameters<T>
  total: T
  rolls: T[]
}
