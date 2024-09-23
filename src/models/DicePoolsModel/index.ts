import { isFullNumArray } from '~guards'
import { ParametersModel, RawRollsModel } from '~models'
import { DicePools, DicePoolType, RandsumRollResult } from '~types'

function calculateType(dicePools: DicePools['dicePools']): DicePoolType {
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

function calculateTotal(rolls: number[] | string[], bonus = 0): number {
  if (isFullNumArray(rolls)) {
    return rolls.reduce((acc, cur) => acc + cur, bonus)
  }
  return 0
}

export function generateModifiedRolls(
  DicePools: DicePools,
  rawRolls: RandsumRollResult['rawRolls']
): RandsumRollResult['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(DicePools.dicePools).map((key) => {
      const params = DicePools.dicePools[key]
      const rolls = rawRolls[key]
      const modified = ParametersModel.applyModifiers(params, rolls)
      const modifiedRoll = {
        rolls: modified.rolls,
        total: calculateTotal(modified.rolls, modified.simpleMathModifier)
      }
      return [key, modifiedRoll]
    })
  )
}

function generateRollResult(DicePools: DicePools): RandsumRollResult {
  const rawRolls = RawRollsModel.generate(DicePools.dicePools)
  const modifiedRolls = generateModifiedRolls(DicePools, rawRolls)
  const modifiedValues = Object.values(modifiedRolls)
  const rawResult = Object.values(rawRolls)
  const result = modifiedValues.map((pool) => pool.rolls)
  const total = calculateTotal(modifiedValues.map((pool) => pool.total))
  const type = calculateType(DicePools.dicePools)

  return {
    ...DicePools,
    rawRolls,
    rawResult,
    modifiedRolls,
    result,
    type,
    total
  }
}
export default {
  generateRollResult
}
