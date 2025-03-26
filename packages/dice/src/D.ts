import type { CustomRollOptions, NumericRollOptions } from '@randsum/core'
import type { BaseD } from './types'
import { coreSpreadRolls } from './utils/coreSpreadRolls'
import { generateNumericalFaces } from './utils/generateNumericalFaces'

/**
 * Represents a die that can have either numerical faces (1 to N) or custom string faces.
 *
 * @typeParam T - The type of die faces. Can be either `number` for numerical dice or `string[]` for custom-faced dice.
 *
 * @example
 * ```typescript
 * // Create a standard d20
 * const d20 = new D(20)
 *
 * // Create a coin with custom faces
 * const coin = new D(['Heads', 'Tails'])
 * ```
 */
export class D<T extends number | string[]> implements BaseD<T> {
  /** Number of sides on the die */
  readonly sides: number

  /** Array of possible face values */
  readonly faces: T extends number ? number[] : string[]

  /** Indicates whether this is a numerical die ('numerical') or custom-faced die ('custom') */
  readonly type: T extends number ? 'numerical' : 'custom'

  /** Boolean flag indicating if this is a custom-faced die */
  readonly isCustom: T extends number ? false : true

  /**
   * Creates a new die instance.
   *
   * @param arg - Either a number for creating numerical dice (e.g., 20 for a d20) or an array of strings for custom faces
   * @throws {Error} If creating a numerical die with invalid sides (< 1 or non-integer) or a custom die with no faces
   *
   * @example
   * ```typescript
   * // Create a d6
   * const d6 = new D(6)
   *
   * // Create a fudge die
   * const fudge = new D(['+', '0', '-'])
   * ```
   */
  constructor(arg: T) {
    if (typeof arg === 'number') {
      if (!Number.isInteger(arg) || arg < 1) {
        throw new Error(
          'Die must have at least one side with a positive integer value'
        )
      }
      this.sides = arg
      this.faces = generateNumericalFaces(arg) as T extends number
        ? number[]
        : string[]
      this.type = 'numerical' as T extends number ? 'numerical' : 'custom'
      this.isCustom = false as T extends number ? false : true
    } else {
      if (!arg.length) {
        throw new Error('Custom die must have at least one face')
      }
      this.sides = arg.length
      this.faces = [...(arg as string[])] as T extends number
        ? number[]
        : string[]
      this.type = 'custom' as T extends number ? 'numerical' : 'custom'
      this.isCustom = true as T extends number ? false : true
    }
  }

  /**
   * Rolls the die one or more times and returns the sum (for numerical dice) or concatenated results (for custom dice).
   *
   * @param quantity - Number of times to roll the die (default: 1)
   * @returns For numerical dice: sum of all rolls. For custom dice: comma-separated list of results
   *
   * @example
   * ```typescript
   * const d20 = new D(20)
   * d20.roll()    // Returns a number between 1 and 20
   * d20.roll(3)   // Returns sum of three d20 rolls
   *
   * const coin = new D(['Heads', 'Tails'])
   * coin.roll()   // Returns "Heads" or "Tails"
   * coin.roll(2)  // Returns e.g. "Heads, Tails"
   * ```
   */
  roll(quantity = 1): T extends number ? number : string {
    const rolls = this.rollSpread(quantity)
    if (this.type === 'numerical') {
      return (rolls as number[]).reduce(
        (acc, roll) => acc + roll,
        0
      ) as T extends number ? number : string
    }
    return (rolls as string[]).join(', ') as T extends number ? number : string
  }

  /**
   * Rolls the die one or more times and returns an array of individual results.
   *
   * @param quantity - Number of times to roll the die (default: 1)
   * @returns Array of individual roll results
   *
   * @example
   * ```typescript
   * const d6 = new D(6)
   * d6.rollSpread(3)   // Returns e.g. [4, 2, 6]
   *
   * const coin = new D(['Heads', 'Tails'])
   * coin.rollSpread(2) // Returns e.g. ['Heads', 'Tails']
   * ```
   */
  rollSpread(quantity = 1): T extends number ? number[] : string[] {
    return coreSpreadRolls<string | number>(
      quantity,
      this.sides,
      this.faces
    ) as T extends number ? number[] : string[]
  }

  /**
   * Converts the die instance to a roll options object compatible with the roll function.
   *
   * @returns Roll options object representing this die
   *
   * @example
   * ```typescript
   * const d20 = new D(20)
   * d20.toOptions // Returns { quantity: 1, sides: 20 }
   *
   * const coin = new D(['Heads', 'Tails'])
   * coin.toOptions // Returns { quantity: 1, sides: ['Heads', 'Tails'] }
   * ```
   */
  get toOptions(): T extends number ? NumericRollOptions : CustomRollOptions {
    if (this.type === 'numerical') {
      return {
        quantity: 1,
        sides: this.sides
      } as T extends number ? NumericRollOptions : CustomRollOptions
    }
    return {
      quantity: 1,
      sides: [...this.faces] as string[]
    } as T extends number ? NumericRollOptions : CustomRollOptions
  }
}
