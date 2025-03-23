import type { NumericRollBonus, RerollOptions } from '~types'
import { rerollRoll } from '~utils/modifierApplicators/rerollRoll'

export class RerollModifier {
  private options: RerollOptions | undefined
  constructor(options: RerollOptions | undefined) {
    this.options = options
  }

  apply(rolls: number[], rollOne: () => number): NumericRollBonus {
    return {
      rolls: this.reroll(rolls, rollOne),
      simpleMathModifier: 0
    }
  }

  toDescription(): string | undefined {
    if (this.options === undefined) return undefined
    return `Subtract ${this.options}`
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    return `-${this.options}`
  }

  private reroll(rolls: number[], rollOne: () => number): number[] {
    if (this.options === undefined) return []
    return [...rolls].map((roll) =>
      rerollRoll(roll, this.options as RerollOptions, rollOne)
    )
  }
}
