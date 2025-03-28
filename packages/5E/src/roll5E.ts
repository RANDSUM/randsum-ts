import { type NumericRollResult, roll } from '@randsum/dice'

import type { AdvantageDisadvantage5E, RollArgument5E } from './types'

export function roll5E({
  modifier,
  rollingWith
}: RollArgument5E): NumericRollResult {
  const rollArg = {
    sides: 20,
    quantity: generateQuantity(rollingWith),
    modifiers: { ...generateModifiers(rollingWith), plus: modifier }
  }
  return roll(rollArg)
}

function generateQuantity(rollingWith?: AdvantageDisadvantage5E) {
  switch (rollingWith) {
    case 'Advantage':
    case 'Disadvantage':
      return 2
    default:
      return 1
  }
}

function generateModifiers(rollingWith: AdvantageDisadvantage5E | undefined) {
  switch (rollingWith) {
    case 'Advantage':
      return {
        drop: { lowest: 1 }
      }
    case 'Disadvantage':
      return {
        drop: { highest: 1 }
      }
    default:
      return {}
  }
}
