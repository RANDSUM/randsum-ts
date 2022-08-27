import { RollParameters } from './parameters'
import { CustomSides, DieType, StandardDie } from './primitives'

export type RollResult<N extends DieType = DieType> = (N extends StandardDie
  ? {
      total: number
      rolls: number[]
    }
  : {
      total: string
      rolls: CustomSides
    }) & {
  rollParameters: RollParameters
}
