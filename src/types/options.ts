import { Modifier } from '../roll/parse-arguments/types'
import {
  CustomSides,
  DieType,
  NumberString,
  NumberStringArgument
} from './primitives'

export type StandardRollOptions<N extends NumberStringArgument = 'inclusive'> =
  {
    quantity?: NumberString<N>
    sides: NumberString<N>
    modifiers?: Array<Modifier<N>>
  }

export type CustomSidesRollOptions<
  N extends NumberStringArgument = 'inclusive'
> = Omit<StandardRollOptions<N>, 'sides' | 'modifiers'> & {
  sides: CustomSides
}

export type RollOptions<
  T extends DieType = DieType,
  N extends NumberStringArgument = 'inclusive'
> = {
  quantity?: NumberString<N>
  sides: T extends 'standard' ? NumberString<N> : CustomSides
  modifiers?: T extends 'standard' ? Array<Modifier<N>> : never
}

// export type RollOptions<N extends DieType = DieType> = N extends 'standard'
//   ? StandardRollOptions
//   : CustomSidesRollOptions
