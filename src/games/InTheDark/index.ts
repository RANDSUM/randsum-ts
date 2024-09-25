import { roll as baseRoll } from '~src/roll'
import { InTheDarkRollResult } from './types'

function judgeResult(sortedRolls: number[]): InTheDarkRollResult {
  const sixes = sortedRolls.filter((r) => r === 6).length
  if (sixes >= 2) {
    return InTheDarkRollResult.CRITICAL
  }

  switch (sortedRolls[0]) {
    case 6:
      return InTheDarkRollResult.SUCCESS
    case 5:
    case 4:
      return InTheDarkRollResult.PARTIAL
    default:
      return InTheDarkRollResult.FAILURE
  }
}

function roll(count: number): [InTheDarkRollResult, number[]] {
  const rollResult = baseRoll({
    sides: 6,
    quantity: count
  })
  const rolls = rollResult.rawResult.flat().sort((a, b) => a - b)

  return [judgeResult(rolls), rolls]
}

export default { roll, judgeResult, InTheDarkRollResult }
