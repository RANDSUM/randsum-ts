import type {
  ModifierOptions,
  NumericRollBonus,
  RequiredNumericRollParameters
} from '../types'

export abstract class BaseModifier<T = unknown> {
  protected options: T | undefined

  constructor(options: T | undefined) {
    this.options = options
  }

  /**
   * Apply the modifier to the rolls
   * @param rolls Current roll results
   * @param parameters Optional dice parameters (sides, quantity)
   * @param rollOne Optional function to generate a new roll
   */
  abstract apply(
    rolls: number[],
    parameters?: RequiredNumericRollParameters,
    rollOne?: () => number
  ): NumericRollBonus

  /**
   * Convert the modifier to a human-readable description
   */
  abstract toDescription(): string[] | undefined

  /**
   * Convert the modifier to dice notation
   */
  abstract toNotation(): string | undefined

  /**
   * Parse modifier options from a notation string
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static parse(_modifiersString: string): Partial<ModifierOptions> {
    return {}
  }

  /**
   * Return default roll bonus when modifier is inactive
   */
  protected defaultBonus(rolls: number[]): NumericRollBonus {
    return {
      rolls,
      simpleMathModifier: 0
    }
  }
}
