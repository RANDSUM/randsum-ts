import { Modifier } from './modifiers'
import { RollOptions, UserOptions } from './options'

export interface InternalRollParameters extends RollOptions<number>, Pick<UserOptions<false>, 'randomizer'> {
  modifiers: Array<Modifier<number>>
  quantity: number
}

export interface RollParameters extends InternalRollParameters {
  initialRolls: number[]
  rollOne: () => number
}
