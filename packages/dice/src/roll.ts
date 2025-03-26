import { v4 as uuid } from 'uuid'
import type {
  CustomRollArgument,
  CustomRollResult,
  DicePool,
  MixedRollResult,
  NumericRollArgument,
  NumericRollResult,
  RollArgument,
  RollResult
} from './types'
import { normalizeArgument } from './utils/normalizeArgument'
import { rollResultFromDicePools } from './utils/rollResultFromDicePools'

/**
 * Rolls dice based on the provided arguments.
 *
 * @remarks
 * This function supports multiple formats for specifying dice rolls:
 * - Standard notation strings (e.g., "4d6", "2d20H")
 * - Numbers (e.g., 20 for 1d20)
 * - Option objects for detailed configuration
 *
 * @example
 * ```typescript
 * // Basic rolls
 * roll(20) // Roll 1d20
 * roll("4d6") // Roll 4d6
 *
 * // Advanced notation
 * roll("4d6L") // 4d6, drop lowest
 * roll("2d20H") // 2d20, keep highest
 * roll("4d6R{<3}") // 4d6, reroll values below 3
 *
 * // Using options object
 * roll({
 *   quantity: 4,
 *   sides: 6,
 *   modifiers: {
 *     drop: { lowest: true },
 *     reroll: { below: 3 }
 *   }
 * })
 *
 * // Multiple dice pools
 * roll("2d20", "4d6") // Roll both dice pools
 * ```
 *
 * @param args - One or more roll arguments. Can be numbers, notation strings, or option objects
 * @returns A {@link RollResult} containing the results of the roll(s)
 *
 * @throws {Error} If the dice notation is invalid
 * @throws {Error} If the number of sides is less than 1
 * @throws {Error} If the quantity is less than 1
 *
 * @see {@link RollResult} for return type details
 * @see {@link RollOptions} for options object structure
 */
function roll(...args: NumericRollArgument[]): NumericRollResult
function roll(...args: CustomRollArgument[]): CustomRollResult
function roll(
  ...args: (NumericRollArgument | CustomRollArgument)[]
): MixedRollResult
function roll(...args: RollArgument[]): RollResult {
  const dicePools: DicePool = {
    dicePools: Object.fromEntries(
      args.map((arg) => [uuid(), normalizeArgument(arg)])
    )
  }

  return rollResultFromDicePools(dicePools)
}

export { roll }
