import { RollParameters } from './parameters'

/**
 *
 * The Return value of a Detailed `randsum` roll.
 */
export interface RollResult {
  /** The sum total of the dice rolls, after modifiers have been applied */
  total: number
  /** An array of the numbers of each individual die rolled, after modifiers have been applied */
  rolls: number[]
  /** The object used the calculate the total and rolls */
  rollParameters: RollParameters
}
