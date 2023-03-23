import { RollParameters } from './parameters'
import { CustomSide, DieType } from './primitives'

export type RollResult<T extends DieType = 'standard'> = {
  rollParameters: RollParameters<T>
  total: T extends 'standard' ? number : string
  rolls: T extends 'standard' ? number[] : CustomSide[]
}
