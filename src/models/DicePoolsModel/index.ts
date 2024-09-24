import { isFullNumArray } from '~guards'
import { ParametersModel } from '~models'
import { DicePools, DicePoolType, RandsumRollResult } from '~types'

function calculateType(
  dicePools: DicePools<string | number>['dicePools']
): DicePoolType {
  switch (true) {
    case Object.values(dicePools).every(
      (pool) => typeof pool.options.sides === 'number'
    ):
      return DicePoolType.numerical

    case Object.values(dicePools).every((pool) =>
      Array.isArray(pool.options.sides)
    ):
      return DicePoolType.custom

    default:
      return DicePoolType.mixed
  }
}

function calculateTotal<Sides extends string | number = string | number>(
  rolls: Sides[],
  bonus = 0
): Sides {
  if (isFullNumArray(rolls)) {
    return rolls.reduce(
      (acc, cur) => (acc as number) + (cur as number),
      bonus
    ) as Sides
  }

  return rolls.flat().join(', ') as Sides
}

function generateModifiedRolls<Sides extends string | number = string | number>(
  DicePools: DicePools<Sides>,
  rawRolls: RandsumRollResult<Sides>['rawRolls']
): RandsumRollResult<Sides>['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(DicePools.dicePools).map((key) => {
      const params = DicePools.dicePools[key]
      const modified = ParametersModel.applyModifiers(params, rawRolls[key])
      const modifiedRoll = {
        rolls: modified.rolls,
        total: calculateTotal(modified.rolls, modified.simpleMathModifier)
      }
      return [key, modifiedRoll]
    })
  ) as RandsumRollResult<Sides>['modifiedRolls']
}

function generateRawRolls<Sides extends string | number = string | number>(
  dicePools: DicePools<Sides>['dicePools']
): RandsumRollResult<Sides>['rawRolls'] {
  return Object.fromEntries(
    Object.keys(dicePools).map((key) => {
      const {
        die,
        options: { quantity }
      } = dicePools[key]
      return [key, die.rollMany(quantity || 1) as Sides[]]
    })
  )
}

function generateRollResult<Sides extends string | number = string | number>(
  dicePools: DicePools<Sides>
): RandsumRollResult<Sides> {
  const rawRolls = generateRawRolls(dicePools.dicePools)
  const modifiedRolls = generateModifiedRolls(dicePools, rawRolls)
  const modifiedValues = Object.values(modifiedRolls)

  return {
    ...dicePools,
    rawRolls,
    modifiedRolls,
    rawResult: Object.values(rawRolls),
    result: modifiedValues.map((pool) => pool.rolls),
    type: calculateType(dicePools.dicePools),
    total: calculateTotal(modifiedValues.map((pool) => pool.total))
  }
}
export default {
  generateRollResult
}
