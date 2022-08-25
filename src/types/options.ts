import { NumberString, NumberStringArgument, Randomizer } from './primitives'
import { Modifier } from './modifiers'

export interface UserOptions<
  D extends boolean | undefined = false | undefined
> {
  detailed?: D
  randomizer?: Randomizer
}

export interface RollOptions<T extends NumberStringArgument = 'inclusive'> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}

export type RandsumOptions<D extends boolean | undefined = false | undefined> =
  RollOptions & UserOptions<D>

export type RandsumOptionsWithoutSides<
  D extends boolean | undefined = false | undefined
> = Omit<RandsumOptions<D>, 'sides'>
