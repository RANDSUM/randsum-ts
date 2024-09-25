import { roll as baseRoll } from '~src/roll'
import { RollResult } from './types'

function interpretResult(sortedRolls: number[]): RollResult {
  const sixes = sortedRolls.filter((r) => r === 6).length
  if (sixes >= 2) {
    return RollResult.CRITICAL
  }

  switch (sortedRolls[0]) {
    case 6:
      return RollResult.SUCCESS
    case 5:
    case 4:
      return RollResult.PARTIAL
    default:
      return RollResult.FAILURE
  }
}

function roll(count: number): [RollResult, number[]] {
  const rollResult = baseRoll({
    sides: 6,
    quantity: count
  })
  const rolls = rollResult.rawResult.flat().sort((a, b) => a - b)

  return [interpretResult(rolls), rolls]
}

import * as types from './types'

export default { roll, interpretResult, ...types }
