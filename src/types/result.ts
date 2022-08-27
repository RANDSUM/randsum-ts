import { RollParameters } from './parameters'
import { CustomSides, DieType, StandardDie } from './primitives'

type StandardRollResult = {
  total: number
  rolls: number[]
  rollParameters: RollParameters
}

type CustomSidesRollResult = {
  total: string
  rolls: CustomSides
  rollParameters: RollParameters
}

export type RollResult<N extends DieType = DieType> = N extends StandardDie
  ? StandardRollResult
  : CustomSidesRollResult
