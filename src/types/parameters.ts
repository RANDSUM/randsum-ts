import { Modifier } from './modifiers'
import { RollOptions } from './options'
import { CustomSides, Detailed, Randomizer } from './primitives'

export interface InternalRollParameters extends RollOptions<number> {
  modifiers: Array<Modifier<number>>
  quantity: number
  detailed?: Detailed
  randomizer: Randomizer
  faces: CustomSides | undefined
}

export interface RollParameters
  extends Omit<InternalRollParameters, 'detailed'> {
  initialRolls: number[]
  rollOne: () => number
}
