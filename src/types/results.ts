import { RandsumOptions } from './options'
import { RollParameters } from './parameters'
import {
  CustomSides,
  DiceNotation,
  DieType,
  NumberString,
  StandardDie
} from './primitives'

type BaseRollResult = {
  rollParameters: RollParameters
  arguments: [RandsumOptions | DiceNotation | NumberString | undefined]
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
