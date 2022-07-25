import { Modifier } from './modifiers'
import { RollOptions, UserOptions } from './options'

/**
 * All parameters used to calculate a roll.
 *
 * Returned in {@link RollResult}
 *
 */
export interface InternalRollParameters extends RollOptions<number>, UserOptions {
  quantity: number
  detailed: boolean
  modifiers: Array<Modifier<number>>
}

export interface RollParameters extends InternalRollParameters {
  initialRolls: number[]
  rollOne: () => number
}
