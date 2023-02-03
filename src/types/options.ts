import { Modifier } from './modifiers'
import {
  CustomSides,
  DieType,
  NumberString,
  NumberStringArgument,
  StandardDie
} from './primitives'

type CustomSidesRandsumOptions = Omit<
  StandardRandsumOptions,
  'sides' | 'modifiers'
> & {
  sides: CustomSides
}

export type StandardRandsumOptions<
  T extends NumberStringArgument = 'inclusive'
> = {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}

export type RandsumOptions<N extends DieType = DieType> = N extends StandardDie
  ? StandardRandsumOptions
  : CustomSidesRandsumOptions
