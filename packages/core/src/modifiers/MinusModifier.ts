import { minusPattern } from '../patterns'
import type { ModifierOptions, NumericRollBonus } from '../types'
import { extractMatches } from '../utils/extractMatches'
import { BaseModifier } from './BaseModifier'

export class MinusModifier extends BaseModifier<number> {
  static override parse = (
    modifiersString: string
  ): Pick<ModifierOptions, 'minus'> => {
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

  constructor(options: number | undefined) {
    super(options)
  }

  apply = (bonus: NumericRollBonus): NumericRollBonus => {
    if (!this.options) return bonus
    return {
      ...bonus,
      simpleMathModifier: -this.options
    }
  }

  toDescription = (): string[] | undefined => {
    if (!this.options) return undefined
    return [`Subtract ${this.options}`]
  }

  toNotation = (): string | undefined => {
    if (!this.options) return undefined
    return `-${this.options}`
  }
}
