import { roll as baseRoll } from '~src/roll'
import { RollResult } from './types'

function interpretResult(result: number): RollResult {
  switch (true) {
    case result >= 10:
      return RollResult.success
    case result >= 7 && result <= 9:
      return RollResult.partialSuccess
    default:
      return RollResult.failure
  }
}

function roll(bonus: number): [RollResult, number] {
  const { total } = baseRoll({
    quantity: 2,
    sides: 6,
    modifiers: { plus: bonus }
  })
  return [interpretResult(total), total]
}

export default { interpretResult, roll, RollResult }
