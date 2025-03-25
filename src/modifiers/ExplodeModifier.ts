import { explodePattern } from '~patterns'
import type {
  ModifierOptions,
  NumericRollBonus,
  RequiredNumericRollParameters
} from '~types'
import { extractMatches } from '~utils/extractMatches'

export class ExplodeModifier {
  static parse = (
    modifiersString: string
  ): Pick<ModifierOptions, 'explode'> => {
    const notations = extractMatches(modifiersString, explodePattern)
    if (notations.length === 0) {
      return {}
    }
    return { explode: true }
  }

  private options: boolean | undefined
  constructor(options: boolean | undefined) {
    this.options = options
  }

  apply = (
    rolls: number[],
    { sides }: RequiredNumericRollParameters,
    rollOne: () => number
  ): NumericRollBonus => {
    if (this.options === undefined) return { rolls, simpleMathModifier: 0 }
    const explodeCount = rolls.filter((roll) => roll === sides).length
    const explodeResults = Array.from({ length: explodeCount }, rollOne)
    const explodedRolls = [...rolls, ...explodeResults]

    return {
      rolls: explodedRolls,
      simpleMathModifier: 0
    }
  }

  toDescription = (): string | undefined => {
    if (this.options === undefined) return undefined
    return 'Exploding Dice'
  }

  toNotation = (): string | undefined => {
    if (this.options === undefined) return undefined
    return '!'
  }
}
