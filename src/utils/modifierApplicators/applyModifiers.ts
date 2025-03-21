import { isCustomParameters } from '~guards/parameters/isCustomParameters'
import type {
  ComparisonOptions,
  DropOptions,
  ModifierOptions,
  ReplaceOptions,
  RerollOptions,
  RollBonus,
  RollParams,
  UniqueOptions
} from '~types'
import { coreRandom } from '~utils/coreRandom'
import { applyDrop } from './applyDrop'
import { applyExplode } from './applyExplode'
import { applyReplace } from './applyReplace'
import { applyReroll } from './applyReroll'
import { applySingleCap } from './applySingleCap'
import { applyUnique } from './applyUnique'

type NumericRollBonus = {
  simpleMathModifier: number
  rolls: number[]
}

type ModifierHandler = (
  bonuses: NumericRollBonus,
  value: unknown,
  params: { sides: number; quantity: number },
  rollOne: () => number
) => NumericRollBonus

const MODIFIER_HANDLERS: Record<keyof ModifierOptions, ModifierHandler> = {
  reroll: (bonuses, value, _, rollOne) => ({
    ...bonuses,
    rolls: applyReroll(bonuses.rolls, value as RerollOptions, rollOne)
  }),
  unique: (bonuses, value, params, rollOne) => ({
    ...bonuses,
    rolls: applyUnique(
      bonuses.rolls,
      { ...params, unique: value as boolean | UniqueOptions },
      rollOne
    )
  }),
  replace: (bonuses, value) => ({
    ...bonuses,
    rolls: applyReplace(
      bonuses.rolls,
      value as ReplaceOptions | ReplaceOptions[]
    )
  }),
  cap: (bonuses, value) => ({
    ...bonuses,
    rolls: bonuses.rolls.map(applySingleCap(value as ComparisonOptions))
  }),
  drop: (bonuses, value) => ({
    ...bonuses,
    rolls: applyDrop(bonuses.rolls, value as DropOptions)
  }),
  explode: (bonuses, _, params, rollOne) => ({
    ...bonuses,
    rolls: applyExplode(bonuses.rolls, params, rollOne)
  }),
  plus: (bonuses, value) => ({
    ...bonuses,
    simpleMathModifier: bonuses.simpleMathModifier + Number(value)
  }),
  minus: (bonuses, value) => ({
    ...bonuses,
    simpleMathModifier: bonuses.simpleMathModifier - Number(value)
  })
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

  const {
    options: { sides, quantity = 1, modifiers = {} }
  } = poolParameters

  const params = { sides, quantity }
  const rollOne = () => coreRandom(sides)

  return applyModifiersInOrder(
    modifiers,
    {
      simpleMathModifier: 0,
      rolls: initialRolls as number[]
    },
    params,
    rollOne
  )
}

function applyModifiersInOrder(
  modifiers: ModifierOptions,
  initialBonuses: NumericRollBonus,
  params: { sides: number; quantity: number },
  rollOne: () => number
): NumericRollBonus {
  return Object.entries(modifiers)
    .filter(([, value]) => value != null)
    .reduce((bonuses, [key, value]) => {
      const handler = MODIFIER_HANDLERS[key as keyof ModifierOptions]
      if (!handler) {
        throw new Error(`Unknown modifier: ${key}`)
      }
      return handler(bonuses, value, params, rollOne)
    }, initialBonuses)
}
