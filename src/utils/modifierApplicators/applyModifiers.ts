import type {
  CustomRollParams,
  ModifierOptions,
  RollBonus,
  RollParams
} from '~types'
import { coreRandom } from '~utils/coreRandom'
import { applyDrop } from './applyDrop'
import { applyExplode } from './applyExplode'
import { applyReplace } from './applyReplace'
import { applyReroll } from './applyReroll'
import { applySingleCap } from './applySingleCap'
import { applyUnique } from './applyUnique'

function isCustomParameters(params: RollParams): params is CustomRollParams {
  return Array.isArray((params.options as CustomRollParams['options']).sides)
}

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

  const rollOne = (): number => {
    return coreRandom(sides)
  }

  return applyModifiersReducer(
    modifiers,
    rollBonuses,
    { sides, quantity: quantity || 1 },
    rollOne
  )
}

function applyModifiersReducer(
  modifiers: ModifierOptions,
  initialBonuses: { simpleMathModifier: number; rolls: number[] },
  params: { sides: number; quantity: number },
  rollOne: () => number
): RollBonus {
  return Object.entries(modifiers).reduce((bonuses, [key, value]) => {
    if (value === undefined || value === null) {
      return bonuses
    }

    switch (key) {
      case 'reroll':
        return {
          ...bonuses,
          rolls: applyReroll(bonuses.rolls, value, rollOne)
        }
      case 'unique':
        return {
          ...bonuses,
          rolls: applyUnique(
            bonuses.rolls,
            { ...params, unique: value },
            rollOne
          )
        }
      case 'replace':
        return {
          ...bonuses,
          rolls: applyReplace(bonuses.rolls, value)
        }
      case 'cap':
        return {
          ...bonuses,
          rolls: bonuses.rolls.map(applySingleCap(value))
        }
      case 'drop':
        return {
          ...bonuses,
          rolls: applyDrop(bonuses.rolls, value)
        }
      case 'explode':
        return {
          ...bonuses,
          rolls: applyExplode(bonuses.rolls, params, rollOne)
        }
      case 'plus':
        return {
          ...bonuses,
          simpleMathModifier: bonuses.simpleMathModifier + Number(value)
        }
      case 'minus':
        return {
          ...bonuses,
          simpleMathModifier: bonuses.simpleMathModifier - Number(value)
        }
      default:
        throw new Error(`Unknown modifier: ${key}`)
    }
  }, initialBonuses)
}
