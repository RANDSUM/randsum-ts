import { RollOptions } from './options'
import { RollParameters } from './parameters'
import { CustomSides, DiceNotation, DieType, NumberString } from './primitives'

type CoreRollResult<N extends DieType> = {
  rollParameters: RollParameters<N>
  arguments: [RollOptions | DiceNotation | NumberString | undefined]
}

type StandardRollResult = CoreRollResult<'standard'> & {
  total: number
  rolls: number[]
}

type CustomSidesRollResult = CoreRollResult<'customSides'> & {
  total: string
  rolls: CustomSides
}

export type RollResult<N extends DieType = DieType> = N extends 'standard'
  ? StandardRollResult
  : CustomSidesRollResult
