import { Modifier } from '../roll/parse-arguments/types'
import {
  CustomSides,
  DieType,
  NumberString,
  NumberStringArgument
} from './primitives'

export type RollOptions<
  T extends DieType = DieType,
  N extends NumberStringArgument = 'inclusive'
> = {
  quantity?: NumberString<N>
  sides: T extends 'standard' ? NumberString<N> : CustomSides
  modifiers?: T extends 'standard' ? Array<Modifier<N>> : never
}
