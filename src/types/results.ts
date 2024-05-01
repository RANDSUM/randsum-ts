import { RollParameters } from './parameters'
import { DicePoolType } from './primitives'

export interface RollResult extends RollParameters {
  rawRolls: {
    [key: string]: string[] | number[]
  }
  modifiedRolls: {
    [key: string]: {
      rolls: string[] | number[]
      total: number
    }
  }
  result: (string | number)[][]
  type: DicePoolType
  total: number
}
