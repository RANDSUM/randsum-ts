/**
 * Options for configuring every option of a Randsum roll.
 *
 * @typeParam D Making overloading a breeze, always a Boolean.
 */
export type RandsumOptions<D extends boolean = boolean> = RollOptions & UserOptions<D>

/**
 * Options for configuring the Dice Roll, without the sides parameter.
 *
 * @typeParam D Making overloading a breeze, always a Boolean.
 */
export type RandsumOptionsWithoutSides<D extends boolean = boolean> = Omit<RandsumOptions<D>, 'sides'>

/**
 * Options provided to the user not directly related to the dice roll:
 *
 * @typeParam D Making overloading a breeze, always a Boolean.
 */
export interface UserOptions<D extends boolean = boolean> {
  /** Whether or not to display a {@link RollResult} (true) or a `number` (false) */
  detailed?: D
  /** A custom functtion that replaces the default randomizer function */
  randomizer?: (sides: NumberString) => number
}
/**
 * `DiceNotation` is a [Template Literal](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
patterned ater the basic dice notation (with room for extensions).
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export type DiceNotation = `${number}${'d' | 'D'}${number}${string}`

/**
 * NumberString leverages [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) to simplify our interfaces.
 * When `Numberstring<'inclusive'>`, NumberString resolves to `number | ${number}` (a number or number-like string)
 *
 * When `NumberString<number>`, NumberString resolves to `number`.
 *
 * This allows us to use `RollOptions<number>` as the base for RollParameters, while
 still benefitting from strong types.
 */
export type NumberString<T extends number | 'inclusive' = 'inclusive'> = T extends 'inclusive'
  ? number | `${number}`
  : number

/**
 * Options for `Drop` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface DropOptions<T extends number | 'inclusive' = 'inclusive'> {
  /** A {@link NumberString}, representing the amount of high rolls that will be dropped from this result. */
  highest?: NumberString<T>
  /** A {@link NumberString}, representing the amount of low rolls that will be dropped from this result. */
  lowest?: NumberString<T>
  /** A {@link NumberString}, representing the maximum number allowed to be rolled on this die (all rolls greater will be dropped) */
  greaterThan?: NumberString<T>
  /** A {@link NumberString}, representing the minimum number allowed to be rolled on this die (all rolls lesser will be dropped) */
  lessThan?: NumberString<T>
  /** An array of {@link NumberString}, representing which specific results will be dropped */
  exact?: Array<NumberString<T>>
}

/**
 * An object to hold options for `Drop` modifiers.
 *
 * {@link DropOptions}
 */
export interface DropModifier<T extends number | 'inclusive' = 'inclusive'> {
  drop: DropOptions<T>
}

/**
 * Options for `Cap` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface CapOptions<T extends number | 'inclusive' = 'inclusive'> {
  /** A {@link NumberString}, representing the maximum number allowed to be rolled on this die (all rolls greater will be reduced to this value) */
  greaterThan?: NumberString<T>
  /** A {@link NumberString}, representing the minimum number allowed to be rolled on this die (all rolls lessThan will be increased to this value) */
  lessThan?: NumberString<T>
}

/**
 * An object to hold options for `Cap` modifiers.
 *
 * {@link CapOptions}
 */
export interface CapModifier<T extends number | 'inclusive' = 'inclusive'> {
  cap: CapOptions<T>
}

/**
 * Options for `Reroll` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface RerollOptions<T extends number | 'inclusive' = 'inclusive'> extends CapOptions<T> {
  /** A single instance or array of {@link NumberString}, representing what numbers will be rerolled. */
  exact?: NumberString<T> | Array<NumberString<T>>
  /** A {@link NumberString}, representing the maximum number of times a die will be rerolled */
  maxReroll?: NumberString<T>
}

/**
 * An object to hold options for `Reroll` modifiers.
 *
 * {@link RerollOptions}
 */
export interface RerollModifier<T extends number | 'inclusive' = 'inclusive'> {
  reroll: RerollOptions<T> | Array<RerollOptions<T>>
}

/**
 * Options for `Replace` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface ReplaceOptions<T extends number | 'inclusive' = 'inclusive'> {
  /** A {@link CapOptions} or {@link NumberString}, representing what numbers or kind of numbers are to be replaced */
  from: NumberString<T> | CapOptions<T>
  /** A {@link NumberString}, representing what number will replace numbers matching the `from` key. */
  to: NumberString<T>
}

/**
 * An object to hold options for `Replace` modifiers.
 *
 * {@link ReplaceOptions}
 */
export interface ReplaceModifier<T extends number | 'inclusive' = 'inclusive'> {
  replace: ReplaceOptions<T> | Array<ReplaceOptions<T>>
}

/**
 * Options for `Unique` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum-ts/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface UniqueOptions<T extends number | 'inclusive' = 'inclusive'> {
  /** An array of {@link NumberString}, representing numbers that are allowed to repeat in the roll. */
  notUnique: Array<NumberString<T>>
}

/**
 * An object to hold options for `Unique` modifiers.
 *
 * {@link UniqueOptions}
 */
export interface UniqueModifier<T extends number | 'inclusive' = 'inclusive'> {
  unique: boolean | UniqueOptions<T>
}

/**
 * An object to hold options for `Explode` modifiers.
 *
 * {@link ExplodeOptions}
 */
export interface ExplodeModifier {
  explode: boolean
}

/**
 * An object to hold options for `Plus` modifiers.
 *
 * {@link PlusOptions}
 */
export interface PlusModifier<T extends number | 'inclusive' = 'inclusive'> {
  plus: NumberString<T>
}

/**
 * An object to hold options for `Minus` modifiers.
 *
 * {@link MinusOptions}
 */
export interface MinusModifier<T extends number | 'inclusive' = 'inclusive'> {
  minus: NumberString<T>
}

/**
 * All Possible modifiers used to modify the roll results
 *
 */
export type Modifier<T extends number | 'inclusive' = 'inclusive'> =
  | CapModifier<T>
  | DropModifier<T>
  | ReplaceModifier<T>
  | RerollModifier<T>
  | ExplodeModifier
  | UniqueModifier<T>
  | PlusModifier<T>
  | MinusModifier<T>

/**
 * All Options available to be passed to {@link randsum}.
 *
 */
export interface RollOptions<T extends number | 'inclusive' = 'inclusive'> {
  quantity?: NumberString<T>
  sides: NumberString<T>
  modifiers?: Array<Modifier<T>>
}

/**
 * All parameters used to calculate a roll.
 *
 * Returned in {@link RollResult}
 *
 */

export interface InternalRollParameters extends RollOptions<number>, UserOptions {
  quantity: number
  detailed: boolean
  modifiers: Array<Modifier<number>>
}

export interface RollParameters extends InternalRollParameters {
  initialRolls: number[]
  rollOne: () => number
}

/**
 *
 * The Return value of a Detailed `randsum` roll.
 */
export interface RollResult {
  /** The sum total of the dice rolls, after modifiers have been applied */
  total: number
  /** An array of the numbers of each individual die rolled, after modifiers have been applied */
  rolls: number[]
  /** The object used the calculate the total and rolls */
  rollParameters: RollParameters
}
