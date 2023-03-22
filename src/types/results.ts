import { RollParameters } from './parameters'
import { CustomSides, DieType } from './primitives'

type StandardRollResult = {
  rollParameters: RollParameters<'standard'>
  total: number
  rolls: number[]
}

type CustomSidesRollResult = {
  rollParameters: RollParameters<'customSides'>
  total: string
  rolls: CustomSides
}

export type RollResult<N extends DieType = DieType> = N extends 'standard'
  ? StandardRollResult
  : CustomSidesRollResult
