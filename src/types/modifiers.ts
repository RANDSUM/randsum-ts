import { NumberString } from './primitives'

/**
 * An object to hold options for `Drop` modifiers.
 *
 * {@link DropOptions}
 */
export interface DropModifier<T extends number | 'inclusive' = 'inclusive'> {
  drop: DropOptions<T>
}

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
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
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
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
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
 * See [Randsum Dice Notation](https://github.com/alxjrvs/randsum/blob/main/RANDSUM_DICE_NOTATION.md) for more.
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
 */
export interface ExplodeModifier {
  explode: boolean
}

/**
 * An object to hold options for `Plus` modifiers.
 *
 */
export interface PlusModifier<T extends number | 'inclusive' = 'inclusive'> {
  plus: NumberString<T>
}

/**
 * An object to hold options for `Minus` modifiers.
 *
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
