import { Modifier } from './modifiers'
import { RollOptions } from './options'
import { Detailed, Randomizer } from './primitives'

export interface InternalRollParameters extends RollOptions<number> {
  modifiers: Array<Modifier<number>>
  quantity: number
  detailed?: Detailed
  randomizer: Randomizer
}

export interface RollParameters
  extends Omit<InternalRollParameters, 'detailed' | 'randomizer'> {
  initialRolls: number[]
  rollOne: () => number
}
