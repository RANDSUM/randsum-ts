import { NewRollParameters, RollParameters } from './parameters'

export interface RollResult<D extends string | number = number> {
  rollParameters: RollParameters<D>
  total: D
  initialRolls: D[]
  rolls: D[]
}

export interface NewRollResult<D extends string | number = number>
  extends NewRollParameters<D> {
  initialRolls: {
    [key: string]: D[]
  }
  rolls: {
    [key: string]: D[]
  }
  total: D
}
