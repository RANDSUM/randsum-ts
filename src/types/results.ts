import { RollParameters } from './parameters'

export interface DicePoolResult<D extends string | number> {
  rolls: D[]
  total: D
}

export interface RollResult extends RollParameters {
  rawRolls: {
    [key: string]: DicePoolResult<string | number>
  }
  modifiedRolls: {
    [key: string]: DicePoolResult<string | number>
  }
  results: string
  total: number
}
