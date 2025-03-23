import type { ComparisonOptions, NumericRollBonus } from '~types'
import { formatGreaterLess } from '~utils/descriptionFormatters/formatGreaterLess'
import { applySingleCap } from '~utils/modifierApplicators/applySingleCap'
import { formatGreaterLess as formatGreaterLessNotation } from '~utils/notationFormatters/formatGreaterLess'

export class CapModifier {
  private options: ComparisonOptions | undefined
  constructor(options: ComparisonOptions | undefined) {
    this.options = options
  }

  apply(rolls: number[]): NumericRollBonus {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }
    return {
      rolls: rolls.map(applySingleCap(this.options)),
      simpleMathModifier: 0
    }
  }

  toDescription(): string[] | undefined {
    if (this.options === undefined) return undefined
    return formatGreaterLess(this.options).map((str) => `No Rolls ${str}`)
  }

  toNotation(): string | undefined {
    if (this.options === undefined) return undefined
    const capList = formatGreaterLessNotation(this.options)
    return `C{${capList.join(',')}}`
  }
}
