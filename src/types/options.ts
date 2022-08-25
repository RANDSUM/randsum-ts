import { NumberString, NumberStringArgument } from './primitives'
import { Modifier } from './modifiers'

export type RandsumOptions<D extends boolean> = RollOptions & UserOptions<D>
export type RandsumOptionsWithCustomSides<D extends boolean> =
  RollOptionsWithCustomSides & UserOptions<D>

export type RandsumOptionsWithoutSides<D extends boolean> = Omit<
  RandsumOptions<D>,
  'sides'
>

export type Randomizer = (sides: NumberString) => number

export interface UserOptions<D extends boolean> {
  detailed?: D
  randomizer?: Randomizer
}

export interface RollOptions<T extends NumberStringArgument = 'inclusive'> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
  faces?: Array<number | string>
}

export interface RollOptionsWithCustomSides<
  T extends NumberStringArgument = 'inclusive'
> extends RollOptions<T> {
  faces: Array<number | string>
}
