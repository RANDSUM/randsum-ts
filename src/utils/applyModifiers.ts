import { isCustomParameters } from '~guards'
import type { RollParameters } from '~types'
import {
  applyDrop,
  applyExplode,
  applyReplace,
  applyReroll,
  applySingleCap,
  applyUnique
} from './modifierApplicators'

type RollBonuses<S extends string | number> = {
  rolls: S[]
  simpleMathModifier: number
}

function applyModifiers<S extends string | number>(
  poolParameters: RollParameters<S>,
  initialRolls: S[]
): RollBonuses<S> {
  if (isCustomParameters(poolParameters)) {
    return {
      simpleMathModifier: 0,
      rolls: initialRolls
    }
  }

  const rollBonuses = {
    simpleMathModifier: 0,
    rolls: initialRolls as number[]
  }

  const {
    options: { sides, quantity, modifiers = {} },
    die
  } = poolParameters as RollParameters<number>

  const rollOne: () => number = () => die.roll()

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
  }, rollBonuses) as RollBonuses<S>
}

export { applyModifiers }
