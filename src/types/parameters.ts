import { Modifier } from './modifiers'
import { RollOptions } from './options'
import { Randomizer } from './primitives'

export interface InternalRollParameters<D extends boolean | undefined>
  extends RollOptions<number> {
  modifiers: Array<Modifier<number>>
  quantity: number
  detailed?: D
  randomizer: Randomizer
}

export interface RollParameters<D extends boolean | undefined>
  extends InternalRollParameters<D> {
  initialRolls: number[]
  rollOne: () => number
}
