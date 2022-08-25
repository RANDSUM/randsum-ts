import { Modifier } from './modifiers'
import { RollOptions } from './options'
import { Detailed, Randomizer } from './primitives'

export interface InternalRollParameters<D extends Detailed>
  extends RollOptions<number> {
  modifiers: Array<Modifier<number>>
  quantity: number
  detailed?: D
  randomizer: Randomizer
}

export interface RollParameters<D extends Detailed = Detailed>
  extends InternalRollParameters<D> {
  initialRolls: number[]
  rollOne: () => number
}
