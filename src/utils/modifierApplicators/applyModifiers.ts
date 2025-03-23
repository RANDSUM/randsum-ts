import { isCustomParameters } from '~src/guards/isCustomParameters'
import { ExplodeModifier } from '~src/modifiers/ExplodeModifier'
import { MinusModifier } from '~src/modifiers/MinusModifier'
import { PlusModifier } from '~src/modifiers/PlusModifier'
import { RerollModifier } from '~src/modifiers/RerollModifier'
import { UniqueModifier } from '~src/modifiers/UniqueModifier'
import type { RollBonus, RollParams } from '~types'
import { coreRandom } from '~utils/coreRandom'
import { applyDrop } from './applyDrop'
import { applyReplace } from './applyReplace'
import { applySingleCap } from './applySingleCap'

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
        if (!modifiers.replace) return bonuses
        return {
          ...bonuses,
          rolls: applyReplace(bonuses.rolls, modifiers.replace)
        }

      case 'cap':
        if (!modifiers.cap) return bonuses
        return {
          ...bonuses,
          rolls: bonuses.rolls.map(applySingleCap(modifiers.cap))
        }

      case 'drop':
        if (!modifiers.drop) return bonuses
        return {
          ...bonuses,
          rolls: applyDrop(bonuses.rolls, modifiers.drop)
        }

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
