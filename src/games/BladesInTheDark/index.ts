import { roll as baseRoll } from '~src/roll'
import { BladesRollResult } from './types'

function judgeResult(sortedRolls: number[]): BladesRollResult {
  const sixes = sortedRolls.filter((r) => r === 6).length
  if (sixes >= 2) {
    return BladesRollResult.CRITICAL
  }

  switch (sortedRolls[0]) {
    case 6:
      return BladesRollResult.SUCCESS
    case 5:
    case 4:
      return BladesRollResult.PARTIAL
    default:
      return BladesRollResult.FAILURE
  }
}

function roll(count: number): [BladesRollResult, number[]] {
  const rollResult = baseRoll({
    sides: 6,
    quantity: count
  })
  const rolls = rollResult.rawResult.flat().sort((a, b) => a - b)

  return [judgeResult(rolls), rolls]
}

export default { roll, judgeResult }
