import { isCustomParameters } from '~guards'
import { RollParameters } from '~types'
import {
  applyReroll,
  applyUnique,
  applyReplace,
  applyDrop,
  applyExplode,
  applySingleCap
} from './modifierApplicators'

type RollBonuses<Sides extends string | number> = {
  rolls: Sides[]
  simpleMathModifier: number
}

function applyModifiers<Sides extends string | number>(
  poolParameters: RollParameters<Sides>,
  initialRolls: Sides[]
): RollBonuses<Sides> {
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
        return {
          ...bonuses,
          rolls: modifiers.reroll
            ? applyReroll(bonuses.rolls, modifiers.reroll, rollOne)
            : bonuses.rolls
        }

      case 'unique':
        return {
          ...bonuses,
          rolls: modifiers.unique
            ? applyUnique(
                bonuses.rolls,
                { sides, quantity: quantity || 1, unique: modifiers.unique },
                rollOne
              )
            : bonuses.rolls
        }

      case 'replace':
        return {
          ...bonuses,
          rolls: modifiers.replace
            ? applyReplace(bonuses.rolls, modifiers.replace)
            : bonuses.rolls
        }

      case 'cap':
        return {
          ...bonuses,
          rolls: modifiers.cap
            ? bonuses.rolls.map(applySingleCap(modifiers.cap))
            : bonuses.rolls
        }

      case 'drop':
        return {
          ...bonuses,
          rolls: modifiers.drop
            ? applyDrop(bonuses.rolls, modifiers.drop)
            : bonuses.rolls
        }

      case 'explode':
        return {
          ...bonuses,
          rolls: modifiers.explode
            ? applyExplode(bonuses.rolls, { sides }, rollOne)
            : bonuses.rolls
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
  }, rollBonuses) as RollBonuses<Sides>
}

export default { applyModifiers }
