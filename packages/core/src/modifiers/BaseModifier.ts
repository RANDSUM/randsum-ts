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

  abstract apply(
    rolls: number[],
    parameters?: RequiredNumericRollParameters,
    rollOne?: () => number
  ): NumericRollBonus

  abstract toDescription(): string[] | undefined

  abstract toNotation(): string | undefined

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static parse(_modifiersString: string): Partial<ModifierOptions> {
    return {}
  }

  protected defaultBonus(rolls: number[]): NumericRollBonus {
    return {
      rolls,
      simpleMathModifier: 0
    }
  }
}
