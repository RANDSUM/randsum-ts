import { roll } from '@randsum/dice'
import type { AdvantageDisadvantage5E, RollArgument5E } from './types'

export function roll5E({ modifier, rollingWith }: RollArgument5E) {
  const sides = 20

  return roll({
    sides,
    quantity: generateQuantity(rollingWith),
    modifiers: generateModifiers(modifier, rollingWith)
  })
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

function generateModifiers(
  modifier: number,
  rollingWith?: AdvantageDisadvantage5E
) {
  const coreModifiers = {
    plus: modifier
  }
  switch (rollingWith) {
    case 'Advantage':
      return {
        ...coreModifiers,
        drop: { lowest: 1 }
      }
    case 'Disadvantage':
      return {
        ...coreModifiers,
        drop: { highest: 1 }
      }
    default:
      return coreModifiers
  }
}
