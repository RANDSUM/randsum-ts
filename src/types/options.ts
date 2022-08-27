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

export type RandsumOptions<
  N extends DieType = StandardDie,
  D extends DetailedType = false | never
> = N extends StandardDie
  ? RollOptions & UserOptions<D>
  : Omit<RollOptions, 'sides' | 'modifiers'> &
      UserOptions<D> & {
        sides: CustomSides
      }

export type SecondaryRandsumOptions<
  N extends DieType = StandardDie,
  D extends DetailedType = false | never
> = N extends StandardDie
  ? Omit<RandsumOptions<N, D>, 'sides'>
  : Omit<RandsumOptions<N, D>, 'sides' | 'modifiers '> & { faces: CustomSides }
