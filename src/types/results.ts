import { RollOptions } from './options'
import { RollParameters } from './parameters'
import { CustomSides, DiceNotation, DieType, NumberString } from './primitives'

type CoreRollResult = {
  rollParameters: RollParameters
  arguments: [RollOptions | DiceNotation | NumberString | undefined]
}

type StandardRollResult = CoreRollResult & {
  total: number
  rolls: number[]
}

type CustomSidesRollResult = CoreRollResult & {
  total: string
  rolls: CustomSides
}

export type RollResult<N extends DieType = DieType> = N extends 'standard'
  ? StandardRollResult
  : CustomSidesRollResult
