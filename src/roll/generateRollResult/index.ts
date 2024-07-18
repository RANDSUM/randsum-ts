import {
  DicePoolParameters,
  DicePoolType,
  RollParameters,
  RollResult
} from '~types'
import applyModifiers from './applyModifiers'
import generateRawRolls from './generateRawRolls'

function calculateType(dicePools: RollParameters['dicePools']): DicePoolType {
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

const isFullNumArray = (arr: unknown[]): arr is number[] =>
  arr.every((item) => typeof item === 'number')

function calculateTotal(rolls: number[] | string[], bonus = 0): number {
  if (isFullNumArray(rolls)) {
    return rolls.reduce((acc, cur) => acc + cur, bonus)
  }
  return 0
}

function generateModifiedRolls(
  rollParameters: RollParameters,
  rawRolls: RollResult['rawRolls']
): RollResult['modifiedRolls'] {
  return Object.fromEntries(
    Object.keys(rollParameters.dicePools).map((key) => {
      const pool = rollParameters.dicePools[key] as
        | DicePoolParameters<string>
        | DicePoolParameters<number>
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

function generateRollResult(rollParameters: RollParameters): RollResult {
  const rawRolls = generateRawRolls(rollParameters.dicePools)
  const modifiedRolls = generateModifiedRolls(rollParameters, rawRolls)
  const modifiedValues = Object.values(modifiedRolls)
  const rawResult = Object.values(rawRolls)
  const result = modifiedValues.map((pool) => pool.rolls)
  const total = calculateTotal(modifiedValues.map((pool) => pool.total))
  const type = calculateType(rollParameters.dicePools)

  return {
    ...rollParameters,
    rawRolls,
    rawResult,
    modifiedRolls,
    result,
    type,
    total
  }
}

export default generateRollResult
