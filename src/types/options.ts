import { Modifier } from './modifiers'
import { NumberString } from './primitives'

/**
 * Options for configuring every option of a Randsum roll.
 *
 * @typeParam D Making overloading a breeze, always a Boolean.
 */
export type RandsumOptions<D extends boolean> = RollOptions & UserOptions<D>

/**
 * Options for configuring the Dice Roll, without the sides parameter.
 *
 * @typeParam D Making overloading a breeze, always a Boolean.
 */
export type RandsumOptionsWithoutSides<D extends boolean> = Omit<RandsumOptions<D>, 'sides'>

/** Randomizer
 */

export type Randomizer = (sides: NumberString) => number

/**
 * Options provided to the user not directly related to the dice roll:
 *
 * @typeParam D Making overloading a breeze, always a Boolean.
 */
export interface UserOptions<D extends boolean> {
  /** Whether or not to display a {@link RollResult} (true) or a `number` (false) */
  detailed?: D
  /** A custom functtion that replaces the default randomizer function */
  randomizer?: Randomizer
}

/**
 * All Options available to be passed to {@link randsum}.
 *
 */
export interface RollOptions<T extends number | 'inclusive' = 'inclusive'> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}
