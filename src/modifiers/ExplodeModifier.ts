import type { NumericRollBonus } from '~types'

export class ExplodeModifier {
  apply(
    rolls: number[],
    sides: number,
    rollOne: () => number
  ): NumericRollBonus {
    const explodeCount = rolls.filter((roll) => roll === sides).length
    const explodeResults = Array.from({ length: explodeCount }, rollOne)
    const explodedRolls = [...rolls, ...explodeResults]

    return {
      rolls: explodedRolls,
      simpleMathModifier: 0
    }
  }

  toDescription(): string {
    return 'Exploding Dice'
  }

  toNotation(): string {
    return '!'
  }
}
