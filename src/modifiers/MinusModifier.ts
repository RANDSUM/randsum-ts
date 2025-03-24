import { minusPattern } from '~patterns'
import type { ModifierOptions, NumericRollBonus } from '~types'
import { extractMatches } from '~utils/notationParsers/extractMatches'

export class MinusModifier {
  static parse(modifiersString: string): Pick<ModifierOptions, 'minus'> {
    const notations = extractMatches(modifiersString, minusPattern)
    if (notations.length === 0) {
      return {}
    }
    const minus = notations
      .map((notationString) => Number(notationString.split('-')[1]))
      .reduce((acc, num) => acc - num, 0)

    return {
      minus: Math.abs(minus)
    }
  }

  private options: number | undefined
  constructor(options: number | undefined) {
    this.options = options
  }

  apply(rolls: number[]): NumericRollBonus {
    if (!this.options) return { rolls, simpleMathModifier: 0 }
    return {
      rolls,
      simpleMathModifier: -this.options
    }
  }

  toDescription(): string | undefined {
    if (!this.options) return undefined
    return `Subtract ${this.options}`
  }

  toNotation(): string | undefined {
    if (!this.options) return undefined
    return `-${this.options}`
  }
}
