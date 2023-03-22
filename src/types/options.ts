import { Modifier } from '../parse-arguments/types'
import {
  CustomSides,
  DieType,
  NumberString,
  NumberStringArgument
} from './primitives'

export type StandardRollOptions<T extends NumberStringArgument = 'inclusive'> =
  {
    quantity?: NumberString<T>
    sides: NumberString<T>
    modifiers?: Array<Modifier<T>>
  }

export type CustomSidesRollOptions<
  T extends NumberStringArgument = 'inclusive'
> = Omit<StandardRollOptions<T>, 'sides' | 'modifiers'> & {
  sides: CustomSides
}

export type RollOptions<N extends DieType = DieType> = N extends 'standard'
  ? StandardRollOptions
  : CustomSidesRollOptions
