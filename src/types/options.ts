import {
  CustomSides,
  DetailedType,
  DieType,
  NumberString,
  NumberStringArgument,
  Randomizer,
  StandardDie
} from './primitives'
import { Modifier } from './modifiers'

export interface UserOptions<D extends DetailedType = false | never> {
  detailed?: D
  randomizer?: Randomizer
}

export interface RollOptions<T extends NumberStringArgument = 'inclusive'> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}

export type StandardRandsumOptions<D extends DetailedType> = RollOptions &
  UserOptions<D>
export type CustomSidesRandsumOptions<D extends DetailedType> = Omit<
  StandardRandsumOptions<D>,
  'sides' | 'modifiers'
> & {
  sides: CustomSides
}
export type RandsumOptions<
  N extends DieType = StandardDie,
  D extends DetailedType = false | never
> = N extends StandardDie
  ? StandardRandsumOptions<D>
  : CustomSidesRandsumOptions<D>

export type SecondaryStandardRandsumOptions<D extends DetailedType> = Omit<
  StandardRandsumOptions<D>,
  'sides'
>
export type SecondaryCustomSidesRandsumOptions<D extends DetailedType> = Omit<
  CustomSidesRandsumOptions<D>,
  'sides' | 'modifiers '
> & { faces: CustomSides }

export type SecondaryRandsumOptions<
  N extends DieType = StandardDie,
  D extends DetailedType = false | never
> = N extends StandardDie
  ? SecondaryStandardRandsumOptions<D>
  : SecondaryCustomSidesRandsumOptions<D>
