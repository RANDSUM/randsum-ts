import {
  CustomSides,
  DetailedType,
  DiceNotation,
  DieType,
  NumberString,
  NumberStringArgument,
  Randomizer,
  StandardDie
} from './primitives'
import { Modifier } from './modifiers'

export interface UserOptions<D extends DetailedType> {
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
  N extends DieType,
  D extends DetailedType
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
  N extends DieType,
  D extends DetailedType
> = N extends StandardDie
  ? SecondaryStandardRandsumOptions<D>
  : SecondaryCustomSidesRandsumOptions<D>

export type RandsumArguments<
  N extends DieType = DieType,
  D extends DetailedType = DetailedType
> = {
  primeArgument: RandsumOptions<N, D> | DiceNotation<N> | NumberString
  secondArgument?: SecondaryRandsumOptions<N, D> | UserOptions<D>
}
