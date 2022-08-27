import { Modifier } from './modifiers'
import { RollOptions } from './options'
import { CustomSides, DetailedType, Randomizer } from './primitives'

export interface InternalRollParameters extends RollOptions<number> {
  modifiers: Array<Modifier<number>>
  quantity: number
  detailed?: DetailedType
  randomizer: Randomizer
  faces: CustomSides | undefined
}

export interface RollParameters
  extends Omit<InternalRollParameters, 'detailed'> {
  initialRolls: number[]
  rollOne: () => number
}
