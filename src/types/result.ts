import { RollParameters } from './parameters'

export interface RollResult {
  total: number
  rolls: number[]
  rollParameters: RollParameters
}

export interface RollResultWithCustomSides {
  total: string
  rolls: Array<string | number>
  rollParameters: Omit<RollParameters, 'initialRolls'> & {
    initialRolls: Array<string | number>
  }
}
