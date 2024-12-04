import { RollConfig } from '~src/core/types'
import { D } from '~src/dice/D'
import { DiceNotation } from '~src/notation/types'

export interface RollConfigArgument extends Partial<RollConfig> {
  sides: RollConfig['sides']
}

export type RollArgument =
  | `${number}`
  | number
  | D
  | RollConfigArgument
  | DiceNotation

export type DicePools = {
  [key: string]: RollParameters
}

export type RollParameters = {
  argument: RollArgument
  config: RollConfig
  die: D
  notation: DiceNotation
  description: string[]
}

export interface RollResult {
  dicePools: DicePools
  rawRolls: {
    [key: string]: number[]
  }
  modifiedRolls: {
    [key: string]: {
      rolls: number[]
      total: number
    }
  }
  result: number
  rawResult: number[]
}
