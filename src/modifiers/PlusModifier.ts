import { plusPattern } from '~patterns'
import type { ModifierOptions, NumericRollBonus } from '~types'
import { extractMatches } from '~utils/extractMatches'

export class PlusModifier {
  static parse = (modifiersString: string): Pick<ModifierOptions, 'plus'> => {
    const notations = extractMatches(modifiersString, plusPattern)
    if (notations.length === 0) {
      return {}
    }
    const plus = notations
      .map((notationString) => Number(notationString.split('+')[1]))
      .reduce((acc, num) => acc + num, 0)

    return {
      plus
    }
  }

  private options: number | undefined
  constructor(options: number | undefined) {
    this.options = options
  }

  apply = (rolls: number[]): NumericRollBonus => {
    if (!this.options) return { rolls, simpleMathModifier: 0 }
    return {
      rolls,
      simpleMathModifier: this.options
    }
  }

  toDescription = (): string | undefined => {
    if (!this.options) return undefined
    return `Add ${this.options}`
  }

  toNotation = (): string | undefined => {
    if (!this.options) return undefined
    return `+${this.options}`
  }
}
