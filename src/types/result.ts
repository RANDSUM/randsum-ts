import { RollParameters } from './parameters'

export interface RollResult<D extends boolean | undefined = undefined> {
  total: number
  rolls: number[]
  rollParameters: RollParameters<D>
}
