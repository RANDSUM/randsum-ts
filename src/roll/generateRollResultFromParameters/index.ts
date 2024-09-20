import {
  RandsumRollParameters,
  DicePoolType,
  DicePools,
  RandsumRollResult
} from '~types'
import { applyModifiers } from './applyModifiers'
import { generateRawRolls } from './generateRawRolls'
import { isFullNumArray } from '~guards'

function calculateType(dicePools: DicePools['dicePools']): DicePoolType {
  switch (true) {
    case Object.values(dicePools).every(
      (pool) => typeof pool.options.sides === 'number'
    ):
      return DicePoolType.standard

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

function generateModifiedRolls(
  DicePools: DicePools,
  rawRolls: RandsumRollResult['rawRolls']
): RandsumRollResult['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(DicePools.dicePools).map((key) => {
      const pool = DicePools.dicePools[key] as
        | RandsumRollParameters<string>
        | RandsumRollParameters<number>
      const rolls = rawRolls[key]
      const modified = applyModifiers(pool, rolls)
      const modifiedRoll = {
        rolls: modified.rolls,
        total: calculateTotal(modified.rolls, modified.simpleMathModifier)
      }
      return [key, modifiedRoll]
    })
  )
}

function generateRollResultFromParameters(
  DicePools: DicePools
): RandsumRollResult {
  const rawRolls = generateRawRolls(DicePools.dicePools)
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

export { generateRollResultFromParameters }
