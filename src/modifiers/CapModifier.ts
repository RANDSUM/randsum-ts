import type { ComparisonOptions, NumericRollBonus } from '~types'
import { formatGreaterLessDescriptions } from '~utils/descriptionFormatters/formatGreaterLessDescriptions'
import { formatGreaterLessNotation } from '~utils/notationFormatters/formatGreaterLessNotation'

export class CapModifier {
  static applySingleCap(
    { greaterThan, lessThan }: ComparisonOptions,
    value?: number
  ): (roll: number) => number {
    return (roll: number) => {
      if (greaterThan !== undefined && roll > greaterThan) {
        return value ?? greaterThan
      }
      if (lessThan !== undefined && roll < lessThan) {
        return value ?? lessThan
      }
      return roll
    }
  }

  private options: ComparisonOptions | undefined
  constructor(options: ComparisonOptions | undefined) {
    this.options = options
  }

  apply(rolls: number[]): NumericRollBonus {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }
    return {
      rolls: rolls.map(CapModifier.applySingleCap(this.options)),
      simpleMathModifier: 0
    }
  }

  toDescription(): string[] | undefined {
    if (this.options === undefined) return undefined
    return formatGreaterLessDescriptions(this.options).map(
      (str) => `No Rolls ${str}`
    )
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    const capList = formatGreaterLessNotation(this.options)
    return `C{${capList.join(',')}}`
  }
}
