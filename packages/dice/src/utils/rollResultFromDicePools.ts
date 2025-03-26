
import { CapModifier, DropModifier, ExplodeModifier, MinusModifier, type ModifierOptions, type NumericRollBonus, PlusModifier, ReplaceModifier, RerollModifier, UniqueModifier } from '@randsum/core'
import { isNumericRollOptions } from '../guards/isNumericRollOptions'
import type { CustomRollParams, DicePool, RollParams, RollResult } from '../types'
import { calculateTotal } from './calculateTotal'
import { coreRandom } from './coreRandom'
import { coreSpreadRolls } from './coreSpreadRolls'

export function rollResultFromDicePools(dicePools: DicePool): RollResult {
  const rawRolls = generateRawRolls(dicePools.dicePools)
  const modifiedRolls = generateModifiedRolls(dicePools, rawRolls)
  const modifiedValues = Object.values(modifiedRolls)

  return {
    ...dicePools,
    rawRolls,
    modifiedRolls,
    rawResult: Object.values(rawRolls).flat(),
    result: modifiedValues.map((pool) => pool.rolls).flat(),
    type: calculateDicePoolType(dicePools.dicePools),
    total: calculateTotal(modifiedValues.map((pool) => pool.total))
  } as RollResult
}

function calculateDicePoolType(
  dicePools: DicePool['dicePools']
): RollResult['type'] {
  const pools = Object.values(dicePools)

  if (pools.every((pool) => typeof pool.options.sides === 'number')) {
    return 'numerical'
  }

  if (pools.every((pool) => Array.isArray(pool.options.sides))) {
    return 'custom'
  }

  return 'mixed'
}

function isCustomParameters(
  poolParameters: RollParams
): poolParameters is CustomRollParams {
  return Array.isArray(poolParameters.options.sides)
}

function applyModifier(
  key: keyof ModifierOptions,
  modifiers: ModifierOptions,
  currentBonuses: NumericRollBonus,
  rollParams: { sides: number; quantity: number; rollOne: () => number }
): NumericRollBonus {
  const modifierMap = {
    reroll: () =>
      new RerollModifier(modifiers.reroll).apply(
        currentBonuses.rolls,
        rollParams.rollOne
      ),
    unique: () =>
      new UniqueModifier(modifiers.unique).apply(
        currentBonuses.rolls,
        { sides: rollParams.sides, quantity: rollParams.quantity },
        rollParams.rollOne
      ),
    replace: () =>
      new ReplaceModifier(modifiers.replace).apply(currentBonuses.rolls),
    cap: () => new CapModifier(modifiers.cap).apply(currentBonuses.rolls),
    drop: () => new DropModifier(modifiers.drop).apply(currentBonuses.rolls),
    explode: () =>
      new ExplodeModifier(modifiers.explode).apply(
        currentBonuses.rolls,
        { sides: rollParams.sides, quantity: rollParams.quantity },
        rollParams.rollOne
      ),
    plus: () => new PlusModifier(modifiers.plus).apply(currentBonuses.rolls),
    minus: () => new MinusModifier(modifiers.minus).apply(currentBonuses.rolls)
  }

  const modifier = modifierMap[key]
  if (!modifier) {
    throw new Error(`Unknown modifier: ${key}`)
  }

  return modifier()
}

function generateModifiedRolls(
  dicePools: DicePool,
  rawRolls: RollResult['rawRolls']
): RollResult['modifiedRolls'] {
  return Object.fromEntries(
    Object.entries(dicePools.dicePools).map(([key, params]) => {
      const rolls = rawRolls[key]

      if (isCustomParameters(params)) {
        return [
          key,
          {
            total: calculateTotal(rolls),
            rolls
          }
        ]
      }

      const {
        options: { sides, quantity = 1, modifiers = {} }
      } = params

      const rollOne = () => coreRandom(sides)
      const modified = Object.keys(modifiers).reduce(
        (bonuses, modifierKey) =>
          applyModifier(
            modifierKey as keyof ModifierOptions,
            modifiers,
            bonuses,
            { sides, quantity, rollOne }
          ),
        {
          simpleMathModifier: 0,
          rolls: rolls as number[]
        }
      )

      return [
        key,
        {
          rolls: modified.rolls,
          total: calculateTotal(modified.rolls, modified.simpleMathModifier)
        }
      ]
    })
  )
}

function generateRawRolls(
  dicePools: DicePool['dicePools']
): RollResult['rawRolls'] {
  return Object.fromEntries(
    Object.entries(dicePools).map(([key, pool]) => {
      const { options } = pool
      const quantity = options.quantity || 1

      if (isNumericRollOptions(options)) {
        return [key, coreSpreadRolls(quantity, options.sides) as number[]]
      }

      return [
        key,
        coreSpreadRolls(quantity, options.sides.length, options.sides)
      ]
    })
  )
}
