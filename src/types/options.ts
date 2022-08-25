import {
  Detailed,
  NumberString,
  NumberStringArgument,
  Randomizer
} from './primitives'
import { Modifier } from './modifiers'

export interface UserOptions<D extends Detailed = false | never> {
  detailed?: D
  randomizer?: Randomizer
}

export interface RollOptions<T extends NumberStringArgument = 'inclusive'> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}

export type RandsumOptions<D extends Detailed = false | never> = RollOptions &
  UserOptions<D>

export type RandsumOptionsWithCustomSides<D extends Detailed = false | never> =
  Omit<RollOptions, 'sides'> &
    UserOptions<D> & {
      sides: Array<number | string>
    }

export type RandsumOptionsWithoutSides<D extends Detailed = false | never> =
  Omit<RandsumOptions<D>, 'sides'>
