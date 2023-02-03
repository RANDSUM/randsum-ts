import { Modifier } from './modifiers'
import { StandardRandsumOptions } from './options'
import { CustomSides } from './primitives'

export type InternalRollParameters = StandardRandsumOptions<number> & {
  modifiers: Array<Modifier<number>>
  quantity: number
  faces?: CustomSides
}

export type RollParameters = InternalRollParameters & {
  initialRolls: number[]
  rollOne: () => number
}
