import { explodePattern } from '../patterns'
import type {
  ModifierOptions,
  NumericRollBonus,
  RequiredNumericRollParameters
} from '../types'
import { extractMatches } from '../utils/extractMatches'
import { BaseModifier } from './BaseModifier'

export class ExplodeModifier extends BaseModifier<boolean> {
  static override parse = (
    modifiersString: string
  ): Pick<ModifierOptions, 'explode'> => {
    const notations = extractMatches(modifiersString, explodePattern)
    if (notations.length === 0) {
      return {}
    }
    return { explode: true }
  }

  constructor(options: boolean | undefined) {
    super(options)
  }

  apply = (
    bonus: NumericRollBonus,
    { sides }: RequiredNumericRollParameters,
    rollOne: () => number
  ): NumericRollBonus => {
    if (this.options === undefined) return bonus
    const explodeCount = bonus.rolls.filter((roll) => roll === sides).length
    const explodeResults = Array.from({ length: explodeCount }, rollOne)
    const explodedRolls = [...bonus.rolls, ...explodeResults]

    return {
      ...bonus,
      rolls: explodedRolls
    }
  }

  toDescription = (): string[] | undefined => {
    if (this.options === undefined) return undefined
    return ['Exploding Dice']
  }

  toNotation = (): string | undefined => {
    if (this.options === undefined) return undefined
    return '!'
  }
}
