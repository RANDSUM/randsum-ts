import { RandsumArguments } from './arguments'
import { RollParameters } from './parameters'
import { CustomSides, DieType, StandardDie } from './primitives'

type StandardRollResult = {
  total: number
  rolls: number[]
  rollParameters: RollParameters
  arguments: [
    RandsumArguments['primeArgument'],
    RandsumArguments['secondArgument']
  ]
}

type CustomSidesRollResult = {
  total: string
  rolls: CustomSides
  rollParameters: RollParameters
  arguments: [
    RandsumArguments['primeArgument'],
    RandsumArguments['secondArgument']
  ]
}

export type RollResult<N extends DieType = DieType> = N extends StandardDie
  ? StandardRollResult
  : CustomSidesRollResult
