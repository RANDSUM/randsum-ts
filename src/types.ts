/**
 * `DiceNotation` is a [Template Literal](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
patterned ater the basic dice notation (with room for extensions).
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

/**
 * NumberString leverages [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to simplify our interfaces.
 * When `Numberstring<'inclusive'>`, NumberString resolves to `number | ${number}` (a number or number-like string)
 *
 * When `NumberString<number>`, NumberString resolves to `number`.
 *
 * This allows us to use `RandsumOptions<number>` as the base for RollParameters, while
 still benefitting from strong types.
 */
export type NumberString<T extends number | 'inclusive' = 'inclusive'> = T extends 'inclusive'
  ? number | `${number}`
  : number

/**
 * Options for `Drop` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface DropOptions<T extends number | 'inclusive' = 'inclusive'> {
  highest?: NumberString<T>
  lowest?: NumberString<T>
  greaterThan?: NumberString<T>
  lessThan?: NumberString<T>
  exact?: Array<NumberString<T>>
}

/**
 * Options for `Cap` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface CapOptions<T extends number | 'inclusive' = 'inclusive'> {
  above?: NumberString<T>
  below?: NumberString<T>
}

/**
 * Options for `Reroll` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface RerollOptions<T extends number | 'inclusive' = 'inclusive'> extends CapOptions<T> {
  on?: NumberString<T> | Array<NumberString<T>>
  maxReroll?: NumberString<T>
}

/**
 * Options for `Replace` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface ReplaceOptions<T extends number | 'inclusive' = 'inclusive'> {
  from: NumberString<T> | CapOptions<T>
  to: NumberString<T>
}

/**
 * Options for `Unique` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface UniqueOptions<T extends number | 'inclusive' = 'inclusive'> {
  notUnique: Array<NumberString<T>>
}

/**
 * Options provided to the user not directly related to the dice roll:
 *
 * @typeParam D Making overloading a breeze, always a Boolean.
 *
 * @param detailed  Whether or not to display a {@link RollResult} (true) or a `number` (false)
 * @param randomizer  A custom functtion that replaces the default randomizer function
 *
 */
export interface UserOptions<D extends boolean = boolean> {
  detailed?: D
  randomizer?: (sides: NumberString) => number
}

/**
 * All Options available to be passed to {@link randsum}.
 *
 */
export interface RandsumOptions<D extends boolean = boolean, T extends number | 'inclusive' = 'inclusive'>
  extends UserOptions<D> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  plus?: NumberString<T>
  minus?: NumberString<T>
  cap?: CapOptions<T>
  drop?: DropOptions<T>
  replace?: ReplaceOptions<T> | Array<ReplaceOptions<T>>
  reroll?: RerollOptions<T> | Array<RerollOptions<T>>
  unique?: boolean | UniqueOptions<T>
  explode?: boolean
}

/**
 *
 * The Parameters used to calculate the final total of the roll.
 * The result of processing the arguments
 *
 */
export interface RollParameters extends Omit<RandsumOptions<boolean, number>, 'detailed' | 'randomizer'> {
  quantity: number
  notation?: string
}

/**
 *
 * The Return value of a Detailed `randsum` roll.
 *
 * @param total The sum total of the dice rolls, after modifiers have been applied
 * @param rolls An array of the numbers of each individual die rolled, after modifiers have been applied
 * @param initialRolls An array of the numbers of each individual die rolled, before modifiers have been applied
 * @param rollParameters The object used the calculate the total and rolls
 *
 */
export interface RollResult {
  total: number
  rolls: number[]
  initialRolls: number[]
  rollParameters: RollParameters
}
