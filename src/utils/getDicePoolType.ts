import type { DicePoolType } from '~types'
import { isCustomSides } from '../guards/sides/isCustomSides'
import { isNumericSides } from '../guards/sides/isNumericSides'

export function getDicePoolType(sides: (number | string[])[]): DicePoolType {
  const hasNumerical = sides.some((side) => isNumericSides(side))
  const hasCustom = sides.some((side) => isCustomSides(side))

  if (hasNumerical && hasCustom) return 'mixed'
  if (hasCustom) return 'custom'
  return 'numerical'
}
