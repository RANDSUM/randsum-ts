import { RollParameters } from './parameters'

export interface RollResult {
  total: number
  rolls: number[]
  rollParameters: RollParameters
}

export interface RollResultWithCustomSides
  extends Omit<RollResult, 'total' | 'rolls'> {
  total: string
  rolls: CustomSides
}
