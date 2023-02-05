import { Modifier } from '../parse-arguments/types'
import { StandardRandsumOptions } from './options'
import { CustomSides } from './primitives'

export type RollParameters = StandardRandsumOptions<number> & {
  initialRolls: number[]
  modifiers: Array<Modifier<number>>
  quantity: number
  faces?: CustomSides
}
