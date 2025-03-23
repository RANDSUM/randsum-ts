import { isCustomParameters } from '~src/guards/isCustomParameters'
import { CapModifier } from '~src/modifiers/CapModifier'
import { DropModifier } from '~src/modifiers/DropModifier'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { ReplaceModifier } from '~src/modifiers/ReplaceModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollBonus, RollParams } from '~types'
import { coreRandom } from '~utils/coreRandom'

export function applyModifiers(
  poolParameters: RollParams,
  initialRolls: number[] | string[]
): RollBonus {
  if (isCustomParameters(poolParameters)) {
    return {
      simpleMathModifier: 0,
      rolls: initialRolls as string[]
    }
  }

  const rollBonuses = {
    simpleMathModifier: 0,
    rolls: initialRolls as number[]
  }

  const {
    options: { sides, quantity = 1, modifiers = {} }
  } = poolParameters

  const rollOne: () => number = () => coreRandom(sides)

  return Object.keys(modifiers).reduce((bonuses, key) => {
    switch (key) {
      case 'reroll':
        return new RerollModifier(modifiers.reroll).apply(
          bonuses.rolls,
          rollOne
        )
      case 'unique':
        return new UniqueModifier(modifiers.unique).apply(
          bonuses.rolls,
          { sides, quantity },
          rollOne
        )

      case 'replace':
        return new ReplaceModifier(modifiers.replace).apply(bonuses.rolls)

      case 'cap':
        return new CapModifier(modifiers.cap).apply(bonuses.rolls)

      case 'drop':
        return new DropModifier(modifiers.drop).apply(bonuses.rolls)

      case 'explode':
        return new ExplodeModifier(modifiers.explode).apply(
          bonuses.rolls,
          { sides, quantity },
          rollOne
        )

      case 'plus':
        return new PlusModifier(modifiers.plus).apply(bonuses.rolls)

      case 'minus':
        return new MinusModifier(modifiers.minus).apply(bonuses.rolls)

      default:
        throw new Error(`Unknown modifier: ${key}`)
    }
  }, rollBonuses)
}
