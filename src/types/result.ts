import { RollParameters } from './parameters'
import { CustomSides } from './primitives'

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
