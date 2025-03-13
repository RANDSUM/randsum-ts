import { isFullNumArray } from '~guards'
import type { DicePools, DicePoolType, RollResult } from '~types'
import { applyModifiers } from './applyModifiers'

function calculateType(
  dicePools: DicePools<string | number>['dicePools']
): DicePoolType {
  switch (true) {
    case Object.values(dicePools).every(
      (pool) => typeof pool.options.sides === 'number'
    ):
      return 'numerical'

    case Object.values(dicePools).every((pool) =>
      Array.isArray(pool.options.sides)
    ):
      return 'custom'

    default:
      return 'mixed'
  }
}

function calculateTotal<S extends string | number>(rolls: S[], bonus = 0): S {
  if (isFullNumArray(rolls)) {
    return rolls.reduce(
      (acc, cur) => (acc as number) + (cur as number),
      bonus
    ) as S
  }

  return rolls.flat().join(', ') as S
}

function generateModifiedRolls<S extends string | number>(
  DicePools: DicePools<S>,
  rawRolls: RollResult<S>['rawRolls']
): RollResult<S>['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(DicePools.dicePools).map((key) => {
      const params = DicePools.dicePools[key]
      const modified = applyModifiers(params, rawRolls[key])
      const modifiedRoll = {
        rolls: modified.rolls,
        total: calculateTotal(modified.rolls, modified.simpleMathModifier)
      }
      return [key, modifiedRoll]
    })
  ) as RollResult<S>['modifiedRolls']
}

function generateRawRolls<S extends string | number>(
  dicePools: DicePools<S>['dicePools']
): RollResult<S>['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const {
        die,
        options: { quantity }
      } = dicePools[key]
      return [key, die.rollMany(quantity || 1) as S[]]
    })
  )
}

export function rollResultFromDicePools<S extends string | number>(
  dicePools: DicePools<S>
): RollResult<S> {
  const rawRolls = generateRawRolls(dicePools.dicePools)
  const modifiedRolls = generateModifiedRolls(dicePools, rawRolls)
  const modifiedValues = Object.values(modifiedRolls)

  return {
    ...dicePools,
    rawRolls,
    modifiedRolls,
    rawResult: Object.values(rawRolls).flat(),
    result: modifiedValues.map((pool) => pool.rolls).flat(),
    type: calculateType(dicePools.dicePools),
    total: calculateTotal(modifiedValues.map((pool) => pool.total))
  }
}
