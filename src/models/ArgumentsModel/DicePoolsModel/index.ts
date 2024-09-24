import { isFullNumArray } from '~guards'
import { ParametersModel, RawRollsModel } from '~models'
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
): number {
  if (isFullNumArray(rolls)) {
    return rolls.reduce((acc, cur) => (acc as number) + (cur as number), bonus)
  }
  return 0
}

export function generateModifiedRolls<
  Sides extends string | number = string | number
>(
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
  )
}

function generateRollResult<Sides extends string | number = string | number>(
  DicePools: DicePools<Sides>
): RandsumRollResult<Sides> {
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
