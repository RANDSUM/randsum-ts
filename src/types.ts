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
 * Options for `Cap` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface CapOptions<T extends number | 'inclusive' = 'inclusive'> {
  /** A {@link NumberString}, representing the maximum number allowed to be rolled on this die (all rolls greater will be reduced to this value) */
  greaterThan?: NumberString<T>
  /** A {@link NumberString}, representing the minimum number allowed to be rolled on this die (all rolls lessThan will be increased to this value) */
  lessThan?: NumberString<T>
}

/**
 * Options for `Reroll` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface RerollOptions<T extends number | 'inclusive' = 'inclusive'> extends CapOptions<T> {
  /** A single instance or array of {@link NumberString}, representing what numbers will be rerolled. */
  exact?: NumberString<T> | Array<NumberString<T>>
  /** A {@link NumberString}, representing the maximum number of times a die will be rerolled */
  maxReroll?: NumberString<T>
}

/**
 * Options for `Replace` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface ReplaceOptions<T extends number | 'inclusive' = 'inclusive'> {
  /** A {@link CapOptions} or {@link NumberString}, representing what numbers or kind of numbers are to be replaced */
  from: NumberString<T> | CapOptions<T>
  /** A {@link NumberString}, representing what number will replace numbers matching the `from` key. */
  to: NumberString<T>
}

/**
 * Options for `Unique` modifiers.
 *
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
 */
export interface UniqueOptions<T extends number | 'inclusive' = 'inclusive'> {
  /** An array of {@link NumberString}, representing numbers that are allowed to repeat in the roll. */
  notUnique: Array<NumberString<T>>
}

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
 * All Options available to be passed to {@link randsum}.
 *
 */
export interface RandsumOptions<D extends boolean = boolean, T extends number | 'inclusive' = 'inclusive'>
  extends UserOptions<D> {
  /** The amount of dice rolled */
  quantity?: NumberString<T>
  /** The number of sides of the dice (the max # able to be rolled) */
  sides: NumberString<T>
  /** Number to be added to final result of roll */
  plus?: NumberString<T>
  /** Number to be subtracted to final result of roll */
  minus?: NumberString<T>
  /** Options related to the "Cap" modifier {@link CapOptions} */
  cap?: CapOptions<T>
  /** Options related to the "Drop" modifier {@link DropOptions} */
  drop?: DropOptions<T>
  /** Options related to the "Replace" modifier {@link ReplaceOptions} */
  replace?: ReplaceOptions<T> | Array<ReplaceOptions<T>>
  /** Options related to the "Reroll" modifier {@link RerollOptions} */
  reroll?: RerollOptions<T> | Array<RerollOptions<T>>
  /** Options related to the "Unique" modifier {@link UniqueOptions} */
  unique?: boolean | UniqueOptions<T>
  /** Options related to the "Explode" modifier */
  explode?: boolean
}

/**
 * The Parameters used to calculate the final total of the roll.
 * The result of processing the arguments
 */
export interface RollParameters extends Omit<RandsumOptions<boolean, number>, 'detailed' | 'randomizer'> {
  /** The amount of dice rolled */
  quantity: number
}

export type RollParameterKeys = keyof Omit<RandsumOptions<boolean, number>, 'detailed' | 'randomizer'>

export interface NewRollParameters extends Pick<RandsumOptions, 'sides'> {
  quantity: number
  sides: number
  rollModifiers?: Array<
    | { quantity: NumberString<number> }
    | { sides: NumberString<number> }
    | { cap: CapOptions<number> }
    | { drop: DropOptions<number> }
    | { replace: ReplaceOptions<number> | Array<ReplaceOptions<number>> }
    | { reroll: RerollOptions<number> | Array<RerollOptions<number>> }
    | { explode: boolean }
    | { unique: boolean | UniqueOptions<number> }
  >
  totalModifiers?: Array<{ plus: NumberString<number> } | { minus: NumberString<number> }>
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
  /** An array of the numbers of each individual die rolled, before modifiers have been applied */
  initialRolls: number[]
  /** The object used the calculate the total and rolls */
  rollParameters: RollParameters
}
