import { isCustomParameters } from '~src/guards/isCustomParameters'
import type { RollBonus, RollParams } from '~types'
import { coreRandom } from '~utils/coreRandom'
import { applyDrop } from './applyDrop'
import { applyExplode } from './applyExplode'
import { applyReplace } from './applyReplace'
import { applyReroll } from './applyReroll'
import { applySingleCap } from './applySingleCap'
import { applyUnique } from './applyUnique'

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
    options: { sides, quantity, modifiers = {} }
  } = poolParameters

  const rollOne: () => number = () => coreRandom(sides)

  return Object.keys(modifiers).reduce((bonuses, key) => {
    switch (key) {
      case 'reroll':
        if (!modifiers.reroll) return bonuses
        return {
          ...bonuses,
          rolls: applyReroll(bonuses.rolls, modifiers.reroll, rollOne)
        }
      case 'unique':
        if (!modifiers.unique) return bonuses
        return {
          ...bonuses,
          rolls: applyUnique(
            bonuses.rolls,
            { sides, quantity: quantity || 1, unique: modifiers.unique },
            rollOne
          )
        }

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
        if (!modifiers.explode) return bonuses
        return {
          ...bonuses,
          rolls: applyExplode(bonuses.rolls, { sides }, rollOne)
        }

      case 'plus':
        return {
          ...bonuses,
          simpleMathModifier:
            bonuses.simpleMathModifier + Number(modifiers.plus)
        }

      case 'minus':
        return {
          ...bonuses,
          simpleMathModifier:
            bonuses.simpleMathModifier - Number(modifiers.minus)
        }

      default:
        throw new Error(`Unknown modifier: ${key}`)
    }
  }, rollBonuses)
}
