import { RandsumArguments } from './arguments'
import { RollParameters } from './parameters'
import { CustomSides, DieType, StandardDie } from './primitives'

export type BaseRollResult = {
  rollParameters: RollParameters
  arguments: [
    RandsumArguments['primeArgument'],
    RandsumArguments['secondArgument']
  ]
}

type StandardRollResult = BaseRollResult & {
  total: number
  rolls: number[]
}

type CustomSidesRollResult = BaseRollResult & {
  total: string
  rolls: CustomSides
}

export type RollResult<N extends DieType = DieType> = N extends StandardDie
  ? StandardRollResult
  : CustomSidesRollResult
